require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("payment_result.js");
	common.initLoginStatus(function(data) {
		if (!data) {
			window.location.href = "../../../login.html";
		}
	});
	
	$('#currency_group').hide();

	var result = common.util.getQueryString('result');
	var failCode = common.util.getQueryString('failCode');
	

	if (!result) {
		//ui=23&odi=23234234&code=1&msg=操作失败
		var code = common.util.getQueryString('code')
		if (code == 1) {
			result = 0;
		} else {
			result = 1;
		}
	}

	if (result == 1) {
		$('#third_strp').addClass('active');
		$('#step_progress').css('width', '600px');

		$('#success_wrap').show();
		$('#fail_wrap').hide();
	} else {
		if (failCode == 'EC1004') {
			$('#success_wrap').hide();
			$('#fail_wrap').show();

			$('.fail-reason').show();
			$('#payment_btn').click(function() {
				window.history.go(-1);
			});
		} else if (failCode == 'EC1005' || failCode == 'EC1006') {
			$('#success_wrap').hide();
			$('#fail_wrap').show();

			$('.fail-reason').hide();
			$('#payment_btn').click(function() {
				window.history.go(-1);
			});
		} else {
			$('#success_wrap').hide();
			$('#fail_wrap').show();

			var orderId = common.util.getQueryString('odi');
			$('#payment_btn').click(function() {
				window.location.href = 'checkout_payment.html?orderId=' + orderId;
			});
		}
	}
});