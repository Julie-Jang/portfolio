$(document).ready(function () {
    function initializeSwiper(container) {
        const swiperContainer = container.querySelector(".swiper-container");
        const paginationEl = container.querySelector(".progressbar-pagination") || container.querySelector(".visual_pagination");
        const nextEl = container.querySelector(".btn_next");
        const prevEl = container.querySelector(".btn_prev");
    
        const settings = {
            "slides-1": { slidesPerViewValue: 1, spaceBetweenValue: 10, loopValue: true, centeredSlidesValue: true, autoplayConfig: { delay: 5000, disableOnInteraction: false } },
            "slides-2": {
                slidesPerViewValue: 4, // default value for larger screens
                spaceBetweenValue: 40,
                loopValue: true,
                centeredSlidesValue: false,
                autoplayConfig: false,
                breakpoints: {
                    1400: { slidesPerView: 4.0 }, 
                    1200: { slidesPerView: 3.0 }, 
                    680: { slidesPerView: 2.0 },
                    200: { slidesPerView: 1.5 }      
                }
            },
            "photo-list": {
                slidesPerViewValue: 7, // default value for larger screens
                spaceBetweenValue: 70,
                loopValue: true,
                centeredSlidesValue: false,
                autoplayConfig: false,
                breakpoints: {
                    1400: { slidesPerView: 7.0 },
                    1200: { slidesPerView: 6.0 },  
                    900: { slidesPerView: 5.0 },    
                    700: { slidesPerView: 4.0 },    
                    300: { slidesPerView: 2.0 }    
                }
            },
            "main-banenr2": { slidesPerViewValue: 1, spaceBetweenValue: 10, loopValue: true, centeredSlidesValue: true, autoplayConfig: { delay: 5000, disableOnInteraction: false } },
            "facility": { slidesPerViewValue: 1.4, spaceBetweenValue: 30, loopValue: true, centeredSlidesValue: true, autoplayConfig: false },
            "slides-auto": { slidesPerViewValue: 'auto', spaceBetweenValue: 0, loopValue: true, centeredSlidesValue: false, autoplayConfig: { delay: 5000, disableOnInteraction: false } }
        };
    
        const className = Object.keys(settings).find(cls => container.classList.contains(cls)) || "slides-1";
        const { slidesPerViewValue, spaceBetweenValue, loopValue, centeredSlidesValue, autoplayConfig, breakpoints } = settings[className];
    
        const paginationType = container.querySelector(".progressbar-pagination") ? 'progressbar' : 'fraction';
    
        const swiper = new Swiper(swiperContainer, {
            loop: loopValue,
            autoplay: autoplayConfig,
            centeredSlides: centeredSlidesValue,
            slidesPerView: slidesPerViewValue,
            spaceBetween: spaceBetweenValue,
            pagination: {
                el: paginationEl,
                type: paginationType,
                clickable: true,
                renderProgressbar: (progressbarFillClass) => {
                    if (paginationType === 'progressbar') {
                        return `<span class="${progressbarFillClass}"></span>`;
                    }
                }
            },
            navigation: {
                nextEl: nextEl,
                prevEl: prevEl
            },
            breakpoints: breakpoints || {},  // Add breakpoints if present
            on: {
                slideChange: function () {
                    const slideIndex = this.realIndex + 1; // current slide index (starting from 1)
                    const playElement = container.querySelector('#play');
                    if (playElement) {
                        playElement.className = ''; // reset classes
                        playElement.classList.add(`slide0${slideIndex}`); // add slide-specific class
                        playElement.classList.add('on'); // add 'on' class
                    }
                }
            }
        });
    
        // Button click to restart autoplay
        nextEl.addEventListener('click', () => {
            swiper.slideNext();
            if (!swiper.autoplay.running) {
                swiper.autoplay.start();
            }
        });
    
        prevEl.addEventListener('click', () => {
            swiper.slidePrev();
            if (!swiper.autoplay.running) {
                swiper.autoplay.start();
            }
        });
    
        return swiper;
    }

    // popup open button script
    $('.result_preschool .btn_popup').click(function(e) {
        $("#pop-up-facility").css('display', 'block');  
        const swiperContainer = document.querySelector(".slide_show");
        initializeSwiper(swiperContainer);
        $(".facility").attr("tabindex", 0).focus();
        return false;
    });

    // 자동 재생 토글 함수
    function toggleAutoplay(swiper, button) {
        const stroke = button.querySelector('.stroke-solid');
        const icon = button.querySelector('.icon');
        const playElement = button;  // Updated to use the current button's context
    
        const updateButtonState = () => {
            const isPlaying = swiper.autoplay.running;
            const playIcon = isPlaying ? 'M35,70 V30 H45 V70 H35 M55,70 V30 H65 V70 H55' : 'M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z';
            const playClass = isPlaying ? 'on' : '';

            if (stroke) {
                stroke.style.animationPlayState = isPlaying ? 'running' : 'paused';
            }
            if (icon) {
                icon.setAttribute('d', playIcon);
            }
            if (playElement) {
                playElement.classList.toggle('on', isPlaying); // Add or remove 'on' class based on autoplay state
            }
            button.setAttribute("aria-pressed", isPlaying);
            button.setAttribute("title", isPlaying ? "정지" : "재생");
        };

        button.addEventListener("click", (e) => {
            if (swiper.autoplay.running) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
            updateButtonState();
            e.preventDefault(); // Prevent default action
            e.stopPropagation(); // Stop event propagation
            return false; // Ensure no further actions are taken
        });
    
        updateButtonState(); // Ensure the button is correctly initialized
    }
    
    // 모든 슬라이드 쇼 컨테이너를 초기화
    document.querySelectorAll(".slide_show").forEach((slideShowContainer) => {
        const swiper = initializeSwiper(slideShowContainer);
        const autoplayButton = slideShowContainer.querySelector("#play");
        if (autoplayButton) {
            toggleAutoplay(swiper, autoplayButton);
        }
    });

    // 클릭 시 .reset_animation 클래스를 토글하는 함수
    function toggleResetAnimationClass() {
        const strokeSolid = document.querySelector('.slide_show svg .stroke-solid');
        if (strokeSolid) {
            const animationPlayState = window.getComputedStyle(strokeSolid).animationPlayState;
            if (animationPlayState !== 'paused') {
                strokeSolid.classList.toggle('reset_animation');
            }
        }
    }

    // 플레이 버튼 및 네비게이션 버튼 클릭 시 클래스 토글
    $(document).on("click", ".slide_show #play.on, .slide_show .swiper-ctrl .btn_prev, .slide_show .swiper-ctrl .btn_next", toggleResetAnimationClass);
});
