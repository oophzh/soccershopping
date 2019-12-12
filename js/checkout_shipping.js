require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(e,r,t,s,a){function o(){a.dao.getUserAddress({userId:a.util.getUserId(),addrType:0},function(r){var t=r;if(t&&t.length>0)for(var s=0;s<t.length;s++)if(1==t[s].isDefault){h=t[s];break}h&&(e("#first_name_input").val(h.recFirstname),e("#last_name_input").val(h.recLastname),e("#address_input").val(h.streetAddr),e("#address_2_input").val(h.extendAddr),e("#city_input").val(h.city),e("#postal_code_input").val(h.postCode),e("#email_input").val(h.email),e("#phone_input").val(h.telephone),e("#phone_2_input").val(h.telephone1)),n()},function(){n()})}function i(){var r="";1==sessionStorage.applyCouponCode&&(r=a.util.getCouponCode());var t={currencyId:a.util.getLocalCurrency(),userId:a.util.getUserId(),cart:[],applyCpNo:r};a.dao.shoppingCart({inputParams:JSON.stringify(t)},function(r){var t=r.cart;if(t){for(var s=a.util.getCurrencySymbol(a.util.getLocalCurrency()),o=0,i=0;i<t.length;i++){var n=t[i];n.displayImg=a.util.picUrl+n.displayImg,n.cost=a.util.formatProductPrice(n.cost,s),o+=Number(n.productNum)}e("#cart_list").html(e("#cartTempl").tmpl(t)),e("#cart_list #color_title").html(e.i18n.map.ColorTitle),m=!0}if(r.dis_info&&r.dis_info.length>0){for(var i=0;i<r.dis_info.length;i++){var l=r.dis_info[i];l.disAmount<0?l.disAmount="-"+a.util.formatProductPrice(-l.disAmount,s):l.disAmount=a.util.formatProductPrice(l.disAmount,s),6==l.policyId&&e("#ship_cost_content").html(l.disAmount)}e("#dis_info_list").html(e("#disInfoTempl").tmpl(r.dis_info))}e("#sub_total").html(a.util.formatProductPrice(r.amount,s)),e("#grand_total").html(a.util.formatProductPrice(r.realAmount,s)),d=r.amountAllowed,c=r.realAmount;var p=3;sessionStorage.maxnum_allowed&&(p=Number(sessionStorage.maxnum_allowed)),_=o<=p})}function n(){var r=document.getElementById("countryList");u=h?h.country:sessionStorage.country_belong?sessionStorage.country_belong:r.options[0].value,e("#countryList option[value='"+u+"']").prop("selected","selected"),e.getJSON("/resources/json/country.json",function(t){var s=r.selectedIndex;if(t&&t[s]&&t[s].state&&t[s].state.length>0)l(t[s].state,!0),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),e(".loading-mask").addClass("hide")}e("#countryList").on("change",function(){var s=e(this).find("option:selected").val();u=s;var a=r.selectedIndex;if(console.log(a),t&&t[a]&&t[a].state&&t[a].state.length>0)l(t[a].state,!1),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}})})}function l(r,t){if(r&&r.length>0){e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();document.getElementById("provinceList").length=0;for(var s=r,a=0;a<s.length;a++){var o="<option value='"+s[a]+"'>"+s[a]+"</option>";t&&h&&h.province==s[a]&&(o="<option value='"+s[a]+"' selected>"+s[a]+"</option>"),e("#provinceList").append(o)}e(".loading-mask").addClass("hide")}else e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),h&&e("#province_input").val(h.province),e(".loading-mask").addClass("hide")}function p(r,t){return!e(r).parent().hasClass("has-error")&&""!==e(r).val()||(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e(t).parent().addClass("show-error-text"),!1)}console.log("order.js");var u,d="",c="",_=!0,m=!1,h=null;a.initLoginStatus(function(e){e?(o(),i()):window.location.href="../../../login.html"}),function(){e("#save_address_btn").click(function(){var r=!0,t=p("#first_name_input","#error_first_name");r&&((r=t&&r)||e("#first_name_input").focus());var s=p("#last_name_input","#error_last_name");r&&((r=s&&r)||e("#last_name_input").focus());var i=p("#address_input","#error_address");r&&((r=i&&r)||e("#address_input").focus());var n=p("#city_input","#error_city");r&&((r=n&&r)||e("#city_input").focus());var l=p("#postal_code_input","#error_postal_code");r&&((r=l&&r)||e("#postal_code_input").focus());var d=p("#email_input","#error_email");r&&((r=d&&r)||e("#email_input").focus());var c=p("#phone_input","#error_phone");if(r&&((r=c&&r)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var _=p("#province_input","#error_province");r&&((r=_&&r)||e("#province_input").focus())}var m=e("#provinceList").find("option:selected").text();if(e("#provice_input_wrap").is(":visible")&&(m=e("#province_input").val()),r){var h={userId:a.util.getUserId(),country:u,fullCountry:e("#countryList").find("option:selected").text(),province:m,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val(),postCode:e("#postal_code_input").val(),isBillAddr:"0",telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val()};a.dao.addAddress({inputParams:JSON.stringify(h)},function(e){o()}),e("#error_message").html(""),e("#error_message").hide(),e("#save_address_btn").attr("disabled",!0)}}),e("#cancel_save_address_btn").click(function(){e("#choose_shipping_address_wrap").show(),e("#edit_shipping_address_wrap").hide()}),e("#continue_btn").click(function(){if(!m)return e("#error_message").html(e.i18n.map.EmptyCart),void e("#error_message").show();var r=!0,t=p("#first_name_input","#error_first_name");r&&((r=t&&r)||e("#first_name_input").focus());var s=p("#last_name_input","#error_last_name");r&&((r=s&&r)||e("#last_name_input").focus());var o=p("#address_input","#error_address");r&&((r=o&&r)||e("#address_input").focus());var i=p("#city_input","#error_city");r&&((r=i&&r)||e("#city_input").focus());var n=p("#postal_code_input","#error_postal_code");r&&((r=n&&r)||e("#postal_code_input").focus());var l=p("#email_input","#error_email");r&&((r=l&&r)||e("#email_input").focus());var v=p("#phone_input","#error_phone");if(r&&((r=v&&r)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var f=p("#province_input","#error_province");r&&((r=f&&r)||e("#province_input").focus())}var g=e("#provinceList").find("option:selected").text();if(e("#provice_input_wrap").is(":visible")&&(g=e("#province_input").val()),_){if(c>d){var C=a.util.getCurrencySymbol(a.util.getLocalCurrency());e("#error_message").html(e.i18n.map.maxAmountErrorMsg1+" "+a.util.formatProductPrice(c,C)+e.i18n.map.maxAmountErrorMsg2+" "+a.util.formatProductPrice(d,C)+e.i18n.map.maxAmountErrorMsg3),e("#error_message").removeClass("hide"),setTimeout(function(){alert(e.i18n.map.maxAmountErrorMsg1+" "+a.util.formatProductPrice(c,C)+e.i18n.map.maxAmountErrorMsg2+" "+a.util.formatProductPrice(d,C)+e.i18n.map.maxAmountErrorMsg3)},1),r=!1}}else e("#error_message").html(e.i18n.map.maxErrorMsg1+" "+sessionStorage.maxnum_allowed+e.i18n.map.maxErrorMsg2),e("#error_message").removeClass("hide"),setTimeout(function(){alert(e.i18n.map.maxErrorMsg1+" "+sessionStorage.maxnum_allowed+e.i18n.map.maxErrorMsg2)},1),r=!1;if(r){var y={userId:a.util.getUserId(),country:u,fullCountry:e("#countryList").find("option:selected").text(),province:g,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val(),postCode:e("#postal_code_input").val(),telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val()};h&&(y.addrId=h.addrId),e(".loading-mask").removeClass("hide"),e("#error_message").html(""),e("#error_message").hide(),e("#continue_btn").attr("disabled",!0);var w="";1==sessionStorage.applyCouponCode&&(w=a.util.getCouponCode());var x="",b="",I=a.util.getAdvSource();I&&(x=I.t,b=I.u);var A={};A=x&&"null"!==x&&"undefined"!==x?{currencyId:a.util.getLocalCurrency(),userId:a.util.getUserId(),adsType:x,adsAccount:b,memo:e("#memo_text_area").val(),spAddr:y,applyCpNo:w}:{currencyId:a.util.getLocalCurrency(),userId:a.util.getUserId(),adsAccount:b,memo:e("#memo_text_area").val(),spAddr:y,applyCpNo:w},a.dao.newOrder({inputParams:JSON.stringify(A)},function(r){r&&(e(".loading-mask").addClass("hide"),e("#continue_btn").attr("disabled",!1),window.location.href="checkout_payment.html?orderId="+r.orderId)},function(r){e(".loading-mask").addClass("hide"),e("#error_message").html(r.msg),e("#error_message").show(),setTimeout(function(){alert(r.msg)})},function(){e(".loading-mask").addClass("hide"),e("#continue_btn").attr("disabled",!1)})}})}(),function(){var r=sessionStorage.userInfo;r&&(r=JSON.parse(r),e("#first_name_input").val(r.firstName),e("#last_name_input").val(r.lastName),e("#email_input").val(r.email)),e("#first_name_input").blur(function(){var r=a.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_first_name").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_first_name").parent().removeClass("show-error-text"))}),e("#last_name_input").blur(function(){var r=a.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_last_name").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_last_name").parent().removeClass("show-error-text"))}),e("#address_input").blur(function(){var r=a.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address").parent().removeClass("show-error-text"))}),e("#postal_code_input").blur(function(){var r=a.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_postal_code").parent().removeClass("show-error-text"))}),e("#city_input").blur(function(){var r=a.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_city").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_city").parent().removeClass("show-error-text"))}),e("#province_input").blur(function(){var r=a.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_province").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_province").parent().removeClass("show-error-text"))}),e("#email_input").blur(function(){var r=a.util.checkEmail(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_email").parent().removeClass("show-error-text"))}),e("#phone_input").blur(function(){var r=a.util.checkPhone(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_phone").parent().removeClass("show-error-text"))})}(),function(){a.dao.getChannel({type:1},function(e){e&&sessionStorage.setItem("channelList",JSON.stringify(e))})}(),e(".loading-mask").removeClass("hide"),e("#currency_group").hide()});