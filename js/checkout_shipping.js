"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(e,r,s,a,t){function o(e){if(C)for(var r=0;r<C.length;r++){var s=C[r];if(s.code==e)return s.name}return e}function n(){t.dao.getUserAddress({userId:t.util.getUserId(),addrType:0},function(r){var s=r;if(s&&s.length>0)for(var a=0;a<s.length;a++)if(1==s[a].isDefault){v=s[a];break}v&&(e("#first_name_input").val(v.recFirstname),e("#last_name_input").val(v.recLastname),e("#address_input").val(v.streetAddr),e("#address_2_input").val(v.extendAddr),e("#city_input").val(v.city),e("#postal_code_input").val(v.postCode),e("#email_input").val(v.email),e("#phone_input").val(v.telephone),e("#phone_2_input").val(v.telephone1)),l()},function(){l()})}function i(){var r="";1==sessionStorage.applyCouponCode&&(r=t.util.getCouponCode());var s={currencyId:t.util.getLocalCurrency(),userId:t.util.getUserId(),cart:[],applyCpNo:r};t.dao.shoppingCart({inputParams:JSON.stringify(s)},function(r){var s=r.cart;if(s){for(var a=t.util.getCurrencySymbol(t.util.getLocalCurrency()),o=0,n=0;n<s.length;n++){var i=s[n];0==Number(i.productNum)?s.splice(n,1):(i.displayImg=t.util.picUrl+i.displayImg,i.cost=t.util.formatProductPrice(i.cost,a),o+=Number(i.productNum))}e("#cart_list").html(e("#cartTempl").tmpl(s)),e("#cart_list #color_title").html(e.i18n.map.ColorTitle),m=!0}else m=!1;if(r.dis_info&&r.dis_info.length>0){for(var n=0;n<r.dis_info.length;n++){var l=r.dis_info[n];l.disAmount<0?l.disAmount="-"+t.util.formatProductPrice(-l.disAmount,a):l.disAmount="+"+t.util.formatProductPrice(l.disAmount,a),6==l.policyId&&e("#ship_cost_content").html(l.disAmount)}e("#dis_info_list").html(e("#disInfoTempl").tmpl(r.dis_info))}e("#sub_total").html(t.util.formatProductPrice(r.amount,a)),e("#grand_total").html(t.util.formatProductPrice(r.realAmount,a)),c=r.amountAllowed,_=r.realAmount;var d=3;sessionStorage.maxnum_allowed&&(d=Number(sessionStorage.maxnum_allowed)),h=o<=d})}function l(){var r=document.getElementById("countryList");u=v?v.country:sessionStorage.country_belong?sessionStorage.country_belong:r.options[0].value,e("#countryList option[value='"+u+"']").prop("selected","selected"),e.getJSON("/resources/json/country.json",function(s){var a=r.selectedIndex;if(C=s,s&&s[a]&&s[a].state&&s[a].state.length>0)d(s[a].state,!0),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),e(".loading-mask").addClass("hide")}e("#countryList").on("change",function(){var a=e(this).find("option:selected").val();u=a;var t=r.selectedIndex;if(console.log(t),s&&s[t]&&s[t].state&&s[t].state.length>0)d(s[t].state,!1),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}})})}function d(r,s){if(r&&r.length>0){e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();document.getElementById("provinceList").length=0;for(var a=r,t=0;t<a.length;t++){var o="<option value='"+a[t]+"'>"+a[t]+"</option>";s&&v&&v.province==a[t]&&(o="<option value='"+a[t]+"' selected>"+a[t]+"</option>"),e("#provinceList").append(o)}e(".loading-mask").addClass("hide")}else e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),v&&e("#province_input").val(v.province),e(".loading-mask").addClass("hide")}function p(r,s){return!e(r).parent().hasClass("has-error")&&""!==e(r).val().trim()||(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e(s).parent().addClass("show-error-text"),!1)}console.log("order.js");var u,c="",_="",h=!0,m=null,v=null,C=null;t.initLoginStatus(function(e){e?(n(),i()):window.location.href="../../../login.html"}),function(){e("#save_address_btn").click(function(){var r=!0,s=p("#first_name_input","#error_first_name");r&&((r=s&&r)||e("#first_name_input").focus());var a=p("#last_name_input","#error_last_name");r&&((r=a&&r)||e("#last_name_input").focus());var i=!0,l=t.util.checkAddress();0==l?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text"),i=!1):-1==l?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text"),i=!1):1==l&&(e("#address_input").parent().removeClass("has-error"),e("#address_input").parent().addClass("has-success"),e("#error_address").parent().removeClass("show-error-text")),r&&((r=i&&r)||e("#address_input").focus());var d=p("#city_input","#error_city");r&&((r=d&&r)||e("#city_input").focus());var c=p("#postal_code_input","#error_postal_code");r&&((r=c&&r)||e("#postal_code_input").focus());var _=p("#email_input","#error_email");r&&((r=_&&r)||e("#email_input").focus());var h=p("#phone_input","#error_phone");if(r&&((r=h&&r)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var m=p("#province_input","#error_province");r&&((r=m&&r)||e("#province_input").focus())}var v=e("#provinceList").val();if(e("#provice_input_wrap").is(":visible")&&(v=e("#province_input").val()),r){var C={userId:t.util.getUserId(),country:u,fullCountry:o(u),province:v,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val().trim(),postCode:e("#postal_code_input").val(),isBillAddr:"0",telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val()};t.dao.addAddress({inputParams:JSON.stringify(C)},function(e){n()}),e("#error_message").html(""),e("#error_message").hide(),e("#save_address_btn").attr("disabled",!0)}}),e("#cancel_save_address_btn").click(function(){e("#choose_shipping_address_wrap").show(),e("#edit_shipping_address_wrap").hide()}),e("#continue_btn").click(function(){if(null!=m){if(0==m)return e("#error_message").html(e.i18n.map.EmptyCart),void e("#error_message").show();var r=!0,s=p("#first_name_input","#error_first_name");r&&((r=s&&r)||e("#first_name_input").focus());var a=p("#last_name_input","#error_last_name");r&&((r=a&&r)||e("#last_name_input").focus());var n=!0,i=t.util.checkAddress(e("#address_input").val());0==i?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text"),n=!1):-1==i?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text"),n=!1):1==i&&(e("#address_input").parent().removeClass("has-error"),e("#address_input").parent().addClass("has-success"),e("#error_address").parent().removeClass("show-error-text")),r&&((r=n&&r)||e("#address_input").focus()),n=!0,i=t.util.checkAddress(e("#address_2_input").val()),-1==i?(e("#address_2_input").parent().removeClass("has-success"),e("#address_2_input").parent().addClass("has-error"),e("#error_address_2").parent().addClass("show-error-text"),n=!1):(e("#address_2_input").parent().removeClass("has-error"),e("#address_2_input").parent().addClass("has-success"),e("#error_address_2").parent().removeClass("show-error-text")),r&&((r=n&&r)||e("#address_2_input").focus());var l=p("#city_input","#error_city");r&&((r=l&&r)||e("#city_input").focus());var d=p("#postal_code_input","#error_postal_code");r&&((r=d&&r)||e("#postal_code_input").focus());var C=p("#email_input","#error_email");r&&((r=C&&r)||e("#email_input").focus());var f=p("#phone_input","#error_phone");if(r&&((r=f&&r)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var g=p("#province_input","#error_province");r&&((r=g&&r)||e("#province_input").focus())}var w=e("#provinceList").val();if(e("#provice_input_wrap").is(":visible")&&(w=e("#province_input").val()),h){if(_>c){var y=t.util.getCurrencySymbol(t.util.getLocalCurrency());e("#error_message").html(e.i18n.map.maxAmountErrorMsg1+" "+t.util.formatProductPrice(_,y)+" "+e.i18n.map.maxAmountErrorMsg2+" "+t.util.formatProductPrice(c,y)+". "+e.i18n.map.maxAmountErrorMsg3),e("#error_message").removeClass("hide"),setTimeout(function(){alert(e.i18n.map.maxAmountErrorMsg1+" "+t.util.formatProductPrice(_,y)+" "+e.i18n.map.maxAmountErrorMsg2+" "+t.util.formatProductPrice(c,y)+". "+e.i18n.map.maxAmountErrorMsg3)},1),r=!1}}else e("#error_message").html(e.i18n.map.maxErrorMsg1+" "+sessionStorage.maxnum_allowed+e.i18n.map.maxErrorMsg2),e("#error_message").removeClass("hide"),setTimeout(function(){alert(e.i18n.map.maxErrorMsg1+" "+sessionStorage.maxnum_allowed+e.i18n.map.maxErrorMsg2)},1),r=!1;if(r){var x={userId:t.util.getUserId(),country:u,fullCountry:o(u),province:w,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val().trim(),postCode:e("#postal_code_input").val(),telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val()};v&&(x.addrId=v.addrId),e(".loading-mask").removeClass("hide"),e("#error_message").html(""),e("#error_message").hide(),e("#continue_btn").attr("disabled",!0);var b="";1==sessionStorage.applyCouponCode&&(b=t.util.getCouponCode());var A="",I="",k=t.util.getAdvSource();k&&(A=k.t,I=k.u);var P={};P=A&&"null"!==A&&"undefined"!==A?{currencyId:t.util.getLocalCurrency(),userId:t.util.getUserId(),adsType:A,adsAccount:I,memo:e("#memo_text_area").val(),spAddr:x,applyCpNo:b}:{currencyId:t.util.getLocalCurrency(),userId:t.util.getUserId(),adsAccount:I,memo:e("#memo_text_area").val(),spAddr:x,applyCpNo:b},t.dao.newOrder({inputParams:JSON.stringify(P)},function(r){r&&(e(".loading-mask").addClass("hide"),e("#continue_btn").attr("disabled",!1),window.location.href="checkout_payment.html?orderId="+r.orderId)},function(r){e(".loading-mask").addClass("hide"),e("#error_message").html(r.msg),e("#error_message").show(),setTimeout(function(){alert(r.msg)})},function(){e(".loading-mask").addClass("hide"),e("#continue_btn").attr("disabled",!1)})}}})}(),function(){var r=sessionStorage.userInfo;r&&(r=JSON.parse(r),e("#first_name_input").val(r.firstName),e("#last_name_input").val(r.lastName),e("#email_input").val(r.email)),e("#first_name_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_first_name").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_first_name").parent().removeClass("show-error-text"))}),e("#last_name_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_last_name").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_last_name").parent().removeClass("show-error-text"))}),e("#address_input").blur(function(){var r=t.util.checkAddress(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address").parent().removeClass("show-error-text"))}),e("#address_2_input").blur(function(){-1==t.util.checkAddress(e(this).val())?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address_2").parent().addClass("show-error-text")):(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address_2").parent().removeClass("show-error-text"))}),e("#postal_code_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_postal_code").parent().removeClass("show-error-text"))}),e("#city_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_city").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_city").parent().removeClass("show-error-text"))}),e("#province_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_province").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_province").parent().removeClass("show-error-text"))}),e("#email_input").blur(function(){var r=t.util.checkEmail(e(this).val().trim());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_email").parent().removeClass("show-error-text"))}),e("#phone_input").blur(function(){var r=t.util.checkPhone(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_phone").parent().removeClass("show-error-text"))})}(),function(){t.dao.getChannel({type:1},function(e){e&&sessionStorage.setItem("channelList",JSON.stringify(e))})}(),e(".loading-mask").removeClass("hide"),e("#currency_group").hide()});