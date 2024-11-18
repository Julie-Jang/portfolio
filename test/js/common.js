$(document).ready(function() {
	let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
	
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
	$("nav > ul > li > a,nav a, .menu_bg").bind("mouseover focus click", function(e){
		if($(window).width() >= 1350 && (e.type === "mouseover" || e.type === "focus")) {
			$('.menu_dimmed').show();
			$('header').addClass("on");
			$('nav > ul > li > ul, .menu_bg').stop().slideDown(100);
	
			// Adjust the mouseleave event for the nav menu
			$('nav').on('mouseleave', function(){
				if (!$('.menu_bg:hover').length) { // Check if mouse is over menu_dimmed
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
			
		} else if($(window).width() < 1350 && e.type === "click") {
			var clickElement = $(this).next();
			$('nav ul li').removeClass('active');
			$(this).closest('li').addClass('active');
			
			if (clickElement.is('ul') && clickElement.is(':visible')) {
				$(this).closest('li').removeClass('active');
				clickElement.slideUp(100);
			}
			
			if (clickElement.is('ul') && !clickElement.is(':visible')) {
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
	
	// Ensure menu closes on focusout
	$('.end_menu').on('focusout', function(){
		$('nav > ul > li > ul, .menu_bg').slideUp(100);
		$('.menu_dimmed').hide(); // Also hide the dimmed background on focus out
	});
	
	
	
	
	// Mobile menu
	$('.m_menu').click(function() {
		$(this).toggleClass('off');
		$('nav').slideToggle(300);
		$('.menu_dimmed').toggle();
		$('nav > ul > li > ul').removeAttr("style");
		$("body").toggleClass("search_active");
		return false;	
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
	
	// Sub menu
	$(".sub_nav_wrap > div > ul > li").hover(
		function() {
			$(this).addClass("on");
			$(this).find("a").attr("aria-label","메뉴 닫기");
			$(this).find("ul").slideDown(100);
		}, 
		function() {
			$(this).removeClass("on");
			$(this).find("a").attr("aria-label","메뉴 열기");
			$(this).find("ul").slideUp(100);
		}
	);
	$(".sub_nav_wrap > div > ul > li > ul").on("mouseleave",function() {
		$(this).slideUp(100);
		$(this).prev().attr("aria-label","메뉴 열기");
		$(this).parent().removeClass("on");
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
	
	$(".sub_nav_wrap > div > ul > li > ul > li:last-child a").blur(function() {
		$(this).parent().parent().slideUp(100);
		$('.sub_nav_wrap > div > ul > li').removeClass();
		$('.sub_nav_wrap > div > ul > li > a').attr("aria-label","메뉴 열기");
		
	});
	$(".last_menu > a").blur(function() {
		$(this).parent().parent().slideUp(100);
		$('.menu_bg').slideUp(100);
		$('nav > ul > li > ul').slideUp(100);
	});
	
	// Top button
	$(".top").click(function(){
		$('body, html').animate({scrollTop:0}, 500);
		return false;
	});

	// Sub tab
	$('.contents h3.tab_title a').click(function() {
		$(this).parent().next().toggle();
		$(this).parent().toggleClass('on');
	});
	$(window).resize(function() {
		$('.tab_menu ul').removeAttr("style"); 
	});
	

	// Tab menu
	$(".tab_wrap > a").click(function() {
		$(".tab_wrap ul").slideToggle();
		return false;
	});
	
	// Search tab
	$(".sch_tab_box > a").click(function() {
		$(".sch_tab_box ul").slideToggle();
	});

	// language
	$(".utility > li.btn-language > a").click(function() {
		$(".language").slideToggle();
	});
	$('.last_link').on('focusout',function(){
		$(".language").fadeOut();
	});

	// FAQ
	var article = $('.faq .article');
	article.addClass('hide');
	article.find('.a').slideUp(100);
	
	$('.faq .article .trigger').click(function(){
		var myArticle = $(this).parents('.article:first');
		var articleTrigger = $(this);
	
		if (myArticle.hasClass('hide')) {
			article.addClass('hide').removeClass('show'); 
			article.find('.a').slideUp(100); 
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.a').slideDown(100);
			articleTrigger.attr('title', '답변 닫기');
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.a').slideUp(100);
			articleTrigger.attr('title', '답변 열기'); 
		}
	});
	
	$('.faq .hgroup .trigger').click(function(){
		var hidden = $('.faq .article.hide').length;
		var articleTriggers = $('.faq .article .trigger');
		var hgroupTrigger = $(this); 
	
		if (hidden > 0) {
			article.removeClass('hide').addClass('show');
			article.find('.a').slideDown(100);
			articleTriggers.attr('title', '답변 닫기'); 
			hgroupTrigger.attr('title', '답변 모두 닫기'); 
		} else {
			article.removeClass('show').addClass('hide');
			article.find('.a').slideUp(100);
			articleTriggers.attr('title', '답변 열기'); 
			hgroupTrigger.attr('title', '답변 모두 열기'); 
		}
	});
	
});

