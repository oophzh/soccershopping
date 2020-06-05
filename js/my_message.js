"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(e,t,a,s,r){function i(t){t&&t.usrico?r.util.setUserImage(e("#sex_image"),t.usrico):"0"==t.sex?e("#sex_image").attr("src","resources/img/user/user-female.png"):"1"==t.sex&&e("#sex_image").attr("src","resources/img/user/user-female.png")}function d(t){e(".loading-my-message").removeClass("hide"),e(".empty-data").addClass("hide"),e("#my_message_list").addClass("hide"),e("#my_qst_wrap").addClass("hide"),e(".send-msg-wrap").addClass("hide"),r.dao.getMsgList({userId:r.util.getUserId(),infoType:t},function(a){if(1==t){var s=a.disInfo;if(e(".loading-my-message").addClass("hide"),s&&s.length>0){for(var i=0;i<s.length;i++){var d=s[i];d.crtime=r.util.formatOrderDateTime(d.crtime)}e("#my_message_list").html(e("#MyDisMessageTempl").tmpl(s)),e(".empty-data").addClass("hide"),e("#my_message_list").removeClass("hide")}else n()}else{var s=a.csInfo;if(e(".loading-my-message").addClass("hide"),s.chatlist&&s.chatlist.length>0){for(var l=s.chatlist,i=0;i<l.length;i++){var d=l[i];d.crtime=r.util.formatOrderDateTime(d.crtime)}e("#my_message_list").html(e("#MyChatMessageTempl").tmpl(l)),e("#my_message_list .chat-message-item #system_name").html(e.i18n.map.MessageCustomer),e("#my_message_list .chat-message-item #user_name").html(u),e("#my_message_list .chat-message-item .user-image #user_image").attr("onerror",e("#sex_image")[0].onerror),e("#my_message_list .chat-message-item .user-image #user_image").attr("src",e("#sex_image")[0].src),e(".empty-data").addClass("hide"),e("#my_message_list").removeClass("hide")}s.qstList&&s.qstList.length>0?(e("#my_qst_list").html(e("#MyQstMessageTempl").tmpl(s.qstList)),e("#my_qst_list .qst-item").each(function(){e(this).click(function(){o(e(this).data().data)})}),e("#my_qst_wrap").removeClass("hide")):e("#my_qst_wrap").addClass("hide"),e(".send-msg-wrap").removeClass("hide"),document.getElementById("send_msg_input").scrollIntoView()}},function(){1==t?n():(e(".loading-my-message").addClass("hide"),e(".send-msg-wrap").removeClass("hide"),document.getElementById("send_msg_input").scrollIntoView())},function(){m()})}function n(){e(".loading-my-message").addClass("hide"),e(".empty-data").removeClass("hide"),e("#my_message_list").addClass("hide")}function o(e){var t=r.util.getUserId();t?r.dao.sendMsg({userId:t,type:"1",msgType:"1",msgCnt:e},function(){d(2)}):window.location.href="../../../login.html"}function l(t,a,s){var i=r.util.getUserId();i?r.dao.sendMsg({userId:i,type:"2",msgType:a||"1",msgCnt:t,extp1:s},function(){d(2),a||e("#send_msg_input").val("")}):window.location.href="../../../login.html"}function m(){r.dao.getMsgSummary({userId:r.util.getUserId(),infoType:"0"},function(t){t&&t.disInfo&&0!=t.disInfo.unRead?(e("#message_1_number").html("("+t.disInfo.unRead+")"),e("#message_1_number").removeClass("hide")):e("#message_1_number").addClass("hide"),t&&t.csInfo&&0!=t.csInfo.unRead?(e("#message_2_number").html("("+t.csInfo.unRead+")"),e("#message_2_number").removeClass("hide")):e("#message_2_number").addClass("hide"),e("#message_number").html(t.unRead)})}var u=null;r.initLoginStatus(function(t){if(t){if(sessionStorage.userInfo){var a=JSON.parse(sessionStorage.userInfo);a.firstName?u=a.firstName+a.lastName:a.email&&(u=a.email),e("#name").text(u),i(a)}}else window.location.href="../../../login.html"});var c=r.util.getQueryString("index");c||(c=1);var _=r.util.getQueryString("productId"),g=r.util.getQueryString("productColorId"),p=r.util.getQueryString("orderId"),h=null;!function(){e(".my-message-tab-wrap .tab").each(function(){e(this).click(function(){e(".my-message-tab-wrap .tab").removeClass("selected"),e(this).addClass("selected");var t=e(this).data().data;0==t?(e(".send-msg-wrap").addClass("hide"),e("#my_qst_wrap").addClass("hide"),e("#product_detail_wrap").addClass("hide"),e("#order_detail_wrap").addClass("hide")):1==t&&(e(".send-msg-wrap").removeClass("hide"),e("#my_qst_wrap").removeClass("hide"),_&&e("#product_detail_wrap").removeClass("hide"),p&&e("#order_detail_wrap").removeClass("hide"),document.getElementById("send_msg_input").scrollIntoView()),d(t+1)})}),e("#send_msg_btn").click(function(){var t=e("#send_msg_input").val();t&&t.length>0?l(t):alert("message null")}),e("#refresh_btn").click(function(){d(e(".my-message-tab-wrap .tab.selected").data().data+1)}),e("#product_send_btn").click(function(){l(e("#product_send_btn").parent().parent().find("#product_detail").prop("outerHTML"),"3")})}(),function(){1==c?(e(".my-message-tab-wrap .tab:first-child").addClass("selected"),e(".my-message-tab-wrap .tab:last-child").removeClass("selected")):(e(".my-message-tab-wrap .tab:first-child").removeClass("selected"),e(".my-message-tab-wrap .tab:last-child").addClass("selected")),1==c?(e(".send-msg-wrap").addClass("hide"),e("#my_qst_wrap").addClass("hide")):2==c&&(e(".send-msg-wrap").removeClass("hide"),e("#my_qst_wrap").removeClass("hide"))}(),m(),d(c),_&&function(){r.dao.productDetail({productId:_,currencyId:r.util.getLocalCurrency(),userId:r.util.getUserId()},function(t){if(t&&t.color_data&&t.color_data.length>0)for(var a=0;a<t.color_data.length;a++){var s=t.color_data[a];if(s.color_id==g){e("#product_detail_wrap #product_image").attr("src",r.util.picUrl+s.img_groups[0].small_img),e("#product_detail_wrap #product_name").html(s.pcName);var i=r.util.getCurrencySymbol(r.util.getLocalCurrency());e("#product_detail_wrap #product_price").html(r.util.formatProductPrice(s.current_price,i));var d=r.util.getAdvSource().u;d||(d=r.util.getQueryString("u"));var n="";d&&(n="?u="+d);var o=r.util.encodeMenuType(r.util.getUvid()),l=window.location.protocol+"//"+window.location.host+"/"+r.util.formatProductName(s.pcName)+"-d-"+r.util.encodeMenuType(_)+"-"+r.util.encodeMenuType(g)+"-"+o+".html"+n;e("#product_detail_wrap #product_detail").attr("href",l),e("#product_detail_wrap").removeClass("hide"),document.getElementById("send_msg_input").scrollIntoView();break}}})}(),p&&function(){r.dao.getOrderDetail({orderId:p},function(t){var a=r.util.getCurrencySymbol(t.correncyCode);a||(a=r.util.getCurrencySymbol(r.util.getLocalCurrency())),0==t.paymentStatus?t.paymentStatusString=e.i18n.map.OrderStatusPendding:1==t.paymentStatus||10==t.paymentStatus?t.paymentStatusString=e.i18n.map.OrderStatusSuccess:2==t.paymentStatus?t.paymentStatusString=e.i18n.map.OrderStatusFail:3==t.paymentStatus?t.paymentStatusString=e.i18n.map.OrderStatusDelay:4==t.paymentStatus&&(t.paymentStatusString=e.i18n.map.OrderStatusDelivered);for(var s=r.util.encodeMenuType(r.util.getUvid()),i=t.spCart,d=0;d<i.length;d++){var n=i[d];n.displayImg=r.util.picUrl+n.displayImg;var o=window.location.protocol+"//"+window.location.host+"/"+r.util.formatProductName(n.productName)+"-d-"+r.util.encodeMenuType(n.productId)+"-"+r.util.encodeMenuType(n.productColorId)+"-"+s+".html";n.href=o}e("#order_list").html(e("#orderItemTempl").tmpl(i)),e("#order_list .order-send-btn").html(e.i18n.map.SendProductLink),e("#order_list .order-send-btn").each(function(){e(this).click(function(){var t=e(this).data().data,s=h.spCart[t];e("#order_link_content #order_no_2").html(h.orderId),e("#order_link_content #order_date_2").html(r.util.formatOrderDateTime(h.crTime)),e("#order_link_content #order_product_info").attr("href",s.href),e("#order_link_content #order_product_image").attr("src",s.displayImg),e("#order_link_content #order_product_name").html(s.productName),e("#order_link_content #order_price").html(r.util.formatProductPrice(h.realCost,a)),e("#order_link_content #order_status").html(h.paymentStatusString),l(e("#order_link_content").find("#message_content").prop("outerHTML"),"3","1")})}),e("#order_no").html(t.orderId),e("#order_date").html(r.util.formatOrderDateTime(t.crTime)),h=t,e("#order_detail_wrap").removeClass("hide")})}()});