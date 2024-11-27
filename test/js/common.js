$(document).ready(function() {
	// Sticky header
	$(window).on('load resize scroll',function(){
		var gnb = $(this).scrollTop();
		var $header = $('#header');
		var menuHeight = $('#header').outerHeight();
		if(gnb > menuHeight){
			$header.addClass('action');
		}else{
			$header.removeClass('action');
		}
	});
		
	// GNB
	$("nav > ul.gnb > li > a,nav > ul.gnb a, .menu_bg").bind("mouseover focus click", function(e){
		if($(window).width() >= 1350 && (e.type === "mouseover" || e.type === "focus")) {
			$('.menu_dimmed').show();
			$('header').addClass("on");
			$('nav > ul > li > ul, .menu_bg').stop().slideDown(100);
	
			// Adjust the mouseleave event for the nav menu
			$('nav').on('mouseleave', function(){
				if (!$('.menu_bg:hover,.top_search:hover ').length) { // Check if mouse is over menu_dimmed
					$('.menu_dimmed').hide();
					$('nav > ul > li > ul, .menu_bg').stop().slideUp(100);
					$('header').removeClass("on");
				}
			});
	
			// Close the menu when the mouse leaves menu_dimmed
			$('.menu_bg').on('mouseleave', function(){
				$('.menu_dimmed').hide();
				$('nav > ul > li > ul, .menu_bg').stop().slideUp(100);
				$('header').removeClass("on");
			});
			
		} else if ($(window).width() < 1350 && e.type === "click") {
			var clickElement = $(this).next();
			$('nav ul li').removeClass('active');
			
			// 조건 추가: 하위 메뉴가 닫히지 않을 때만 active 유지
			if (clickElement.is('ul') && clickElement.is(':visible')) {
				$(this).closest('li').removeClass('active');
				clickElement.slideUp(100);
			} else if (clickElement.is('ul') && !clickElement.is(':visible')) {
				// 하위 메뉴 열 때만 active 추가
				$(this).closest('li').addClass('active');
				$(this).closest("ul").find("ul").slideUp(100);
				clickElement.slideDown(100);
			}
		
			if ($(this).closest('li').find('ul').children().length === 0) {
				return true;
			} else {
				return false;
			}		
		}
	});
	

	// Mobile menu
	$('.m_menu').click(function() {
		$(this).toggleClass('off');
		$('nav').slideToggle(300);
		$('.menu_dimmed').toggle();
		$('nav > ul > li > ul').removeAttr("style");
		$("body").toggleClass("search_active");
		$(".top_search").hide();
		$('.btn_search').removeClass('close');
		return false;	
	});

	$(".btn_search_open a, .m_util .btn_search").click(function() {
        $(".top_search").slideToggle(function() {
            // 슬라이드 애니메이션 후 Swiper를 재초기화
            //document.querySelectorAll(".slide_show").forEach((slideShowContainer) => {
            //    initializeSwiper(slideShowContainer);
            //});
        });
        $(this).toggleClass("close");
        $('nav > ul > li > ul, .menu_bg').hide();
		$('.m_menu').removeClass('off');
        $('.menu_dimmed').toggle();
		$(".search_recommend").hide();
    });

	$(".top_search .btn_search").click(function() {
        $(".search_recommend").slideToggle();
    });

    $(".m_menu.off, .btn_search_open a.close, .m_util .btn_search.close").click(function() {
		$('.menu_dimmed').hide();
        $(".top_search").slideUp(function() {
            // 슬라이드 애니메이션 후 Swiper를 재초기화
            //document.querySelectorAll(".slide_show").forEach((slideShowContainer) => {
            //    initializeSwiper(slideShowContainer);
            //});
        });
    });

    // PC Sitemap
    $('.all_menu').on('click', function() {
		const $this = $(this);
		const $targetMenus = $('.gnb, nav > ul > li > ul, nav > ul > li > ul > li > ul');
		
		$targetMenus.toggleClass('sitemap_view');
		$this.toggleClass('sitemap_view');
	});
	// all_menu_close 버튼 클릭 이벤트 추가
	$('.all_menu_close').on('click', function() {
		$('.sitemap_view').removeClass('sitemap_view');
	});
		
	// resize
	$(window).resize(function() {
		$('nav').removeAttr("style"); 
		$('nav > ul > li > ul').removeAttr("style");
		$('.menu_bg').removeAttr("style");
		$('.m_menu').removeClass("off");
		$('nav > ul > li').removeClass("active");
		$('nav > ul > li > ul > li > ul').removeAttr("style");
		$('.tab_wrap ul').removeAttr("style"); 
	});
	
	
	// lnb
	$(".lnb > ul > li > ul > li a").on("click", function(e){
		$('.lnb > ul > li > ul li').removeClass('active');
		var clickElement = $(this).next();
		$(this).closest('li').addClass('active');
		if((clickElement.is('ul')) && (clickElement.is(':visible'))) {
				$(this).closest('li').removeClass('active');
				clickElement.slideUp(100);
				$(this).attr('aria-label','하위 메뉴 열기');
			}
			if((clickElement.is('ul')) && (!clickElement.is(':visible'))) {
				$(this).closest("ul").find("ul").slideUp(100);
				clickElement.slideDown(100);
				$(this).attr('aria-label','하위 메뉴 닫기');
		}
		
		if($(this).closest('li').find('ul').children().length == 0) {
				return true;
			} else {
				return false;	
			}
	});
	
	// Top button
	$(".top").click(function(){
		$('body, html').animate({scrollTop:0}, 500);
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
			$(this)
				.removeClass('on') // dropdown이 닫히면 'on' 클래스 제거
				.attr('title', '선택 열기'); // title 업데이트
		} else {
			// 다른 모든 select_items 닫기 및 on 클래스 제거
			$('.custom_select .select_items').slideUp(0);
			$('.custom_select .select_selected')
				.removeClass('on')
				.attr('title', '선택 열기'); // 초기화 시 title도 기본값으로 설정

			$selectItems.slideDown(0); // 클릭한 select_items 열기
			$options.first().focus(); // 첫 번째 항목에 포커스
			$(this)
				.addClass('on') // dropdown이 열리면 'on' 클래스 추가
				.attr('title', '선택 닫기'); // title 업데이트
		}
    
        event.stopPropagation(); // 이벤트 전파 방지
        return false; // 클릭 시 기본 동작 방지
    });
    

	
	let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

	function setFullHeight() {
		var height = window.innerHeight;
		document.querySelector('.menu_dimmed').style.height = height + 'px';
	}
	
	// 페이지 로드 및 화면 크기 변경 시 실행
	window.addEventListener('load', setFullHeight);
	window.addEventListener('resize', setFullHeight);

	// 페이지 로드 및 화면 크기 변경 시 실행
	window.addEventListener('load', setFullHeight);
	window.addEventListener('resize', setFullHeight);

	window.onload = function() {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.parentNode.removeChild(viewport);  // 기존 viewport meta 태그 제거
		var newViewport = document.createElement('meta');
		newViewport.name = "viewport";
		newViewport.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
		document.getElementsByTagName('head')[0].appendChild(newViewport);  // 새로운 viewport 태그 추가
	};

});

