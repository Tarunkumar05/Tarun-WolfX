// Services Text Transition Functions
function generateServicesTextElements() {
    const servicesTextContainer = document.querySelector('.services-text-container');
    const totalTextElements = 49;
    
    servicesTextContainer.innerHTML = '';
    for (let i = 0; i < totalTextElements; i++) {
        const textElement = document.createElement('div');
        textElement.classList.add('transition-text');
        textElement.style.zIndex = totalTextElements - i;
        textElement.setAttribute('aria-hidden', 'true');
        textElement.textContent = 'Services';
        servicesTextContainer.appendChild(textElement);
    }
}

// Dynamically adjusts font size based on screen width
function updateServicesTextResponsiveFontSize() {
    const desktopReferenceWidth = 1920;
    const desktopReferenceFontSize = 120;
    const mobileReferenceFontSize = 360;

    const currentScreenWidth = window.innerWidth;
    const calculatedFontSize = currentScreenWidth < 768 
        ? mobileReferenceFontSize 
        : (currentScreenWidth / desktopReferenceWidth) * desktopReferenceFontSize;

    const servicesTextElements = document.querySelectorAll('.services-text-container .transition-text');
    servicesTextElements.forEach(textElement => {
        textElement.style.fontSize = `${calculatedFontSize}px`;
    });
}

// Background Interactive Function
function setupBackgroundInteractiveEffect() {
    const backgroundSection = document.querySelector('.about-us');
    if (!backgroundSection) return;

    const handleMouseMovementEffect = (event) => {
        const { clientX: mousePositionX, clientY: mousePositionY } = event;
        const horizontalPercentage = (mousePositionX / window.innerWidth) * 100;
        const verticalPercentage = (mousePositionY / window.innerHeight) * 100;

        backgroundSection.style.backgroundImage = `
            linear-gradient(rgba(255, 255, 255, 0.4) 0.05rem, transparent 0.05rem), 
            linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0.05rem, transparent 0.05rem), 
            radial-gradient(circle at ${horizontalPercentage}% ${verticalPercentage}%, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0, 0.8) 20%)`;
    };

    window.addEventListener('mousemove', handleMouseMovementEffect);
}

// Mobile Navigation Function
function initializeMobileNavigation() {
    const mobileHamburgerButton = document.getElementById('hamburger');
    const mobileCloseButton = document.getElementById('hamburger_close');
    const mobileNavigationMenu = document.getElementById('menu');
    const pageHeader = document.querySelector('header');
    const documentBody = document.body;

    if (!mobileHamburgerButton || !mobileCloseButton || !mobileNavigationMenu) return;

    const toggleMobileMenu = () => {
        mobileHamburgerButton.classList.toggle('active');
        mobileNavigationMenu.classList.toggle('active');
        pageHeader.classList.toggle('menu-open');
        documentBody.style.overflow = mobileNavigationMenu.classList.contains('active') ? 'hidden' : '';
    };

    mobileHamburgerButton.addEventListener('click', toggleMobileMenu);
    mobileCloseButton.addEventListener('click', toggleMobileMenu);
}

// GSAP Animations and Scroll Interactions
function setupScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const heroCharacterElement = document.getElementById('c');
    const heroSectionElement = document.getElementById('hero-section');
    
    if (!heroCharacterElement || !heroSectionElement) return;

    const heroCharacterBounds = heroCharacterElement.getBoundingClientRect();
    const heroSectionBounds = heroSectionElement.getBoundingClientRect();

    const heroCenterX = heroCharacterBounds.left + heroCharacterBounds.width * 0.2;
    const heroCenterY = heroCharacterBounds.top + heroCharacterBounds.height / 2;

    const heroRelativeX = ((heroCenterX - heroSectionBounds.left) / heroSectionBounds.width) * 100;
    const heroRelativeY = ((heroCenterY - heroSectionBounds.top) / heroSectionBounds.height) * 100;

    gsap.set('#hero-section', {
        transformOrigin: `${heroRelativeX}% ${heroRelativeY}%`,
        force3D: true
    });

    gsap.to("#hero-section", {
        scale: 200,
        rotation: -100,
        backgroundColor: "black",
        ease: "power2.in",
        scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "center top",
            scrub: 1,
            pin: true,
            pinSpacing: false,
            onLeave: () => heroSectionElement.style.display = 'none',
            onLeaveBack: () => heroSectionElement.style.display = 'none',
            onEnterBack: () => heroSectionElement.style.display = 'flex',
            onEnter: () => heroSectionElement.style.display = 'flex'
        },
    });

    const aboutSection = document.querySelector('.about-us');
    if (aboutSection) {
        gsap.from('.about-us', {
            opacity: 0,
            scrollTrigger: {
                trigger: '.about-us',
                start: "top 50%",
                end: "top 10%",
                scrub: 1,
            },
        });

        const aboutSectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-us',
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
                pinSpacing: false,
            }
        });

        aboutSectionTimeline
            .from('.story-1', { opacity: 0, duration: 1 }, 0)
            .from('.content-one', { opacity: 0 }, 1)
            .from('.content-two', { opacity: 0 }, 2)
            .from('.content-three', { opacity: 0 }, 3)
            .to('.about-us', { opacity: 0 }, 4);
    }

    const servicesTextContainer = document.querySelector('.services-text-container');
    if (servicesTextContainer) {
        const servicesTransitionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.services-text-container',
                start: "top top",
                end: () => `+=${window.innerHeight}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
            }
        });

        servicesTransitionTimeline
            .from('.services-text-container', { opacity: 1 })
            .from('.services-text-container .transition-text', {
                y: '-100%',
                opacity: 0,
                stagger: { amount: 2, from: "random" }
            }, 0)
            .to('.services-text-container .transition-text', {
                y: '-100%',
                opacity: 0,
                stagger: { amount: 2, from: "random" }
            }, "+=1");
    }
}

// Header Scroll Animation
function setupHeaderScrollEffect() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const headerScrollAnimation = gsap.from('header', {
        yPercent: -100,
        paused: true,
        duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            self.direction === -1 ? headerScrollAnimation.play() : headerScrollAnimation.reverse();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateServicesTextElements();
    updateServicesTextResponsiveFontSize();
    setupBackgroundInteractiveEffect();
    initializeMobileNavigation();
    setupScrollAnimations();
    setupHeaderScrollEffect();

    const servicesTextElements = document.querySelectorAll('.services-text-container .transition-text');
    servicesTextElements.forEach((textElement, index) => {
        textElement.style.zIndex = index - 1;
    });

    window.addEventListener('resize', updateServicesTextResponsiveFontSize);
});