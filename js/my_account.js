require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("my_account.js");

	var currentAddr;
	var selectedCountryCode;

	var id = common.util.getQueryString('id');
	console.log("my_account.js---id= " + id);

	common.initLoginStatus(function(data) {
		if (data) {
			if (id == 6) {
				showAccountSetting();
				$(".menu-list span").removeClass('selected');
				$('#menu_account_setting').addClass('selected');
				$('.menu-content-wrap .title').text($.i18n.map.AccountSetting);
			} else if (id == 5) {
				showAddressList();
				$(".menu-list span").removeClass('selected');
				$('#menu_my_address').addClass('selected');
				$('.menu-content-wrap .title').text($.i18n.map.ManageAddressBook);
			} else if (id == 4) {
				showCouponList();
				$(".menu-list span").removeClass('selected');
				$('#menu_my_coupon').addClass('selected');
				$('.menu-content-wrap .title').text($.i18n.map.MyCoupons);
			} else if (id == 3) {
				showFavoriteList();
				$(".menu-list span").removeClass('selected');
				$('#menu_my_fav').addClass('selected');
				$('.menu-content-wrap .title').text($.i18n.map.MyFavorites);
			} else if (id == 2) {
				showCartList();
				$(".menu-list span").removeClass('selected');
				$('#menu_my_cart').addClass('selected');
				$('.menu-content-wrap .title').text($.i18n.map.MyCart);
			} else {
				showOrderList();
				$(".menu-list span").removeClass('selected');
				$('#menu_my_order').addClass('selected');
				$('.menu-content-wrap .title').text($.i18n.map.MyOrder);
			}
		} else {
			window.location.href = "../../../login.html";
		}
	});
	
	initEvent();
	initInput();
	
	function initEvent() {
		$('.menu-list span').bind("click", function () {
			if (!$(this).hasClass('selected')) {
				$(".menu-list span").removeClass('selected');
				$(this).addClass('selected');
	
				$('.menu-content-wrap .title').text($(this).text());
	
				showRightContent($(this)[0].id);
			}
		});

		$('#menu_logout').click(function(){
			logout();
		});
	
		$('#sava_base_information').click(function(){
			var canContinue = true;
			canContinue = checkInput('#account_setting_first_name_input', '#account_setting_error_first_name') && canContinue;
			canContinue = checkInput('#account_setting_last_name_input', '#account_setting_error_last_name') && canContinue;

			if (canContinue) {
				userInfoModify();
			}			
		});
		
		$('#sava_new_pwd').click(function(){
			var canContinue = true;

			canContinue = checkInput('#modify_old_pwd_input', '#old_pwd_error') && canContinue;
			canContinue = checkInput('#modify_new_pwd_input', '#new_pwd_error') && canContinue;
			canContinue = checkInput('#modify_confirm_new_pwd_input', '#confirm_new_pwd_error') && canContinue;

			if ($('#modify_new_pwd_input').val() !== $('#modify_confirm_new_pwd_input').val()) {
				canContinue = false;

				$('#modify_pwd_success_message').removeClass('alert-success');
				$('#modify_pwd_success_message').addClass('alert-danger');
				$('#modify_pwd_success_message').html($.i18n.map.PasswordNotMatch);
				$('#modify_pwd_success_message').show();
			}

			if (canContinue) {
				modifyPwd();
			}
		});

		$('#add_new_addr_btn').click(function() {
			currentAddr = null;
			
			var userInfo = sessionStorage.getItem('userInfo');
			if (userInfo) {
				userInfo = JSON.parse(userInfo);
				$('#first_name_input').val(userInfo.firstName);
				$('#last_name_input').val(userInfo.lastName);
				$('#email_input').val(userInfo.email);
			}
			
			$('#address_input').val('');
			$('#address_2_input').val('');
			$('#city_input').val('');
			$('#postal_code_input').val('');
			$('#phone_input').val('');
			$('#phone_2_input').val('');
			$('#selected_province_span').text('');
			$('#selected_country_span').text('');
			$('.edit-address-mask').removeClass('hide');
			getCountryList();
		});

		$('#save_address_btn').click(function() {
			var canContinue = true;

			var isFirstNameError = checkInput('#first_name_input', '#error_first_name');
			if (canContinue) {
				canContinue = isFirstNameError && canContinue;
				if (!canContinue) {
					$('#first_name_input').focus();
				}
			}

			var isLastNameError = checkInput('#last_name_input', '#error_last_name');
			if (canContinue) {
				canContinue = isLastNameError && canContinue;
				if (!canContinue) {
					$('#last_name_input').focus();
				}
			}

			var isAddressError = checkInput('#address_input', '#error_address');
			if (canContinue) {
				canContinue = isAddressError && canContinue;
				if (!canContinue) {
					$('#address_input').focus();
				}
			}

			var isCityError = checkInput('#city_input', '#error_city');
			if (canContinue) {
				canContinue = isCityError && canContinue;
				if (!canContinue) {
					$('#city_input').focus();
				}
			}

			var isPostalCodeError = checkInput('#postal_code_input', '#error_postal_code');
			if (canContinue) {
				canContinue = isPostalCodeError && canContinue;
				if (!canContinue) {
					$('#postal_code_input').focus();
				}
			}

			var isEmailError = checkInput('#email_input', '#error_email');
			if (canContinue) {
				canContinue = isEmailError && canContinue;
				if (!canContinue) {
					$('#email_input').focus();
				}
			}

			var isPhoneError = checkInput('#phone_input', '#error_phone');
			if (canContinue) {
				canContinue = isPhoneError && canContinue;
				if (!canContinue) {
					$('#phone_input').focus();
				}
			}

			if ($('#provice_input_wrap').is(':visible')) {
				var isProviceError = checkInput('#province_input', '#error_province');
				if (canContinue) {
					canContinue = isProviceError && canContinue;
					if (!canContinue) {
						$('#province_input').focus();
					}
				}
			}

			var province = $('#provinceList').find('option:selected').text();
			if ($('#provice_input_wrap').is(':visible')) {	
				province = $('#province_input').val();
			}
			
			if (canContinue) {
				var params = {
					userId: common.util.getUserId(),
					country: selectedCountryCode, 
					fullCountry: $('#countryList').find('option:selected').text(),
					province: province,
					city: $('#city_input').val(),
					streetAddr: $('#address_input').val(),
					extendAddr: $('#address_2_input').val(),
					email: $('#email_input').val(),
					postCode: $('#postal_code_input').val(),
					isBillAddr: '0',
					telephone: $('#phone_input').val(),
					telephone1: $('#phone_2_input').val(),
					recFirstname: $('#first_name_input').val(),
					recLastname: $('#last_name_input').val(), 
				};

				if (currentAddr) {
					params.addrId = currentAddr.addrId;
					if (!currentAddr.isBillAddr) {
						currentAddr.isBillAddr = '0';
					}
					params.isBillAddr = currentAddr.isBillAddr;

					if ($("#default_input").get(0).checked) {
						params.isDefault = 1;
					} else {
						params.isDefault = 0;
					}
					common.dao.updateAddress({
						inputParams: JSON.stringify(params)
					}, function(result) {
						$('.edit-address-mask').addClass('hide');
						if (currentAddr.isBillAddr == '1') {
							getBillingAddressList();
						} else {
							getShippingAddressList();
						}
						currentAddr = null;
					});
				} else {
					common.dao.addAddress({
						inputParams: JSON.stringify(params)
					}, function(result) {
						$('.edit-address-mask').addClass('hide');
						getShippingAddressList();
					});
				}
			}
		});

		$('#cancel_save_address_btn').click(function() {
			$('.edit-address-mask').addClass('hide');
		});
	}

	function showRightContent(id) {
		switch(id) {
			case "menu_my_order": {
				showOrderList();
				break;
			}
			case "menu_my_cart": {
				showCartList();
				break;
			}
			case "menu_my_fav": {
				showFavoriteList();
				break;
			}
			case "menu_my_coupon": {
				showCouponList();
				break;
			}
			case "menu_my_address": {
				showAddressList();
				break;
			}
			case "menu_account_setting": {
				showAccountSetting();
				break;
			}
			default:
				break;
		}
	}

	function showOrderList() {
		document.title = $.i18n.map.MyOrderTitle;

		$('#fav_list_wrap').hide();
		$('#cart_list_wrap').hide();
		$('#order_list_wrap').show();
		$('#coupons_list_wrap').hide();
		$('#address_list_wrap').hide();
		$('#account_setting_wrap').hide();

		getOrderList();
	}

	function showCartList() {
		document.title = $.i18n.map.MyCartTitle;

		$('#order_list_wrap').hide();
		$('#cart_list_wrap').show();
		$('#fav_list_wrap').hide();
		$('#coupons_list_wrap').hide();
		$('#address_list_wrap').hide();
		$('#account_setting_wrap').hide();

		getCartList()
	}

	function showFavoriteList() {
		document.title = $.i18n.map.MyFavTitle;

		$('#fav_list_wrap').show();
		$('#cart_list_wrap').hide();
		$('#order_list_wrap').hide();
		$('#coupons_list_wrap').hide();
		$('#address_list_wrap').hide();
		$('#account_setting_wrap').hide();

		getFavList();
	}

	function showCouponList() {
		document.title = $.i18n.map.MyCouponTitle;

		$('#fav_list_wrap').hide();
		$('#cart_list_wrap').hide();
		$('#order_list_wrap').hide();
		$('#coupons_list_wrap').show();
		$('#address_list_wrap').hide();
		$('#account_setting_wrap').hide();

		getCouponList();
	}

	function showAddressList() {
		document.title = $.i18n.map.MyAddressTitle;

		$('#fav_list_wrap').hide();
		$('#cart_list_wrap').hide();
		$('#order_list_wrap').hide();
		$('#coupons_list_wrap').hide();
		$('#address_list_wrap').show();
		$('#account_setting_wrap').hide();

		getShippingAddressList();
		getBillingAddressList();
	}

	function showAccountSetting() {
		document.title = $.i18n.map.MyAccountSettingTitle;

		$('#fav_list_wrap').hide();
		$('#cart_list_wrap').hide();
		$('#order_list_wrap').hide();
		$('#coupons_list_wrap').hide();
		$('#address_list_wrap').hide();
		$('#account_setting_wrap').show();

		var userInfo = sessionStorage.getItem('userInfo');
		if (userInfo) {
			userInfo = JSON.parse(userInfo);
			$('#account_setting_first_name_input').val(userInfo.firstName);
			$('#account_setting_last_name_input').val(userInfo.lastName);

			var gender = document.getElementsByName("gender");
			for (var i = 0; i < gender.length; i++) {
				if(gender[i].value == userInfo.sex){
					gender[i].checked = true;
				}
			}
		}
	}

	function getBillingAddressList() {
		common.dao.getUserAddress({
			userId: common.util.getUserId(),
			addrType: 1
		}, function(result) {
			var addressList = result;
	
			if (addressList && addressList.length > 0) {
				$("#billing_address_list").html($("#addressItemTempl").tmpl(addressList));

				$('#billing_address_list li #phone_number_label').text($.i18n.map.PhoneNumberlabel);
				$('#billing_address_list li .button-wrap button:nth-child(1)').text($.i18n.map.Edit);
				$('#billing_address_list li .button-wrap button:nth-child(2)').text($.i18n.map.Delete);

				$('#billing_address_list li .button-wrap button').click(function(){
					addressBtnClick(addressList, $(this), function() {
						getShippingAddressList();
					})
				});

				$('#billing_address_list').show();
				$('#billing_address_empty_wrap').hide();
			} else {
				$('#billing_address_list').hide();
				$('#billing_address_empty_wrap').show();
			}
		});		
	}

	function addressBtnClick(addressList, ele, callback) {
		if (ele[0].id == 'edit') {
			$('.edit-address-mask').removeClass('hide');

			var index = ele.parent().parent().data().data;
			currentAddr = addressList[index];
			console.log('currentAddr = ' + currentAddr);

			$('#first_name_input').val(currentAddr.recFirstname);
			$('#last_name_input').val(currentAddr.recLastname);
			$('#address_input').val(currentAddr.streetAddr);
			$('#address_2_input').val(currentAddr.extendAddr);
			$('#city_input').val(currentAddr.city);
			$('#postal_code_input').val(currentAddr.postCode);
			$('#email_input').val(currentAddr.email);
			$('#phone_input').val(currentAddr.telephone);
			$('#phone_2_input').val(currentAddr.telephone1);						

			if (currentAddr.isDefault == 1) {
				$('#default_input').attr("checked", true);
			} else {
				$('#default_input').attr("checked", false);
			}

			getCountryList(currentAddr.country, currentAddr.fullCountry);
		} else {
			common.dao.delAddress({
				addrId: ele.data().data
			}, function(result) {
				console.log('删除成功');
				callback();
			});
		}
	}

	function getShippingAddressList() {
		common.dao.getUserAddress({
			userId: common.util.getUserId(),
			addrType: 0
		}, function(result) {
			var addressList = result;
			if (addressList && addressList.length > 0) {
				$("#shipping_address_list").html($("#addressItemTempl").tmpl(addressList));
				
				$('#shipping_address_list li #phone_number_label').text($.i18n.map.PhoneNumberlabel);
				$('#shipping_address_list li .button-wrap button:nth-child(1)').text($.i18n.map.Edit);
				$('#shipping_address_list li .button-wrap button:nth-child(2)').text($.i18n.map.Delete);
	
				$('#shipping_address_list li .button-wrap button').click(function(){
					addressBtnClick(addressList, $(this), function() {
						getShippingAddressList();
					})
				});

				$('#shipping_address_list').show();
				$('#shipping_address_empty_wrap').hide();
			} else {
				$('#shipping_address_list').hide();
				$('#shipping_address_empty_wrap').show();
			}
		});		
	}

	function getOrderList() {
		common.dao.getUserOrder({
			userId: common.util.getUserId()
		}, function(result) {
			var orderList = result;
			if (orderList && orderList.length > 0) {
				for (var i = 0; i < orderList.length; i++) {
					var order = orderList[i];
					var currencyConf = common.util.getCurrencySymbol(order.correncyCode);
					if (!currencyConf) {
						currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
					}
					
					order.realCost = common.util.formatProductPrice(order.realCost, currencyConf);
					order.totalCost = common.util.formatProductPrice(order.totalCost, currencyConf);
					if (order.paymentStatus == 0) {
						order.paymentStatusString = $.i18n.map.OrderStatusPendding;
					} else if (order.paymentStatus == 1 || order.paymentStatus == 5 || order.paymentStatus == 10) {
						order.paymentStatusString = $.i18n.map.OrderStatusSuccess;
					} else if (order.paymentStatus == 3) {
						order.paymentStatusString = $.i18n.map.OrderStatusDelay;
					} else {
						order.paymentStatusString = $.i18n.map.OrderStatusFail;
					}

					order.crTimeString = common.util.formatOrderDateTime(order.crTime);
				}
	
				$('#order_item_list').html($("#orderItemTempl").tmpl(orderList));

				$('#order_item_list #detail_btn').attr('title', ($.i18n.map.ViewDetail));
				$('#order_item_list #payment_btn').attr('title', ($.i18n.map.ContinuePayment));

				$('#order_item_list').show();
				$('#order_empty_wrap').hide();
			} else {
				$('#order_item_list').hide();
				$('#order_empty_wrap').show();
			}
		});
	}

	function getCartList() {
		var param = {
			currencyId: common.util.getLocalCurrency(),
			userId: common.util.getUserId(),
			cart: [],
			applyCpNo: common.util.getCouponCode()
		};

		common.dao.shoppingCart({
			inputParams: JSON.stringify(param)
		}, function (data) {
			if (data.cart && data.cart.length > 0) {
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

					var href = common.util.formatProductName(cartItem.productName) + "-d-" + common.util.encodeMenuType(cartItem.productId) + "-" + common.util.encodeMenuType(cartItem.productColorId) + "-" + uvid + ".html" + queryParams;
					cartItem.href = href;

					productNums = productNums + Number(cartItem.productNum);
				}
				$('#cart_list').html($("#cartTempl").tmpl(data.cart));
				$('#cart_list #color_title').html($.i18n.map.ColorTitle);
				$('#cart_list #remove_label').html($.i18n.map.Remove);

				if (productNums > 0) {
					$('#cart_product_number').html(productNums);
					$('#cart_product_number').show();
				} else {
					$('#cart_product_number').html("0");
					$('#cart_product_number').show();
				}

				var qtyList = ["1", "2", "3", "4", '5'];
				for (var i = 0; i < data.cart.length; i++) {
					var qtyHtml = $("#qtyItemTempl").tmpl(qtyList);
					$('#' + i).find('.dropdown-menu').html(qtyHtml);

					$('#' + i + " .dropdown-menu li").each(function (index) {
						$(this).click(function () {
							var selectedQty = qtyList[index];
							var parentCartId = $(this).parent().parent().parent().parent()[0].id;			
							$('#' + parentCartId).find('#qty_content').html(selectedQty);					
							
							var parentIndex = $(this).parent().parent().parent().parent().data().data;
							changeProductNumber(parentIndex, selectedQty, data);
						})
					});

					$('#' + i + " .remove-btn").each(function () {
						$(this).click(function () {
							console.log("del " + $(this).parent().parent().data().data + 'item');
							var parentIndex = $(this).parent().parent().parent().parent().data().data;
							
							changeProductNumber(parentIndex, 0, data);
						});
					});
				}
			} else {
				$('#cart_list').hide();
				$('#cart_empty_wrap').show();

				$('#cart_product_number').html("0");
				$('#cart_product_number').show();
			}
		}, function() {
			$('#cart_list').hide();
			$('#cart_empty_wrap').show();
		});
	}

	function changeProductNumber(parentIndex, selectedQty, data) {
		console.log("changeProductNumber");
		if (common.util.checkIsLogin()) {
			var productInfo = data.cart[parentIndex];
			productInfo.productNum = Number(selectedQty);
			productInfo.userId = common.util.getUserId();

			common.dao.shoppingCartMt({
				inputParams: JSON.stringify([productInfo])
			}, function(result) {
				getCartList();
			});
		} else {
			if (localStorage.productList) {				
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

	function getFavList() {
		var favList = [];
		if (favList && favList.length > 0) {
			$('#fav_item_list').html($("#favItemTempl").tmpl(favList));

			$('#fav_item_list').show();
			$('#fav_empty_wrap').hide();
		} else {
			$('#fav_item_list').hide();
			$('#fav_empty_wrap').show();
		}
	}

	function getCouponList() {
		common.dao.getCoupon({
			userId: common.util.getUserId(),
			currencyId: common.util.getLocalCurrency()
		}, function(result) {			
			if (result) {
				var data = [result]
				$('#coupon_item_list').html($("#couponItemTempl").tmpl(data));

				$('#coupon_item_list #code_text').html($.i18n.map.Code);

				$('#coupon_item_list').show();
				$('#coupon_empty_wrap').hide();
			} else {
				$('#coupon_item_list').hide();
				$('#coupon_empty_wrap').show();
			}
		});
	}

	function initInput() {
		$('#account_setting_first_name_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#account_setting_error_first_name').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#account_setting_error_first_name').css('visibility', 'hidden');
			}
		});

		$('#account_setting_last_name_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#account_setting_error_last_name').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#account_setting_error_last_name').css('visibility', 'hidden');
			}
		});

		$('#modify_old_pwd_input').blur(function () {
			var checkEmail = common.util.checkPassword($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#old_pwd_error').css('visibility', 'visible');
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#old_pwd_error').css('visibility', 'visible');
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#old_pwd_error').css('visibility', 'hidden');
			}
		});

		$('#modify_new_pwd_input').blur(function () {
			var checkEmail = common.util.checkPassword($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#new_pwd_error').css('visibility', 'visible');
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#new_pwd_error').css('visibility', 'visible');
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#new_pwd_error').css('visibility', 'hidden');
			}
		});

		$('#modify_confirm_new_pwd_input').blur(function () {
			var checkEmail = common.util.checkPassword($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#confirm_new_pwd_error').css('visibility', 'visible');
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#confirm_new_pwd_error').css('visibility', 'visible');
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#confirm_new_pwd_error').css('visibility', 'hidden');
			}
		});
		
		
		
		$('#first_name_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_first_name').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_first_name').css('visibility', 'hidden');
			}
		});

		$('#last_name_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_last_name').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_last_name').css('visibility', 'hidden');
			}
		});

		$('#address_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_address').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_address').css('visibility', 'hidden');
			}
		});

		$('#city_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_city').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_city').css('visibility', 'hidden');
			}
		});

		$('#province_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			console.log(checkNull);
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_province').css('visibility', 'visible');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_province').css('visibility', 'hidden');
			}
		});

		$('#postal_code_input').blur(function() {
			var checkPhone = common.util.checkPhone($(this).val());
			console.log(checkPhone);
			if (checkPhone == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_postal_code').css('visibility', 'visible');
			} else if (checkPhone == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_postal_code').css('visibility', 'visible');
			} else if (checkPhone == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_postal_code').css('visibility', 'hidden');
			}
		});
		
		$('#email_input').blur(function() {
			var checkEmail = common.util.checkEmail($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_email').css('visibility', 'visible');
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_email').css('visibility', 'visible');
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_email').css('visibility', 'hidden');
			}
		});

		$('#phone_input').blur(function() {
			var checkPhone = common.util.checkPhone($(this).val());
			console.log(checkPhone);
			if (checkPhone == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_phone').css('visibility', 'visible');
			} else if (checkPhone == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_phone').css('visibility', 'visible');
			} else if (checkPhone == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_phone').css('visibility', 'hidden');
			}
		});
	}

	function checkInput(inputId, errorInputId) {
		if ($(inputId).parent().hasClass('has-error') || $(inputId).val() === "") {
			$(this).parent().removeClass('has-success');
			$(this).parent().addClass('has-error');
			$(errorInputId).css('visibility', 'visible');
			return false;
		}

		return true;
	}

	function getCountryList(country, fullCountry) {
		var countrySelect = document.getElementById('countryList');
		if (country) {
			selectedCountryCode = country;
		} else if (sessionStorage.country_belong) {
			selectedCountryCode = sessionStorage.country_belong;	
		} else {
			selectedCountryCode = countrySelect.options[0].value;
		}
		$("#countryList option[value='"+ selectedCountryCode +"']").prop("selected","selected");

		$.getJSON("/resources/json/country.json", function (result) {
			var index = countrySelect.selectedIndex;
			if (result && result[index] && result[index].state && result[index].state.length > 0) {
				initProvinceList(result[index].state, true);

				$('#provice_selected_wrap').show();
				$('#provice_input_wrap').hide();
			} else {
				var provinceSelect = document.getElementById('provinceList');
				provinceSelect.length = 0;

				$('#provice_selected_wrap').hide();
				$('#provice_input_wrap').show();
			}

			$('#countryList').on('change',function(){
				var selectValue = $(this).find('option:selected').val();
	
				selectedCountryCode = selectValue;
				var index = countrySelect.selectedIndex;
	
				if (result && result[index] && result[index].state && result[index].state.length > 0) {
					initProvinceList(result[index].state, false);
	
					$('#provice_selected_wrap').show();
					$('#provice_input_wrap').hide();
				} else {
					var provinceSelect = document.getElementById('provinceList');
					provinceSelect.length = 0;
	
					$('#provice_selected_wrap').hide();
					$('#provice_input_wrap').show();
				}
			});
		});
	}

	function initProvinceList(state, isFirst) {
		if (state && state.length > 0) {
			$('#provice_selected_wrap').show();
			$('#provice_input_wrap').hide();

			var selectedProvinceArray = state;
			var provinceSelect = document.getElementById('provinceList');
			provinceSelect.length = 0;
			for (var i = 0; i < selectedProvinceArray.length; i++) {
				// var option = new Option(selectedProvinceArray[i]);
				// provinceSelect.add(option);

				// if (isFirst && currentAddr && currentAddr.province == selectedProvinceArray[i]) {
				// 	option.selected = true;
				// }

				var obj = "<option value='"+ selectedProvinceArray[i] +"'>" + selectedProvinceArray[i] + "</option>";
				if (isFirst && currentAddr && currentAddr.province == selectedProvinceArray[i]) {
					obj = "<option value='"+ selectedProvinceArray[i] +"' selected>" + selectedProvinceArray[i] + "</option>";
				}

				$('#provinceList').append(obj);
			}
		} else {
			$('#provice_selected_wrap').hide();
			$('#provice_input_wrap').show();

			if (currentAddr) {
				$('#province_input').val(currentAddr.province);
			}
		}
	}	

	function userInfoModify() {		
		var userId = common.util.getUserId();
		if (userId) {
			var gender = $("input[type='radio'][name='gender']:checked").val();
			common.dao.userInfoModify({
				userId: userId,
				sex: gender,
				firstName: $('#account_setting_first_name_input').val(),
				lastName: $('#account_setting_last_name_input').val()
			}, function(result) {
				var userInfo = sessionStorage.getItem('userInfo');
				if (userInfo) {
					userInfo = JSON.parse(userInfo);
					userInfo.sex = gender;
					userInfo.firstName = $('#account_setting_first_name_input').val();
					userInfo.lastName = $('#account_setting_last_name_input').val();

					sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
				}

				$("#modify_information_success_message").show();
			});
		}
	}

	function modifyPwd() {
		var userId = common.util.getUserId();
		if (userId) {
			common.dao.mdpwd({
				userId: userId,
				oldPwd: $('#modify_old_pwd_input').val(), 
				newPwd: $('#modify_new_pwd_input').val(), 
				checkCode: ''
			}, function(result) {
				$('#modify_pwd_success_message').removeClass('alert-danger');
				$('#modify_pwd_success_message').addClass('alert-success');
				$('#modify_pwd_success_message').html($.i18n.map.ModifyPwdSuccess);
				$("#modify_pwd_success_message").show();				
			}, function(result) {
				$('#modify_pwd_success_message').removeClass('alert-success');
				$('#modify_pwd_success_message').addClass('alert-danger');
				$('#modify_pwd_success_message').html(result.msg);
				$('#modify_pwd_success_message').show();
			});
		}
	}

	function logout() {
		common.dao.logout({}, function () {
			$('#login_btn').text($.i18n.map.Login);

			sessionStorage.setItem("userId", '');
			sessionStorage.setItem("userInfo", '');
			sessionStorage.setItem("couponCode", '');
			sessionStorage.setItem("applyCouponCode", '');

			if(self != top) {
				window.parent.frames.location.href= "./../../../login.html?u=" + util.getQueryString('u') + "&uvid=" + common.util.getUvid();
			} else {
				location.href = './../../../login.html' + "?uvid=" + common.util.getUvid();
			}
		});
	}
});