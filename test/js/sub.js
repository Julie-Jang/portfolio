$(document).ready(function() {
    // 팝업 기본
    var $this;
    $("[data-rel=pop]").click(function() {
        $(".popup_wrap").hide();
        
        $($(this).attr("href")).attr("tabindex", 0).fadeIn().focus();
        map.relayout();
        $this = $(this);
        return false;
    });
    $(".popup_close").click(function() {
        $(this).closest(".popup_wrap").hide();
        return false;
    });

    // 이중 팝업 기본
    var $this;
    $("[data-rel=pop2]").click(function() {
        $(".popup_double").hide();
        
        $($(this).attr("href")).attr("tabindex", 0).fadeIn().focus();
        map.relayout();
        $this = $(this);
        return false;
    });
    $(".popup_double .popup_close").click(function() {
        $(this).closest(".popup_double").hide();
        return false;
    });

    // Tab functionality
    $('.tab_wrap_inner > li > a').on('click focus', function() {
        var $thisTabWrap = $(this).closest('.tab_wrap_inner');
        var tab_id = $(this).attr('data-tab');
        
        $thisTabWrap.find('li').removeClass("on");
        $thisTabWrap.find('li > a').removeAttr("title");
        
        $(this).parent().addClass("on");
        $(this).attr("title", "선택됨");
        
        $thisTabWrap.find('.tab_con_inner').hide();
        $thisTabWrap.find('.btn_more_dot').hide();
        
        $thisTabWrap.find("#b_" + tab_id).show();
        $(this).closest('li').find('.btn_more_dot').show(); // Only show the btn_more_dot of the clicked tab
        return false;
    });

    // 페이지 로드 시 절대 위치 요소의 높이를 계산
    window.addEventListener('load', function() {
        const absoluteDivs = document.querySelectorAll('.tab_con_inner');
        const tabWrapInner = document.querySelector('.tab_wrap_inner');
    
        function updateTabWrapHeight() {
            absoluteDivs.forEach(absoluteDiv => {
                if (absoluteDiv.style.display === 'block' || window.getComputedStyle(absoluteDiv).display === 'block') {
                    const absoluteHeight = absoluteDiv.offsetHeight;
                    //tabWrapInner.style.height = absoluteHeight + 'px';
                    tabWrapInner.style.height = (absoluteHeight + 70) + 'px';
                }
            });
        }
    
        // 초기 로드 시 실행
        updateTabWrapHeight();
    
        // MutationObserver를 사용하여 display 속성 변화를 감지
        const observer = new MutationObserver(updateTabWrapHeight);
        
        absoluteDivs.forEach(absoluteDiv => {
            observer.observe(absoluteDiv, { attributes: true, attributeFilter: ['style'] });
        });
    });



    // 통합검색 결과 tab
    $('.search_area .search_result li > a').on('click', function() {
        var tab_id = $(this).attr('data-tab');
        
        // .search_area 내 li에 on 클래스와 title 선택됨 추가
        $(this).parent().addClass('on').siblings().removeClass('on');
        $(this).attr('title', '선택됨').parent().siblings().find('a').removeAttr('title');
        
        // .all 클릭 시 모든 .search_result_inner 보여줌
        if (tab_id === 'all') {
            $('.search_result_area .search_result_inner').show(); // 모든 search_result_inner 보이기
        } else {
            // .search_result_area 내 관련된 tab_wrap_inner만 보이기
            $('.search_result_area .search_result_inner').hide(); // 모든 .tab_con_inner 숨기기
            $('#b_' + tab_id).show(); // 클릭한 탭과 연결된 tab_con_inner 보이기
        }
    
        return false;
    });
    
    
    //FAQ
    $('.accordion dt').click(function() {
        var $this = $(this);
        var $next = $this.next();
    
        // Check if the clicked element is inside a nested accordion
        if ($this.parents('.accordion').length > 1) {
            // It's inside a nested accordion, so only toggle the dd within this context
            if ($next.is('dd')) {
                if ($next.is(':visible')) {
                    $next.slideUp(100);
                } else {
                    $next.slideDown(100);
                }
            }
        } else {
            // It's in the main accordion
            $('.accordion dt').removeClass('active').attr('aria-label', '내용열기');
            if ($next.is('dd')) {
                if ($next.is(':visible')) {
                    $next.slideUp(100);
                } else {
                    $('.accordion dd').slideUp(100);
                    $next.slideDown(100);
                    $this.addClass('active').attr('aria-label', '내용닫기');
                }
            }
        }
        return false;
    });

    $('.btn_open_all').click(function() {
        $('.accordion dd').slideDown(100); // 모든 dd 열기
        $('.accordion dt').addClass('active').attr('aria-label', '내용닫기'); // 모든 dt에 active 클래스 추가
        return false; // 기본 동작 막기
    });
    
    $('.btn_close_all').click(function() {
        $('.accordion dd').slideUp(100); // 모든 dd 닫기
        $('.accordion dt').removeClass('active').attr('aria-label', '내용열기'); // 모든 dt에서 active 클래스 제거
        return false; // 기본 동작 막기
    });

    $('.policy01').click(function() {
        $('.accordion dd').slideUp(100); // 모든 dd 닫기
        $('.accordion dd#policy01').slideDown(100); // 모든 dd 열기
        $('.accordion dt#policy01').addClass('active').attr('aria-label', '내용닫기'); // 모든 dt에 active 클래스 추가
        // Scroll to the relevant dd element
        document.querySelector('.accordion dd#policy01').scrollIntoView({ behavior: 'smooth' });
        return false; // 기본 동작 막기
    });

    $('.policy02').click(function() {
        $('.accordion dd').slideUp(100); // 모든 dd 닫기
        $('.accordion dd#policy02').slideDown(100); // 모든 dd 열기
        $('.accordion dt#policy02').addClass('active').attr('aria-label', '내용닫기'); // 모든 dt에 active 클래스 추가
        // Scroll to the relevant dd element
        document.querySelector('.accordion dd#policy02').scrollIntoView({ behavior: 'smooth' });
        return false; // 기본 동작 막기
    });

    $('.policy03').click(function() {
        $('.accordion dd').slideUp(100); // 모든 dd 닫기
        $('.accordion dd#policy03').slideDown(100); // 모든 dd 열기
        $('.accordion dt#policy03').addClass('active').attr('aria-label', '내용닫기'); // 모든 dt에 active 클래스 추가
        // Scroll to the relevant dd element
        document.querySelector('.accordion dd#policy03').scrollIntoView({ behavior: 'smooth' });
        return false; // 기본 동작 막기
    });

    // 인증서 로그인 tab
    $('.authentication a').click(function() {
        $('.authentication a').not(this).removeClass('on').removeAttr("title");;
        $(this).addClass('on').attr("title", "선택됨");
        return false;
    });

    // 대시보드 아동선택
    $('.choose_child a').click(function() {
        $('.choose_child a').not(this).removeClass('on').removeAttr("title");;
        $(this).addClass('on').attr("title", "선택됨");
        return false;
    });

    // 어린이집찾기 리스트 타입 버튼 
    $('.btn_result_type button').click(function() {
        $('.btn_result_type button').not(this).removeClass('on').removeAttr("title");;
        $(this).addClass('on').attr("title", "선택됨");
        return false;
    });
    //$('.btn_list_type').click(function() {
     //   $('.result_preschool').addClass('list_type');
     //   $(".pagination").show();
     //   return false;
    //});
    //$('.btn_map_type').click(function() {
    //    $('.result_preschool').removeClass('list_type');
    //    $(".pagination").hide();
    //    return false;
    //});

    $('.btn_table_type').click(function() {
        $(".result_preschool_table").show();
        $(".result_preschool").hide();
        return false;
    }); 

    $('.btn_map_type').click(function() {
        $(".result_preschool_table").hide();
        $(".result_preschool").show();
        return false;
    });

    $('th i.icon_arrow').click(function() {
        $(this).toggleClass('down');
        return false;
    });

    $('.custom_select2').click(function() {
        $(".custom_select2_wrap").slideToggle();
        return false;
    }); 

    // 어린이집 찾기 상세 버튼
    document.querySelectorAll('.search_preschool_detail dl').forEach(function(dl) {
        const buttons = dl.querySelectorAll('dd button');
    
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                const prevButton = dl.querySelector('dd button.on');
                if (prevButton) {
                    prevButton.classList.remove('on');
                    prevButton.removeAttribute('title');
                }
                this.classList.add('on');
                this.setAttribute('title', '선택됨');
            });
        });
    });
    


    
    // 어린이집 찾기
    $('.btn_preschool .search').click(function() {
        $(".btn_result_type").show();
        $(".result_preschool_table").show();
        //$(".result_preschool").show();
        // display: block 이 된 직 후,
        window.setTimeout(function() {
            map.relayout();
        }, 0);
        return false;
    });

    // 어린이집 상세검색 버튼
    $('.btn_preschool .btn_detail').click(function() {
        $(".search_preschool_detail").slideToggle(200, function() {
            // 토글 상태에 따라 title 값을 설정합니다.
            if ($(".search_preschool_detail").is(":visible")) {
                $('.btn_preschool .btn_detail').attr("title", "상세검색 닫기");
                $(".search_preschool_detail").attr("tabindex", 0).focus();
            } else {
                $('.btn_preschool .btn_detail').attr("title", "상세검색 열기");
            }
        });
        return false;
    });

    $('.btn_favorite').click(function() {
        $(this).toggleClass('on');  
        if ($(this).hasClass('on')) {
            $(this).attr("title", "즐겨찾기 선택 됨");
        } else {
            $(this).attr("title", "즐겨찾기 해제 됨");
        }
        return false;
    });

    $('.btn_compare').click(function(e) {
        $(".result_compare").show();
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $(this).attr("title", "비교하기 선택 됨");
        } else {
            $(this).attr("title", "비교하기 해제 됨");
        }
        return false;
    });

    $('.map_location_close').click(function(e) {
        e.preventDefault();
        $(this).closest('.map_location').hide();
    });


    $('.result_compare ul li a.btn_close').click(function(e) {
        $(this).closest('.result_compare ul li').hide();
        return false;
    });

    // 통합검색 내가 찾은 검색어
    $('.search_area .search_recommend li .btn_close').click(function(e) {
        $(this).closest('.search_area .search_recommend li').hide();
        return false;
    });

    //보육료결제관리 더보기
    $('.view_more').click(function() {
        $(".view_contents").slideToggle(200, function() {
            // 토글 상태에 따라 title 값을 설정합니다.
            if ($(".view_contents").is(":visible")) {
                $('.view_more').attr("title", "더보기 닫기");
                $(".view_contents").attr("tabindex", 0).focus();
            } else {
                $('.view_more').attr("title", "더보기 열기");
            }
        });
        return false;
    });

    $('.view_more2').click(function() {
        $(".view_contents2").slideToggle(200, function() {
            // 토글 상태에 따라 title 값을 설정합니다.
            if ($(".view_contents2").is(":visible")) {
                $('.view_more2').attr("title", "더보기 닫기");
                $(".view_contents2").attr("tabindex", 0).focus();
            } else {
                $('.view_more2').attr("title", "더보기 열기");
            }
        });
        return false;
    });

    $('.result_btn_group .btn_more').click(function(e) {
        //e.preventDefault();
        var $this = $(this);
        
        // 버튼 위나 아래에 있는 result_detail을 찾음
        var $currentDetail = $this.closest('.result_btn_group').prev('.result_detail').length ?
                            $this.closest('.result_btn_group').prev('.result_detail') :
                            $this.closest('.result_btn_group').next('.result_detail');
        
        // 현재 열려 있는 모든 result_detail을 닫고, 모든 버튼에서 'on' 클래스 제거
        $('.result_detail').not($currentDetail).slideUp(200);
        $('.result_btn_group .btn_more').not($this).removeClass('on').attr('title', '정보 더보기 열기');
        
        // 클릭한 버튼에 대응하는 result_detail 열기/닫기
        $currentDetail.slideToggle(200);
        $this.toggleClass('on');
        
        // title 속성 토글
        if ($this.hasClass('on')) {
            $this.attr('title', '정보 더보기 닫기');
        } else {
            $this.attr('title', '정보 더보기 열기');
        }
        return false;
    });
        
    
    // Selectbox 커스터마이징
    $(document).ready(function() {
        // select_selected 클릭 시 select_items 토글
        $('.custom_select .select_selected').click(function(event) {
            const $selectItems = $(this).closest('.custom_select').find('.select_items');
            
            // 현재 상태에 따라 토글
            if ($selectItems.is(':visible')) {
                $selectItems.slideUp(); // 이미 열려있다면 닫기
            } else {
                $('.custom_select .select_items').slideUp(); // 다른 모든 select_items 닫기
                $selectItems.slideDown(); // 클릭한 select_items 열기
            }
    
            event.stopPropagation(); // 이벤트 전파 방지
        });
    
        // document 클릭 시 모든 select_items 닫기
        $(document).click(function() {
            $('.custom_select .select_items').slideUp();
        });
    });
    

    // 지역선택 select box 커스텀
    document.addEventListener('click', function(event) {
        document.querySelectorAll('.custom_select2_wrap').forEach(function(selectWrap) {
            const isClickInside = selectWrap.contains(event.target);

            // 만약 클릭한 위치가 selectWrap 밖이라면 selectWrap을 숨깁니다.
            if (!isClickInside) {
                selectWrap.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.custom_select2_wrap .select_area').forEach(function(selectArea, index) {
        const selected = selectArea.querySelector('.selected');
        const selectItems = selectArea.querySelector('ul');
        const selectOptions = selectItems.querySelectorAll('li');

        // Add ARIA roles and tabindex for accessibility
        selectArea.setAttribute('role', 'listbox');
        selected.setAttribute('tabindex', '0');
        selected.setAttribute('aria-expanded', 'false');
        selected.setAttribute('aria-haspopup', 'listbox');

        selectOptions.forEach(function(option, optionIndex) {
            option.setAttribute('role', 'option');
            option.querySelector('a').setAttribute('tabindex', '-1');
            option.querySelector('a').setAttribute('id', `option-${optionIndex}`);
        });

        // Toggle the display of the select items when the select box is clicked or Enter/Space is pressed
        selected.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click from propagating to the document
            toggleDropdown(selected, selectItems);
        });

        selected.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDropdown(selected, selectItems);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectOptions[0].querySelector('a').focus();
            }
        });

        // Handle the click or keyboard selection on each item inside the custom select
        selectOptions.forEach(function(item) {
            const anchor = item.querySelector('a');

            anchor.addEventListener('click', function(e) {
                e.preventDefault();  // Prevent default anchor behavior
                selectItem(selected, item, index);
                return false;  // Return false to stop propagation
            });

            anchor.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectItem(selected, item, index);
                    return false;
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    let nextOption = item.nextElementSibling?.querySelector('a');
                    if (nextOption) nextOption.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    let prevOption = item.previousElementSibling?.querySelector('a');
                    if (prevOption) prevOption.focus();
                }
            });
        });
    });

    // Function to toggle the dropdown
    function toggleDropdown(selected, selectItems) {
        const isOpen = selected.getAttribute('aria-expanded') === 'true';
        selected.setAttribute('aria-expanded', !isOpen);
        selectItems.style.display = isOpen ? 'none' : 'block';
    }

    // Function to select an item (and update the title)
    function selectItem(selected, item, selectIndex) {
        // Get the current value of the custom_select2
        const customSelect = document.querySelector('.custom_select2');
        let currentValue = customSelect.textContent.split(' / ').filter(Boolean);

        // Update the selected item and its display
        item.classList.add('on');
        item.setAttribute('title', '선택됨'); // Set title to '선택됨'

        // Remove class 'on' and title '선택됨' from all other li elements within the same select area
        const siblingItems = item.parentElement.querySelectorAll('li');
        siblingItems.forEach(function(li) {
            if (li !== item) {
                li.classList.remove('on'); // Remove class 'on' from other li elements
                li.removeAttribute('title'); // Remove title from other li elements
            }
        });

        // Update the custom_select2 value based on the selected item
        currentValue[selectIndex] = item.querySelector('a').textContent; // Update the respective index
        customSelect.textContent = currentValue.filter(Boolean).join(' / '); // Join with '/'

        // Clear previous selections in custom_select2 if the current item was not previously selected
        // (this is handled by directly replacing the value)
    }


    // tab 스크롤 위치로 이동
    var $activeItem = $('.tab .on'); // .on 클래스를 가진 요소
    var offset = 3 * parseFloat($("html").css("font-size")); // 5rem을 픽셀로 변환

    if ($activeItem.length) {
        // 스크롤 위치에 5rem만큼 여백을 추가
        $('.tab').scrollLeft($activeItem.position().left - offset);
    }

});
