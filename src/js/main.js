

const hamburger = document.querySelector('.hamburger');
const hamburger__toggle = document.querySelector('.hamburger__toggle');
const hamburger__inner = document.querySelector('.hamburger__inner');
const hamburger__line = document.querySelectorAll('.hamburger__line');
let hamburger_toggle_classList = hamburger__toggle.classList;
const previewListItem = document.querySelectorAll('.preview__list-item');
const previewMeals = document.querySelectorAll('.preview__meals');
const modal = document.querySelector('.modal');
const modalToggle = document.querySelectorAll('[data-modal]');
const modalClose = document.querySelector('.modal__close');
const deadline = '2025-02-26T09:22:30';

modalToggle.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('modal__active');
    })
})


modal.addEventListener('click', (e) => {
    if (e.target.className === 'modal__overlay' || e.target.className === 'modal__close') {
        modal.classList.remove('modal__active');
    }
})



function hamburgerToggle () {
    hamburger__toggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (hamburger_toggle_classList.contains('hamburger__toggle-active')) {
            hamburger__inner.classList.remove('hamburger__inner-active');
            hamburger__line.forEach(item => item.classList.remove('hamburger__line-active'));
            hamburger__toggle.classList.remove('hamburger__toggle-active');
            
        }
        else {
            hamburger__inner.classList.add('hamburger__inner-active');
            hamburger__line.forEach(item => item.classList.add('hamburger__line-active'));
            hamburger__toggle.classList.add('hamburger__toggle-active');
        }
    
    
    })
};


function switchPreviewMeals () {
   
    previewListItem.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            previewListItem.forEach(item => item.classList.remove('preview__list-item-active'))
            previewListItem[index].classList.add('preview__list-item-active');
            previewMeals.forEach(item => item.classList.remove('preview__meals-active'));
            previewMeals[index].classList.add('preview__meals-active');
        })
    })

}




function getTimeRemaining (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds; 
    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / 1000 * 60 * 60) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    };

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};



function getZero (num) {
    if (num < 10) {
        return `0${num}`
    } else {
        return num;
    }
}


function setClock (selector, endtime) {
    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timerId = setInterval(updateClock, 1000);


    function updateClock () {
        const t = getTimeRemaining(endtime);
        days.innerHTML = `<span>${getZero(t.days)}</span> дней`;
        hours.innerHTML = `<span>${getZero(t.hours)}</span> часов`;
        minutes.innerHTML = `<span>${getZero(t.minutes)}</span> минут`;
        seconds.innerHTML = `<span>${getZero(t.seconds)}</span> секунд`
    }
};

















setClock('.promotion__timer', deadline);
hamburgerToggle();
switchPreviewMeals();
