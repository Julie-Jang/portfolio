$(document).ready(function () {
    function initializeSwiper(container) {
        const swiperContainer = container.querySelector(".swiper_container");
        const paginationEl = container.querySelector(".visual_pagination");
        const nextEl = container.querySelector(".btn_next");
        const prevEl = container.querySelector(".btn_prev");

        let slidesPerViewValue = 1; // 기본값
        let spaceBetweenValue = 0; 
        let autoplayEnabled = true;
        let loopEnabled = true;

        if (container.classList.contains("slides-2")) {
            slidesPerViewValue = 3;
            spaceBetweenValue = 20;
            autoplayEnabled = false;
        } else if (container.classList.contains("slides-3")) {
            slidesPerViewValue = 3;
            spaceBetweenValue = 60;
            autoplayEnabled = false;
        } else if (container.classList.contains("family-site")) {
            loopEnabled = false;
            autoplayEnabled = false;
        } else if (container.classList.contains("slides-auto")) {
            slidesPerViewValue = 'auto';
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
                    slidesPerView: container.classList.contains("main_visual")
                        ? 1
                        : container.classList.contains("slides-2")
                        ? 2
                        : container.classList.contains("slides-3")
                        ? 2
                        : container.classList.contains("family-site")
                        ? 4
                        : slidesPerViewValue,
                    spaceBetween: container.classList.contains("slides-3")
                        ? 10
                        : container.classList.contains("family-site")
                        ? 10
                        : spaceBetweenValue,
                },
                800: {
                    slidesPerView: container.classList.contains("main_visual")
                        ? 1
                        : container.classList.contains("slides-2")
                        ? 2
                        : container.classList.contains("slides-3")
                        ? 2
                        : container.classList.contains("family-site")
                        ? 3
                        : slidesPerViewValue,
                    spaceBetween: container.classList.contains("slides-3") || container.classList.contains("family-site")
                        ? 20
                        : spaceBetweenValue,
                },
                700: {
                    slidesPerView: container.classList.contains("main_visual")
                        ? 1
                        : container.classList.contains("slides-2")
                        ? 1
                        : container.classList.contains("slides-3")
                        ? 1
                        : container.classList.contains("family-site")
                        ? 2
                        : slidesPerViewValue,
                    spaceBetween: container.classList.contains("slides-3") || container.classList.contains("family-site")
                        ? 15
                        : spaceBetweenValue,
                },
                301: {
                    slidesPerView: container.classList.contains("main_visual")
                        ? 1
                        : container.classList.contains("slides-2")
                        ? 1
                        : container.classList.contains("slides-3")
                        ? 1
                        : container.classList.contains("family-site")
                        ? 1
                        : slidesPerViewValue,
                    spaceBetween: container.classList.contains("family-site") ? 10 : spaceBetweenValue,
                }
            }
            
        });

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
