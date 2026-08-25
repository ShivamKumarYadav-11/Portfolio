
// // 1. Disable Right-Click (Context Menu)
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

// 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
document.addEventListener('keydown', function (e) {
    // Prevent F12
    if (e.key === 'F12') {
        e.preventDefault();
    }

    // Prevent Ctrl+Shift+I (Inspect) and Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
    }

    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
    }

    // Prevent Cmd+Option+I / Cmd+Option+J (Mac)
    if (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
    }
}, false);


// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        Animation();
    }, 4800);
});

// =====Preloader gsap Animation=====
gsap.to('.boxs', {
    height: 0,
    duration: 0.8,
    delay: 5,
    ease: 'power1.inOut',
    stagger: 0.1,
});

gsap.to(".boxs", {
    duration: 0.5,
    delay: 4.3,
    backgroundColor: "#232B3C"
})

gsap.to('.boxs .child', {
    y: "-100%",
    duration: 0.8,
    delay: 5.2,
    ease: 'power1.inOut',
    stagger: 0.1,
});

// ===== Progress Bar & Countdown =====
const progObj = { val: 0 };

gsap.to(progObj, {
    val: 100,
    duration: 2.2,
    delay: 1.2,
    ease: 'power1.inOut',
    onUpdate() {
        const v = Math.floor(progObj.val);
        document.getElementById('progFill').style.width = v + '%';
        document.getElementById('progCount').textContent = v + '%';
    }
});

gsap.to('.prog-wrap', { opacity: 1, duration: 0.4, delay: 1.0 });
gsap.to('.prog-wrap', { opacity: 0, duration: 0.3, delay: 3.8 });

const tl = gsap.timeline();
tl.from('.child h1', {
    y: '200%',
    skewY: 10,
    duration: 1,
    delay: 1.3,
    stagger: 0.2,
    ease: 'power4.out'
})

tl.to('.child h1', {
    y: '-200%',
    skewY: -5,
    duration: 0.7,
    delay: 0.8,
    stagger: 0.2,
    ease: 'power3.in'
})


// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.download-btn)');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
    mobileToggle.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';

    let mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
        gsap.to(".mobile-menu", {
            top: 0,
            duration: 0.2,
            ease: "power2.out"
        })

        gsap.from(".mobile-menu a, .mobile-menu button", {
            y: 20,
            top: "10px",
            opacity: 0,
            stagger: .1,
        }, "-=0.1")
    })
}

function closeMenu() {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';

    let mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
        gsap.to(".mobile-menu", {
            top: "-100%",
            ease: "power2.in"
        }, "-=0.1")
    })
}

mobileToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const phrases = ['MERN Stack Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'React Specialist'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typewrite() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex++);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex > currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }
    setTimeout(typewrite, speed);
}
typewrite();

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== View All Toggle Function =====
function setupViewAll(btnId, containerSelector, cardSelector) {
    const btn = document.getElementById(btnId);
    const container = document.querySelector(containerSelector);
    if (!btn || !container) return;

    const hiddenCards = container.querySelectorAll(cardSelector + '.hidden-card');
    if (hiddenCards.length === 0) {
        btn.style.display = 'none';
        return;
    }

    btn.addEventListener('click', () => {
        const isExpanded = btn.classList.contains('active');

        if (isExpanded) {
            hiddenCards.forEach(card => {
                card.classList.remove('show');
            });
            btn.classList.remove('active');
        } else {
            hiddenCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 120);
            });
            btn.classList.add('active');

            setTimeout(() => {
                hiddenCards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);
        }
    });
}

setupViewAll('viewAllProjects', '#projectsGrid', '.project-card');
setupViewAll('viewAllExperience', '#experienceTimeline', '.experience-card');
setupViewAll('viewAllCertificates', '#certificatesGrid', '.certificate-card');

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields!');
        return;
    }

    showToast('Message sent successfully!');
    contactForm.reset();
});

// ===== Download Resume =====
function downloadResume() {
    const a = document.createElement('a');
    a.href = './src/Resume.pdf';
    a.download = 'Resume.pdf';
    a.click();
}

const navDownloadBtn = document.getElementById('downloadResume'),
    mobileDownloadBtn = document.getElementById('downloadResumeMobile'),
    heroDownloadBtn = document.getElementById('heroDownloadBtn'),
    footerDownloadBtn = document.getElementById('footerDownload');

if (navDownloadBtn) navDownloadBtn.addEventListener('click', downloadResume);
if (mobileDownloadBtn) mobileDownloadBtn.addEventListener('click', downloadResume);
if (heroDownloadBtn) heroDownloadBtn.addEventListener('click', downloadResume);
if (footerDownloadBtn) footerDownloadBtn.addEventListener('click', downloadResume);


function Animation() {

    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // Desktop setup (e.g., screens wider than 1024px)
    mm.add("(min-width: 1024px) and (max-width: 1440px)", () => {
        gsap.to(".home-image-inner", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
            y: "151%",
            x: "-176%"
        });

        gsap.to(".float-badge", {
            scrollTrigger: {
                trigger: ".home-image",
                start: "40% 45%",
                end: "50% 50%",
                scrub: 1,
            },
            width: '0',
            padding: 0,
            display: 'none',
            stagger: 0.2
        });


        gsap.from('.home-container', {
            opacity: 0,
            scale: 0,
            duration: 1,
            delay: 1,
            ease: 'power1.inOut'
        });

        gsap.from('.home-content', {
            opacity: 0,
            scale: 2,
            duration: 1,
            delay: 1.7,
            ease: 'power1.inOut',
        });

        gsap.from('.about-image img', {
            scrollTrigger: {
                trigger: '#about',
                start: '40% 95%',
                end: 'center center',
                scrub: true,
            },
            y: '-120%',
            duration: 1,
            ease: 'power1.inOut',

        }, "anim");

        gsap.from("#about .section-header p", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: "#about",
                start: 'top 80%',
                end: '20% 50%',
                scrub: 1,

            }
        })

        gsap.from("#about .section-title", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            delay: 5,
            scrollTrigger: {
                trigger: "#about",
                start: 'top 75%',
                end: '20% 40%',
                scrub: 1,

            }
        })

        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'center center',
                scrub: true,
            },
            y: '80%',
            duration: 1,
            ease: 'power1.inOut',
        }, "anim");

        gsap.to(".skills .circle", {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 50%",
                end: "50% 50%",
                scrub: 1,

            },
            scale: 210,
        });

        gsap.to(".section-header .sky", {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 50%",
                end: "10% 50%",
                scrub: 1,

            },
            color: "#fff",
            immediateRender: false
        });

        gsap.to(".section-header .skillbg", {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 50%",
                end: "20% 50%",
                scrub: 1,
            },
            color: "#E5B044",
            immediateRender: false
        });

        gsap.from(".skill-card", {
            scrollTrigger: {
                trigger: ".skills",
                start: "top 50%",
                end: "30% 50%",
                scrub: 1,

            },
            y: '25vh'
        });


        gsap.to('.fa-solid', {
            scrollTrigger: {
                trigger: '.education-timeline',
                start: '30% bottom',
                end: '90% 60%',
                scrub: 1,
            },
            y: "500%",
            x: "300px",
            scale: 5,
            opacity: 0.1,
            stagger: 1,
            duration: 0.7,
        });

        gsap.to(".education", {
            scrollTrigger: {
                trigger: '#education',
                start: '80% 20%',
                end: 'bottom 5%',
                scrub: true,
            },
            opacity: 0,
            duration: 1,
        });


        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: '#projectsGrid',
                start: 'top 80%',
                end: '80% 35%',
                scrub: true,

            },
            height: 0,
            duration: 0.7,
        })

        gsap.to(".certsub", {
            scrollTrigger: {
                trigger: '#contact',
                start: '21% 80%',
                end: '20% 70%',
                scrub: true,
            },
            color: '#fff',
            duration: 0.5,
        })
        gsap.to(".certtext", {
            scrollTrigger: {
                trigger: '#contact',
                start: '21% 80%',
                end: '20% 70%',
                scrub: true,
            },
            color: "#E5B044",
            duration: 0.5,
        })
        gsap.to("#certificates", {
            scrollTrigger: {
                trigger: '#contact',
                start: '20% 80%',
                end: '20% 70%',
                scrub: true,
            },
            backgroundColor: '#1A2030',
            duration: 0.5,
        })

        return () => {
        };
    })


    // <-------Mobile Animation-------->
    mm.add("(min-width: 360px) and (max-width: 1023px)", () => {

        gsap.to(".home-image-inner", {
            scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
            y: "414%",
            immediateRender: false
        });

        gsap.to(".float-badge", {
            scrollTrigger: {
                trigger: ".home-image",
                start: "55% 27%",
                end: "70% 20%",
                scrub: 1,


            },
            width: '0',
            padding: 0,
            opacity: 0,
            stagger: 0.2
        });


        gsap.from('.home-container', {
            opacity: 0,
            scale: 0,
            duration: 1,
            delay: 1,
            ease: 'power1.inOut',
        })

        gsap.from('.home-content', {
            opacity: 0,
            scale: 2,
            duration: 1,
            delay: 1.7,
            ease: 'power1.inOut',
        })

        gsap.from('.about-image img', {
            scrollTrigger: {
                trigger: '.about-image',
                start: '5% bottom',
                end: '30% 60%',
                scrub: 0.8,
                stagger: 1,
            },
            y: "-120%",
            // opacity: 0,
            duration: 0.1,
            ease: 'power1.inOut',
        });

        gsap.from("#about .section-header p", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: "#about",
                start: 'top 80%',
                end: '20% 50%',
                scrub: 1,


            }
        })

        gsap.from("#about .section-title", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            delay: 5,
            scrollTrigger: {
                trigger: "#about",
                start: 'top 75%',
                end: '20% 40%',
                scrub: 1,
            }
        })

        gsap.from('.about-content p', {
            scrollTrigger: {
                trigger: '.about-content',
                start: '10% bottom',
                end: '18% 80%',
                scrub: 1,

            },
            y: '120%',
            duration: 0.1,
        });

        gsap.from('.about-highlights', {
            scrollTrigger: {
                trigger: '.about-content',
                start: '50% bottom',
                end: '65% 80%',
                scrub: 1,
            },
            y: '120%',
            duration: 0.5,
            stagger: 1
        });


        gsap.to(".skills .circle", {
            scrollTrigger: {
                trigger: "#skills",
                start: "10% 50%",
                end: "50% 50%",
                scrub: 1,

            },
            scale: "400",
            immediateRender: false
        });

        gsap.to(".section-header .sky", {
            scrollTrigger: {
                trigger: "#skills",
                start: "10% 50%",
                end: "8% 50%",
                scrub: 1,
            },
            color: "#fff",
            immediateRender: false
        });


        gsap.to(".section-header .skillbg", {
            scrollTrigger: {
                trigger: "#skills",
                start: "10% 50%",
                end: "11% 50%",
                scrub: 1,
            },
            color: "#E5B044",
            immediateRender: false
        });


        gsap.from(".skill-card", {
            scrollTrigger: {
                trigger: ".skills",
                start: "11% 50%",
                end: "60% 50%",
                scrub: true
            },
            y: '30vh',
        });

        gsap.to('.fa-solid', {
            scrollTrigger: {
                trigger: '.education-timeline',
                start: '15% bottom',
                end: '85% center',
                scrub: 1,
            },
            y: "221%",
            x: "110px",
            scale: 3.2,
            opacity: 0.1,
            stagger: 1,
            duration: 0.6
        });

        gsap.to(".education", {
            scrollTrigger: {
                trigger: '#education',
                start: '85% 18%',
                end: '92% 10%',
                scrub: true,

            },
            opacity: 0,
            duration: 1,
        })

        gsap.to(".project-card", {
            scrollTrigger: {
                trigger: '.projects',
                start: '76% bottom',
                end: '88% 45%',
                scrub: true,
            },
            height: 0,
            duration: 0.8,
            delay: 1,
            stagger: 0.3
        })
        return () => {
        };
    })

}


// cursor Animation
function play() {

    let About = document.querySelector(".about-image img")
    let skyimg = document.querySelector("#skyimg")
    // let education = document.querySelector("#education .container")
    let educations = document.querySelectorAll("#education .education-item")
    let values = document.querySelectorAll(".scaleAnimation");
    let btn = document.querySelector("#play")

    // mouseenter  animation

    // 2. Loop through each element
    values.forEach(function (value) {

        // 3. Attach mouseenter to the individual element
        value.addEventListener("mouseenter", function () {
            gsap.to(value, { // 'this' refers to the specific element being hovered
                scale: 2,
                opacity: 1
            });
        });

        // 4. Attach mouseleave to the individual element
        value.addEventListener("mouseleave", function () {
            gsap.to(value, {
                scale: 1,
                opacity: 1
            });
        });

    });



    //Education Animation
    educations.forEach(function (edu) {

        //mouseenter animation
        edu.addEventListener("mouseenter", function () {
            gsap.to(btn, {
                scale: 1,
                opacity: 1,
            })
        })

        // mouseleave animation
        edu.addEventListener("mouseleave", function () {
            gsap.to(btn, {
                scale: 0,
                opacity: 0
            })
        })

        //  mousemove animation
        edu.addEventListener("mousemove", function (dets) {
            gsap.to(btn, {
                left: dets.x - 50,
                top: dets.y - 50
            })
        })

    })


    //mouseenter animation
    About.addEventListener("mouseenter", function () {
        gsap.to(skyimg, {
            scale: 1,
            opacity: 1,
        })
    })

    // mouseleave animation
    About.addEventListener("mouseleave", function () {
        gsap.to(skyimg, {
            scale: 0,
            opacity: 0
        })
    })


    //  mousemove animation
    About.addEventListener("mousemove", function (dets) {
        gsap.to(skyimg, {
            left: dets.x - 50,
            top: dets.y - 50
        })
    })
}
play()