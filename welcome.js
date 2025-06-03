function startCountdown(callback) {
    const countdownOverlay = document.createElement('div');
    countdownOverlay.className = 'countdown-overlay active';
    document.body.appendChild(countdownOverlay);

    let count = 3;
    const countdownNumber = document.createElement('div');
    countdownNumber.className = 'countdown-number';
    countdownNumber.textContent = count;
    countdownOverlay.appendChild(countdownNumber);

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumber.style.animation = 'none';
            void countdownNumber.offsetWidth; // Trigger reflow
            countdownNumber.style.animation = 'zoomFade 1s ease-out forwards';
            countdownNumber.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownOverlay.style.opacity = '0';
            setTimeout(() => {
                countdownOverlay.remove();
                if (callback) callback();
            }, 500);
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {

    const nhac = document.querySelector('video');

    playWithSound = () => {
        nhac.muted = false;
        nhac.play();
        nhac.ontimeupdate = () => {
            if (nhac.currentTime >= 103) {
                closeLetter();
            }
        }
    }

    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.display = "flex";
    document.body.style.overflowX = "hidden";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = 0;
    document.body.style.background = "linear-gradient(135deg, #98cfb2, #7ab8a5, #5da197)";
    document.body.style.transition = "all 0.5s ease";
    document.body.style.position = "relative";

    const index_begin = document.querySelector('.index_begin');

    // Create background elements
    const bgContainer = document.getElementById('background-elements');
    const icons = ['🎓', '✨', '🌟', '🎉', '💪', '👏', '👍', '❤️'];

    // Create confetti
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * 100 + 'vh';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.opacity = Math.random() * 0.5 + 0.1;
        bgContainer.appendChild(confetti);
    }

    // Create floating icons
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.classList.add('floating-icon');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.top = Math.random() * 100 + 'vh';
        icon.style.fontSize = Math.random() * 20 + 15 + 'px';
        icon.style.animationDuration = Math.random() * 15 + 10 + 's';
        icon.style.animationDelay = Math.random() * 5 + 's';
        bgContainer.appendChild(icon);
    }

    const loadingContainer = document.querySelector('.loading-container');
    const mainContent = document.querySelector('.main-content');
    const passwordScreen = document.getElementById('password-screen');
    const passwordInput = document.getElementById('password-input');
    const togglePassword = document.getElementById('toggle-password');
    const passwordIcon = document.getElementById('password-icon');
    const submitBtn = document.getElementById('submit-btn');
    const errors = document.querySelector('.errors');
    const active = document.querySelector('.create');
    const suggest = document.querySelector('.suggest');

    // Toggle password visibility
    let passwordVisible = false;
    togglePassword.addEventListener('click', function () {
        passwordVisible = !passwordVisible;
        if (passwordVisible) {
            passwordInput.type = 'text';
            passwordIcon.src = 'assets/visible.png';
        } else {
            passwordInput.type = 'password';
            passwordIcon.src = 'assets/hide.png';
        }
    });

    // Show loading for 3 seconds then show main content
    setTimeout(() => {
        loadingContainer.style.opacity = '0';
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                passwordScreen.style.transform = 'translateY(0)';
            }, 50);
        }, 500);
    }, 3000);

    // Handle password submission
    submitBtn.addEventListener('click', function () {
        if (passwordInput.value.toLowerCase() === 'baovekhoaluan') {
            // pauseSound()
            passwordScreen.classList.add('hidden');

            // Show success message before redirect
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                        color: #0f21e8;
                        font-weight: bold;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 15px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                        max-width: 80%;
                        text-align: center;
                        animation: pulse 1s infinite alternate;
                        transform: scale(1.2);
                        transition: all 0.5s ease;
                    `;

            // Tạo phần text
            const textElement = document.createElement('p');
            textElement.textContent = 'Hết cái để xem rồi. Tạm biệt';
            textElement.style.marginBottom = '15px';
            textElement.style.fontSize = '1.2rem';

            // Tạo phần hình ảnh
            const imageElement = document.createElement('img');
            imageElement.src = 'assets/bye.jpg';
            imageElement.alt = 'Tạm biệt';
            imageElement.style.width = '200px';
            imageElement.style.height = '200px';
            imageElement.style.objectFit = 'contain';
            imageElement.style.marginBottom = '15px';

            // Thêm các phần tử vào container
            successMsg.appendChild(imageElement);
            successMsg.appendChild(textElement);

            // Chèn vào DOM
            passwordScreen.parentNode.insertBefore(successMsg, passwordScreen.nextSibling);

            // Thêm style cho animation nếu chưa có
            if (!document.getElementById('pulse-animation')) {
                const style = document.createElement('style');
                style.id = 'pulse-animation';
                style.textContent = `
                        @keyframes pulse {
                            0% { transform: scale(1.1); }
                            100% { transform: scale(1.15); }
                        }
                    `;
                document.head.appendChild(style);
            }

            // Thay đổi nội dung sau 10 giây
            setTimeout(() => {
                playWithSound();

                // Thay đổi hình ảnh
                imageElement.src = 'assets/welcome.jpg';
                imageElement.alt = 'Chào mừng';

                // Thay đổi text
                textElement.textContent = "Đùa thôi qua phần chính nè";
                textElement.style.color = '#4CAF50';

                // Thêm hiệu ứng
                successMsg.style.animation = 'none';
                void successMsg.offsetWidth; // Trigger reflow
                successMsg.style.animation = 'pulse 0.5s infinite alternate';

                // Thay đổi background
                successMsg.style.backgroundColor = '#ffffff';
                successMsg.style.border = '2px solid #4CAF50';

                setTimeout(() => {
                    successMsg.style.display = "none";
                    bgContainer.style.display = "none";
                    document.body.style.background = "#000";
                    startCountdown(() => {
                        setTimeout(() => {
                            index_begin.style.display = 'none';
                            init()
                        })
                    })

                }, 16000) // time

            }, 3000); // time 
        } else {
            errors.style.display = 'flex';
            active.style.display = 'none';
            passwordInput.value = '';
            passwordInput.focus();
            setTimeout(() => {
                errors.style.display = 'none';
                suggest.style.display = 'flex';

                setTimeout(() => {
                    window.location.reload();
                }, 3000)

            }, 4000)
        }
    });



    // Allow Enter key to submit
    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
});
