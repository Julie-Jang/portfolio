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
			// .sitemap_view nav의 경우 작동하지 않도록 설정
			if ($(this).closest('.sitemap_view').length > 0) {
				return;
			}
			if($(window).width() >= 1200 && (e.type === "mouseover" || e.type === "focus")) {
			$('header').addClass("on");
			$('nav > ul > li > ul, .menu_bg').stop().slideDown(100);
	
			// Adjust the mouseleave event for the nav menu
			$('nav').on('mouseleave', function(){
				if (!$('.menu_bg:hover ').length) {
					$('nav > ul > li > ul, .menu_bg').stop().slideUp(100);
					$('header').removeClass("on");
				}
			});
	
			$('.menu_bg').on('mouseleave', function(){
				$('nav > ul > li > ul, .menu_bg').stop().slideUp(100);
				$('header').removeClass("on");
			});
			
		} else if ($(window).width() < 1200 && e.type === "click") {
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
		$('nav > ul > li > ul').removeAttr("style");
		$("body").toggleClass("search_active");
		$('.btn_search').removeClass('close');
		return false;	
	});

    // PC Sitemap
    $('.all_menu').on('click', function() {
		const $this = $(this);
		const $targetMenus = $('.header, nav > ul > li > ul, nav > ul > li > ul > li > ul');
		
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
	$(".lnb > ul > li a").on("click", function(e){
		$('.lnb > ul li').removeClass('active');
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


});

