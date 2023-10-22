console.log(screen.width)
console.log(window.innerWidth)
console.log(window.outerWidth)

const mobileBreakpoint = 768;
const loopSection = false;
let activeSectionId = 0;


const isMobile = () => window.innerWidth < mobileBreakpoint;
const nextDirection = () => isMobile() ? 'right' : 'up';
const prevDirection = () => isMobile() ? 'left' : 'down';
const getPageWidth = () => document.querySelector('.pages').clientWidth;
const getPageHeight = () => document.querySelector('.pages').clientHeight;
const getSectionNodesMobile = () => document.querySelectorAll('.pages section:not(.section-start)');
const getSectionNodesDesktop = () => document.querySelectorAll('.pages section');

const translateDirection = direction => ({
    center: 'translate3d(0px, 0px, 0px)',
    left: 'translate3d(-' + getPageWidth() + 'px, 0px, 0px)',
    right: 'translate3d(' + getPageWidth() + 'px, 0px, 0px)',
    up: 'translate3d(0px,-' + getPageHeight() + 'px,  0px)',
    down: 'translate3d(0px,' + getPageHeight() + 'px,  0px)'
})[direction];

const directionOpposite = direction => ({
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up',
})[direction];

const nextTo = (direction) => {
    const sections = isMobile() ? getSectionNodesMobile() : getSectionNodesDesktop();
    const activeSection = sections[sections.length - 1];
    const activeSectionId = Number(activeSection.dataset.pageId);

    let nextSectionId = (activeSectionId + (direction === 'right' || direction === 'up' ? 1 : -1));

    if (nextSectionId < (isMobile() ? 1 : 0)) {
        if (loopSection) {
            nextSectionId = sections.length;
        } else {
            return;
        }
    }
    if (nextSectionId > sections.length - (isMobile() ? 0 : 1)) {
        if (loopSection) {
            nextSectionId = (isMobile() ? 1 : 0);
        } else {
            return;
        }
    }

    const nextSection = getSectionById(nextSectionId);

    (activeSectionId === 0 || nextSectionId === 0)
        ? transformStartSections(activeSection, nextSection, direction)
        : transformSplittedSections(activeSection, nextSection, direction);
};

const jumpTo = nextSectionId => {
    const sections = isMobile() ? getSectionNodesMobile() : getSectionNodesDesktop();
    const activeSection = sections[sections.length - 1];

    const activeSectionId = Number(activeSection.dataset.pageId);
    if (nextSectionId === activeSectionId) {
        return;
    }

    const direction = activeSectionId < nextSectionId ? nextDirection() : prevDirection();
    const nextSection = getSectionById(nextSectionId);
    (activeSectionId === 0 || nextSectionId === 0)
        ? transformStartSections(activeSection, nextSection, direction)
        : transformSplittedSections(activeSection, nextSection, direction);
}

let animationActive = false;

const transformSplittedSections = (activeSection, nextSection, direction) => {
    if (animationActive) {
        return
    }
    animationActive = true;

    new Promise((resolve, reject) => {
        moveSectionInFrontDom(nextSection)
        removeTransitionCss();
        nextSection.querySelector('.topLeft').style.transform = translateDirection(direction)
        nextSection.querySelector('.bottomRight').style.transform = translateDirection(directionOpposite(direction))

        setTimeout(() => {
            addTransitionCss()
            activeSection.querySelector('.topLeft').style.transform = translateDirection(directionOpposite(direction));
            activeSection.querySelector(`.bottomRight`).style.transform = translateDirection(direction);
            nextSection.querySelector('.bottomRight').style.transform = translateDirection('center');
            nextSection.querySelector('.topLeft').style.transform = translateDirection('center');
        }, 10);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            animationActive = false;
            resolve('Animation ended');
        }

        nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
    });
}

const transformStartSections = (activeSection, nextSection, direction) => {
    if (animationActive) {
        return
    }
    animationActive = true;

    console.log('activeSection ', activeSection)
    console.log('nextSection ', nextSection)

    if (direction === 'up') { // when UP means activeSection is StartSection
        new Promise((resolve, reject) => {
            moveSectionInFrontDom(nextSection)
            removeTransitionCss();
            nextSection.querySelector('.topLeft').style.transform = translateDirection(directionOpposite(direction))
            nextSection.querySelector('.bottomRight').style.transform = translateDirection(directionOpposite(direction))

            setTimeout(() => {
                addTransitionCss()
                activeSection.querySelector(`.start-content`).style.transform = translateDirection(direction);
                nextSection.querySelector('.bottomRight').style.transform = translateDirection('center');
                nextSection.querySelector('.topLeft').style.transform = translateDirection('center');
            }, 10);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                animationActive = false;
                resolve('Animation ended');
            }

            nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
        });

    } else {
        new Promise((resolve, reject) => {
            moveSectionInFrontDom(nextSection)
            removeTransitionCss();
            nextSection.querySelector(`.start-content`).style.transform = translateDirection(directionOpposite(direction));

            setTimeout(() => {
                addTransitionCss()
                nextSection.querySelector(`.start-content`).style.transform = translateDirection('center');
                activeSection.querySelector('.bottomRight').style.transform = translateDirection(direction);
                activeSection.querySelector('.topLeft').style.transform = translateDirection(direction);
            }, 10);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                animationActive = false;
                resolve('Animation ended');
            }

            nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
        });
    }

}


function getTransforms(translate3d) {
    return {
        '-webkit-transform': translate3d,
        '-moz-transform': translate3d,
        '-ms-transform': translate3d,
        'transform': translate3d
    };
}


const moveSectionInFrontDom = (nextSection) => {
    const pagesParent = document.querySelector('.pages');
    pagesParent.appendChild(nextSection)
}

const addTransitionCss = () => document.querySelectorAll('.pages section .topLeft, section .bottomRight, section .start-content')
    .forEach(s => s.style.transition = 'all 0.7s ease-out');
const removeTransitionCss = () => document.querySelectorAll('.pages section .topLeft, section .bottomRight')
    .forEach(s => s.style.transition = 'none')

const getSectionById = id => document.querySelector(`[data-page-id="${id}"]`);

let xDown = null;
const getTouches = (evt) => evt.touches || evt.originalEvent.touches;
const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
};
const handleTouchMove = (evt) => {
    if (!xDown) {
        return;
    }
    const xUp = evt.touches[0].clientX;
    const xDiff = xDown - xUp;
    xDiff > 0
        ? setTimeout(() => nextTo(nextDirection()))
        : setTimeout(() => nextTo(prevDirection()));
    xDown = null;
};

document.querySelectorAll('.pages .topLeft')
    .forEach(topLeft => topLeft.addEventListener('touchstart', handleTouchStart, false));
document.querySelectorAll('.pages .topLeft')
    .forEach(topLeft => topLeft.addEventListener('touchmove', handleTouchMove, false));
const checkScrollDirection = (evt) =>
    nextTo(evt.deltaY > 0 ? nextDirection() : prevDirection());
document.querySelectorAll('.pages .topLeft')
    .forEach(topLeft => topLeft.addEventListener('wheel', checkScrollDirection, false));

const getArrowKeyDirection = (keyCode) =>
    ({
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down'
    })[keyCode];

document.addEventListener('keydown', event => {
    const direction = getArrowKeyDirection(event.code)
    if (direction) {
        (direction === 'right' || direction === 'up')
            ? nextTo(nextDirection())
            : nextTo(prevDirection())
    }
})

const init = () => {
    // placingSections()
}
init()
