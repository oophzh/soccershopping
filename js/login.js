require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("login.js");

	initEvent();
	initLoginInput();
	initRegisterInput();

	if (localStorage && localStorage.selectedLanguage) {
		$('#policy_url').attr('href', JSON.parse(localStorage.selectedLanguage).langCode + '/privacy.html')
	}
	
	common.setLanguageCallback(function(langCode) {
		$('#policy_url').attr('href', langCode + '/privacy.html')
	});

	function initEvent() {
		$('#agree_input').change(function () {
			if (!$(this)[0].checked) {
				$('#register_error_agree').show();
			} else {
				$('#register_error_agree').hide();
			}
		});
		
		$('#commit_login_btn').click(function () {
			var emailVaild = checkEmail('#login_email_input', '#login_error_email');
			var pwdVaild = checkPassword('#login_pwd_input', '#login_error_pwd');

			if (emailVaild && pwdVaild) {
				$('.loading-mask').removeClass('hide');
				$('#error_message').hide();

				common.dao.login({
					email: $('#login_email_input').val(),
					userPwd: $('#login_pwd_input').val()
				}, function (result) {
					console.log('登录成功');
					loginSuccess(result);
				}, function (result) {
					$('#error_message').html(result.msg);
					$('#error_message').show();
				}, function () {
					$('.loading-mask').addClass('hide');
				});
			}
		});

		$('#register_btn').click(function () {
			var emailVaild = checkEmail('#register_email_input', '#register_error_confirm_email');

			var pwdVaild = checkPassword('#register_pwd_input', '#register_error_pwd');
			pwdVaild = checkPassword('#register_confirm_pwd_input', '#register_error_confirm_pwd');

			if ($('#register_pwd_input').val() !== $('#register_confirm_pwd_input').val()) {
				$('#error_message').html($.i18n.map.PasswordNotMatch);
				$('#error_message').show();
				pwdVaild = false;
			}

			// var firstNameVaild = checkName('#register_first_name_input', '#register_error_first_name');
			// var lastNameVaild = checkName('#register_last_name_input', '#register_error_last_name');

			if (!$('#agree_input')[0].checked) {
				$('#register_error_agree').show();

				return;
			} else {
				$('#register_error_agree').hide();
			}

			// && firstNameVaild && lastNameVaild
			if (emailVaild && pwdVaild) {
				$('.loading-mask').removeClass('hide');
				$('#error_message').hide();

				var gender = $("input[type='radio'][name='gender']:checked").val();
				common.dao.register({
					inputParams: JSON.stringify({
						email: $('#register_email_input').val(),
						userPwd: $('#register_pwd_input').val(),
						sex: gender,
						// firstName: $('#register_first_name_input').val(),
						// lastName: $('#register_last_name_input').val()
						firstName: "",
						lastName: ""
					})
				}, function (data) {
					loginSuccess(data);
				}, function (data) {
					$('#error_message').html(data.msg);
					$('#error_message').show();
				}, function () {
					$('.loading-mask').addClass('hide');
				});
			}
		});
	}

	function initLoginInput() {
		$('#login_email_input').blur(function () {
			var checkEmail = common.util.checkEmail($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#login_error_email').show();
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#login_error_email').show();
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#login_error_email').hide();
			}
		});

		$('#login_pwd_input').blur(function () {
			var checkPassword = common.util.checkPassword($(this).val());
			console.log(checkPassword);
			if (checkPassword == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#login_error_pwd').show();
			} else if (checkPassword == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#login_error_pwd').show();
			} else if (checkPassword == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#login_error_pwd').hide();
			}
		});
	}

	function initRegisterInput() {
		$('#register_email_input').blur(function () {
			var checkEmail = common.util.checkEmail($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');

				if ($(this)[0].id == 'register_email_input') {
					$('#register_error_email').show();
				} else if ($(this)[0].id == 'register_confirm_email_input') {
					$('#register_error_confirm_email').show();
				}
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				if ($(this)[0].id == 'register_email_input') {
					$('#register_error_email').show();
				} else if ($(this)[0].id == 'register_confirm_email_input') {
					$('#register_error_confirm_email').show();
				}
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				if ($(this)[0].id == 'register_email_input') {
					$('#register_error_email').hide();
				} else if ($(this)[0].id == 'register_confirm_email_input') {
					$('#register_error_confirm_email').hide();
				}
			}
		});

		$('#register_pwd_input, #register_confirm_pwd_input').blur(function () {
			var checkEmail = common.util.checkPassword($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');

				if ($(this)[0].id == 'register_pwd_input') {
					$('#register_error_pwd').show();
				} else if ($(this)[0].id == 'register_confirm_pwd_input') {
					$('#register_error_confirm_pwd').show();
				}
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				if ($(this)[0].id == 'register_pwd_input') {
					$('#register_error_pwd').show();
				} else if ($(this)[0].id == 'register_confirm_pwd_input') {
					$('#register_error_confirm_pwd').show();
				}
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				if ($(this)[0].id == 'register_pwd_input') {
					$('#register_error_pwd').hide();
				} else if ($(this)[0].id == 'register_confirm_pwd_input') {
					$('#register_error_confirm_pwd').hide();
				}
			}
		});

		$('#register_first_name_input').blur(function () {
			var firstName = $('#register_first_name_input').val();
			if (!firstName) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#register_error_first_name').show();
			} else {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#register_error_first_name').hide();
			}
		});

		$('#register_last_name_input').blur(function () {
			var lastName = $('#register_last_name_input').val();
			if (!lastName) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#register_error_last_name').show();
			} else {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#register_error_last_name').hide();
			}
		});
	}

	function loginSuccess(data) {
		sessionStorage.setItem('userId', data.userId);
		sessionStorage.setItem('userInfo', JSON.stringify(data));
		$('#login_btn').text($.i18n.map.Logout);

		if (localStorage.productList) {
			var productList = JSON.parse(localStorage.productList);
			for (var i = 0; i < productList.length; i++) {
				productList[i].userId = data.userId;
			}

			common.dao.merge2cart({
				inputParams: JSON.stringify(productList)
			}, function (result) {
				localStorage.productList = '';
				handleLoginSuccess();
			}, function(result) {
				alert(result.msg);
			});
		} else {
			handleLoginSuccess();
		}
	}

	function handleLoginSuccess() {
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
				window.location.href = "../../../shopping_cart.html";
			} else {
				window.history.back(-1);
			}
		});
	}

	function checkEmail(inputId, errorInputId) {
		var checkResult = common.util.checkEmail($(inputId).val());
		console.log(checkResult);

		if (checkResult !== 1) {
			$(inputId).parent().removeClass('has-success');
			$(inputId).parent().addClass('has-error');
			$(errorInputId).show();
			return false;
		} else {
			$(inputId).parent().removeClass('has-error');
			$(inputId).parent().addClass('has-success');
			$(errorInputId).hide();
			return true;
		}
	}

	function checkPassword(inputId, errorInputId) {
		var checkResult = common.util.checkPassword($(inputId).val());
		console.log(checkResult);

		if (checkResult !== 1) {
			$(inputId).parent().removeClass('has-success');
			$(inputId).parent().addClass('has-error');
			$(errorInputId).show();
			return false;
		} else {
			$(inputId).parent().removeClass('has-error');
			$(inputId).parent().addClass('has-success');
			$(errorInputId).hide();
			return true;
		}
	}

	function checkName(inputId, errorInputId) {
		var checkResult = common.util.checkNull($(inputId).val());
		console.log(checkResult);

		if (checkResult !== 1) {
			$(inputId).parent().removeClass('has-success');
			$(inputId).parent().addClass('has-error');
			$(errorInputId).show();
			return false;
		} else {
			$(inputId).parent().removeClass('has-error');
			$(inputId).parent().addClass('has-success');
			$(errorInputId).hide();
			return true;
		}
	}
});