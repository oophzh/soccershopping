require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common', 'bootstrapPaginator'], function ($, tmpl, i18n, bootstrap, common, bootstrapPaginator) {
	console.log("list.js");
	common.initLoginStatus();

	var sort = 1;
	var page = {
		amount: 0,
		curPage: 1,
		pageSize: 0,
	};

	setTimeout(function () {
		$('#sort_method').html($('#sort_list li a:first')[0].text);
		$('#sort_list li a').bind('click', function () {
			$('#sort_method').html($(this)[0].text);

			page.curPage = 1;
			sort = Number($(this)[0].id);
			getList(keyword);
		});
	}, 50);

	var keyword = common.util.getQueryString('keyword');
	$('#keywordSpan').html(keyword);
	$('#search_input').val(keyword);	
	common.setCurrencyCodeCallback(function () {
		getList(keyword);
	});

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

	function getList(keyword) {
		common.dao.searchProducts({
			keyWord: keyword,
			currentPage: page.curPage,
			orderby: sort,
			currencyId: common.util.getLocalCurrency()
		}, function (result) {
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

		});
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
						$('html').scrollTop(0);
						page.curPage = currentPage;
						getList(keyword);
	
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
			$(this).parent().parent().parent().find('.price-wrap .goods-price').html(item.current_price);
			$(this).parent().parent().parent().find('.price-wrap .goods-del-price').html(item.original_price);
		});
	}
});