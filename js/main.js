let turnaroundToggle = false;
const turnaroundElement = document.querySelector('.turnaround');
setInterval(() => {
    turnaroundElement.style.transform = turnaroundToggle ? 'rotateY(0deg)' : 'rotateY(180deg)';
    turnaroundToggle = !turnaroundToggle;
}, 3000)


const edus = ['efz', 'eba', 'bam']
const eduParents = document.querySelectorAll('.efz, .eba, .bam');
console.log(eduParents)
const buttons = document.querySelectorAll('.educationChoices button');
console.log(buttons)

const contents = document.querySelectorAll('.efzContent, .ebaContent, .bamContent')
console.log(contents)

buttons.forEach((btn,index) =>
    btn.addEventListener('click', () => {
        eduParents.forEach(e => e.classList.remove('active'));
        eduParents[index].classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        contents[index].classList.add('active');
    }))