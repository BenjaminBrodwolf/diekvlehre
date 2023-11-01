let turnaroundToggle = false;
const turnaroundElement = document.querySelector('.turnaround');
setInterval(() => {
    turnaroundElement.style.transform = turnaroundToggle ? 'rotateY(0deg)' : 'rotateY(180deg)';
        turnaroundToggle = !turnaroundToggle;
    }, 3000)