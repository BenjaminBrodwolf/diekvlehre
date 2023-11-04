let turnaroundToggle = false;
const turnaroundElement = document.querySelector('.turnaround');
setInterval(() => {
    turnaroundElement.style.transform = turnaroundToggle ? 'rotateY(0deg)' : 'rotateY(180deg)';
    turnaroundToggle = !turnaroundToggle;
}, 3000)


const edus = ['efz', 'eba', 'bam']
const eduParents = document.querySelectorAll('.efz, .eba, .bam');
const buttons = document.querySelectorAll('.educationChoices button');
const contents = document.querySelectorAll('.efzContent, .ebaContent, .bamContent')

eduParents.forEach((ele,index) =>
    ele.addEventListener('click', () => {
        eduParents.forEach(e => e.classList.remove('active'));
        ele.classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        contents[index].classList.add('active');
    }))