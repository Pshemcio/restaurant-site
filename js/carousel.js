// reinventing the wheel mainly for learning purposes :)

document.addEventListener('DOMContentLoaded', () => {
    carouselIntervalManager(true);
    carousel.addEventListener('click', handleCarouselBtnClick);

    window.addEventListener('resize', () => {
        $carouselItemsQuantity = getComputedStyle(document.documentElement)
            .getPropertyValue('--carousel-quantity');
    });
});

const carousel = document.querySelector('.carousel');
const carouselItems = carousel.querySelector('.carousel-items');
const carouselControls = carousel.querySelector('.carousel-controls');

//object that holds global variables
const carouselNamespaceObject = {
    $carouselItemsQuantity: getComputedStyle(document.documentElement)
        .getPropertyValue('--carousel-quantity'),
    $carouselInterval: null
};

let { $carouselItemsQuantity, $carouselInterval } = carouselNamespaceObject;

const carouselIntervalManager = flag => {
    if (flag) {
        $carouselInterval = setInterval(() => {
            const firstItem = carouselItems.querySelector('img:first-of-type');
            moveCarousel((-100), firstItem, false);
        }, 5000);
    } else {
        clearInterval($carouselInterval);
    };
};

const moveCarousel = (direction, item, flag, btn) => {
    carouselItems.style.transform = `translateX(${direction / $carouselItemsQuantity}vw)`;

    setTimeout(() => {
        carouselItems.classList.toggle('transition-off');
        carouselItems.style.transform = `translateX(0vw)`;

        const clonedElement = item.cloneNode(true);
        item.remove();

        if (flag === false) {
            carouselItems.appendChild(clonedElement);
        } else {
            carouselItems.insertBefore(clonedElement, carouselItems.firstChild);
        };

        setTimeout(() => {
            carouselItems.classList.toggle('transition-off');
            if (btn !== undefined) {
                carouselControls.classList.remove('pointer-none');
            };
        }, 20);
    }, 1000);
};

const handleCarouselBtnClick = btn => {
    carouselIntervalManager(false);

    if (btn.target.nodeName !== 'BUTTON' || carouselControls.classList.contains('pointer-none')) {
        return;
    };

    const firstItem = carouselItems.querySelector('img:first-of-type');
    const lastItem = carouselItems.querySelector('img:last-of-type');

    carouselControls.classList.add('pointer-none');

    if (btn.target.classList.contains('left')) {
        console.log('lewo');
        moveCarousel(100, lastItem, true, btn.target);
    } else {
        console.log('prawo');
        moveCarousel(-100, firstItem, false, btn.target);
    };

    carouselIntervalManager(true);
};