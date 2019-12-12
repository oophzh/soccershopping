require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("payment.js");

	var billAddr;
	var selectedCountryCode;

	var addrId;
	var orderId = common.util.getQueryString('orderId');

	var dibitChannelId = '';
	var creditChannelId = '';

	var bankData = {
		'MYR': [{
			name: 'Maybank',
			bankCode: 'FPXD_MB2U0227',
			code: '25',
			img: 'maybank.png'
		},{
			name: 'CIMB',
			bankCode: 'FPXD_BCBB0235',
			code: '25',
			img: 'CIMBBank.png'
		},{
			name: 'Public Bank',
			bankCode: 'FPXD_PBB0233',
			code: '25',
			img: 'PublicBankBerhad.png'
		},{
			name: 'RHB',
			bankCode: 'FPXD_RHB0218',
			code: '25',
			img: 'RHBBank.png'
		},{
			name: 'Hong Leong Bank',
			bankCode: 'FPXD_HLB0224',
			code: '25',
			img: 'HongLeongBank.png'
		},{
			name: 'Bank Islam',
			bankCode: 'FPXD_BIMB0340',
			code: '25',
			img: 'BankIslam.png'
		}],
		"THB": [{
			name: 'United oversea Bank',
			bankCode: 'FPXD_UOB0226',
			code: '27',
			img: 'UnitedOverseasBank.png'
		}]
	}
	var selectedBank = null;

	common.initLoginStatus(function (data) {
		if (data) {
			getOrderDetail(orderId);
		} else {
			window.location.href = "../../../login.html";
		}
	});

	$('#order_no_dt').text(orderId);
	$('#card_no_input').val('');
	$('#cvv_input').val('');

	initPaymentMethod();
	initEvent();
	initInput();
	initMonth();
	initYear();

	$('#currency_group').hide();

	function initPaymentMethod() {
		var channelList;
		if (sessionStorage.channelList) {
			channelList = JSON.parse(sessionStorage.channelList);
			initPaymentMethodLayout(channelList);
		} else {
			common.dao.getChannel({
				type: 1
			}, function(result) {
				if (result) {
					channelList = result;
					initPaymentMethodLayout(channelList);
					sessionStorage.setItem('channelList', JSON.stringify(result));
				}
			});
		}
	}

	function initPaymentMethodLayout(channelList) {
		$('#payment_method_list').html($("#payMethodItemTempl").tmpl(channelList));

		for (var i = 0; i < channelList.length; i++) {
			var item = channelList[i];
			if (item.extP4 == 2) {  //储蓄卡
				dibitChannelId = item.channelId;
			} else if (item.extP4 == 1) {  //信用卡
				creditChannelId = item.channelId;
			}
		}

		if (dibitChannelId) {
			$("#" + dibitChannelId).attr("checked",true);
			
			$('#bank_list_wrap').removeClass('hide');
			$('#payment_card_wrap').addClass('hide');
			$('#billing_address_wrap').addClass('hide');
		} else {
			$("#" + creditChannelId).attr("checked",true);

			$('#bank_list_wrap').addClass('hide');
			$('#payment_card_wrap').removeClass('hide');
			$('#billing_address_wrap').removeClass('hide');
		}

		$('input[type=radio][name=payment_channel]').change(function() {
			if (this.value == dibitChannelId) {
				$('#bank_list_wrap').removeClass('hide');
				$('#payment_card_wrap').addClass('hide');
				$('#billing_address_wrap').addClass('hide');
			} else if (this.value == creditChannelId) {
				$('#bank_list_wrap').addClass('hide');
				$('#payment_card_wrap').removeClass('hide');
				$('#billing_address_wrap').removeClass('hide');
			}
		});
	}

	function getBankList(currencyConf) {
		var bankList = bankData[currencyConf.currencyName];
		if (bankList && bankList.length > 0 && dibitChannelId) {
			$('#' + dibitChannelId).attr('disabled', false);
			$('#debit_error_msg').addClass('hide');
			$('#' + dibitChannelId).attr('checked', true);
			$('#' + creditChannelId).attr('checked', false);

			$('#bank_list_wrap').removeClass('hide');
			$('#bank_list_wrap').html($("#bankItemTempl").tmpl(bankList));
			$("#bank_list_wrap .bank-item-wrap").bind("click", function () {
				$('#error_message').hide();
				
				$("#bank_list_wrap .bank-item-wrap img").removeClass('selected');
				$(this).find('img').addClass('selected');

				selectedBank = bankList[$(this).data().data];
			})
		} else {
			$('#' + dibitChannelId).attr('disabled', true);
			$('#debit_error_msg').removeClass('hide');
			$('#bank_list_wrap').addClass('hide');

			$('#' + dibitChannelId).attr('checked', false);
			$('#' + creditChannelId).attr('checked', true);

			$('#payment_card_wrap').removeClass('hide');
			$('#billing_address_wrap').removeClass('hide');
		}
	}

	function initEvent() {
		$('#payment_btn').click(function () {
			var canContinue = true;

			var payment_method_channel_id = $("input[name='payment_channel']:checked").val();
			if (payment_method_channel_id == creditChannelId) {
				var isCardNoError = checkInput('#card_no_input', '#error_card_number');
				if (canContinue) {
					canContinue = isCardNoError && canContinue;
					if (!canContinue) {
						$('#card_no_input').focus();
	
						// addOperFields('payment', 'error card number');
						setTimeout(function(){
							alert($.i18n.map.CardNumErrorMsg);
						}, 1);
					}
				}
				
				if (canContinue && $('#month_list').find('option:selected').text() == $.i18n.map.Month) {
					canContinue = false;
	
					$('#month_list').focus();
	
					$('#error_message').html($.i18n.map.MonthYearErrorMsg);
					$('#error_message').show();
					// addOperFields('payment', 'error expire month');
	
					setTimeout(function(){
						alert($.i18n.map.MonthYearErrorMsg);
					}, 1);
				}
	
				if (canContinue && $('#year_list').find('option:selected').text() == $.i18n.map.Year) {
					canContinue = false;
		
					$('#year_list').focus();
	
					$('#error_message').html($.i18n.map.MonthYearErrorMsg);
					$('#error_message').show();
					// addOperFields('payment', 'error expire year');
	
					setTimeout(function(){
						alert($.i18n.map.MonthYearErrorMsg);
					}, 1);
				}
	
				var isCvvError = checkInput('#cvv_input', '#error_cvv');
				if (canContinue) {
					canContinue = isCvvError && canContinue;
					if (!canContinue) {
						// addOperFields('payment', 'error cvv');
						$('#cvv_input').focus();
						setTimeout(function(){
							alert($.i18n.map.CvvErrorMsg);
						}, 1);
					}
				}
			} else if (payment_method_channel_id == dibitChannelId) {
				if (!selectedBank) {
					canContinue = false;

					$('#error_message').html('Please select bank!');
					$('#error_message').show();

					setTimeout(function(){
						alert('Please select bank!');
					}, 1);
				}
			}		

			if (canContinue) {
				payment();
			}
		});

		$('#what_cvv_btn').click(function () {
			$('#cvv_desc_wrap').removeClass('hide');
		});

		$('#close_btn').click(function () {
			$('#cvv_desc_wrap').addClass('hide');
		});	

		$("#edit_credit_address").click(function () {
			$("#edit_shipping_address_wrap").removeClass('hide');
			$("#cancel_credit_address").removeClass('hide');
			$("#edit_credit_address").addClass('hide');
		});

		$('#cancel_credit_address').click(function () {
			$("#edit_credit_address").removeClass('hide');
			$("#edit_shipping_address_wrap").addClass('hide');
			$("#cancel_credit_address").addClass('hide');
		});

		$("#save_credit_address").click(function () {
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

			if (canContinue) {
				$('.loading-mask').removeClass('hide');
				$('#save_credit_address').attr('disabled', true);

				var province = $('#provinceList').find('option:selected').text();
				if ($('#provice_input_wrap').is(':visible')) {	
					province = $('#province_input').val();
				}

				var billAddr2 = {
					addrId: billAddr.addrId,
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
					isDefault: 1,
					isBillAddr: 1
				}

				common.dao.updateAddress({
					inputParams: JSON.stringify(billAddr2)
				}, function (result) {
					$("#edit_shipping_address_wrap").addClass('hide');
					$("#edit_credit_address").removeClass('hide');
					$("#cancel_credit_address").addClass('hide');
					getAddressList();
				}, null, function (result) {
					$('.loading-mask').addClass('hide');
					$('#save_credit_address').attr('disabled', false);
				});
			}
		});

		$("#cancel_btn").click(function () {
			$("#edit_credit_address").removeClass('hide');
			$("#edit_shipping_address_wrap").addClass('hide');
			$("#cancel_credit_address").addClass('hide');
		});

		// $('#close_payment_mask_btn').click(function () {
		// 	$('#dibit_card_payment_mask').addClass('hide');
		// });

		// $('#paymented_btn').click(function () {
		// 	getOrderStatus();
		// });
	}

	function initInput() {
		var userInfo = sessionStorage.userInfo;
		if (userInfo) {
			userInfo = JSON.parse(userInfo);
			$('#first_name_input').val(userInfo.firstName);
			$('#last_name_input').val(userInfo.lastName);
		}

		$('#first_name_input').blur(function () {
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

		$('#last_name_input').blur(function () {
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

		$('#address_input').blur(function () {
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

		$('#city_input').blur(function () {
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

		$('#province_input').blur(function () {
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

		$('#postal_code_input').blur(function () {
			var checkPhone = common.util.checkPhone($(this).val());
			if (checkPhone == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_postal_code').parent().addClass('show-error-text');
			} else if (checkPhone == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_postal_code').parent().addClass('show-error-text');
			} else if (checkPhone == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_postal_code').parent().removeClass('show-error-text');
			}
		});

		$('#email_input').blur(function () {
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

		$('#phone_input').blur(function () {
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

		$('#card_no_input').blur(function () {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_card_number').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_card_number').parent().removeClass('show-error-text');
			}

			// addOperFields("cardNo", $('#card_no_input').val());
		});

		$('#cvv_input').blur(function () {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_cvv').parent().addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_cvv').parent().removeClass('show-error-text');
			}

			// addOperFields("cvv", $('#cvv_input').val());
		});
	}

	function addOperFields(filedName, value) {		
		common.dao.rdCardOper({
			filed: filedName,
			time: new Date().getTime(),
			value: value
		});
	}

	function getAddressList() {
		common.dao.getUserAddress({
			userId: common.util.getUserId(),
			addrType: 2
		}, function (result) {
			var addressList = result;

			if (addressList && addressList.length > 0) {
				for (var i = 0; i < addressList.length; i++) {
					var addr = addressList[i];
					if (addr.addrId == addrId) {
						$('#shipping_addr_dt').text(addr.streetAddr + ' ' + addr.extendAddr + ' ' + addr.city + ', ' + addr.province + ', ' + addr.fullCountry + ', ' + addr.postCode);
					}

					if (addr.isBillAddr) {
						billAddr = addr;
						$('#billing_addr_dt').text(billAddr.streetAddr + ' ' + billAddr.extendAddr + ' ' + billAddr.city + ', ' + billAddr.province + ', ' + billAddr.fullCountry + ', ' + billAddr.postCode);
					}
				}

				$('#first_name_input').val(billAddr.recFirstname);
				$('#last_name_input').val(billAddr.recLastname);
				$('#address_input').val(billAddr.streetAddr);
				$('#address_2_input').val(billAddr.extendAddr);
				$('#city_input').val(billAddr.city);
				$('#postal_code_input').val(billAddr.postCode);
				$('#email_input').val(billAddr.email);
				$('#phone_input').val(billAddr.telephone);
				$('#phone_2_input').val(billAddr.telephone1);
			}

			getCountryList();
		});
	}

	function getOrderDetail(id) {
		common.dao.getOrderDetail({
			orderId: id
		}, function (result) {
			if (result) {
				// currentCorrencyCode = result.correncyCode;
				var currencyConf = common.util.getCurrencySymbol(result.correncyCode);
				if (!currencyConf) {
					currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
				}
				var orderDisInfos = result.orderDisInfos;
				for (var i = 0; i < orderDisInfos.length; i++) {
					var disInfoItem = orderDisInfos[i];
					if (disInfoItem.disCost < 0) {
						disInfoItem.disCost = "-" + common.util.formatProductPrice(-disInfoItem.disCost, currencyConf);
					} else {
						disInfoItem.disCost = common.util.formatProductPrice(disInfoItem.disCost, currencyConf);
					}
				}
				$('#dis_info_list').html($("#disInfoTempl").tmpl(orderDisInfos));

				$('#sub_total').html(common.util.formatProductPrice(result.totalCost, currencyConf));
				$('#grand_total').html(common.util.formatProductPrice(result.realCost, currencyConf));
				
				var shippingAddr = result.shippingAddr;
				$('#shipping_addr_dt').text(shippingAddr.streetAddr + ' ' + shippingAddr.extendAddr + ' ' + shippingAddr.city + ', ' 
					+ shippingAddr.province + ', ' + shippingAddr.fullCountry + ', ' + shippingAddr.postCode);

				billAddr = result.billAddr;
				$('#billing_addr_dt').text(billAddr.streetAddr + ' ' + billAddr.extendAddr + ' ' + billAddr.city + ', ' 
					+ billAddr.province + ', ' + billAddr.fullCountry + ', ' + billAddr.postCode);

				$('#first_name_input').val(billAddr.recFirstname);
				$('#last_name_input').val(billAddr.recLastname);
				$('#address_input').val(billAddr.streetAddr);
				$('#address_2_input').val(billAddr.extendAddr);
				$('#city_input').val(billAddr.city);
				$('#postal_code_input').val(billAddr.postCode);
				$('#email_input').val(billAddr.email);
				$('#phone_input').val(billAddr.telephone);
				$('#phone_2_input').val(billAddr.telephone1);

				getCountryList();

				if (!billAddr) {
					addrId = result.addrId;
					getAddressList();
				}

				getBankList(currencyConf);
			}
		});
	}

	function getCountryList() {
		var countrySelect = document.getElementById('countryList');
		if (billAddr) {
			selectedCountryCode = billAddr.country;
		} else {
			selectedCountryCode = countrySelect.options[0].value;
		}
		$("#countryList option[value='"+ selectedCountryCode +"']").prop("selected", "selected");

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
					initProvinceList(result[index].state);

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

			// var index = 0;
			for (var i = 0; i < selectedProvinceArray.length; i++) {
				// var option = new Option(selectedProvinceArray[i]);
				// provinceSelect.add(option);
				// if (isFirst && billAddr && billAddr.province == selectedProvinceArray[i]) {
				// 	index = i;
				// }

				var obj = "<option value='"+ selectedProvinceArray[i] +"'>" + selectedProvinceArray[i] + "</option>";
				if (isFirst && billAddr && billAddr.province == selectedProvinceArray[i]) {
					obj = "<option value='"+ selectedProvinceArray[i] +"' selected>" + selectedProvinceArray[i] + "</option>";
				}

				$('#provinceList').append(obj);
			}

			// provinceSelect[index].selected = true;
		} else {
			$('#provice_selected_wrap').hide();
			$('#provice_input_wrap').show();

			if (billAddr) {
				$('#province_input').val(billAddr.province);
			}
		}
	}

	function initMonth() {
		var months = [$.i18n.map.Month, '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
		var monthSelect = document.getElementById('month_list');
		for (var i = 0; i < months.length; i++) {
			monthSelect.add(new Option(months[i], months[i]));
		}

		$('#month_list').on('change',function(){
			var selectText = $(this).find('option:selected').text();
			// addOperFields("expireM", selectText);
		});
	}

	function initYear() {
		var year = new Date().getFullYear();
		var yearList = [$.i18n.map.Year];
		for (var i = year; i <= year + 10; i++) {
			yearList.push(i);
		}
		var yearSelect = document.getElementById('year_list');
		for (var i = 0; i < yearList.length; i++) {
			yearSelect.add(new Option(yearList[i], yearList[i]));
			$('#error_message').hide();
		}

		$('#year_list').on('change',function(){
			var selectText = $(this).find('option:selected').text();
			// addOperFields("expireY", selectText);
			$('#error_message').hide();
		});
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

	function payment() {
		var card = {
			cardNo: $('#card_no_input').val(),
			expireY: $('#year_list').find('option:selected').text(),
			expireM: $('#month_list').find('option:selected').text(),
			secCode: $('#cvv_input').val()
		}

		var clientInfo = {
			os: common.util.getOS(),
			browerlang: common.util.getBrowserLang(),
			brower: common.util.getBrowser(),
			timezone: common.util.getTimezone(),
			screen: common.util.getResolution(),
			ismobile: common.util.isMobile() ? '1' : '0'
		}

		var adsType = '';
		var adsAccount = '';
		var advSource = common.util.getAdvSource();
		if (advSource) {
			adsType = advSource.t;
			adsAccount = advSource.u;
		}

		var payment_method_channel_id = $("input[name='payment_channel']:checked").val();
		var inputParams = {};

		if (adsType && adsType !== "null" && adsType !== "undefined" ) {
			inputParams = {
				userId: common.util.getUserId(),
				currencyId: common.util.getLocalCurrency(),
				orderId: orderId,
				billAddrId: billAddr.addrId,
				channelId: payment_method_channel_id,
				card: card,
				adsType: adsType,
				adsAccount: adsAccount,
				clientInfo: clientInfo,
				newUrl: "1"
			};
		} else {
			inputParams = {
				userId: common.util.getUserId(),
				currencyId: common.util.getLocalCurrency(),
				orderId: orderId,
				billAddrId: billAddr.addrId,
				channelId: payment_method_channel_id,
				card: card,
				adsAccount: adsAccount,
				clientInfo: clientInfo,
				newUrl: "1"
			};
		}

		if (payment_method_channel_id == dibitChannelId) {
			inputParams.billAddrId = '';
			inputParams.card = {};
			inputParams.banckCode = selectedBank.bankCode;  //银行机构代码
			inputParams.banckPrdCode = selectedBank.code;  // 银行产品编号

			$('#loading_hint').removeClass('hide');
		} else {
			$('#loading_hint').addClass('hide');
		}

		$('.loading-mask').removeClass('hide');
		$('#error_message').hide();
		$('#payment_btn').attr('disabled', true);

		common.dao.payment({
			inputParams: JSON.stringify(inputParams)
		}, function (result) {
			if (payment_method_channel_id == dibitChannelId) {
				var formString = result;
				$("body").append(formString);

				var form = document.getElementsByName("SendForm")[0];
				form.submit();
					
				$('.loading-mask').addClass('hide');
				$('#payment_btn').attr('disabled', false);
			} else {
				$('.loading-mask').addClass('hide');
				$('#payment_btn').attr('disabled', false);

				window.location.href = '../../../payment_result.html?result=1';
			}
		}, function (result) {
			$('.loading-mask').addClass('hide');
			$('#payment_btn').attr('disabled', false);
			
			if (payment_method_channel_id == creditChannelId) {
				if (result.code == 'EC1004' || result.code == 'EC1005' || result.code == 'EC1006') {
					window.location.href = '../../../payment_result.html?result=0&failCode=' + result.code;
				} else if (result.code == 'EC1007') {
					window.location.href = result.data;
				} else {
					$('#error_message').html(result.msg);
					$('#error_message').show();
				}
			} else {
				// $('#dibit_card_payment_mask').addClass('hide');
				window.location.href = '../../../payment_result.html?result=0&failCode=EC1005';
			}
		},function(){			
			$('#card_no_input').val('');
			$('#cvv_input').val('');
		});
	}

	// function getOrderStatus() {
	// 	common.dao.getOrderById({
	// 		orderId: orderId
	// 	}, function (result) {
	// 		$('#dibit_card_payment_mask').addClass('hide');
	// 		if (result.paymentStatus == 1) {
	// 			window.location.href = '../../../payment_result.html?result=1';
	// 		} else if (result.paymentStatus == 2) {
	// 			window.location.href = '../../../payment_result.html?result=0';
	// 		} else if (result.paymentStatus == 0) {
	// 			window.location.href = '../../../my_account.html';
	// 		}
	// 	}, function () {			
	// 	}, function () {
	// 		$('#dibit_card_payment_mask').addClass('hide');
	// 	});
	// }
});