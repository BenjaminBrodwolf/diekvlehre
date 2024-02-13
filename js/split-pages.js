import {Locations, LocationsById, trackButtonClick, trackPageView} from './trackingService.js'

const mobileBreakpoint = 768;
let loopSection = false;

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
  document.querySelectorAll('.header-nav, .sidebar-nav')
    .forEach(nav => nav.classList.remove('active'));
  document.querySelectorAll(`.header-id-${sectionId}`).forEach(h => h.classList.add('active'));
}
const sidebarCheckbox = document.querySelector('.hamburger .checkbox');
document.querySelectorAll('.header-nav, .sidebar-nav')
  .forEach((nav, index) => {
    const sectionId = index >= 6 ? ++index % 6 : index;
    nav.addEventListener('click', () => {
      sidebarCheckbox.checked = false;
      trackButtonClick('nav-' + LocationsById[sectionId], LocationsById[document.body.dataset.activePageId]);
      jumpTo(sectionId);
    });

  })

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
    : transformSplitSections(activeSection, nextSection, direction, nextSectionId);

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

const setActivePageIdToBody = id => document.body.dataset.activePageId = id.toString();

const transformSplitSections = (activeSection, nextSection, direction, nextSectionId) => {
  if (animationActive) {
    return
  }
  animationActive = true;
  slideChevron.out()
  setActiveNavClass(nextSectionId);
  setActivePageIdToBody(nextSectionId);

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
      slideChevron.in();
      trackPageView(LocationsById[nextSectionId]);
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
  setActivePageIdToBody(nextSectionId);

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
        slideChevron.in();
        trackPageView(LocationsById[nextSectionId]);
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
        setTransforms(activeSection.querySelector('.topLeft'), direction)
        setTransforms(activeSection.querySelector('.bottomRight'), direction)
      }, 10);

      function handleAnimationEnd(event) {
        event.stopPropagation();
        animationActive = false;
        slideChevron.in();
        trackPageView(LocationsById[nextSectionId])
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

topLeftElements().forEach(topLeft =>
  topLeft.addEventListener('touchstart', handleTouchStart, {passive: true}));
topLeftElements().forEach(topLeft =>
  topLeft.addEventListener('touchmove', handleTouchMove, {passive: true}));
const checkScrollDirection = (evt) =>
  nextTo(evt.deltaY > 0 ? nextDirection() : prevDirection());
document.querySelectorAll('.pages .topLeft, .start-content')
  .forEach(topLeft => topLeft.addEventListener('wheel', checkScrollDirection, {passive: true}));

const getArrowKeyDirection = (keyCode) =>
  ({
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'down',
    ArrowDown: 'up'
  })[keyCode];

document.addEventListener('keydown', event => {
  const direction = getArrowKeyDirection(event.code)
  if (direction) {
    (direction === 'right' || direction === 'up')
      ? nextTo(nextDirection())
      : nextTo(prevDirection())
  }
});

document.querySelectorAll('.iconsNav').forEach((navs) => {
  for (let i = 0; i < navs.children.length; i++) {
    navs.children[i].addEventListener('click', () => {
      trackButtonClick('icon-' + LocationsById[i+1], LocationsById[document.body.dataset.activePageId])
      jumpTo(i+1)
    })
  }
})

const touchTopLeftMobile = (event) => {
  if (isMobile()) {
    topLeftElements().forEach(e => e.style.height = '50%');
    bottomRightElements().forEach(e => e.style.height = '50%');
    document.body.classList.remove('chevronTopPosition')
  }
}

const touchBottomRightMobile = (event) => {
  if (isMobile()) {
    topLeftElements().forEach(e => e.style.height = '25%');
    bottomRightElements().forEach(e => e.style.height = '75%');
    document.body.classList.add('chevronTopPosition')
  }
}

topLeftElements().forEach(topLeft =>
  topLeft.addEventListener('touchstart', touchTopLeftMobile, {passive: true}));
bottomRightElements().forEach(bottomRight =>
  bottomRight.addEventListener('touchstart', touchBottomRightMobile, {passive: true}));

new ResizeObserver(entries => {
  const screenWidth = entries[0].contentRect.width;
  if (screenWidth >= mobileBreakpoint) {
    topLeftElements().forEach(e => e.style.setProperty('height', '100%'));
    bottomRightElements().forEach(e => e.style.setProperty('height', '100%'));
  } else {
    topLeftElements().forEach(e => e.style.setProperty('height', '50%'))
    bottomRightElements().forEach(e => e.style.setProperty('height', '50%'))
  }
}).observe(document.body)


document.querySelector('[data-i18n="jetzt_bewerben"]').addEventListener('click', () => {
  trackButtonClick('jetzt_bewerben', LocationsById[document.body.dataset.activePageId])
  jumpTo(1)
});
document.querySelector('[data-i18n="bewirb_dich_jetzt"]').addEventListener('click', () => {
  trackButtonClick('bewirb_dich_jetzt', LocationsById[document.body.dataset.activePageId])
  jumpTo(1)
});
document.querySelector('.prevChevron').addEventListener('click', () => {
  trackButtonClick('prev-chevron', LocationsById[document.body.dataset.activePageId])
  nextTo(prevDirection())
});
document.querySelector('.nextChevron').addEventListener('click', () => {
  trackButtonClick('next-chevron', LocationsById[document.body.dataset.activePageId])
  nextTo(nextDirection())
});


const init = () => {
  document.body.dataset.activePageId = isMobile() ? '1' : '0';
  trackPageView(Locations.START)
}
init()

// SMTP.js
const PW = 'A0C745F12404E87F117E81BD1B52E8D8319C'
const token = '4d245dd1-06a8-4838-ac4b-30c1a1748b04'

const formularOptions = {
  schnuppertag: {
    1: '13.3.2024, 14:00 Uhr - 17:00 Uhr, 6883 Novazzano',
    2: '20.3.2024, 14:00 Uhr - 17:00 Uhr, 4000 Basel',
    3: '20.3.2024, 14:00 Uhr - 17:00 Uhr, 6830 Chiasso',
    4: '10.4.2024, 14:00 Uhr - 17:00 Uhr, Diverse Orte',
    5: '10.4.2024, 14:00 Uhr - 17:00 Uhr, 6828 Balerna',
    6: '17.4.2024, 14:00 Uhr - 17:00 Uhr, 6855 Stabio',
  },
  nachname: 'Nachname',
  vorname: 'Vorname',
  adresse: 'Adresse',
  plz: 'PLZ',
  ort: 'Ort',
  email: 'E-Mail',
  tel: 'Telefonnummer'
}

const getFormValue = elements => option => `<tr><td>${formularOptions[option]}</td><td>${elements[option].value}</td></tr>`;

// mailomat
const mailomatToken = '3e0df54a-0e18-4d49-9b6f-7b6725413fd0';
const mailomatTokenSMTP = '36fccca7-a659-4f4d-aa9b-37ad5af8efca';
document.querySelector('#sniffForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const elements = e.target.elements;
  const schnuppertag = `<tr><td>Datum/Ort:</td> <td>${formularOptions.schnuppertag[elements.schnuppertag.value]}</td><tr>`
  const values = ['nachname', 'vorname', 'adresse', 'plz', 'ort', 'email', 'tel'].map(getFormValue(elements)).join(' ');
  const html = '<p>Es ist eine Schnupper-Anmeldung auf schnupper.diekvlehre.ch eingegangen.</p><hr><table><tbody> ' + schnuppertag + ' ' + values + '</tbody></table><hr>';
  const subject = `Neue Schnupper-Anmeldung: ${elements.vorname.value} ${elements.nachname.value}`;
  const postData =
    {
      "from": "schnuppern@diekvlehre.ch",
      "to": ["benjamin.brodwolf@outlook.com"],
      subject,
      html
    }
  sendMailomat(postData);
})


const sendMailomat = (postData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${mailomatToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  };

  fetch('https://api.mailomat.swiss/v0.1/message', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fehler bei der Anfrage: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Erfolgreiche Antwort:', data);
      document.querySelector('#submittedSuccessMessage').style.visibility = 'visible';
      document.querySelector('#sniffForm').style.display = 'none';
    })
    .catch(error => {
      console.error('Fehler beim Senden der Anfrage:', error);
      document.querySelector('#submittedErrorMessage').style.visibility = 'visible';
      document.querySelector('#sniffForm').style.display = 'none';
    });
}


export const sendMail = () => {
  console.log('SEND MAIL')
  Email.send({
    Host: "smtp.sui-inter.net",
    Username: "schnuppern@diekvlehre.ch",
    Password: "spedlogswiss",
    To: 'benjamin.brodwolf@outlook.com',
    From: "schnuppern@diekvlehre.ch",
    Subject: "Schnuppern Spedlogswiss",
    Body: "Test inhalt"
  }).then(
    message => {
      console.log(message)
      alert(message)
    }
  );
  /*
    Email.send({
      SecureToken : token,
      To : 'benjamin.brodwolf@outlook.com',
      From : "schnuppern@diekvlehre.ch",
      Subject : "Schnuppern Spedlogswiss",
      Body : "And this is the body test"
    }).then(
      message => alert(message)
    );

   */
}

