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
        $(".result_preschool.result_favorite").hide();
        return false;
    });

    $('.btn_list_type').click(function() {
        $(".result_preschool").hide();
        $(".result_favorite").show();
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
    $('.custom_select .select_selected').click(function (event) {
        const $customSelect = $(this).closest('.custom_select');
        const $selectItems = $customSelect.find('.select_items');
        const $options = $selectItems.find('div');
    
        // 현재 상태에 따라 토글
        if ($selectItems.is(':visible')) {
            $selectItems.slideUp(0); // 이미 열려있다면 닫기
            $(this).removeClass('on'); // dropdown이 닫히면 'on' 클래스 제거
        } else {
            // 다른 모든 select_items 닫기 및 on 클래스 제거
            $('.custom_select .select_items').slideUp(0); 
            $('.custom_select .select_selected').removeClass('on'); // 열려 있던 항목 초기화
    
            $selectItems.slideDown(0); // 클릭한 select_items 열기
            $options.first().focus(); // 첫 번째 항목에 포커스
            $(this).addClass('on'); // dropdown이 열리면 'on' 클래스 추가
        }
    
        event.stopPropagation(); // 이벤트 전파 방지
        return false; // 클릭 시 기본 동작 방지
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
    var $activeItem = $('.join_steps .steps .on, .tab .on'); // .on 클래스를 가진 요소
    var offset = 4 * parseFloat($("html").css("font-size")); // 5rem을 픽셀로 변환

    if ($activeItem.length) {
        // 스크롤 위치에 5rem만큼 여백을 추가
        $('.steps, .tab').scrollLeft($activeItem.position().left - offset);
    }

    //var $activeItem = $('.h2_tab .on'); // .on 클래스를 가진 요소
    //var offset = 3 * parseFloat($("html").css("font-size")); // 5rem을 픽셀로 변환

    //if ($activeItem.length) {
    //    // 스크롤 위치에 5rem만큼 여백을 추가
     //   $('.h2_tab').scrollLeft($activeItem.position().left - offset);
    //}

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('click', event => {
            console.log('Checked:', radio.checked); // 클릭 후 상태 확인
        });
    });

    // 회원가입 라디오 버튼 테이블 
    $('input[name="partAB"]').click(function () {
        if ($(this).attr('id') === 'partA') {
            $("#radio_tab02").hide();
            $("#radio_tab01").show();
        } else if ($(this).attr('id') === 'partB') {
            $("#radio_tab01").hide();
            $("#radio_tab02").show();
        }
    
        // Set the clicked radio button to checked
        $(this).prop('checked', true);
    });
});
