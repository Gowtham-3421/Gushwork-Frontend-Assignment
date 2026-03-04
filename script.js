document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Toggle icon menu/x
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // re-init icons for the new attribute
        });
    }

    // --- Hero Image Gallery ---
    const mainImage = document.getElementById('main-hero-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const navLeft = document.querySelector('.image-nav.left');
    const navRight = document.querySelector('.image-nav.right');

    if (mainImage && thumbnails.length > 0) {
        let currentIndex = 0;

        const updateImage = (index) => {
            // Remove active from all
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Set active
            thumbnails[index].classList.add('active');
            
            // Change main image based on thumbnail src
            const newSrc = thumbnails[index].querySelector('img').getAttribute('src');
            
            // Crossfade effect
            mainImage.style.opacity = 0;
            setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.style.opacity = 1;
            }, 200);

            currentIndex = index;
        };

        // Click on thumbnails
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateImage(index);
            });
        });

        // Navigation Arrows
        if (navLeft) {
            navLeft.addEventListener('click', () => {
                let nextIndex = currentIndex - 1;
                if (nextIndex < 0) nextIndex = thumbnails.length - 1;
                updateImage(nextIndex);
            });
        }
        
        if (navRight) {
            navRight.addEventListener('click', () => {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= thumbnails.length) nextIndex = 0;
                updateImage(nextIndex);
            });
        }
    }

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('i');
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
                accItem.querySelector('i').setAttribute('data-lucide', 'chevron-down');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                icon.setAttribute('data-lucide', 'chevron-up');
            }
            
            lucide.createIcons();
        });
    });

    // --- Process Tabs (Basic Interactivity) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active to clicked button
                btn.classList.add('active');

                // In a real app, this would swap content in .process-text
                // For this demo, just add a small click animation to the image
                const pImg = document.querySelector('.process-image img');
                if (pImg) {
                    pImg.style.opacity = 0.5;
                    setTimeout(() => pImg.style.opacity = 1, 200);
                }
            });
        });
    }
});
