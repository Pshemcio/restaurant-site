window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', scrollEvents);
    window.addEventListener('resize', checkResize);

    mainNav.addEventListener('click', handleBurgerMenu);
});

const mainNav = document.getElementById('main-nav');
const burgerBtn = mainNav.querySelector('.burger-btn');
let initialNavHeight = getComputedStyle(document.documentElement).getPropertyValue('--logo-size');
const parallaxBg = document.querySelector('.parallax-bg');

const handleBurgerMenu = e => {
    if (!mainNav.classList.contains('menu-active') && !e.target.classList.contains('burger-btn')) {
        return;
    };

    mainNav.classList.toggle('menu-active');
};

const shrinkNavbar = () => {
    const parsedNavHeight = parseInt(initialNavHeight);
    if (window.innerWidth < 992) {
        return;
    };

    if (window.scrollY > 50) {
        document.documentElement.style.setProperty('--logo-size', `${parsedNavHeight / 2}rem`);
    } else {
        document.documentElement.style.setProperty('--logo-size', initialNavHeight);
    };
};

const checkResize = () => {
    initialNavHeight = getComputedStyle(document.documentElement).getPropertyValue('--logo-size');
};

const getElementYOffset = (element) => {
    const scrollOnWindow =
        window.pageYOffset !== undefined
            ? window.pageYOffset
            : (document.documentElement || document.body.parentNode || document.body)
                .scrollTop;
    const rect = element.getBoundingClientRect();
    let distanceFromTopOfPage = rect.top;
    if (scrollOnWindow !== 0) {
        distanceFromTopOfPage = rect.top + scrollOnWindow;
    }

    return distanceFromTopOfPage;
};

const parallaxEffect = (section) => {
    if (section === null) {
        return;
    }

    const parallaxInitialScroll = section.getBoundingClientRect().top - window.outerHeight;
    const parallaxFinishScroll = section.getBoundingClientRect().bottom;
    const test = getElementYOffset(section) - window.outerHeight;

    if (parallaxInitialScroll > 0 || parallaxFinishScroll < 0) {
        return;
    }

    section.style.backgroundPositionY = `${100 - (window.scrollY - test) / 10}%`;
};

const scrollEvents = () => {
    shrinkNavbar();
    parallaxEffect(parallaxBg);
};

// smooth scrolling for browsers that doesn't support it

const scrollToSection = event => {
    if (supportsSmoothScrolling()) {
        return;
    }

    event.preventDefault();
    const targetSection = event.target.hash.substring(1);
    const scrollToElem = document.getElementById(targetSection);
    SmoothVerticalScrolling(scrollToElem, 400);
}

const supportsSmoothScrolling = () => {
    const body = document.body;
    const scrollSave = body.style.scrollBehavior;
    body.style.scrollBehavior = 'smooth';
    const hasSmooth = getComputedStyle(body).scrollBehavior === 'smooth';
    body.style.scrollBehavior = scrollSave;
    return hasSmooth;
};

const SmoothVerticalScrolling = (element, time) => {
    const eTop = element.getBoundingClientRect().top;
    const eAmt = eTop / 100;
    let curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt);
        curTime += time / 100;
    }
}

const SVS_B = eAmt => window.scrollBy(0, eAmt);