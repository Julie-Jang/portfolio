$(document).ready(function () {
    function initializeSwiper(container) {
        const swiperContainer = container.querySelector(".swiper_container");  
        const paginationEl = container.querySelector(".visual_pagination");
        const nextEl = container.querySelector(".btn_next");
        const prevEl = container.querySelector(".btn_prev");
        // 기존 Swiper 제거
        if (container.swiperInstance) {
            container.swiperInstance.destroy(true, true);
        }

        let slidesPerViewValue = 1; 
        let spaceBetweenValue = 0; 
        let autoplayEnabled = true;
        let loopEnabled = true;
    
        if (container.classList.contains("slides-2")) {
            slidesPerViewValue = 2;
            spaceBetweenValue = 20;
            autoplayEnabled = false;
            loopEnabled = true;
        } else if (container.classList.contains("slides-3")) {
            slidesPerViewValue = 2;
            spaceBetweenValue = 20;
            autoplayEnabled = true;
            loopEnabled = true;
        } else if (container.classList.contains("family-site")) {
            slidesPerViewValue = 4;
            spaceBetweenValue = 20;
            loopEnabled = true;
            autoplayEnabled = true;
        }
    
        const swiper = new Swiper(swiperContainer, {
            preventClicks: true,
            preventClicksPropagation: true,
            loop: loopEnabled,
            autoplay: autoplayEnabled ? {
                delay: 5000,
                disableOnInteraction: true
            } : false,
            slidesPerView: slidesPerViewValue,
            spaceBetween: spaceBetweenValue,
            pagination: {
                el: paginationEl,
                type: "bullets",
                clickable: true,
            },
            navigation: {
                nextEl: nextEl,
                prevEl: prevEl,
            },
            breakpoints: {
                1400: {
                    slidesPerView: slidesPerViewValue,
                },
                800: {
                    slidesPerView: slidesPerViewValue > 2 ? 2 : slidesPerViewValue,
                },
                700: {
                    slidesPerView: container.classList.contains("family-site") ? 2 : 1,
                    spaceBetween: 10,
                },
                301: {
                    slidesPerView: container.classList.contains("family-site") ? 2 : 1,
                    spaceBetween: 10,
                },
            },
        });
    
        // Swiper 인스턴스 저장
        container.swiperInstance = swiper;
        return swiper;
    }

    function toggleAutoplay(swiper, button) {
        const updateButtonState = () => {
            const isPlaying = swiper.autoplay.running;
            button.setAttribute("aria-pressed", isPlaying);
            button.setAttribute("title", isPlaying ? "정지" : "재생");
            button.classList.toggle("on", isPlaying);
        };

        button.addEventListener("click", () => {
            if (swiper.autoplay.running) {
                swiper.autoplay.stop();
            } else {
                swiper.autoplay.start();
            }
            updateButtonState();
        });

        updateButtonState();
    }

    document.querySelectorAll(".slide_show").forEach((slideShowContainer) => {
        const swiper = initializeSwiper(slideShowContainer);
        swiper.update(); // DOM 갱신
        const autoplayButton = slideShowContainer.querySelector(".btn_autoplay");
        if (autoplayButton) {
            toggleAutoplay(swiper, autoplayButton);
        }

        if (slideShowContainer.classList.contains("mental_check")) {
            const nextButton = document.querySelector(".btn.btn_next");
            if (nextButton) {
                nextButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    swiper.slideNext();
                    return false;
                });
            }
        }
    });

    

    window.addEventListener("resize", () => {
        document.querySelectorAll(".main_visual").forEach((slideShowContainer) => {
            initializeSwiper(slideShowContainer);
        });
    });



});
