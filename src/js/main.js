

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
const deadline = '2025-03-06T10:47:00';






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
        days = Math.floor( t / (1000 * 60 * 60 * 24) ),
        hours = Math.floor( (t / (1000 * 60 * 60) ) % 24 ),
        minutes = Math.floor( (t / (1000 * 60)) % 60 ),
        seconds = Math.floor ((t / 1000) % 60)
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
        return num
    }
};

function setClock (selector, endtime) {
    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds');
    const timerId = setInterval(updateClock, 1000);
    updateClock();
    function updateClock () {
        const t = getTimeRemaining(endtime);
        days.innerHTML = `<span>${getZero(t.days)}</span> дней`;
        hours.innerHTML = `<span>${getZero(t.hours)}</span> часов`;
        minutes.innerHTML = `<span>${getZero(t.minutes)}</span> минут`;
        seconds.innerHTML = `<span>${getZero(t.seconds)}</span> секунд`;

        if (t.total <= 0) {
            clearInterval(timerId);
        }
    }


}





function openModal () {
    modal.classList.add('modal__active');
    clearInterval(modalTimerId);
};

function closeModal () {
    modal.classList.remove('modal__active');

};



document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        closeModal();
    } 
})
modal.addEventListener('click', (e) => {
    e.preventDefault();
    target = e.target.className;
    if (target === 'modal__close' || target === 'modal__overlay') {
        closeModal();
    }
})

modalToggle.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    })
})


function openModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal();
        window.removeEventListener('scroll', openModalByScroll);

    };
};


// window.addEventListener('scroll', openModalByScroll);

// const modalTimerId = setTimeout(openModal, 3000);





class Menu {
    constructor (src, alt, sub, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.sub = sub;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
    }


    render () {
        const element = document.createElement('div');
        element.classList.add('menu__field-item');
        element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}" class="menu__field-item-img">
            <div class="menu__field-item-subtitle">${this.sub}</div>
            <div class="menu__field-item-descr">${this.descr}</div>
            <div class="menu__field-item-divider"></div>
            <div class="menu__field-item-price">
                <div>Цена:</div>
                <div class="menu__field-item-total"><span>${this.price}</span> р / день</div>
            </div>
        `;

        this.parent.append(element);
    }


}


// new Menu(
//     './img/tabs/vegy.jpg',
//     'vegy',
//     `Меню "Фитнес"`,
//     `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
//      Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качествома`,
//      700,
//      '.menu__field'
// ).render()








// class Menu {
//     constructor (src, alt, subtitle, description, price, parentSelector, ...classes) {
//         this.src = src;
//         this.alt = alt;
//         this.subtitle = subtitle;
//         this.description = description;
//         this.price = price;
//         this.classes = classes;
//         this.parent = document.querySelector(parentSelector);
//     }



//     render () {
//         const element = document.createElement('div');
//         if (this.classes.length === 0) {
//             element.classList.add('menu__field-item')
//         } else {
//             this.classes.forEach(className => element.classList.add(className))
//         };
//         element.innerHTML = `
//             <img src="${this.src}" alt="${this.alt}" class="menu__field-item-img">
//             <div class="menu__field-item-subtitle">${this.subtitle}</div>
//             <div class="menu__field-item-descr">${this.description}</div>
//             <div class="menu__field-item-divider"></div>
//             <div class="menu__field-item-price">
//                 <div>Цена:</div>
//                 <div class="menu__field-item-total"><span>${this.price}</span> р/день</div>                
//             </div>`

//         this.parent.append(element);
//     }
// };



//     new Menu('./img/tabs/vegy.jpg',
//         'vegy',
//         'Меню "Фитнес',
//         `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
//         Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качествома`,
//         700,
//         '.menu__field',
//         'menu__field-item'
//     ).render();







setClock('.promotion__timer', deadline);
switchPreviewMeals();
hamburgerToggle();

