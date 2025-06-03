const letter = document.querySelector('.letter');
const wrapper = document.querySelector(".wrapper");
const main = document.querySelector(".main");
const slideshow = document.querySelector('.slideshow')

// Clean up event listeners when letter is closed
function closeLetter() {
    letter.classList.remove('open');
    
    setTimeout(() => {
        letter.style.display = 'none';
        endScreen.classList.add('show');
        currentIndex = 0;
        // startSlideshow();
    }, 1000);
}


// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Hàm thiết lập display cho main content
function setMainDisplay() {
    if (window.innerWidth >= 665) {
        main.style.display = 'flex';
        console.log("a")
    } else {
        main.style.display = 'block';
    }
}

function init() {
    wrapper.style.display = 'flex';
    main.style.display = 'none';

    document.body.removeAttribute("style");

    document.body.style.background = "#FFF";
    document.body.style.animation = "change-background 6s infinite linear";

    const loadingDuration = 6000;

    // Sau khi loading xong
    setTimeout(function () {
        // Ẩn loading
        document.body.removeAttribute("style");

        document.body.style.fontFamily = "Arial', sans-serif";
        document.body.style.color = "#333";
        document.body.style.overflowX = "hidden";
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.boxSizing = 'border-box';

        wrapper.style.display = 'none';
        setMainDisplay();

        // Debounced resize handler
        const debouncedResizeHandler = debounce(function () {
            if (wrapper.style.display === 'none') {
                setMainDisplay();
            }
        }, 100);

        window.addEventListener('resize', debouncedResizeHandler);

        main.style.position = "relative";


        // Khởi chạy các hiệu ứng của main content
        initMain();
    }, loadingDuration);
}

function initMain() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const angle = 360 / carouselItems.length;

    function positionCarouselItems() {
        let zTranslation;
        if (window.innerWidth >= 666) {
            zTranslation = 180;
        } else if (window.innerWidth < 768) {
            zTranslation = window.innerWidth < 480 ? 80 : 100;
        } else {
            zTranslation = 150;
        }

        // Use requestAnimationFrame for smooth updates
        requestAnimationFrame(() => {
            carouselItems.forEach((item, index) => {
                item.style.transform = `rotateY(${angle * index}deg) translateZ(${zTranslation}px)`;
            });
        });
    }

    positionCarouselItems();

    // Debounce the resize handler for carousel
    const debouncedCarouselResize = debounce(positionCarouselItems, 100);
    window.addEventListener('resize', debouncedCarouselResize);

    // Create stars - optimized with document fragment
    const starsContainer = document.getElementById('stars');
    const starCount = 100; // Reduced from 200 for better performance
    const starFragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size (0.5px to 2px)
        const size = Math.random() * 1.5 + 0.5;

        // Random animation duration (2s to 5s)
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;

        starFragment.appendChild(star);
    }

    starsContainer.appendChild(starFragment);

    // Floating images setup
    const images = [
        'assets/61289af2e5f851a608e910.jpg',
        'assets/40c124cda8c51c9b45d47.jpg',
        'assets/69e754ddd8d56c8b35c44.jpg',
        'assets/76cb05e989e13dbf64f01.jpg',
        'assets/536c336abf620b3c52735.jpg',
        'assets/6ca16795eb9d5fc3068c3.jpg',
        'assets/75552647aa4f1e11475e9.jpg',
        'assets/b644b04a3c42881cd1536.jpg',
        'assets/dac24cf4c0fc74a22ded2.jpg',
        'assets/dc252a35a63d12634b2c8.jpg',

        'assets/d609202a5f20eb7eb23112.jpg',
        'assets/dd4b1e6f6165d53b8c7411.jpg',
    ];

    const endScreen = document.querySelector('.end-screen');
    const floatingImages = [];
    const imageFragment = document.createDocumentFragment();

    // Create floating images with document fragment
    images.forEach((imgSrc, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('floating-image');

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Memory ${index + 1}`;
        img.loading = "lazy";

        imgContainer.appendChild(img);
        imageFragment.appendChild(imgContainer);
        floatingImages.push(imgContainer);
    });

    slideshow.appendChild(imageFragment);

    // Position all images initially
    floatingImages.forEach(img => positionImage(img));

    function positionImage(imgElement, center = false) {
        if (center) {
            // Position at center
            imgElement.style.left = '50%';
            imgElement.style.top = '50%';
            imgElement.style.transform = 'translate(-50%, -50%) rotate(0)';
        } else {
            // Random position
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 80 + 10;
            const rotate = Math.random() * 60 - 30;

            imgElement.style.left = `${x}%`;
            imgElement.style.top = `${y}%`;
            imgElement.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
        }
    }

    // Slideshow animation with cleanup
    let currentIndex = 0;
    const slideInterval = 5000;
    let slideshowInterval;

    function startSlideshow() {
        // Clear any existing interval
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }

        // Reset all images
        floatingImages.forEach(img => {
            img.classList.remove('active');
            positionImage(img);
        });

        // Show first image
        floatingImages[currentIndex].classList.add('active');
        positionImage(floatingImages[currentIndex], true);

        // Start the cycle
        slideshowInterval = setInterval(() => {
            // Move current image away
            floatingImages[currentIndex].classList.remove('active');
            positionImage(floatingImages[currentIndex]);

            // Move to next image
            currentIndex = (currentIndex + 1) % floatingImages.length;

            if (currentIndex === 0) {
                // End of cycle
                clearInterval(slideshowInterval);

                // Show letter animation
                setTimeout(() => {
                    endScreen.classList.add('show');

                    setTimeout(() => {
                        letter.style.display = 'block';
                        setTimeout(() => {
                            letter.classList.add('open');
                        }, 500);
                    }, 500);
                }, 1000);
                return;
            }

            // Show next image
            floatingImages[currentIndex].classList.add('active');
            positionImage(floatingImages[currentIndex], true);
        }, slideInterval);
    }

    // Start the slideshow
    startSlideshow();

    // letter.addEventListener('click', closeLetter);

    // Cleanup function for when the page is unloaded
    window.addEventListener('beforeunload', function () {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        window.removeEventListener('resize', debouncedCarouselResize);
        // letter.removeEventListener('click', closeLetter);
    });
}

