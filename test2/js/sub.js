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
                    tabWrapInner.style.height = (absoluteHeight + 100) + 'px';
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

    // 키보드 이벤트 처리
    $('.custom_select').on('keydown', function (event) {
        const $customSelect = $(this);
        const $selectItems = $customSelect.find('.select_items');
        const $options = $selectItems.find('div');
        let $current = $options.filter('.on'); // 이미 선택된 옵션을 추적

        if (!$selectItems.is(':visible')) return; // 드롭다운이 열리지 않았다면 무시

        if (event.key === 'ArrowDown') {
            // 아래로 이동
            event.preventDefault();
            if (!$current.length || $current.is(':last-child')) {
                $current = $options.first();
            } else {
                $current = $current.next();
            }
            $options.removeClass('on'); // 이전 선택된 항목에서 'on' 클래스 제거
            $current.addClass('on').focus(); // 새로운 항목에 'on' 클래스 추가 및 포커스 이동
        } else if (event.key === 'ArrowUp') {
            // 위로 이동
            event.preventDefault();
            if (!$current.length || $current.is(':first-child')) {
                $current = $options.last();
            } else {
                $current = $current.prev();
            }
            $options.removeClass('on'); // 이전 선택된 항목에서 'on' 클래스 제거
            $current.addClass('on').focus(); // 새로운 항목에 'on' 클래스 추가 및 포커스 이동
        } else if (event.key === 'Enter') {
            // 선택
            event.preventDefault();
            if ($current.length) {
                const selectedText = $current.text();
                $customSelect.find('.select_selected a').html(selectedText); // 선택된 항목을 <a> 태그 안에 삽입

                // 선택된 옵션에 'on' 클래스 추가 및 title="선택됨" 추가
                $options.removeClass('on').removeAttr('title'); // 이전 선택된 항목 초기화
                $current.addClass('on').attr('title', '선택됨'); // 현재 선택된 항목에 클래스 및 title 추가

                $selectItems.slideUp(0);
                $customSelect.find('.select_selected').removeClass('on');
                
            }
        }
    });

    // 선택 항목 클릭 이벤트
    $('.custom_select .select_items div').click(function () {
        const $customSelect = $(this).closest('.custom_select');
        const selectedText = $(this).text();
        const $selectItems = $customSelect.find('.select_items');
        const $options = $selectItems.find('div');

        $customSelect.find('.select_selected a').html(selectedText); // 선택된 항목을 <a> 태그 안에 삽입

        // 선택된 옵션에 'on' 클래스 및 title="선택됨" 추가
        $options.removeClass('on').removeAttr('title'); // 이전 선택된 항목 초기화
        $(this).addClass('on').attr('title', '선택됨'); // 현재 선택된 항목에 클래스 및 title 추가

        $selectItems.slideUp(0); // 선택 후 dropdown 닫기
        $customSelect.find('.select_selected').removeClass('on'); // 선택 후 select_selected에서 'on' 클래스 제거

        return false; // 클릭 시 기본 동작 방지
    });

    // 외부 클릭 시 닫기
    $(document).click(function (event) {
        if (!$(event.target).closest('.custom_select').length) {
            $('.custom_select .select_items').slideUp(0);
            $('.select_selected').removeClass('on');
        }
    });

    // 선택 항목에 tabindex 추가
    $('.custom_select .select_items div').attr('tabindex', '0');


    // tab 스크롤 위치로 이동
    var $activeItem = $('.join_steps li.on, .tab .on'); // .on 클래스를 가진 요소
    var offset = 10 * parseFloat($("html").css("font-size")); // 5rem을 픽셀로 변환

    if ($activeItem.length) {
        // 스크롤 위치에 5rem만큼 여백을 추가
        $('.join_steps, .tab').scrollLeft($activeItem.position().left - offset);
    }
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', event => {
            console.log('Checked:', radio.checked); // 클릭 후 상태 확인
        });
    });


});
