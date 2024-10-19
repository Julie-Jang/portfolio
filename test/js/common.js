$(document).ready(function() {
    // Sticky header
    function handleStickyHeader() {
        var gnb = $(window).scrollTop();
        var $header = $('#header');
        var menuHeight = $header.outerHeight();
        $header.toggleClass('action', gnb > menuHeight);
    }

    $(window).on('load resize scroll', handleStickyHeader);

    // GNB
    const $listItems = $('nav > ul > li');

    function toggleMenu(event) {
        const $item = $(this).parent('li');
        const $link = $item.children('a');
        const $subMenu = $item.children('div.depth').children('ul');
        const isActive = $item.toggleClass('active').hasClass('active');
        
        $link.attr({
            'aria-expanded': isActive,
            'title': isActive ? '선택됨' : ''
        });

        $listItems.not($item).removeClass('active')
            .children('a').attr('aria-expanded', 'false').removeAttr('title')
            .next('div.depth').children('ul').slideUp(200);
    }

    function handleResize() {
        $('nav').removeAttr("style");
        $('nav > ul > li > div.depth > ul').removeAttr("style");
        $('.m_menu').removeClass("off");
        $listItems.removeClass('active').children('div.depth').children('ul').removeAttr("style");
    }

    $(window).resize(handleResize);

    // GNB menu handling
    $listItems.each(function() {
        const $item = $(this);
        const $link = $item.children('a');

        $link.on('click', function(event) {
            if ($(window).width() <= 1250) {
                toggleMenu.call(this, event);
                return false; // Prevent default action
            } else {
                const isActive = $item.toggleClass('active').hasClass('active');
                $link.attr({
                    'aria-expanded': isActive,
                    'title': isActive ? '선택됨' : ''
                });

                $listItems.not($item).removeClass('active')
                    .children('a').attr('aria-expanded', 'false').removeAttr('title')
                    .next('div.depth').children('ul').slideUp(200);
            }

            $('nav').removeClass('sitemap_view');
            //$('.all_menu').removeClass('sitemap_view');
            $(this).blur();
        });

        $item.find('div.depth > ul > li > a').on('click', function(event) {
            if ($(window).width() <= 1250) {
                const $subSubMenu = $(this).next('ul');
                const $parentLi = $(this).parent('li');
                
                if ($subSubMenu.length > 0) {
                    $subSubMenu.stop(true, true).slideToggle(200);
                    $parentLi.toggleClass('active');
                    $(this).attr('aria-expanded', $subSubMenu.is(':visible'));

                    const $parentMenu = $parentLi.closest('ul').parent('li');
                    if ($parentMenu.length > 0) {
                        $parentMenu.addClass('active');
                    }

                    $item.find('div.depth > ul > li > ul').not($subSubMenu).slideUp(200);
                    $item.find('div.depth > ul > li').not($parentLi).removeClass('active');
                    $item.find('div.depth > ul > li > a').not($(this)).attr('aria-expanded', 'false');
                }
            }

            $('nav').removeClass('sitemap_view');
            //$('.all_menu').removeClass('sitemap_view');
            $(this).blur();
        });
    });

    // Mobile menu
    $('.m_menu').click(function() {
        $('nav').slideToggle();
        $('nav ul li').removeClass("active");
        $('.m_menu_close').addClass('on');
        $('nav').addClass('on');
        $('.m_menu_close').attr('tabindex', '0').focus();
        return false;
    });

    // Mobile menu
    $('.m_menu_close').click(function() {
        $('nav').slideToggle();
        $('nav').removeClass('on');
        return false;
    });

    // PC Sitemap
    $('.all_menu').click(function() {
        $('nav').addClass('sitemap_view');
        //$(this).toggleClass('sitemap_view');
        $('nav ul').removeAttr("style");
        // Set focus to .all_menu_close a
        $('.all_menu_close a').attr('tabindex', '0').focus();
        return false;
    });
    
	// 전체메뉴 버튼
	function removeSitemapView() {
		$('nav, .all_menu').removeClass('sitemap_view');
		$('nav ul').removeAttr('style');
	}
	$('.all_menu_close, nav.sitemap_view a').on('click', function() {
		removeSitemapView();
		if ($(this).is('nav.sitemap_view a')) {
			$(this).blur();
		}
        return false;
	});

	// 상단 검색 
	$('.search_open_btn a, .top_search_close a').on('click', function() {
        $('.top_search').slideToggle('active');
		return false;
    });

    // 다국어 사이트
    $(".utility li.btn_language a").click(function() {
        $(".language").slideToggle();
    });


    //$(".top").click(function() {
    //    $('body, html').animate({ scrollTop: 0 }, 500);
     //   return false;
    //});

});
