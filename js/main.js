console.log(screen.width)
console.log(window.innerWidth)
console.log(window.outerWidth)

const mobileBreakpoint = 768;
const isMobile = () => window.innerWidth < mobileBreakpoint;

const getPageWidth = () => document.querySelector('.pages').clientWidth
const translateDirection = direction => ({
  center: 'translate3d(0px, 0px, 0px)',
  left: 'translate3d(-' + getPageWidth() + 'px, 0px, 0px)',
  right: 'translate3d(' + getPageWidth() + 'px, 0px, 0px)',
  up: 'translate3d(0px,-' + window.innerHeight + 'px,  0px)',
  down: 'translate3d(0px,' + window.innerHeight + 'px,  0px)'
})[direction];

const directionOpposite = direction => ({
  left: 'right',
  right: 'left'
})[direction];

const nextTo = (direction) => {
  const sections = getSectionNodes();
  const activeSection = sections[sections.length - 1];
  const activeSectionId = Number(activeSection.dataset.pageId)

  let nextId = (activeSectionId + (direction === 'right' ? 1 : -1))

  if (nextId < 0) {
    nextId = sections.length - 1
  }
  if (nextId > sections.length - 1) {
    nextId = 0;
  }

  const nextSection = getSectionById(nextId);
  transformSections(activeSection, nextSection, direction)
};

const jumpTo = nextSectionId => {
  const sections = getSectionNodes();
  const activeSection = sections[sections.length - 1];

  const activeSectionId = activeSection.dataset.pageId;
  if (nextSectionId.toString() === activeSectionId) {
    return;
  }

  const direction = activeSectionId < nextSectionId ? 'right' : 'left';
  const nextSection = getSectionById(nextSectionId);
  transformSections(activeSection, nextSection, direction)
}

let animationActive = false;
const transformSections = (activeSection, nextSection, direction) => {

  if (animationActive) {
    return
  }
  new Promise((resolve, reject) => {
    animationActive = true;
    moveSectionInFrontDom(nextSection)
    removeTransitionCss();
    nextSection.querySelector('.topLeft').style.transform = translateDirection(direction)
    nextSection.querySelector('.bottomRight').style.transform = translateDirection(directionOpposite(direction))

    setTimeout(() => {
      addTransitionCss()
      activeSection.querySelector('.topLeft').style.transform = translateDirection(directionOpposite(direction));
      activeSection.querySelector(`.bottomRight`).style.transform = translateDirection(direction);

      nextSection.querySelector('.bottomRight').style.transform = translateDirection('center')
      nextSection.querySelector('.topLeft').style.transform = translateDirection('center')
    });

    function handleAnimationEnd(event) {
      event.stopPropagation();
      console.log("animation end")
      animationActive = false;
      resolve('Animation ended');
    }

    nextSection.addEventListener('transitionend', handleAnimationEnd, {once: true});
  });
}

function getTransforms(translate3d) {
  return {
    '-webkit-transform': translate3d,
    '-moz-transform': translate3d,
    '-ms-transform': translate3d,
    'transform': translate3d
  };
}

const getSectionNodes = () => document.querySelectorAll('.pages section');

const moveSectionInFrontDom = (nextSection) => {
  const pagesParent = document.querySelector('.pages');
  pagesParent.appendChild(nextSection)
}

const addTransitionCss = () => document.querySelectorAll('section .topLeft, section .bottomRight')
  .forEach(s => s.style.transition = 'all 0.7s ease-out');
const removeTransitionCss = () => document.querySelectorAll('section .topLeft, section .bottomRight')
  .forEach(s => s.style.transition = 'none')

const getSectionById = id => document.querySelector(`[data-page-id="${id}"]`);

const prev = () => {
  // console.log('left ')
  // animateSection(current, to, 'right', 'left')
  nextTo('left');
}

const next = () => {
  // console.log('right ')
  // animateSection(current, to, 'left', 'right')
  nextTo('right');
}


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

  if (xDiff > 0) {
    console.log('right touch')
    setTimeout(next);
  } else {
    console.log('left touch')
    setTimeout(prev);
  }

  xDown = null;
};


document.querySelectorAll('.pages .topLeft').forEach(topLeft => topLeft.addEventListener('touchstart', handleTouchStart, false));
document.querySelectorAll('.pages .topLeft').forEach(topLeft => topLeft.addEventListener('touchmove', handleTouchMove, false));

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
    nextTo(direction)
  }
})

const init = () => {
  // placingSections()
}
init()
