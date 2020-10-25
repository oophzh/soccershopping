"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(e,r,s,a,t){function n(r){e("#payment_method_list").html(e("#payMethodItemTempl").tmpl(r));for(var s=0;s<r.length;s++){var a=r[s];2==a.extP4?f=a.channelId:1==a.extP4&&(g=a.channelId)}f?(e("#"+f).attr("checked",!0),e("#bank_list_wrap").removeClass("hide"),e("#payment_card_wrap").addClass("hide"),e("#billing_address_wrap").addClass("hide")):(e("#"+g).attr("checked",!0),e("#bank_list_wrap").addClass("hide"),e("#payment_card_wrap").removeClass("hide"),e("#billing_address_wrap").removeClass("hide")),e("input[type=radio][name=payment_channel]").change(function(){this.value==f?(e("#bank_list_wrap").removeClass("hide"),e("#payment_card_wrap").addClass("hide"),e("#billing_address_wrap").addClass("hide")):this.value==g&&(e("#bank_list_wrap").addClass("hide"),e("#payment_card_wrap").removeClass("hide"),e("#billing_address_wrap").removeClass("hide"))})}function d(r){var s=b[r.currencyName];s&&s.length>0&&f?(e("#"+f).attr("disabled",!1),e("#debit_error_msg").addClass("hide"),e("#"+f).attr("checked",!0),e("#"+g).attr("checked",!1),e("#bank_list_wrap").removeClass("hide"),e("#bank_list_wrap").html(e("#bankItemTempl").tmpl(s)),e("#bank_list_wrap .bank-item-wrap").bind("click",function(){e("#error_message").hide(),e("#bank_list_wrap .bank-item-wrap img").removeClass("selected"),e(this).find("img").addClass("selected"),y=s[e(this).data().data]})):(e("#"+f).attr("disabled",!0),e("#debit_error_msg").removeClass("hide"),e("#bank_list_wrap").addClass("hide"),e("#"+f).attr("checked",!1),e("#"+g).attr("checked",!0),e("#payment_card_wrap").removeClass("hide"),e("#billing_address_wrap").removeClass("hide"))}function i(){t.dao.getUserAddress({userId:t.util.getUserId(),addrType:2},function(r){var s=r;if(s&&s.length>0){for(var a=0;a<s.length;a++){var t=s[a];t.addrId==v&&e("#shipping_addr_dt").text(t.streetAddr+" "+t.extendAddr+" "+t.city+", "+t.province+", "+t.fullCountry+", "+t.postCode),t.isBillAddr&&(u=t,e("#billing_addr_dt").text(u.streetAddr+" "+u.extendAddr+" "+u.city+", "+u.province+", "+u.fullCountry+", "+u.postCode))}e("#first_name_input").val(u.recFirstname),e("#last_name_input").val(u.recLastname),e("#address_input").val(u.streetAddr),e("#address_2_input").val(u.extendAddr),e("#city_input").val(u.city),e("#postal_code_input").val(u.postCode),e("#email_input").val(u.email),e("#phone_input").val(u.telephone),e("#phone_2_input").val(u.telephone1)}l()})}function o(r){t.dao.getOrderDetail({orderId:r},function(r){if(r){var s=t.util.getCurrencySymbol(r.correncyCode);s||(s=t.util.getCurrencySymbol(t.util.getLocalCurrency()));for(var a=r.orderDisInfos,n=0;n<a.length;n++){var o=a[n];o.disCost<0?o.disCost="-"+t.util.formatProductPrice(-o.disCost,s):o.disCost="+"+t.util.formatProductPrice(o.disCost,s)}e("#dis_info_list").html(e("#disInfoTempl").tmpl(a)),e("#sub_total").html(t.util.formatProductPrice(r.totalCost,s)),e("#grand_total").html(t.util.formatProductPrice(r.realCost,s));var c=r.shippingAddr;e("#shipping_addr_dt").text(c.streetAddr+" "+c.extendAddr+" "+c.city+", "+c.province+", "+c.fullCountry+", "+c.postCode),u=r.billAddr,e("#billing_addr_dt").text(u.streetAddr+" "+u.extendAddr+" "+u.city+", "+u.province+", "+u.fullCountry+", "+u.postCode),e("#first_name_input").val(u.recFirstname),e("#last_name_input").val(u.recLastname),e("#address_input").val(u.streetAddr),e("#address_2_input").val(u.extendAddr),e("#city_input").val(u.city),e("#postal_code_input").val(u.postCode),e("#email_input").val(u.email),e("#phone_input").val(u.telephone),e("#phone_2_input").val(u.telephone1),l(),u||(v=r.addrId,i()),d(s)}})}function l(){var r=document.getElementById("countryList");m=u?u.country:r.options[0].value,e("#countryList option[value='"+m+"']").prop("selected","selected"),e.getJSON("/resources/json/country.json",function(s){var a=r.selectedIndex;if(w=s,s&&s[a]&&s[a].state&&s[a].state.length>0)c(s[a].state,!0),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}e("#countryList").on("change",function(){var a=e(this).find("option:selected").val();m=a;var t=r.selectedIndex;if(s&&s[t]&&s[t].state&&s[t].state.length>0)c(s[t].state),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}})})}function c(r,s){if(r&&r.length>0){e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();var a=r;document.getElementById("provinceList").length=0;for(var t=0;t<a.length;t++){var n="<option value='"+a[t]+"'>"+a[t]+"</option>";s&&u&&u.province==a[t]&&(n="<option value='"+a[t]+"' selected>"+a[t]+"</option>"),e("#provinceList").append(n)}}else e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),u&&e("#province_input").val(u.province)}function p(r,s){return!e(r).parent().hasClass("has-error")&&""!==e(r).val().trim()||(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e(s).parent().addClass("show-error-text"),!1)}function _(){var r={cardNo:e("#card_no_input").val(),expireY:e("#year_list").val(),expireM:e("#month_list").val(),secCode:e("#cvv_input").val()},s={os:t.util.getOS(),browerlang:t.util.getBrowserLang(),brower:t.util.getBrowser(),timezone:t.util.getTimezone(),screen:t.util.getResolution(),ismobile:t.util.isMobile()?"1":"0"},a="",n="",d=t.util.getAdvSource();d&&(a=d.t,n=d.u);var i=e("input[name='payment_channel']:checked").val(),o={};o=a&&"null"!==a&&"undefined"!==a?{userId:t.util.getUserId(),currencyId:t.util.getLocalCurrency(),orderId:C,billAddrId:u.addrId,channelId:i,card:r,adsType:a,adsAccount:n,clientInfo:s,newUrl:"1"}:{userId:t.util.getUserId(),currencyId:t.util.getLocalCurrency(),orderId:C,billAddrId:u.addrId,channelId:i,card:r,adsAccount:n,clientInfo:s,newUrl:"1"},i==f?(o.billAddrId="",o.card={},o.banckCode=y.bankCode,o.banckPrdCode=y.code,e("#loading_hint").removeClass("hide")):e("#loading_hint").addClass("hide"),e(".loading-mask").removeClass("hide"),e("#error_message").hide(),e("#payment_btn").attr("disabled",!0),t.dao.payment({inputParams:JSON.stringify(o)},function(r){if(i==f){var s=r;e("body").append(s);document.getElementsByName("SendForm")[0].submit(),e(".loading-mask").addClass("hide"),e("#payment_btn").attr("disabled",!1)}else e(".loading-mask").addClass("hide"),e("#payment_btn").attr("disabled",!1),window.location.href="../../../payment_result.html?result=1&odi="+C},function(r){e(".loading-mask").addClass("hide"),e("#payment_btn").attr("disabled",!1),i==g?"EC1004"==r.code||"EC1005"==r.code||"EC1006"==r.code?window.location.href="../../../payment_result.html?result=0&failCode="+r.code+"&failMsg="+encodeURI(r.msg):"EC1007"==r.code?window.location.href=r.data:(e("#error_message").html(r.msg),e("#error_message").show()):window.location.href="../../../payment_result.html?result=0&failCode=EC1005"},function(){e("#card_no_input").val(""),e("#cvv_input").val("")})}function h(e){if(w)for(var r=0;r<w.length;r++){var s=w[r];if(s.code==e)return s.name}return e}console.log("payment.js");var u,m,v,C=t.util.getQueryString("orderId"),f="",g="",w=null,b={MYR:[{name:"Maybank",bankCode:"FPXD_MB2U0227",code:"25",img:"maybank.png"},{name:"CIMB",bankCode:"FPXD_BCBB0235",code:"25",img:"CIMBBank.png"},{name:"Public Bank",bankCode:"FPXD_PBB0233",code:"25",img:"PublicBankBerhad.png"},{name:"RHB",bankCode:"FPXD_RHB0218",code:"25",img:"RHBBank.png"},{name:"Hong Leong Bank",bankCode:"FPXD_HLB0224",code:"25",img:"HongLeongBank.png"},{name:"Bank Islam",bankCode:"FPXD_BIMB0340",code:"25",img:"BankIslam.png"}],THB:[{name:"United oversea Bank",bankCode:"FPXD_UOB0226",code:"27",img:"UnitedOverseasBank.png"}]},y=null;t.initLoginStatus(function(e){e?o(C):window.location.href="../../../login.html"}),e("#order_no_dt").text(C),e("#card_no_input").val(""),e("#cvv_input").val(""),function(){var e;sessionStorage.channelList?(e=JSON.parse(sessionStorage.channelList),n(e)):t.dao.getChannel({type:1},function(r){r&&(e=r,n(e),sessionStorage.setItem("channelList",JSON.stringify(r)))})}(),function(){e("#payment_btn").click(function(){var r=!0,s=e("input[name='payment_channel']:checked").val();if(s==g){var a=p("#card_no_input","#error_card_number");r&&((r=a&&r)||(e("#card_no_input").focus(),setTimeout(function(){alert(e.i18n.map.CardNumErrorMsg)},100))),e("#month_list").find("option:selected").text()==e.i18n.map.Month?(setTimeout(function(){alert(e.i18n.map.MonthYearErrorMsg)},100),r=!1,e("#month_list").focus(),e("#error_card_date").parent().addClass("show-error-text")):e("#error_card_date").parent().removeClass("show-error-text"),e("#year_list").find("option:selected").text()==e.i18n.map.Year?(r&&setTimeout(function(){alert(e.i18n.map.MonthYearErrorMsg)},100),r=!1,e("#year_list").focus(),e("#error_card_date").parent().addClass("show-error-text")):e("#error_card_date").parent().removeClass("show-error-text");var t=p("#cvv_input","#error_cvv");r&&((r=t&&r)||(e("#cvv_input").focus(),setTimeout(function(){alert(e.i18n.map.CvvErrorMsg)},100)))}else s==f&&(y||(r=!1,e("#error_message").html("Please select bank!"),e("#error_message").show(),setTimeout(function(){alert("Please select bank!")},1)));r&&_()}),e("#what_cvv_btn").click(function(){e("#cvv_desc_wrap").removeClass("hide")}),e("#close_btn").click(function(){e("#cvv_desc_wrap").addClass("hide")}),e("#edit_credit_address").click(function(){e("#edit_shipping_address_wrap").removeClass("hide"),e("#cancel_credit_address").removeClass("hide"),e("#edit_credit_address").addClass("hide")}),e("#cancel_credit_address").click(function(){e("#edit_credit_address").removeClass("hide"),e("#edit_shipping_address_wrap").addClass("hide"),e("#cancel_credit_address").addClass("hide")}),e("#save_credit_address").click(function(){var r=!0,s=p("#first_name_input","#error_first_name");r&&((r=s&&r)||e("#first_name_input").focus());var a=p("#last_name_input","#error_last_name");r&&((r=a&&r)||e("#last_name_input").focus());var n=!0,d=t.util.checkAddress(e("#address_input").val());0==d?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text"),n=!1):-1==d?(e("#address_input").parent().removeClass("has-success"),e("#address_input").parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text"),n=!1):1==d&&(e("#address_input").parent().removeClass("has-error"),e("#address_input").parent().addClass("has-success"),e("#error_address").parent().removeClass("show-error-text")),r&&((r=n&&r)||e("#address_input").focus()),n=!0,d=t.util.checkAddress(e("#address_2_input").val()),-1==d?(e("#address_2_input").parent().removeClass("has-success"),e("#address_2_input").parent().addClass("has-error"),e("#error_address_2").parent().addClass("show-error-text"),n=!1):(e("#address_2_input").parent().removeClass("has-error"),e("#address_2_input").parent().addClass("has-success"),e("#error_address_2").parent().removeClass("show-error-text")),r&&((r=n&&r)||e("#address_2_input").focus());var o=p("#city_input","#error_city");r&&((r=o&&r)||e("#city_input").focus());var l=p("#postal_code_input","#error_postal_code");r&&((r=l&&r)||e("#postal_code_input").focus());var c=p("#email_input","#error_email");r&&((r=c&&r)||e("#email_input").focus());var _=p("#phone_input","#error_phone");if(r&&((r=_&&r)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var v=p("#province_input","#error_province");r&&((r=v&&r)||e("#province_input").focus())}if(r){e(".loading-mask").removeClass("hide"),e("#save_credit_address").attr("disabled",!0);var C=e("#provinceList").val();e("#provice_input_wrap").is(":visible")&&(C=e("#province_input").val());var f={addrId:u.addrId,userId:t.util.getUserId(),country:m,fullCountry:h(m),province:C,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val().trim(),postCode:e("#postal_code_input").val(),telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val(),isDefault:1,isBillAddr:1};t.dao.updateAddress({inputParams:JSON.stringify(f)},function(r){e("#edit_shipping_address_wrap").addClass("hide"),e("#edit_credit_address").removeClass("hide"),e("#cancel_credit_address").addClass("hide"),i()},null,function(r){e(".loading-mask").addClass("hide"),e("#save_credit_address").attr("disabled",!1)})}}),e("#cancel_btn").click(function(){e("#edit_credit_address").removeClass("hide"),e("#edit_shipping_address_wrap").addClass("hide"),e("#cancel_credit_address").addClass("hide")})}(),function(){var r=sessionStorage.userInfo;r&&(r=JSON.parse(r),e("#first_name_input").val(r.firstName),e("#last_name_input").val(r.lastName)),e("#first_name_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_first_name").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_first_name").parent().removeClass("show-error-text"))}),e("#last_name_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_last_name").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_last_name").parent().removeClass("show-error-text"))}),e("#address_input").blur(function(){var r=t.util.checkAddress(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address").parent().removeClass("show-error-text"))}),e("#address_2_input").blur(function(){-1==t.util.checkAddress(e(this).val())?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address_2").parent().addClass("show-error-text")):(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address_2").parent().removeClass("show-error-text"))}),e("#city_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_city").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_city").parent().removeClass("show-error-text"))}),e("#province_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_province").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_province").parent().removeClass("show-error-text"))}),e("#postal_code_input").blur(function(){var r=t.util.checkPhone(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_postal_code").parent().removeClass("show-error-text"))}),e("#email_input").blur(function(){var r=t.util.checkEmail(e(this).val().trim());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_email").parent().removeClass("show-error-text"))}),e("#phone_input").blur(function(){var r=t.util.checkPhone(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").parent().addClass("show-error-text")):-1==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_phone").parent().removeClass("show-error-text"))}),e("#card_no_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_card_number").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_card_number").parent().removeClass("show-error-text"))}),e("#cvv_input").blur(function(){var r=t.util.checkNull(e(this).val());0==r?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_cvv").parent().addClass("show-error-text")):1==r&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_cvv").parent().removeClass("show-error-text"))})}(),function(){for(var r=[e.i18n.map.Month,"01","02","03","04","05","06","07","08","09","10","11","12"],s=document.getElementById("month_list"),a=0;a<r.length;a++)s.add(new Option(r[a],r[a]));e("#month_list").on("change",function(){e(this).find("option:selected").text()})}(),function(){for(var r=(new Date).getFullYear(),s=[e.i18n.map.Year],a=r;a<=r+10;a++)s.push(a);for(var t=document.getElementById("year_list"),a=0;a<s.length;a++)t.add(new Option(s[a],s[a])),e("#error_message").hide();e("#year_list").on("change",function(){e(this).find("option:selected").text(),e("#error_message").hide()})}(),e("#currency_group").hide()});