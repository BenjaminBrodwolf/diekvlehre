
const turnaroundElement = document.querySelector('.turnaround');
setInterval(() => {
  turnaroundElement.classList.toggle('turnaround-logo');
}, 3000)

const eduParents = document.querySelectorAll('.efz, .eba, .bam');
const buttons = document.querySelectorAll('.educationChoices button');
const contents = document.querySelectorAll('.efzContent, .ebaContent, .bamContent')
const educationParentScrollElement = document.querySelector('[data-page-id="2"] .bottomRight');

eduParents.forEach((ele, index) =>
  ele.addEventListener('click', () => {
    eduParents.forEach(e => e.classList.remove('active'));
    ele.classList.add('active');
    contents.forEach(c => c.classList.remove('active'));
    contents[index].classList.add('active');
    educationParentScrollElement.scrollTo({top: 550, behavior: 'smooth'})
  }))


// PWA installation
const installBtnLine = document.querySelector('.installBtnLine');
const installBtn = document.querySelector('#installAppBtn');
const isStandAlone = () => {
  // if web app is already installed to home screen
  return window.navigator.standalone || // IOS
    window.matchMedia('(display-mode: standalone)').matches; // Android
}


export const isBrowserIOS = () => navigator.userAgent.match(/iPhone|iPad|iPod/) || window.navigator.userAgent.match(/Safari/) || (navigator.userAgent.match(/CriOS/) || window.navigator.userAgent.match(/FxiOS/) || window.navigator.userAgent.match(/FBAN|FBAV/))
const isAndroid = () =>  Boolean(navigator.userAgent.match(/Android/));
const isChrome = () => Boolean(navigator.userAgent.match(/Chrome/))
const isAndroidChrome = () => isAndroid() && isChrome();

let deferredPrompt;

if (isStandAlone()) {
  installBtn.style.display = 'none';
  installBtnLine.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event
//installBtn.style.display = 'block';
});

window.addEventListener('appinstalled', () => {
  installBtn.style.display = 'none';
  installBtnLine.style.display = 'none';
  deferredPrompt = null;
  console.log('PWA was installed');
});

installBtn.addEventListener('click', event => {
  // event.preventDefault();

  if (isAndroidChrome() || isChrome()) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('user accepted the prompt')
      }
      deferredPrompt = null;
    })
  } else {
    setTimeout(() =>
      window.AddToHomeScreenInstance.show() // only shown if web app is not already added to homescreen
    )
  }
})
