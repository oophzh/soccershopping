require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("detail.js");

	var location = window.location.href;
	var params = common.util.getDetailParams(location);
	var productId = common.util.decodeMenuType(params[params.length - 3]);
	var colorId = common.util.decodeMenuType(params[params.length - 2]);

	var selectedIndex = 0;

	var currentProduct = {};
	var selectedProductInfo = {
		productId: '',
		productColorId: ''
	};
	var loadedImageUrls = [];
	var sizeData = [];
	var customData = [];
	var attrCustomData = [];
	var canCustom = false;

	common.setCurrencyCodeCallback(function () {
		getProductDetail();
	});

	common.setLanguageCallback(function() {
		$('#breadcrumb_home').text($.i18n.map.Home);
	});

	common.initLoginStatus();
	
	initEvent();

	function initEvent() {
		$('#addCartBtn').unbind('click').click(function () {
			console.log('addCartBtn');

			addCartForAll();
		});

		$('#customBtn').click(function () {
			showCustomMask();
		});

		$("#midimg").load(function(e){
			console.log('big image loading');
			$('#imageLoading').addClass('hide');

			loadedImageUrls.push(e.currentTarget.currentSrc);
		});

		initCustomEvent();
	}

	function initCustomEvent() {
		$('#custom_confirm_btn').unbind('click').click(function () {			
			addCartForAll();
		});

		$('#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn').unbind('click').click(function () {
			hideCustomMask();
		});
	}

	function getProductListForNormal() {
		var data = [];

		var product = {
			userId: common.util.getUserId(),
			productId: selectedProductInfo.productId,
			productColorId: selectedProductInfo.productColorId,
			productNum: 1,
			attrOpts: [
				{
					attrType: '',
					attrOptId: ''
				}
			]
		};
		
		for (var i = 0; i < sizeData.length; i++) {
			var sizeItem = sizeData[i];

			var number = $('#' + sizeItem.optId + '_number_list').val();
			console.log(number);
			if (number == '11') {
				number = $('#' + sizeItem.optId + '_number_list').parent().find('input').val();
				if (!number) {
					number = 0;
				}
			}

			if (number > 0) {
				product.productNum = number;
				product.attrOpts = [
					{
						attrType: sizeItem.attrType,
						attrOptId: sizeItem.optId,
					}
				]

				data.push(JSON.parse(JSON.stringify(product)));
			}
		}

		return data;
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

					// $(this).css({
					// 	"border": "3px solid #f6660f"
					// });
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

					initDynAttrList(colorList[index].dyn_attrs);
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

	function getProductDetail() {
		common.dao.productDetail({
			productId: productId,
			currencyId: common.util.getLocalCurrency()
		}, function (result) {
			if (!result.product_id) {
				return;
			}
			currentProduct = result;
			var data = result;
			selectedProductInfo.productId = currentProduct.product_id;

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
			
			document.title = data.product_name;
			
			for (var i = 0; i < data.color_data.length; i++) {
				if (colorId == data.color_data[i].color_id) {
					selectedIndex = i; 
					break;
				}
			}

			$('#name').html(data.color_data[selectedIndex].pcName);
			$('#product_ext_name').html(data.color_data[selectedIndex].pcNameExt);			
			$('#current_price').html(data.color_data[selectedIndex].current_price);
			$('#original_price').html(data.color_data[selectedIndex].original_price);

			if (!colorId) {
				colorId = data.color_data[selectedIndex].color_id;
			}

			initColorList(data.color_data);
			initDynAttrList(data.color_data[selectedIndex].dyn_attrs);
			initProductImage(data.color_data[selectedIndex].img_groups);

			getPeripheralProductList(data.product_type);

			common.util.menu = [];
			common.util.getClassifyNames(data.product_type, function() {
				initBreadcrumb();
			});
			
			addRecentlyBrowse();

			$("#print_wrap").show();
		});
	}

	function initBreadcrumb() {
		// setTimeout(function () {
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
				breadcrumbData.push({menu_name: document.title})
				var breadcrumbHtml = "<li><a id='breadcrumb_home' href='/'>" + $.i18n.map.Home + "</a></li>";
				for (var i = 0; i < breadcrumbData.length; i++) {
					if (i == breadcrumbData.length - 1) {
						breadcrumbHtml = breadcrumbHtml + "<li class='active'>" + breadcrumbData[i].menu_name + "</li>";
						$('#product_classify_name').html(breadcrumbData[i].menu_name);
					} else {
						var href = breadcrumbData[i].menu_name + "-l-"
							+ common.util.encodeMenuType(breadcrumbData[i].menu_type) + "-" 
							+ common.util.encodeMenuType(common.util.getUvid()) + ".html" + queryParams;

						breadcrumbHtml = breadcrumbHtml + "<li><a href='" + href + "'>" + breadcrumbData[i].menu_name + "</a></li>";
					}
				}

				$('.breadcrumb').html(breadcrumbHtml);
			}
		// }, 500);
	}

	function addRecentlyBrowse() {
		var currentBrowseList = sessionStorage.currentBrowseList;
		if (currentBrowseList) {
			currentBrowseList = JSON.parse(currentBrowseList);
		} else {
			currentBrowseList = [];
		}

		for (var i = 0; i < currentBrowseList.length; i++) {
			var oldItem = currentBrowseList[i];

			if (oldItem.productId === productId && oldItem.productColorId === colorId) {
				currentBrowseList.splice(i, 1);

				break;
			}
		}
		
		var item = {
			productId: productId,
			productColorId: colorId
		}
		currentBrowseList.push(item);

		if (currentBrowseList.length > 10) {
			currentBrowseList = currentBrowseList.splice(1, currentBrowseList.length - 1);
		}

		sessionStorage.setItem('currentBrowseList', JSON.stringify(currentBrowseList));
	}

	function getPeripheralProductList(menuType) {
		// var menuType;
		// if (common.util.menu && common.util.menu.length > 0) {
		// 	var breadcrumbData = common.util.menu.reverse();
		// 	menuType = breadcrumbData[breadcrumbData.length - 1].menu_type;
		// 	console.log("menuType = " + menuType);
		// }

		common.dao.productsRel({
			menuType: menuType,
			productId: productId,
			productColorId: selectedProductInfo.productColorId
		}, function(data) {
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
				product.imgDisplay = common.util.picUrl + product.imgDisplay;
				
				var href = common.util.formatProductName(product.prdName) + "-d-" + common.util.encodeMenuType(product.productId) + "-" + common.util.encodeMenuType(product.productColorId) + "-" + uvid + ".html" + queryParams;
				product.detailUrl = href;

				// product.detailUrl = "detail.html?productId=" + product.productId;
				// if (sessionStorage.img_block == 1) {
				// 	product.detailUrl = "detail.html?productId=" + product.productId + "&colorId=" + product.productColorId;
				// }
			}
			$('#peripheral_products_list').html($("#peripheralProductListTempl").tmpl(data));	
		});
	}
});