require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
    console.log("contact_us.js");
    
    common.initLoginStatus(function (data) {
		if (!data) {
			window.location.href = "../../../login.html";
		}
	});

    var selectedTypeIndex = -1;

    initEvent();

    function initEvent() {
        $('#submit_btn').click(function() {
            var canSubmit = true;

            var userId = common.util.getUserId();
            if (!userId) {
                canSubmit = false;
                window.location.href = "../../../login.html";
            }

            if (selectedTypeIndex == -1) {
                $('#error_type').addClass('show-error-text');
                canSubmit = false;
            }

            var title = $('#title').val();
            if (common.util.checkNull(title) == 0) {
                $('#error_title').addClass('show-error-text');
                canSubmit = false;
            }

            var message = $('#message').val();
            if (common.util.checkNull(message) == 0) {
                $('#error_message').addClass('show-error-text');
                canSubmit = false;
            }

            if (canSubmit) {
                common.dao.contactUs({
                    userId: userId,
                    type: selectedTypeIndex,
                    title: title,
                    cnt: message
                }, function() {
                    $('#hint').removeClass('invisibility');
                    $('#submit_btn').attr('disabled', true);
                });
            }
        });

        $('#title').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_title').addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_title').removeClass('show-error-text');
			}
        });
        
        $('#message').blur(function() {
			var checkNull = common.util.checkNull($(this).val());
			if (checkNull == 0) {
				$(this).parent().removeClass('has-success');
				$(this).parent().addClass('has-error');
				$('#error_message').addClass('show-error-text');
			} else if (checkNull == 1) {
				$(this).parent().removeClass('has-error');
				$(this).parent().addClass('has-success');
				$('#error_message').removeClass('show-error-text');
			}
        });
        
        $('#typeList li').bind('click', function () {
            selectedTypeIndex = $(this).val();
            $('#selected_type_span').html($(this).text());
            $('#error_type').removeClass('show-error-text');
        });
    }
});