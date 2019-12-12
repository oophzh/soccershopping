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
		$('#sort_method').html($.i18n.map.SortRecommended);
	});

	var sort = 1;
	var page = {
		amount: 0,
		curPage: 1,
		pageSize: 0,
	};
	var labels = [];
	
	var location = window.location.href;
	var params = common.util.getListParams(location);
	var menuType = common.util.decodeMenuType(params[params.length - 2]);

	common.util.menu = [];
	common.util.getClassifyNames(menuType, function() {
		initBreadcrumb();

		$('#sort_method').html($.i18n.map.SortRecommended);
	});
	
	$('#sort_method').html($.i18n.map.SortRecommended);
	$('#sort_list li a').bind('click', function () {
		$('#sort_method').html($(this)[0].text);

		page.curPage = 1;
		sort = Number($(this)[0].id);
		
		getList();
	});

	common.setCurrencyCodeCallback(function () {
		getList(menuType);
	});

	getMenuAdsCnt();

	function initEvent() {
		// $('#item_list .image-wrap, #item_list .goods-name').each(function() {
		// 	var productId = $(this).parent()[0].id;
			
		// 	var href = '';
		// 	var colorId = '';
		// 	if (sessionStorage.img_block == 1 || sessionStorage.img_block == 2) {
		// 		if ($(this).parent().find('.selected')[0]) {
		// 			colorId = $(this).parent().find('.selected')[0].id;
		// 		} else if ($(this).parent().find('.color-wrap').find('img')[0]){
		// 			colorId = $(this).parent().find('.color-wrap').find('img')[0].id;
		// 		}
		// 	}

		// 	if (colorId) {
		// 		href = 'detail.html?productId=' + productId + '&colorId=' + colorId;
		// 	} else {
		// 		href = 'detail.html?productId=' + productId;
		// 	}

		// 	$(this).attr('href', href);
		// });
	}

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

	function getList() {
		$('#list_loading').removeClass('hide');

		common.dao.productsbymenuandtag({
			currencyId: common.util.getLocalCurrency(),
			productType: menuType,
			currentPage: page.curPage,
			orderby: sort,
			tags: labels.join(',')
		}, function (result) {
			initLabelData(result.tags);
			
			if (result.page) {
				page.amount = result.page.amount;
				page.pageSize = result.page.pageSize;
				var startIndex = (page.curPage - 1) * page.pageSize + 1;
				var endIndex = page.curPage * page.pageSize;
				if (endIndex > page.amount) {
					endIndex = page.amount
				}
				$('#current_product_number').html(startIndex + '-' + endIndex);
				$('#product_total_number').html(page.amount);
			} else {
				$('#current_product_number').html(0 + '-' + 0);
				$('#product_total_number').html(0);
			}
			var data = result.products;
			if (data && data.length > 0) {
				initListData(data);
				initColorItemEvent(data);
				if (page.curPage == 1) {
					initPagination();
				}

				$('#item_list').show();
				$('.empty-data').hide();
			} else {
				$('#item_list').hide();
				$('.empty-data').show();
			}

			$('.sort-wrap').removeClass('invisibility');

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
							// var newHref = href.substring(0, href.indexOf("-l-") + 3);
							// newHref = newHref + menuType + "-" + uvid + ".html" + queryParams;

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
			}
			
			$('.loading-mask').addClass('hide');
			$('.main-wrap').removeClass('invisibility');
			$('footer').removeClass('invisibility');
		}, null, function() {
			$('.loading-mask').addClass('hide');
			$('.main-wrap').removeClass('invisibility');
			$('footer').removeClass('invisibility');

			$('#list_loading').addClass('hide');
		});

		initLabelData();
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

	function initLabelData(data) {
		if (data && data.length > 0) {
			$('#label_list_wrap').html($("#labelListTempl").tmpl(data));
			$('.label-item').each(function() {
				for (var i = 0; i < labels.length; i++) {
					if ($(this)[0].id == labels[i]) {
						$(this).addClass("selected");
					}
				}
			});

			$('.label-item').bind('click', function (e) {
				var id = $(this)[0].id;

				if ($(this).hasClass('selected')) {
					$(this).removeClass("selected");

					for (var i = 0; i < labels.length; i++) {
						if (labels[i] == id) {
							labels.splice(i, 1);
						}
					}
				} else {
					$(this).addClass("selected");
	
					labels.push(id);
				}
				
				console.log(labels);

				getList();
			});
		}
	}

	function initListData(data) {
		var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
		var u = common.util.getAdvSource().u;
		if (!u) {
			u = common.util.getQueryString('u');
		}
		var uvid = common.util.encodeMenuType(common.util.getUvid());
		var queryParams = "";
		if (u) {
			queryParams = "?u=" + u;
		}

		for (var i = 0; i < data.length; i++) {
			var product = data[i];

			for (var j = 0; j < product.display_data.length; j++) {
				var colorProduct = product.display_data[j];

				colorProduct.original_price = common.util.formatProductPrice(colorProduct.original_price, currencyConf);
				colorProduct.current_price = common.util.formatProductPrice(colorProduct.current_price, currencyConf);
				colorProduct.img_display = common.util.picUrl + colorProduct.img_display;
				colorProduct.color_img = common.util.picUrl + colorProduct.color_img;
				colorProduct.height = common.util.getImageHeight();
				colorProduct.href = common.util.formatProductName(product.product_name) + "-d-" + common.util.encodeMenuType(product.product_id) + "-" + common.util.encodeMenuType(colorProduct.color_id) + "-" + uvid + ".html" + queryParams;
			}
			product.showColor = sessionStorage.img_block;
		}
		$('#item_list').html($("#productItemTempl").tmpl(data));

		initEvent();
	}

	function initPagination() {
		var totalPage = 0;
		if (page.amount % page.pageSize == 0) {
			totalPage = page.amount / page.pageSize;
		} else {
			totalPage = page.amount / page.pageSize + 1;
		}

		$(function () {
			var options = {
				bootstrapMajorVersion: 1,
				currentPage: page.curPage,
				numberOfPages: 5,
				totalPages: totalPage,
				shouldShowPage: true,
				onPageClicked: function (e, originalEvent, type, currentPage) {
					if (page.curPage !== currentPage) {
						page.curPage = currentPage;

						$('html').scrollTop(0);
						getList();
	
						options.currentPage = currentPage;
						if (e.currentTarget.id == 'top_page') {
							$("#page").bootstrapPaginator(options);
						} else {
							$("#top_page").bootstrapPaginator(options);
						}
					}
				}
			}
			$("#page").bootstrapPaginator(options);
			$("#top_page").bootstrapPaginator(options);
		})
	}

	function initColorItemEvent(data) {
		$("#item_list .color-wrap img").bind('click', function (e) {
			e.stopPropagation();

			var index = $(this).parent().parent().parent().data().data;
			var childIndex = $(this).data().data;
			var item = data[index].display_data[childIndex];

			$(this).parent().parent().find('img').removeClass('selected');
			$(this).addClass('selected');

			// var colorId = $(this).attr('id');
			// var productId = $(this).parent().parent().parent().attr('id');
			// var href = 'detail.html?productId=' + productId + '&colorId=' + colorId;

			var href = item.href;

			$(this).parent().parent().parent().find('a:first').attr('href', href);
			$(this).parent().parent().parent().find('img:first').attr('src', item.img_display);
			$(this).parent().parent().parent().find('.product-name').html(item.pcName);
			$(this).parent().parent().parent().find('.product-ext-name').html(item.pcNameExt);
			$(this).parent().parent().parent().find('.price-wrap .goods-price').html(item.current_price);
			$(this).parent().parent().parent().find('.price-wrap .goods-del-price').html(item.original_price);
		});
	}
});