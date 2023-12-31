const turnaroundElement = document.querySelector('.turnaround');
setInterval(() => {
    turnaroundElement.classList.toggle('turnaround-logo');
}, 3000)

const eduParents = document.querySelectorAll('.efz, .eba, .bam');
const buttons = document.querySelectorAll('.educationChoices button');
const contents = document.querySelectorAll('.efzContent, .ebaContent, .bamContent')
const educationParentScrollElement = document.querySelector('[data-page-id="2"] .bottomRight');

eduParents.forEach((ele,index) =>
    ele.addEventListener('click', () => {
        eduParents.forEach(e => e.classList.remove('active'));
        ele.classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        contents[index].classList.add('active');
        educationParentScrollElement.scrollTo({top: 550, behavior: 'smooth'})
    }))

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}