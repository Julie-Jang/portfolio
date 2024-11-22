$(document).ready(function () {
    function initializeSwiper(container) {
        const swiperContainer = container.querySelector(".swiper_container");
        const paginationEl = container.querySelector(".visual_pagination");
        const nextEl = container.querySelector(".btn_next");
        const prevEl = container.querySelector(".btn_prev");

        let slidesPerViewValue = 1; // 기본값
        let spaceBetweenValue = 0; // 기본 간격값
        let autoplayEnabled = true; // 기본 자동 롤링 설정
        let loopEnabled = true; // 기본 loop 설정
        let paginationType = "custom"; // 기본 pagination 타입

        if (container.classList.contains("main_visual")) {
            slidesPerViewValue = 1;
            spaceBetweenValue = 0;
        } else if (container.classList.contains("slides-2")) {
            slidesPerViewValue = 2.5;
            spaceBetweenValue = 20;
            autoplayEnabled = false; // slides-2 자동 롤링 비활성화
            loopEnabled = true; // slides-2는 loop 비활성화
            paginationType = "bullets"; // 기본으로 bullets 사용
        } else if (container.classList.contains("slides-3")) {
            slidesPerViewValue = 3;
            spaceBetweenValue = 60;
            loopEnabled = true; // slides-2는 loop 비활성화
            autoplayEnabled = false;
            paginationType = "bullets"; // 기본으로 bullets 사용
        } else if (container.classList.contains("slides-auto")) {
            slidesPerViewValue = 'auto';
            spaceBetweenValue = 0;
        }

        const centeredSlidesValue = slidesPerViewValue === 1 || slidesPerViewValue === 'auto';

        // 해상도에 따라 main_visual의 pagination 타입 설정
        const isMainVisual = container.classList.contains("main_visual");
        if (isMainVisual) {
            paginationType = window.innerWidth <= 1050 ? "bullets" : "custom";
        }

        const swiper = new Swiper(swiperContainer, {
            loop: loopEnabled,
            autoplay: autoplayEnabled ? {
                delay: 5000,
                disableOnInteraction: true
            } : false,
            centeredSlides: centeredSlidesValue,
            slidesPerView: slidesPerViewValue,
            spaceBetween: spaceBetweenValue,
            pagination: {
                el: paginationEl,
                type: paginationType,
                clickable: true,
                renderCustom: function (swiper, current, total) {
                    if (paginationType === "bullets") {
                        return null;
                    }
                    const percentage = (current / total) * 100;
                    return `
                        <div class="pagination_bar">
                            <div class="bar" style="width: ${percentage}%;"></div>
                        </div>
                        <span class="count"><em>${current}</em>  <em>${total}</em></span>`;
                }
            },
            navigation: {
                nextEl: nextEl,
                prevEl: prevEl
            },
            // slides-3 해상도에 따른 spaceBetweenValue 설정 추가
            breakpoints: {
                1400: {
                    slidesPerView: container.classList.contains("slides-2")
                        ? 2.5
                        : container.classList.contains("slides-3")
                        ? 3
                        : slidesPerViewValue,
                    spaceBetween: container.classList.contains("slides-3") ? 40 : spaceBetweenValue, // 1400px 이하에서 slides-3 간격 40
                },
                800: {
                    slidesPerView: container.classList.contains("slides-2") || container.classList.contains("slides-3") ? 2.5 : slidesPerViewValue,
                    spaceBetween: container.classList.contains("slides-3") ? 20 : spaceBetweenValue, // 800px 이하에서 slides-3 간격 20
                },
                700: {
                    slidesPerView: container.classList.contains("slides-2")
                        ? 2.5
                        : container.classList.contains("slides-3")
                        ? 2.5
                        : slidesPerViewValue,
                    spaceBetween: spaceBetweenValue,
                    spaceBetween: container.classList.contains("slides-3") ? 20 : spaceBetweenValue, // 800px 이하에서 slides-3 간격 20
                },
                301: {
                    slidesPerView: container.classList.contains("slides-2") || container.classList.contains("slides-3") ? 1.5 : slidesPerViewValue,
                    spaceBetween: spaceBetweenValue,
                    spaceBetween: container.classList.contains("slides-3") ? 20 : spaceBetweenValue, // 800px 이하에서 slides-3 간격 20
                }
            }

        });

        // slides-3의 pagination에 on 클래스 추가
        if (container.classList.contains("slides-3") || isMainVisual) {
            swiper.on('slideChange', function () {
                const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
                bullets.forEach((bullet, index) => {
                    bullet.classList.toggle('on', index === swiper.realIndex);
                });
            });
        }

        return swiper;
    }

    // 자동 재생 토글 함수
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

    // 모든 슬라이드 쇼 컨테이너를 초기화
    document.querySelectorAll(".slide_show").forEach((slideShowContainer) => {
        const swiper = initializeSwiper(slideShowContainer);
        const autoplayButton = slideShowContainer.querySelector(".btn_autoplay");
        if (autoplayButton) {
            toggleAutoplay(swiper, autoplayButton);
        }
    });

    // 리사이즈 이벤트로 main_visual의 pagination 업데이트
    window.addEventListener("resize", () => {
        document.querySelectorAll(".main_visual").forEach((slideShowContainer) => {
            initializeSwiper(slideShowContainer);
        });
    });
});
