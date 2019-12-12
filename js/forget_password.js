require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("forget_password.js");
	common.initLoginStatus();

	initInput();
	initEvent();
	
	function initEvent() {
		$('#send_btn').click(function() {
			var cenSend = checkInput('#email_input', '#error_email');
			if (cenSend) {
				common.dao.sendValidCode({
					email: $('#email_input').val()
				}, function(result) {
					$('#modify_pwd_success_message').removeClass('alert-danger');
					$('#modify_pwd_success_message').addClass('alert-success');
					$('#modify_pwd_success_message').html($.i18n.map.ValidCodeHasSent);
					$("#modify_pwd_success_message").show();				
				}, function(result) {
					$('#modify_pwd_success_message').removeClass('alert-success');
					$('#modify_pwd_success_message').addClass('alert-danger');
					$('#modify_pwd_success_message').html(result.msg);
					$('#modify_pwd_success_message').show();
				});
			}		
		});	

		$('#set_btn').click(function() {
			var cenSet = checkInput('#vaild_code_input', '#error_vaild_code');
			cenSet = cenSet && checkInput('#pwd_input', '#register_error_pwd');
			cenSet = cenSet && checkInput('#confirm_pwd_input', '#register_error_confirm_pwd');

			if ($('#pwd_input').val() !== $('#confirm_pwd_input').val()) {
				cenSet = false;

				$('#modify_pwd_success_message').removeClass('alert-success');
				$('#modify_pwd_success_message').addClass('alert-danger');
				$('#modify_pwd_success_message').html($.i18n.map.PasswordNotMatch);
				$('#modify_pwd_success_message').show();
			}

			if (cenSet) {
				modifyPwd();
			}
		});	
	}

	function initInput() {
		$('#email_input').blur(function() {
			var checkEmail = common.util.checkEmail($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_email').show();
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_email').show();
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_email').hide();
			}
		});

		$('#vaild_code_input').blur(function() {
			var checkEmail = common.util.checkNull($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_vaild_code').show();
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_vaild_code').hide();
			}
		});

		$('#pwd_input, #confirm_pwd_input').blur(function() {
			var checkEmail = common.util.checkPassword($(this).val());
			console.log(checkEmail);
			if (checkEmail == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				
				if ($(this)[0].id == 'pwd_input') {
					$('#register_error_pwd').show();
				} else if ($(this)[0].id == 'confirm_pwd_input'){
					$('#register_error_confirm_pwd').show();
				}
			} else if (checkEmail == -1) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				if ($(this)[0].id == 'pwd_input') {
					$('#register_error_pwd').show();
				} else if ($(this)[0].id == 'confirm_pwd_input'){
					$('#register_error_confirm_pwd').show();
				}
			} else if (checkEmail == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				if ($(this)[0].id == 'pwd_input') {
					$('#register_error_pwd').hide();
				} else if ($(this)[0].id == 'confirm_pwd_input'){
					$('#register_error_confirm_pwd').hide();
				}
			}
		});
	}
	
	function checkInput(inputId, errorInputId) {
		if ($(inputId).hasClass('has-error') || $(inputId).val() === "") {
			$(this).removeClass('has-success');
			$(this).addClass('has-error');
			$(errorInputId).show();
			return false;
		}

		return true;
	}

	function modifyPwd() {
		common.dao.mdpwd({
			userId: "",
			email: $('#email_input').val(),
			oldPwd: "", 
			newPwd: $('#pwd_input').val(), 
			checkCode: $('#vaild_code_input').val()
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
});