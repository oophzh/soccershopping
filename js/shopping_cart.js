require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common', 'bootstrapPaginator'], function ($, tmpl, i18n, bootstrap, common, bootstrapPaginator) {
	console.log("cart.js");
	var amountAllowed = "";
	var realAmount = "";
	var couponVaild = false;
	var selectedIndex = 0;
	var selectedProductInfo = {
		productId: '',
		productColorId: ''
	};
	var loadedImageUrls = [];
	var sizeData = [];
	var customData = [];
	var attrCustomData = [];
	var canCustom = false;

	var priceZoneSelectedIndex = 0;
	var page = {
		amount: 0,
		curPage: 1,
		pageSize: 8,
	};
	var hasCountry = false;
	
	initEvent();

	common.setLanguageCallback(function() {
		initTab();
		getCartList();
	});

	common.setCurrencyCodeCallback(function() {
		initTab();
		getCartList();
		getRecentlyBrowseList();
		showPriceZone();
		getCouponList();
	});

	common.initLoginStatus(function(data) {
		if (common.util.getLocalCurrency()) {
			getCartList();
			getRecentlyBrowseList();
			showPriceZone();
		}

		if (data) {
			$('#coupon_hint_wrap').addClass('hide');
			$('#coupon_hint_wrap').attr('href', 'javascript:void(0)');

			getCouponList();
		} else {
			$('#coupon_hint_wrap').removeClass('hide');
			$('#coupon_hint_wrap').attr('href','login.html');
		}
	});

	function initEvent() {
		$('#continue_shopping_btn').click(function () {
			window.location.href = "/";
		});

		$('#checkout_btn').click(function () {
			var productNums = Number($('#product_total_number').text());
			var maxNumber = 3;
			if (sessionStorage.maxnum_allowed) {
				maxNumber = Number(sessionStorage.maxnum_allowed);
			}
			
			if (productNums > maxNumber) {
				$('#error_message').html($.i18n.map.maxErrorMsg1 + " " + maxNumber + $.i18n.map.maxErrorMsg2);
				$('#error_message').removeClass('hide');

				setTimeout(function() {
					alert($.i18n.map.maxErrorMsg1 + " " + maxNumber + $.i18n.map.maxErrorMsg2)
				}, 1);
			} else if (realAmount > amountAllowed) {
				var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
				$('#error_message').html($.i18n.map.maxAmountErrorMsg1 + " " + common.util.formatProductPrice(realAmount, currencyConf) + $.i18n.map.maxAmountErrorMsg2 + " " + common.util.formatProductPrice(amountAllowed, currencyConf) + $.i18n.map.maxAmountErrorMsg3);
				$('#error_message').removeClass('hide');

				setTimeout(function() {
					alert($.i18n.map.maxAmountErrorMsg1 + " " + common.util.formatProductPrice(realAmount, currencyConf) + $.i18n.map.maxAmountErrorMsg2 + " " + common.util.formatProductPrice(amountAllowed, currencyConf) + $.i18n.map.maxAmountErrorMsg3)
				}, 1);
			} else {
				$('#error_message').addClass('hide');

				if (common.util.checkIsLogin()) {
					window.location.href = "../../../checkout_shipping.html";
				} else {
					window.location.href = "../../../login.html";
				}
			}
		});

		$('#apply_btn').click(function () {
			if (couponVaild) {
				sessionStorage.setItem('applyCouponCode', 0);
				$('#coupon_use_info').html("");
				getCartList();
			} else {
				if ($('#coupon_code_input').val() && common.util.getCouponCode()) {
					if (common.util.getCouponCode() === $('#coupon_code_input').val()) {	
						sessionStorage.setItem('applyCouponCode', 1);
						$('.loading-mask').removeClass('hide');
					} else {
						sessionStorage.setItem('applyCouponCode', 0);
						$('#coupon_use_info').html($.i18n.map.ErrorCouponCode);
					}
		
					getCartList();
				}
			}
		});

		$('#free_shipping_tab').click(function() {
			$('#free_shipping_tab').addClass('active');
			$('#recently_browser_tab').removeClass('active');

			$('#shipping_list_wrap').removeClass('hide');
			$('#recently_browse_wrap').addClass('hide');			
		});

		$('#recently_browser_tab').click(function() {
			$('#recently_browser_tab').addClass('active');
			$('#free_shipping_tab').removeClass('active');

			$('#shipping_list_wrap').addClass('hide');
			$('#recently_browse_wrap').removeClass('hide');
		});

		$("#midimg").load(function(e){
			console.log('big image loading');
			$('#imageLoading').addClass('hide');

			loadedImageUrls.push(e.currentTarget.currentSrc);
		});

		$('#addCartBtn').unbind('click').click(function () {
			console.log('addCartBtn');

			addCartForAll();
		});

		$('#customBtn').click(function () {
			showCustomMask();
		});

	}

	function initTab() {
		var title = $.i18n.map.FreeShippingTitle;
		if (title) {
			title = title[0].replace('$price', sessionStorage.freeShippingAmount);
			$('#free_shipping_tab').html(title);
		}
		
		if (sessionStorage.priceRange && sessionStorage.priceRange !== 'undefined') {
			$('#free_shipping_tab').addClass('active');
			$('#recently_browser_tab').removeClass('active');
		
			$('#shipping_list_wrap').removeClass('hide');
			$('#recently_browse_wrap').addClass('hide');
		} else {
			$('#recently_browser_tab').addClass('active');
		}
	}

	function getCouponList() {
		common.dao.getCoupon({
			userId: common.util.getUserId(),
			currencyId: common.util.getLocalCurrency()
		}, function(result) {			
			if (result) {
				var data = [result]
				$('#coupon_list_wrap').html($("#couponListTempl").tmpl(data));
				$('#coupon_list_wrap #code_text').html($.i18n.map.Code);

				sessionStorage.setItem('couponCode', result.cpId);
				$('#coupon_code_input').val(result.cpId);
			}
		});
	}

	function getCartList() {
		couponVaild = false;

		var applyCpNo = "";
		if (sessionStorage.applyCouponCode == 1) {
			applyCpNo = common.util.getCouponCode();
		}

		var param = {};
		if (common.util.checkIsLogin()) {
			param = {
				currencyId: common.util.getLocalCurrency(),
				userId: common.util.getUserId(),
				cart: [],
				applyCpNo: applyCpNo
			}
		} else if (localStorage.productList && localStorage.productList !== '[]') {
			param = {
				currencyId: common.util.getLocalCurrency(),
				userId: '',
				cart: JSON.parse(localStorage.productList),
				applyCpNo: applyCpNo
			}			
		} else {
			$('#cart_cost_title').hide();
			$('#cart_cost_wrap').hide();
			$('#cart_list').hide();
			$('#empty_cart').show();
			$('#product_total_number').html(0);
			$('#cart_product_number').html("0");
			$('#cart_product_number').show();	
			$('.loading-mask').addClass('hide');

			if ($('.main-wrap').hasClass('invisibility')) {
				$('.main-wrap').removeClass('invisibility');
			}
			return;
		}

		common.dao.shoppingCartNoShipping({
			inputParams: JSON.stringify(param)
		}, function (data) {
			$('.loading-mask').addClass('hide');

			if (data.cart && data.cart.length > 0) {
				$('#cart_list').show();
				$('#cart_cost_title').show();
				$('#cart_cost_wrap').show();
				$('#empty_cart').hide();
				initCartInfo(data);

				if (!hasCountry) {
					hasCountry = true;
					$.getJSON("/resources/json/country.json", function (result) {
					});
				}
			} else {
				$('#cart_cost_title').hide();
				$('#cart_cost_wrap').hide();
				$('#cart_list').hide();
				$('#empty_cart').show();
				$('#product_total_number').html(0);
				$('#cart_product_number').html("0");
				$('#cart_product_number').show();	
			}

			if ($('.main-wrap').hasClass('invisibility')) {
				$('.main-wrap').removeClass('invisibility');
				$('.loading-mask').addClass('hide');
			}
		}, function() {
			$('.loading-mask').addClass('hide');
		});
	}

	function initCartInfo(data) {
		var productNums = 0;
		var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
		var u = common.util.getAdvSource().u;
		if (!u) {
			u = common.util.getQueryString('u');
		}
		var queryParams = "";
		if (u) {
			queryParams = "?u=" + u;
		}
		var uvid = common.util.encodeMenuType(common.util.getUvid());

		for (var i = 0; i < data.cart.length; i++) {
			var cartItem = data.cart[i];
			cartItem.displayImg = common.util.picUrl + cartItem.displayImg;
			cartItem.cost = common.util.formatProductPrice(cartItem.cost, currencyConf);
			cartItem.unitPrice = common.util.formatProductPrice(cartItem.unitPrice, currencyConf);

			var href = common.util.formatProductName(cartItem.productName) + "-d-" + common.util.encodeMenuType(cartItem.productId) + "-" + common.util.encodeMenuType(cartItem.productColorId) + "-" + uvid + ".html" + queryParams;
			cartItem.href = href;

			productNums = productNums + Number(cartItem.productNum);
		}
		$('#cart_list').html($("#cartTempl").tmpl(data.cart));
		$('#cart_list #color_title').html($.i18n.map.ColorTitle);
		$('#cart_list #remove_label').html($.i18n.map.Remove);

		$('#product_total_number').html(productNums);

		if (productNums > 0) {
			$('#cart_product_number').html(productNums);
			$('#cart_product_number').show();
		} else {
			$('#cart_product_number').html("0");
			$('#cart_product_number').show();
		}

		var maxNumber = 3;
		if (sessionStorage.maxnum_allowed) {
			maxNumber = Number(sessionStorage.maxnum_allowed);
		}
		if (productNums <= maxNumber) {
			$('#error_message').addClass('hide');
		}
		
		for (var i = 0; i < data.cart.length; i++) {
			if (data.cart[i].productNum <= 10) {
				$('#qty_list_' + i + ' option[value=' + data.cart[i].productNum + ']').attr("selected", "selected");
			} else {
				$('#qty_list_' + i).hide();

				$('#qty_list_' + i).parent().find('input').show();
				$('#qty_list_' + i).parent().find('input').val(data.cart[i].productNum);
			}

			$('#' + i + " .remove-btn").each(function () {
				$(this).click(function () {
					console.log("del " + $(this).parent().parent().data().data + 'item');
					var parentIndex = $(this).parent().parent().parent().parent().data().data;
					
					changeProductNumber(parentIndex, 0, data);
				});
			});
		}

		$('.qty-content select option[value=11]').html($.i18n.map.MoreNumber);
		$('.qty-content select').change(function() {
			if ($(this).val() == '11') {
				$(this).hide();
			
				$(this).parent().find('input').show();
			} else {
				var selectedQty = $(this).find('option:selected').text();
				var parentIndex = $(this).parent().parent().data().data;
				changeProductNumber(parentIndex, selectedQty, data);
			}
		});

		$('.qty-content input').blur(function() {
			var selectedQty = $(this).val();
			var parentIndex = $(this).parent().parent().data().data;
			changeProductNumber(parentIndex, selectedQty, data);
		});

		for (var i = 0; i < data.dis_info.length; i++) {
			var disInfoItem = data.dis_info[i];
			if (disInfoItem.disAmount < 0) {
				disInfoItem.disAmount = "-" + common.util.formatProductPrice(-disInfoItem.disAmount, currencyConf);
			} else {
				disInfoItem.disAmount = common.util.formatProductPrice(disInfoItem.disAmount, currencyConf);
			}

			if (disInfoItem.policyId == 8) {
				couponVaild = true;
			}
		}
		$('#dis_info_list').html($("#disInfoTempl").tmpl(data.dis_info));
		if (couponVaild) {
			$('#apply_btn').text($.i18n.map.Cancel);
			$('#apply_btn').css('background', '#333');			
		} else {
			$('#apply_btn').text($.i18n.map.Apply);
			$('#apply_btn').css('background', '#ea5455');			
		}

		if (data.reachFreeShipping && data.reachFreeShipping == 1) {
			$('#free_tip').css('color', '#008800');
			$('#free_tip').html(data.freeShippingInfo);

			
		} else {
			$('#free_tip').css('color', '#333');
			var tip = $.i18n.map.FreeShippingTip;
			if (tip) {
				tip = tip.replace('$price', "<span style='color: #ea5455;'>" + data.freeShippingInfo + "</span>");
				tip = tip + "<span id='free_tip_add_more' class='free-tip-add-more'>" + $.i18n.map.AddFreeShipping + "</span>"
			}

			$('#free_tip').html(tip);

			$('#free_tip_add_more').click(function() {
				$('#free_shipping_tab').addClass('active');
				$('#recently_browser_tab').removeClass('active');

				$('#shipping_list_wrap').removeClass('hide');
				$('#recently_browse_wrap').addClass('hide');
				
				window.scrollTo(0, $('#free_shipping_tab').offset().top - 150);
			});

			if (sessionStorage.priceRange && sessionStorage.priceRange !== 'undefined') {
				var priceZoneData = JSON.parse(sessionStorage.priceRange);
	
				if (priceZoneData && priceZoneData.length > 0) {
					$('#free_tip_add_more').css('display','inline-block');
				}
			} else {
				$('#free_tip_add_more').css('display','none');
			}
		}
		
		$('#sub_total').html(common.util.formatProductPrice(data.amount, currencyConf));
		$('#grand_total').html(common.util.formatProductPrice(data.realAmount, currencyConf));

		if (data.cpPromptInfo) {
			$('#coupon_use_info').html(data.cpPromptInfo);
		}

		realAmount = data.realAmount;
		amountAllowed = data.amountAllowed;
	}

	function changeProductNumber(parentIndex, selectedQty, data) {
		console.log("changeProductNumber");
		if (common.util.checkIsLogin()) {
			var productInfo = data.cart[parentIndex];
			productInfo.productNum = Number(selectedQty);
			productInfo.userId = common.util.getUserId();

			$('.loading-mask').removeClass('hide');
			common.dao.shoppingCartMt({
				inputParams: JSON.stringify([productInfo])
			}, function(result) {
				getCartList();
			});
		} else {
			if (localStorage.productList) {
				$('.loading-mask').removeClass('hide');
				
				var productList = JSON.parse(localStorage.productList);
				if (Number(selectedQty) == 0) {
					productList.splice(parentIndex, 1);
				} else {
					var productInfo = productList[parentIndex];
					productInfo.productNum = Number(selectedQty);
				}
				localStorage.setItem('productList', JSON.stringify(productList));
	
				getCartList();
			}
		}
	}

	function getRecentlyBrowseList() {
		var products = [];
		if (sessionStorage.currentBrowseList) {
			products = JSON.parse(sessionStorage.currentBrowseList);
		}
		var inputParams = {
			currencyId: common.util.getLocalCurrency(),
			products: products
		};
		common.dao.productsViewed({
			inputParams: JSON.stringify(inputParams)
		}, function(data) {
			if (data && data.length > 0) {
				var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
				var u = common.util.getAdvSource().u;
				if (!u) {
					u = common.util.getQueryString('u');
				}
				var queryParams = "";
				if (u) {
					queryParams = "?u=" + u;
				}
				var uvid = common.util.encodeMenuType(common.util.getUvid());

				for (var i = 0; i < data.length; i++) {
					var product = data[i];

					product.orgPrice = common.util.formatProductPrice(product.orgPrice, currencyConf);
					product.curPrice = common.util.formatProductPrice(product.curPrice, currencyConf);
					product.imgDisplay = common.util.picUrl + product.imgDisplay;
					product.height = common.util.getCartImageHeight();

					var href = common.util.formatProductName(product.productName) + "-d-" + common.util.encodeMenuType(product.productId) + "-" + common.util.encodeMenuType(product.productColorId) + "-" + uvid + ".html" + queryParams;
					product.href = href;
				}
				$('#product_viewed_list_wrap').html($("#productViewedListTempl").tmpl(data));

				$('#recently_browse_wrap').find('.free-shpping-empty-data').addClass('hide');
			} else {
				$('#recently_browse_wrap').find('.free-shpping-empty-data').removeClass('hide');
			}	
		});
	}

	function showPriceZone() {
		if (sessionStorage.priceRange && sessionStorage.priceRange !== 'undefined') {
			var priceZoneData = JSON.parse(sessionStorage.priceRange);

			if (priceZoneData && priceZoneData.length > 0) {
				$('#price_zone_list').html($("#priceZoneTempl").tmpl(priceZoneData));
				$($('#price_zone_list').find('li')[priceZoneSelectedIndex]).addClass('current');
		
				$('#price_zone_list li').each(function() {
					$(this).click(function () {
						priceZoneSelectedIndex = $(this)[0].id;
		
						$('#price_zone_list').find('li').removeClass('current');
						$(this).addClass('current');
						
						page.curPage = 1;
						getShippingFreeList(priceZoneData[priceZoneSelectedIndex].from, priceZoneData[priceZoneSelectedIndex].to);
					});
				});
		
				$('#price_zone_list').find('li').removeClass('current');
				$($('#price_zone_list').find('li')[priceZoneSelectedIndex]).addClass('current');
				getShippingFreeList(priceZoneData[priceZoneSelectedIndex].from, priceZoneData[priceZoneSelectedIndex].to);
			}
		} else {
			$('#free_shipping_tab').addClass('hide');
			$('#shipping_list_wrap').addClass('hide');
			$('#recently_browse_wrap').removeClass('hide');
		}
	}

	function getShippingFreeList(from, to) {
		$('#shipping_list_wrap .shipping-list-loading-data').removeClass('hide');
		// $('#shipping_list_wrap').find('.empty-data').addClass('hide');
		// $('#shipping_list_wrap').find('#page_wrap').addClass('hide');
		// $('#shipping_list_wrap').find('#shipping_list').addClass('hide');

		common.dao.productsByPriceRange({
			currencyId: common.util.getLocalCurrency(),
			currentPage: page.curPage,
			from: from,
			to: to
		}, function (result) {
			if (result.page) {
				page.amount = result.page.amount;
				page.pageSize = result.page.pageSize;
			}
			var data = result.products;
			if (data && data.length > 0) {
				var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
				// var t = common.util.getAdvSource().t;
				// var u = common.util.getAdvSource().u;
				// if (!t) {
				// 	t = common.util.getQueryString('t');
				// 	u = common.util.getQueryString('u');
				// }
				// var uvid = common.util.encodeMenuType(common.util.getUvid());

				for (var i = 0; i < data.length; i++) {
					var product = data[i];
					
					product.original_price = common.util.formatProductPrice(product.original_price, currencyConf);
					product.current_price = common.util.formatProductPrice(product.current_price, currencyConf);
					product.img_display = common.util.picUrl + product.img_display;
					product.height = common.util.getCartImageHeight();

					// var href = escape(product.pcName) + "-d-" + t + "-" + u + "-" + common.util.encodeMenuType(product.product_id) + "-" + common.util.encodeMenuType(product.color_id) + "-" + uvid + ".html";
					// product.href = href;
				}
				$('#shipping_list').html($("#shippingListTempl").tmpl(data));

				$('.free-shipping-item').each(function() {
					$(this).click(function () {
						var productId = $(this)[0].id;

						showProductDetail(productId);
					});
				});

				if (page.curPage == 1) {
					initPagination();
				}

				$('#shipping_list_wrap').find('.free-shpping-empty-data').addClass('hide');
				$('#shipping_list_wrap').find('#page_wrap').removeClass('hide');
				$('#shipping_list_wrap').find('#shipping_list').removeClass('hide');
				$('#shipping_list_wrap .shipping-list-loading-data').addClass('hide');	
			} else {
				$('#shipping_list_wrap').find('.free-shpping-empty-data').removeClass('hide');
				$('#shipping_list_wrap').find('#page_wrap').addClass('hide');
				$('#shipping_list_wrap').find('#shipping_list').addClass('hide');
				$('#shipping_list_wrap .shipping-list-loading-data').addClass('hide');	
			}
		}, function() {
			$('#shipping_list_wrap').find('.free-shpping-empty-data').removeClass('hide');
			$('#shipping_list_wrap').find('#page_wrap').addClass('hide');
			$('#shipping_list_wrap').find('#shipping_list').addClass('hide');
			$('#shipping_list_wrap .shipping-list-loading-data').addClass('hide');	
		});
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
					page.curPage = currentPage;

					var priceZoneData = JSON.parse(sessionStorage.priceRange);
					getShippingFreeList(priceZoneData[priceZoneSelectedIndex].from, priceZoneData[priceZoneSelectedIndex].to);
					
					options.currentPage = currentPage;
					$("#page").bootstrapPaginator(options);
				}
			}
			$("#page").bootstrapPaginator(options);
		})
	}

	function showProductDetail(productId) {
		common.dao.productDetail({
			productId: productId,
			currencyId: common.util.getLocalCurrency()
		}, function (data) {
			if (!data.product_id) {
				return;
			}

			selectedProductInfo.productId = data.product_id;
			
			var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
			for (var i = 0; i < data.color_data.length; i++) {
				var product = data.color_data[i];

				product.original_price = common.util.formatProductPrice(product.original_price, currencyConf);
				product.current_price = common.util.formatProductPrice(product.current_price, currencyConf);
				product.img_display = common.util.picUrl + product.img_display;
				product.color_img = common.util.picUrl + product.color_img;
				product.width = 200;
				product.height = 200;

				for (var j = 0; j < product.img_groups.length; j++) {
					var imageInfo = product.img_groups[j];
					imageInfo.small_img = common.util.picUrl + imageInfo.small_img;
					imageInfo.big_img = common.util.picUrl + imageInfo.big_img;
				}
			}

			if (data.product_des) {
				$('.description').html(data.product_des);
			} else {
				$('.description').parent().parent().hide();
			}

			$('#name').html(data.color_data[selectedIndex].pcName);
			$('#product_ext_name').html(data.color_data[selectedIndex].pcNameExt);			
			$('#current_price').html(data.color_data[selectedIndex].current_price);
			$('#original_price').html(data.color_data[selectedIndex].original_price);

			initColorList(data.color_data);
			initDynAttrList(data.color_data[selectedIndex].dyn_attrs);
			initQtyList();
			initProductImage(data.color_data[selectedIndex].img_groups);

			$('#product_detail_mask').removeClass('hide');
			$('#product_detail_mask #close_btn').click(function() {
				$('#product_detail_mask').addClass('hide');
			});
		});
	}

	function initColorList(colorList) {
		if (colorList.length == 1) {
			selectedProductInfo.productColorId = colorList[0].color_id;
		} else {
			$('#color_data_wrap').removeClass('hide');
			$('#color_list').html($("#colorItem").tmpl(colorList));
			$($('#color_list li')[selectedIndex]).find('span').css('display', 'block');
			$($('#color_list li')[selectedIndex]).find('img').addClass('selected-image-border');
	
			$('#color_desc').html(colorList[selectedIndex].color_des);
			selectedProductInfo.productColorId = colorList[selectedIndex].color_id;
	
			$("#color_list li").bind("click", function () {
				if ($(this).find('span').css("display") == 'none') {
					$("#color_list li").find('span').css('display', 'none');
					$("#color_list li").find('img').removeClass('selected-image-border');
	
					$(this).find('span').css('display', 'block');
					$(this).find('img').addClass('selected-image-border');
	
					var index = $(this).data().data;
					$('#color_desc').html(colorList[index].color_des);
					$('#name').html(colorList[index].pcName);
					$('#product_ext_name').html(colorList[index].pcNameExt);	
					$('#current_price').html(colorList[index].current_price);
					$('#original_price').html(colorList[index].original_price);
					selectedProductInfo.productColorId = colorList[index].color_id;
	
					initProductImage(colorList[index].img_groups);
				}
			})
		}
	}

	function initDynAttrList(attrList) {
		canCustom = false;
		attrCustomData = [];
		sizeData = [];
		$('#customBtn').addClass('hide');

		$("#dyn_attrs_list").html($("#dynAttrsItem").tmpl(attrList));
		$('#attr_name_hint').html($.i18n.map.PrintNameHint);
		$('#attr_number_hint').html($.i18n.map.PrintNumberHint);
		$('#dyn_attrs_list option[value=11]').html($.i18n.map.MoreNumber);

		var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
		for (var i = 0; i < attrList.length; i++) {
			var attrItem = attrList[i];
			if (attrItem.domain_list && attrItem.domain_list.length > 0) {
				$('#' + attrItem.attr_name + '_content').html(attrItem.domain_list[0]);
				attrItem.selectedAttr = attrItem.domain_list[0].optId;
			
				if (attrItem.attr_name == 'Size') {
					$('#size_guide').html($.i18n.map.SizeGuide);

					for (var j = 0; j < attrItem.domain_list.length; j++) {
						var item = attrItem.domain_list[j];
						item.attrType = attrItem.attrID;
						sizeData.push(item);
					}
				}
			}

			if (attrItem.input_cmp) {
				attrCustomData.push(attrItem);
				canCustom = true;
				$('#customBtn').removeClass("hide");
			}
			
			// attrID: 3:number  4:name
			if (attrItem.attrID == '3') {
				$('#print_number_price').html("+" + common.util.formatProductPrice(attrItem.input_cmp.price, currencyConf));
			}

			if (attrItem.attrID == '4') {
				$('#print_name_price').html("+" + common.util.formatProductPrice(attrItem.input_cmp.price, currencyConf));
			}
		}

		handleCustomData();
		
		$("#dyn_attrs_list select").change(function() {
			console.log("#dyn_attrs_list select value = " + $(this).val());

			if ($(this).val() == '11') {
				$(this).hide();
				
				$(this).parent().find('input').show();
			} else {
				$("#custom_" + $(this)[0].id + ' option[value=' + $(this).val() + ']').prop("selected", "selected");

				refreshCustomList();
			}
		});

		$("#dyn_attrs_list input").blur(function() {
			var number = $(this).val();
			if (number <= 10) {
				var selcetId = $(this).parent().find('select')[0].id;
				$("#custom_" + selcetId + ' option[value=' + number + ']').prop("selected", "selected");
			} else {
				var selcetId = $(this).parent().find('select')[0].id;
				var otherSelcetId = "#" + selcetId;
				$(otherSelcetId).hide();
				$(otherSelcetId).parent().find('input').show();
				$(otherSelcetId).parent().find('input').val(number);
			}
			
			refreshCustomList();
		});

		$('#size_guide').click(function () {
			$('#size_guide_mask').removeClass('hide');

			$('body').css('overflow', 'hidden');
		});

		$('#size_guide_mask #close_btn').click(function () {
		   $('#size_guide_mask').addClass('hide');
		   
		   $('body').css('overflow', 'auto');
	   });
	}

	function refreshCustomList() {
		//要触发的事件
		customData = initCustomAttr();
		$('#custome_attr_list').html('');
		$('#custome_attr_list').html($("#customAttrItem").tmpl(customData));
	}

	function handleCustomData() {
		// 获取size的数据
		if (sizeData && sizeData.length > 0) {
			$('#size_list').html($("#customSizeItem").tmpl(sizeData));
			$('#size_list select option[value=11]').html($.i18n.map.MoreNumber);

			refreshCustomList();

			$("#size_list select").change(function() {
				console.log("#size_list select value = " + $(this).val());

				$("#" + $(this)[0].id.substring($(this)[0].id.indexOf('_') + 1) + ' option[value=' + $(this).val() + ']').prop("selected", "selected");
				if ($(this).val() == '11') {
					$(this).hide();
				
					$(this).parent().find('input').show();
				} else {
					refreshCustomList();
				}
			});

			$("#size_list input").blur(function() {
				var number = $(this).val();
				if (number <= 10) {
					var selcetId = $(this).parent().find('select')[0].id;
					$("#" + selcetId.substring(selcetId.indexOf('_') + 1) + ' option[value=' + number + ']').prop("selected", "selected");
				} else {

					var selcetId = $(this).parent().find('select')[0].id;
					var otherSelcetId = "#" + selcetId.substring(selcetId.indexOf('_') + 1);
					$(otherSelcetId).hide();
					$(otherSelcetId).parent().find('input').show();
					$(otherSelcetId).parent().find('input').val(number);
				}
				
				refreshCustomList();
			});
		}

		initCustomEvent();
	}

	function showCustomMask() {
		handleCustomData();
		$('#custom_wrap_mask').removeClass('hide');

		$('body').css('overflow', 'hidden');
	}

	function initCustomAttr() {
		var data = [];
		for (var i = 0; i < sizeData.length; i++) {
			var sizeItem = sizeData[i];

			var number = $('#' + sizeItem.optId + '_number_list').val();
			if (number == '11') {
				number = $('#' + sizeItem.optId + '_number_list').parent().find('input').val();
				if (!number) {
					number = 0;
				}
			}
			
			sizeItem.number = number;

			if (Number(number) <= 10) {
				$('#custom_' + sizeItem.optId + '_number_list' + ' option[value=' + number + ']').prop("selected", "selected");
			} else {				
				$('#custom_' + sizeItem.optId + '_number_list').hide();
				$('#custom_' + sizeItem.optId + '_number_list').parent().find('input').show();

				$('#custom_' + sizeItem.optId + '_number_list').parent().find('input').val(number);
			}

			sizeItem.customs = [];
			if (number > 0) {
				for (var j = 0; j < number; j++) {
					for (var k = 0; k < attrCustomData.length; k++) {
						attrCustomData[k].position = j;
						
						var custominfo = $('#print_input_' + sizeItem.optId + "_" + attrCustomData[k].attrID + '_' + attrCustomData[k].position).val();
						attrCustomData[k].custominfo = custominfo;
					}

					sizeItem.customs.push(JSON.parse(JSON.stringify({attrs: attrCustomData})));
				}
				data.push(sizeItem);
			}
		}

		return data;
	}

	function hideCustomMask() {
		$('#custom_wrap_mask').addClass('hide');

		$('body').css('overflow', 'auto');
	}

	function addCartForAll() {
		var productList = null;
		if (canCustom) {
			productList = getProductList();
		} else {
			productList = getProductListForNormal();
		}
		
		if (productList == null || productList.length == 0) {
			hideCustomMask();
			return;
		}
		
		if (common.util.checkIsLogin()) {
			addCartForUser(productList);
		} else {
			addCartForLocal(productList);
		}
	}

	function addCartForUser(productList) {
		common.dao.merge2cart({
			inputParams: JSON.stringify(productList)
		}, function () {
			window.location.href = "../../../shopping_cart.html";
			hideCustomMask();
		}, function(result) {
			hideCustomMask();
			alert(result.msg);
		});
	}

	function addCartForLocal(productList) {
		var data = localStorage.productList;
		if (data) {
			data = JSON.parse(data);
		} else {
			data = [];
		}

		if (data.length == 0) {
			data = productList;
		} else {
			for (var i = 0; i < productList.length; i++) {
				var productItem = productList[i];
				
				var hasProduct = false;
				var attrOptsString = JSON.stringify(productItem.attrOpts);
				for (var j = 0; j < data.length; j++) {
					var dataItem = data[j];
					if (attrOptsString == JSON.stringify(dataItem.attrOpts)) {
						dataItem.productNum = dataItem.productNum + productItem.productNum;
						hasProduct = true;
					}
				}

				if (!hasProduct) {
					data.push(productItem);
				}
			}
		}

		localStorage.productList = JSON.stringify(data);

		var cartNumber = 0;
		for (var j = 0; j < data.length; j++) {
			cartNumber = parseInt(cartNumber) + parseInt(data[j].productNum);
		}

		$('#cart_product_number').html(cartNumber);
		$('#cart_product_number').show();

		window.location.href = "../../../shopping_cart.html";
		hideCustomMask();
	}

	function formatProductList(data) {
		for (var i = 0; i < data.length; i++) {
			var productItem = data[i];
			
			var attrOptsString = JSON.stringify(productItem.attrOpts);
			for (var j = i + 1; j < data.length; j++) {
				var nextProductItem = data[j];

				if (attrOptsString == JSON.stringify(nextProductItem.attrOpts)) {
					productItem.productNum = productItem.productNum + nextProductItem.productNum;

					data.splice(j, 1);
					j = j - 1;
				}
			}
		}

		return data;
	}

	function getProductList() {
		var data = [];

		var product = {
			userId: common.util.getUserId(),
			productId: selectedProductInfo.productId,
			productColorId: selectedProductInfo.productColorId,
			productNum: 1,
			attrOpts: [
				{
					attrType: '',
					attrOptId: '',
					custominfo: ''
				}
			]
		};

		// 自定义属性，添加购物车
		if (customData && customData.length > 0) {
			for (var i = 0; i < customData.length; i++) {
				var sizeItem = customData[i];

				for (var j = 0; j < sizeItem.customs.length; j++) {
					var attrOpts = [{
						attrType: sizeItem.attrType,
						attrOptId: sizeItem.optId
					}];

					var attrArrayItem = sizeItem.customs[j].attrs;
					for (var k = 0; k < attrArrayItem.length; k++) {
						var attrItem = attrArrayItem[k];

						var custominfo = $('#print_input_' + sizeItem.optId + "_" + attrItem.attrID + '_' + attrItem.position).val();
						attrOpts.push({
							attrType: attrItem.attrID,
							attrOptId: attrItem.input_cmp.optId,
							custominfo: custominfo
						});
					}

					product.attrOpts = attrOpts;

					data.push(JSON.parse(JSON.stringify(product)));
				}
			}
		}
		
		console.log(data);

		return formatProductList(data);
	}

	function initCustomEvent() {
		$('#custom_confirm_btn').unbind('click').click(function () {			
			addCartForAll();
		});

		$('#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn').unbind('click').click(function () {
			hideCustomMask();
		});
	}

	function initQtyList() {
		$("#qty_list option[value='1']").prop("selected", "selected");
		var selectValue = $('#qty_list').find('option:selected').val();
		selectedProductInfo.productNum = Number(selectValue);

		$('#qty_list').on('change',function(){
			var selectText = $(this).find('option:selected').text();
			selectedProductInfo.productNum = Number(selectText);
		});
	}

	function initProductImage(imageList) {
		if ($("#small_image_list").length > 0) {
			$("#small_image_list").html($("#productSmallImage").tmpl(imageList));
		}

		$("#small_image_list li:first").attr('id', "onlickImg");
		$("#vertical img:first").attr('src', imageList[0].big_img);
		if (loadedImageUrls.indexOf(imageList[0].big_img) == -1) {
			$('#imageLoading').removeClass('hide');
		}

		initProductImageEvent();
	}

	function initProductImageEvent() {
		var midChangeHandler = null;

		$(document).ready(function () {
			$("#imageMenu li img").bind("click", function () {
				if ($(this).attr("id") != "onlickImg") {
					$("#midimg").attr("src", $(this).data().data);

					if (loadedImageUrls.indexOf($(this).data().data) == -1) {
						$('#imageLoading').removeClass('hide');
					}

					$("#imageMenu li").removeAttr("id");
					$(this).parent().attr("id", "onlickImg");
				}
			}).bind("mouseover", function () {
				if ($(this).attr("id") != "onlickImg") {
					window.clearTimeout(midChangeHandler);

					$("#midimg").attr("src", $(this).data().data);

					if (loadedImageUrls.indexOf($(this).data().data) == -1) {
						$('#imageLoading').removeClass('hide');
					}
				}
			}).bind("mouseout", function () {
				if ($(this).attr("id") != "onlickImg") {
					$("#midimg").attr("src", $(this).data().data);

					if (loadedImageUrls.indexOf($(this).data().data) == -1) {
						$('#imageLoading').removeClass('hide');
					}
					
					$(this).removeAttr("style");
					midChangeHandler = window.setTimeout(function () {
						$("#midimg").attr("src", $("#onlickImg img").data().data);

						if (loadedImageUrls.indexOf($("#onlickImg img").data().data) == -1) {
							$('#imageLoading').removeClass('hide');
						}
					}, 1000);
				}
			});
		});
	}

	function getProductPrice() {
		handleAttr();

		var params = {
			currencyId: common.util.getLocalCurrency(),
			productId: selectedProductInfo.productId,
			productColorId: selectedProductInfo.productColorId,
			attrOpts: selectedProductInfo.attrOpts
		};

		common.dao.getProductPrice({
			inputParams: JSON.stringify(params)			
		}, function (result) {
			var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
			var current_price = common.util.formatProductPrice(result, currencyConf);
			$('#current_price').html(current_price);
		});
	}

	function handleAttr() {
		var attrDesArray = [];
		if (selectedProductInfo.attrDes.indexOf(";") > -1) {
			attrDesArray = selectedProductInfo.attrDes.split(";");
		} else if (selectedProductInfo.attrDes) {
			attrDesArray.push(selectedProductInfo.attrDes);
		}

		selectedProductInfo.attrOpts = [];
		for (var i = 0; i < attrDesArray.length; i++) {
			var attr = attrDesArray[i].split(':');
			
			var attrObj = {attrType: attr[0], attrOptId: attr[1]};
			// attrID: 3:number  4:name
			if (attr[0] == '3') {
				attrObj = {attrType: attr[0], attrOptId: attr[1], custominfo: $('#print_number_input').val()};
			} else if (attr[0] == '4') {
				attrObj = {attrType: attr[0], attrOptId: attr[1], custominfo: $('#print_name_input').val()};
			}
			
			selectedProductInfo.attrOpts.push(attrObj);
		}
	}
});