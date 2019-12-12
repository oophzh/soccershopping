require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("order.js");
	var amountAllowed = "";
	var realAmount = "";

	var productNumberAllow = true;
	var hasCartList = false;
	var selectedCountryCode;
	var currentAddr = null;

	common.initLoginStatus(function(data) {
		if (data) {
			getAddressList();
			getCartList();
		} else {
			window.location.href = "../../../login.html";
		}
	});
	initEvent();
	initInput();
	getChannel();

	$('.loading-mask').removeClass('hide');
	$('#currency_group').hide();

	function initEvent() {
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

				common.dao.addAddress({
					inputParams: JSON.stringify(params)
				}, function(result) {
					getAddressList();
				});

				$('#error_message').html("");
				$('#error_message').hide();

				$('#save_address_btn').attr('disabled', true);
			}
		});

		$('#cancel_save_address_btn').click(function() {
			$('#choose_shipping_address_wrap').show();
			$('#edit_shipping_address_wrap').hide();
		});

		$('#continue_btn').click(function() {
			if (!hasCartList) {
				$('#error_message').html($.i18n.map.EmptyCart);
				$('#error_message').show();
				return;
			}

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
			
			if (!productNumberAllow) {
				$('#error_message').html($.i18n.map.maxErrorMsg1 + " " + sessionStorage.maxnum_allowed + $.i18n.map.maxErrorMsg2);
				$('#error_message').removeClass('hide');

				setTimeout(function() {
					alert($.i18n.map.maxErrorMsg1 + " " + sessionStorage.maxnum_allowed + $.i18n.map.maxErrorMsg2)
				}, 1);

				canContinue = false;
			} else if (realAmount > amountAllowed) {
				var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
				$('#error_message').html($.i18n.map.maxAmountErrorMsg1 + " " + common.util.formatProductPrice(realAmount, currencyConf) + $.i18n.map.maxAmountErrorMsg2 + " " + common.util.formatProductPrice(amountAllowed, currencyConf) + $.i18n.map.maxAmountErrorMsg3);
				$('#error_message').removeClass('hide');

				setTimeout(function() {
					alert($.i18n.map.maxAmountErrorMsg1 + " " + common.util.formatProductPrice(realAmount, currencyConf) + $.i18n.map.maxAmountErrorMsg2 + " " + common.util.formatProductPrice(amountAllowed, currencyConf) + $.i18n.map.maxAmountErrorMsg3)
				}, 1);

				canContinue = false;
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
					telephone: $('#phone_input').val(),
					telephone1: $('#phone_2_input').val(),
					recFirstname: $('#first_name_input').val(),
					recLastname: $('#last_name_input').val(),

				};

				if (currentAddr) {
					params.addrId = currentAddr.addrId;
				}
				
				// invoke new order
				$('.loading-mask').removeClass('hide');
				$('#error_message').html("");
				$('#error_message').hide();
				$('#continue_btn').attr('disabled',true);

				var applyCpNo = "";
				if (sessionStorage.applyCouponCode == 1) {
					applyCpNo = common.util.getCouponCode();
				}

				var adsType = '';
				var adsAccount = '';
				var advSource = common.util.getAdvSource();
				if (advSource) {
					adsType = advSource.t;
					adsAccount = advSource.u;
				}
				var inputParams = {};
				if (adsType && adsType !== "null" && adsType !== "undefined" ) {
					inputParams = {
						currencyId: common.util.getLocalCurrency(),
						userId: common.util.getUserId(),
						adsType: adsType,
						adsAccount: adsAccount,
						memo: $('#memo_text_area').val(),
						spAddr: params,
						applyCpNo: applyCpNo
					};
				} else {
					inputParams = {
						currencyId: common.util.getLocalCurrency(),
						userId: common.util.getUserId(),
						adsAccount: adsAccount,
						memo: $('#memo_text_area').val(),
						spAddr: params,
						applyCpNo: applyCpNo
					}
				}

				common.dao.newOrder({
					inputParams: JSON.stringify(inputParams)
				}, function(result) {
					if (result) {
						$('.loading-mask').addClass('hide');
						$('#continue_btn').attr('disabled', false);
						window.location.href="checkout_payment.html?orderId=" + result.orderId;
					}
				}, function(result) {
					$('.loading-mask').addClass('hide');
					$('#error_message').html(result.msg);
					$('#error_message').show();

					setTimeout(function() {
						alert(result.msg);
					});
				}, function() {
					$('.loading-mask').addClass('hide');
					$('#continue_btn').attr('disabled', false);
				});
			}
		});		
	}

	function getChannel() {
		common.dao.getChannel({
			type: 1
		}, function(result) {
			if (result) {
				sessionStorage.setItem('channelList', JSON.stringify(result));
			}
		});
	}

	function initInput() {
		var userInfo = sessionStorage.userInfo;
		if (userInfo) {
			userInfo = JSON.parse(userInfo);
			$('#first_name_input').val(userInfo.firstName);
			$('#last_name_input').val(userInfo.lastName);
			$('#email_input').val(userInfo.email);
		}
		$('#first_name_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_first_name').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_first_name').parent().removeClass('show-error-text');
			}
		});

		$('#last_name_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_last_name').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_last_name').parent().removeClass('show-error-text');
			}
		});

		$('#address_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_address').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_address').parent().removeClass('show-error-text');
			}
		});

		$('#postal_code_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_postal_code').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_postal_code').parent().removeClass('show-error-text');
			}
		});

		$('#city_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_city').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_city').parent().removeClass('show-error-text');
			}
		});

		$('#province_input').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_province').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_province').parent().removeClass('show-error-text');
			}
		});

		$('#email_input').blur(function() {
			var checkEmail = common.util.checkEmail($(this).val());
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_email').parent().addClass('show-error-text');
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_email').parent().addClass('show-error-text');
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_email').parent().removeClass('show-error-text');
			}
		});

		$('#phone_input').blur(function() {
			var checkPhone = common.util.checkPhone($(this).val());
			if (checkPhone == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_phone').parent().addClass('show-error-text');
			} else if (checkPhone == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_phone').parent().addClass('show-error-text');
			} else if (checkPhone == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_phone').parent().removeClass('show-error-text');
			}
		});
	}

	function getAddressList() {
		common.dao.getUserAddress({
			userId: common.util.getUserId(),
			addrType: 0
		}, function(result) {
			var addressList = result;
	
			if (addressList && addressList.length > 0) {
				for (var i = 0; i < addressList.length; i++) {
					if (addressList[i].isDefault == 1) {
						currentAddr = addressList[i];
						break;
					}
				}
			}

			if (currentAddr) {
				$('#first_name_input').val(currentAddr.recFirstname);
				$('#last_name_input').val(currentAddr.recLastname);
				$('#address_input').val(currentAddr.streetAddr);
				$('#address_2_input').val(currentAddr.extendAddr);
				$('#city_input').val(currentAddr.city);
				$('#postal_code_input').val(currentAddr.postCode);
				$('#email_input').val(currentAddr.email);
				$('#phone_input').val(currentAddr.telephone);
				$('#phone_2_input').val(currentAddr.telephone1);
			}
			
			getCountryList();
		}, function() {
			getCountryList();
		});		
	}

	function getCartList() {
		var applyCpNo = "";
		if (sessionStorage.applyCouponCode == 1) {
			applyCpNo = common.util.getCouponCode();
		}
		var param = {
			currencyId: common.util.getLocalCurrency(),
			userId: common.util.getUserId(),
			cart: [],
			applyCpNo: applyCpNo
		}

		common.dao.shoppingCart({
			inputParams: JSON.stringify(param)
		}, function (data) {
			var cartList = data.cart;
			if (cartList) {
				var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());

				var productNums = 0;
				for (var i = 0; i < cartList.length; i++) {
					var cartItem = cartList[i];
					cartItem.displayImg = common.util.picUrl + cartItem.displayImg;
					cartItem.cost = common.util.formatProductPrice(cartItem.cost, currencyConf);
					productNums = productNums + Number(cartItem.productNum);
				}
				$('#cart_list').html($("#cartTempl").tmpl(cartList));
	
				$('#cart_list #color_title').html($.i18n.map.ColorTitle);

				hasCartList = true;
			}
			
			if (data.dis_info && data.dis_info.length > 0) {
				for (var i = 0; i < data.dis_info.length; i++) {
					var disInfoItem = data.dis_info[i];
					if (disInfoItem.disAmount < 0) {
						disInfoItem.disAmount = "-" + common.util.formatProductPrice(-disInfoItem.disAmount, currencyConf);
					} else {
						disInfoItem.disAmount = common.util.formatProductPrice(disInfoItem.disAmount, currencyConf);
					}
	
					if (disInfoItem.policyId == 6) {
						$('#ship_cost_content').html(disInfoItem.disAmount);
					}
				}
				$('#dis_info_list').html($("#disInfoTempl").tmpl(data.dis_info));
			}			

			$('#sub_total').html(common.util.formatProductPrice(data.amount, currencyConf));
			$('#grand_total').html(common.util.formatProductPrice(data.realAmount, currencyConf));

			amountAllowed = data.amountAllowed;
			realAmount = data.realAmount;

			var maxNumber = 3;
			if (sessionStorage.maxnum_allowed) {
				maxNumber = Number(sessionStorage.maxnum_allowed);
			}
			if (productNums <= maxNumber) {
				productNumberAllow = true;
			} else {
				productNumberAllow = false;
			}
		});	
	}

	function getCountryList() {
		var countrySelect = document.getElementById('countryList');
		if (currentAddr) {
			selectedCountryCode = currentAddr.country;
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

				$('.loading-mask').addClass('hide');
			}

			$('#countryList').on('change',function(){
				var selectValue = $(this).find('option:selected').val();
	
				selectedCountryCode = selectValue;
				var index = countrySelect.selectedIndex;
	
				console.log(index);
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

			var provinceSelect = document.getElementById('provinceList');
			provinceSelect.length = 0;
			
			var selectedProvinceArray = state;
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

			$('.loading-mask').addClass('hide');
		} else {
			$('#provice_selected_wrap').hide();
			$('#provice_input_wrap').show();

			if (currentAddr) {
				$('#province_input').val(currentAddr.province);
			}

			$('.loading-mask').addClass('hide');
		}
	}

	function checkInput(inputId, errorInputId) {
		if ($(inputId).parent().hasClass('has-error') || $(inputId).val() === "") {
			$(this).parent().removeClass('has-success');
			$(this).parent().addClass('has-error');
			$(errorInputId).parent().addClass('show-error-text');
			return false;
		}

		return true;
	}
});