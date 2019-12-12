require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common', 'bootstrapPaginator'], function ($, tmpl, i18n, bootstrap, common, bootstrapPaginator) {
	console.log("list.js");

	if (!common.util.getCookie('isFirst')) {
		common.util.setCookie('isFirst', 0);
		$('.loading-mask').removeClass('hide');
	}

	common.initLoginStatus();
	common.setLanguageCallback(function() {
		$('#breadcrumb_home').text($.i18n.map.Home);
	});

	var labels = [];
	var timer = null;
	
	// var location = window.location.href;
	// var params = common.util.getListParams(location);
	// var menuType = common.util.decodeMenuType(params[params.length - 2]);
	var menuType = common.util.getQueryString('menuType');

	common.util.menu = [];
	common.util.getClassifyNames(menuType, function() {
		initBreadcrumb();
	});

	getMenuAdsCnt();
	handleMenu();
	
	function initBreadcrumb() {
		if (common.util.menu && common.util.menu.length > 0) {
			var u = common.util.getAdvSource().u;
			if (!u) {
				u = common.util.getQueryString('u');
			}
			var queryParams = "";
			if (u) {
				queryParams = "?u=" + u;
			}
			var breadcrumbData = common.util.menu.reverse();
			var breadcrumbHtml = "<li><a id='breadcrumb_home' href='/'>" + $.i18n.map.Home + "</a></li>";
			for (var i = 0; i < breadcrumbData.length; i++) {
				var href = breadcrumbData[i].menu_name + "-l-"
					+ common.util.encodeMenuType(breadcrumbData[i].menu_type) + "-" 
					+ common.util.encodeMenuType(common.util.getUvid()) + ".html" + queryParams;

				if (i == breadcrumbData.length - 1) {
					breadcrumbHtml = breadcrumbHtml + "<li class='active'><a href='" + href + "'>" + breadcrumbData[i].menu_name + "</a></li>";
					$('#product_classify_name').html(breadcrumbData[i].menu_name);

					document.title = breadcrumbData[i].menu_name;
				} else {
					breadcrumbHtml = breadcrumbHtml + "<li><a href='" + href + "'>" + breadcrumbData[i].menu_name + "</a></li>";
				}
			}

			$('.breadcrumb').html(breadcrumbHtml);
		}
	}

	function handleMenu() {
		if (sessionStorage.menus) {
			clearInterval(timer);

			initLeftMenu();
			initMenuData();
		} else if (timer == null) {
			timer = setInterval(function() {
				handleMenu();
			}, 200);
		}
	}

	function initMenuData() {
		var currentMenu = getCurrentMenu();

		if (currentMenu != null && currentMenu.length > 0) {
			var u = common.util.getAdvSource().u;
			if (!u) {
				u = common.util.getQueryString('u');
			}
			var uvid = common.util.encodeMenuType(common.util.getUvid());
			var queryParams = "";
			if (u) {
				queryParams = "?u=" + u;
			}

			for (var i = 0; i < currentMenu.length; i++) {
				var item = currentMenu[i];
				item.link = common.util.formatProductName(item.menu_name) + "-l-" + common.util.encodeMenuType(item.menu_type) + "-" + uvid + ".html" + queryParams;
			}
			$('#item_list').html($("#categoryItemTempl").tmpl(currentMenu));
			$('#item_list').show();
			$('.empty-data').hide();
		} else {
			$('#item_list').hide();
			$('.empty-data').show();
		}

		$('#list_loading').addClass('hide');
		$('.loading-mask').addClass('hide');
		$('.main-wrap').removeClass('invisibility');
		$('footer').removeClass('invisibility');
	}

	function getCurrentMenu() {
		$('#list_loading').removeClass('hide');
		
		var menus = JSON.parse(sessionStorage.menus);
		if (menus) {
			for (var i = 0; i < menus.length; i++) {
				var firstMenu = menus[i];
				if (firstMenu.menu_type == menuType) {
					var list = [];
					for (var j = 0; j < firstMenu.next_menu.length; j++) {
						var secondMenu = firstMenu.next_menu[j];
						if (secondMenu.next_menu && secondMenu.next_menu.length > 0) {
							list = list.concat(secondMenu.next_menu);
						}
					}

					return list;
				} else {
					for (var j = 0; j < firstMenu.next_menu.length; j++) {
						var secondMenu = firstMenu.next_menu[j];
						if (secondMenu.menu_type == menuType) {
							return secondMenu.next_menu;
						}
					}
				}
			}
		}

		return null;
	}

	function initLeftMenu() {
		if (sessionStorage.menus) {
			var menus = JSON.parse(sessionStorage.menus);
			if (menus) {
				$('#classify_list_wrap').html($("#classifyListTempl").tmpl(menus));
				$("#classify_list_wrap a").each(function() {
					var u = common.util.getAdvSource().u;
		
					var href = $(this).attr('href');
					if (href && href.indexOf('-l-') > -1) {
						var paramsArray = common.util.getListParams(href);
						var menuType = paramsArray[paramsArray.length - 2];
			
						menuType = common.util.encodeMenuType(menuType);
						var uvid = common.util.encodeMenuType(common.util.getUvid());
						if (!u) {
							u = common.util.getQueryString('u');
						}
						var queryParams = "";
						if (u) {
							queryParams = "?u=" + u;
						}

						var menuName = href.substring(0, href.indexOf("-l-"));
						newHref = common.util.formatProductName(menuName) + "-l-" + menuType + "-" + uvid + ".html" + queryParams;
						href = newHref;
		
						$(this).attr('href', newHref);
					}
				});

				var spans = $('#classify_list_wrap span');

				for (var i = 0; i < spans.length; i++) {
					if (spans[i].id == menuType) {
						$(spans[i]).addClass('selected');
					} else {
						$(spans[i]).removeClass('selected');
					}

					for (var j = 0; j < common.util.menu.length; j++) {
						if (spans[i].id == common.util.menu[j].menu_type) {
							if ($(spans[i]).parent().parent().parent().parent()[0].id !== 'classify_list_wrap'
								&& $(spans[i]).parent().parent().parent().parent()[0].tagName.toLowerCase() !== 'div') {
								$(spans[i]).parent().parent().parent().parent().find('ul:first').removeClass('hide');
								$(spans[i]).parent().parent().parent().parent().find('.icon-jiantou-xia-cuxiantiao:first').addClass('icon-jiantou-shang-cuxiantiao');
								$(spans[i]).parent().parent().parent().parent().find('.icon-jiantou-xia-cuxiantiao:first').removeClass('icon-jiantou-xia-cuxiantiao');
							}
							
							break;
						}
					}
				}
				
				$('#classify_list_wrap #arrow_icon').bind('click', function () {
					if ($(this).find('i').hasClass('icon-jiantou-xia-cuxiantiao')) {
						$(this).parent().parent().parent().find('ul:first').removeClass('hide');
						$(this).find('i').removeClass('icon-jiantou-xia-cuxiantiao');
						$(this).find('i').addClass('icon-jiantou-shang-cuxiantiao');
					} else {
						$(this).parent().parent().parent().find('ul:first').addClass('hide');
						$(this).find('i').addClass('icon-jiantou-xia-cuxiantiao');
						$(this).find('i').removeClass('icon-jiantou-shang-cuxiantiao');
					}
				});
			}
		} else if (timer == null) {
			timer = setInterval(function() {
				initLeftMenu();
			}, 200);
		}
	}

	function getMenuAdsCnt() {
		common.dao.getMenuAdsCnt({
			productType: menuType
		}, function (result) {
			if (result) {
				$('.category-adv-wrap').show();
				$('.category-adv-wrap').html(result);

			} else {
				$('.category-adv-wrap').hide();
			}
		});
	}
});