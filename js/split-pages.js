const mobileBreakpoint = 768;
const loopSection = false;


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
const setActiveNavClass = sectionId => {
    document.querySelectorAll('header .header-nav')
        .forEach(nav => nav.classList.remove('active'));
    document.querySelector(`.header-id-${sectionId}`).classList.add('active')
}

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
        ? transformStartSections(activeSection, nextSection, direction, nextSectionId)
        : transformSplitSections(activeSection, nextSection, direction, nextSectionId);
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
        ? transformStartSections(activeSection, nextSection, direction, nextSectionId)
        : transformSplitSections(activeSection, nextSection, direction,nextSectionId);

}

let animationActive = false;

const setTransforms = (element, direction) => {
    element.style.WebkitTransform = translateDirection(direction);
    element.style.transform = translateDirection(direction);
    element.style.MozTransform = translateDirection(direction);
    element.style.OTransform = translateDirection(direction);
    element.style.msTransform = translateDirection(direction);
}

const chevrons = document.querySelectorAll('.chevron');
const slideChevron = ({
    in: () => {
        chevrons.forEach(c => c.classList.add('chevron-slide-in'));
        setTimeout(() => {
            chevrons.forEach(c => c.classList.remove('chevron-slide-in'))
        }, 1100)
    },
    out: () => {
        chevrons.forEach(c => c.classList.add('chevron-slide-out'));
        setTimeout(() => {
            chevrons.forEach(c => c.classList.remove('chevron-slide-out'))
        }, 800)
    }
})

const transformSplitSections = (activeSection, nextSection, direction, nextSectionId) => {
    if (animationActive) {
        return
    }
    animationActive = true;
    slideChevron.out()
    setActiveNavClass(nextSectionId);

    new Promise((resolve, reject) => {
        moveSectionInFrontDom(nextSection)
        removeTransitionCss();
        setTransforms(nextSection.querySelector('.topLeft'), direction)
        setTransforms(nextSection.querySelector('.bottomRight'), directionOpposite(direction))

        setTimeout(() => {
            addTransitionCss()
            setTransforms(activeSection.querySelector('.topLeft'), directionOpposite(direction))
            setTransforms(activeSection.querySelector('.bottomRight'), direction)
            setTransforms(nextSection.querySelector('.topLeft'), 'center')
            setTransforms(nextSection.querySelector('.bottomRight'), 'center')
        }, 10);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            animationActive = false;
            slideChevron.in()
            resolve('Animation ended');
        }

        nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
    });
}

const transformStartSections = (activeSection, nextSection, direction, nextSectionId) => {
    if (animationActive) {
        return
    }
    animationActive = true;
    slideChevron.out()
    setActiveNavClass(nextSectionId);

    if (direction === 'up') { // when UP means activeSection is StartSection
        new Promise((resolve, reject) => {
            moveSectionInFrontDom(nextSection)
            removeTransitionCss();
            setTransforms(nextSection.querySelector('.topLeft'), directionOpposite(direction))
            setTransforms(nextSection.querySelector('.bottomRight'), directionOpposite(direction))

            setTimeout(() => {
                addTransitionCss()
                setTransforms(activeSection.querySelector('.start-content'), direction)
                setTransforms(nextSection.querySelector('.topLeft'), 'center')
                setTransforms(nextSection.querySelector('.bottomRight'), 'center')
            }, 10);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                animationActive = false;
                slideChevron.in()
                resolve('Animation ended');
            }

            nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
        });

    } else {
        new Promise((resolve, reject) => {
            moveSectionInFrontDom(nextSection)
            removeTransitionCss();
            setTransforms(nextSection.querySelector('.start-content'), directionOpposite(direction));

            setTimeout(() => {
                addTransitionCss()
                setTransforms(nextSection.querySelector('.start-content'), 'center');
                setTransforms(activeSection.querySelector('.topLeft'),     direction)
                setTransforms(activeSection.querySelector('.bottomRight'), direction)
            }, 10);

            function handleAnimationEnd(event) {
                event.stopPropagation();
                animationActive = false;
                slideChevron.in()
                resolve('Animation ended');
            }

            nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
        });
    }

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
}

const topLeftElements = () => document.querySelectorAll('.pages .topLeft');
const bottomRightElements = () => document.querySelectorAll('.pages .bottomRight');

topLeftElements().forEach(topLeft => topLeft.addEventListener('touchstart', handleTouchStart, false));
topLeftElements().forEach(topLeft => topLeft.addEventListener('touchmove', handleTouchMove, false));
const checkScrollDirection = (evt) =>
    nextTo(evt.deltaY > 0 ? nextDirection() : prevDirection());
document.querySelectorAll('.pages .topLeft, .start-content')
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

const touchTopLeftMobile = (event) => {
    event.preventDefault()


    if (isMobile()){
        console.log('top')
        topLeftElements().forEach(e => e.style.height = '50%');
        bottomRightElements().forEach(e => e.style.height = '50%');
    }
}

const touchBottomRightMobile = (event) => {
    // event.preventDefault()

    if (isMobile()){
        console.log('bottom' )
        topLeftElements().forEach(e => e.style.height = '25%');
        bottomRightElements().forEach(e => e.style.height = '75%');


    }
}


topLeftElements().forEach(topLeft =>
    topLeft.addEventListener('touchstart', touchTopLeftMobile));
bottomRightElements().forEach(bottomRight =>
    bottomRight.addEventListener('touchstart', touchBottomRightMobile));

new ResizeObserver(entries => {
    const screenWidth = entries[0].contentRect.width;
    if (screenWidth >= mobileBreakpoint) {
        topLeftElements().forEach(e =>     e.style.setProperty('height', '100%'));
        bottomRightElements().forEach(e => e.style.setProperty('height', '100%'));
    } else {
        topLeftElements().forEach(e =>     e.style.setProperty('height', '50%'))
        bottomRightElements().forEach(e => e.style.setProperty('height', '50%'))
    }
}).observe(document.body)

const init = () => {
    // placingSections()
}
init()
