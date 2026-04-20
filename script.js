document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Changer l'icône (Menu -> Croix)
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('nav-active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    }

    // Fermer le menu quand on clique sur un lien
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    });

    // --- 3. Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section, header');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}` || href === `index.html#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- 4. Swiper Carousel Initialization (for Project Pages) ---
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            loop: true,
            spaceBetween: 30,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    // --- 5. Image Lightbox (Zoom) ---
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxImg = document.createElement('img');
    const lightboxClose = document.createElement('div');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = "<i class='bx bx-x'></i>";
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxClose);
    document.body.appendChild(lightbox);

    // Apply zoomable class and click event to relevant images
    const imagesToZoom = document.querySelectorAll('.gallery-item img, .swiper-slide img, .section img:not(.logo img)');
    imagesToZoom.forEach(img => {
        img.classList.add('zoomable');
        img.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        // If they click on the image itself, we don't close it, or maybe we do. 
        // Let's close it on any click to be simple.
        lightbox.classList.remove('active');
    });
});
