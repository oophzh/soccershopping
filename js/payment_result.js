"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(e,i,r,s,t){function n(){t.dao.upcfAddrStatus({orderId:d,status:"1"},function(i){window.location.href="my_account.html",e("#confirm_address_mask").addClass("hide")})}var o=null,d=null;console.log("payment_result.js"),t.initLoginStatus(function(e){e||(window.location.href="../../../login.html")}),e("#currency_group").hide();var c=t.util.getQueryString("result"),a=t.util.getQueryString("failCode");if(!c){c=1==t.util.getQueryString("code")?0:1}1==c?(e("#third_strp").addClass("active"),e("#step_progress").css("width","600px"),e("#success_wrap").show(),e("#fail_wrap").hide(),d=t.util.getQueryString("orderId"),e("#success_order_id").html(d),function(i){t.dao.getOrderDetail({orderId:i},function(i){if("0"==i.cfaddrStatus)if(e("#success_confirm_address_wrap").removeClass("hide"),o=i.shippingAddr){var r=o.recFirstname+o.recLastname,s=o.telephone,t=o.streetAddr+" "+o.extendAddr+" "+o.city+", "+o.province+" "+o.postCode+", "+o.fullCountry;e("#order_detail_name").html(r),e("#order_mobile_name").html(s),e("#order_address_name").html(t)}else e("#success_confirm_address_wrap").addClass("hide");else e("#success_confirm_address_wrap").addClass("hide")})}(d),function(){e("#to_confirm_btn").click(function(){e("#confirm_address_mask").removeClass("hide")}),e("#confirm_btn").click(function(){n()}),e("#customservice_btn").click(function(){e("#confirm_address_mask").addClass("hide"),t.util.getUserId()?window.location.href="../../../my_message.html?index=2":window.location.href="../../../login.html"}),e("#confirm_address_close_btn").click(function(){e("#confirm_address_mask").addClass("hide")})}()):"EC1004"==a?(e("#success_wrap").hide(),e("#fail_wrap").show(),e(".fail-reason").show(),e("#payment_btn").click(function(){window.history.go(-1)})):"EC1005"==a||"EC1006"==a?(e("#success_wrap").hide(),e("#fail_wrap").show(),e(".fail-reason").hide(),e("#payment_btn").click(function(){window.history.go(-1)})):(e("#success_wrap").hide(),e("#fail_wrap").show(),d=t.util.getQueryString("odi"),e("#payment_btn").click(function(){window.location.href="checkout_payment.html?orderId="+d}))});