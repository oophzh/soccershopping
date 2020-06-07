"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","star"],function(e,t,s,i,r,a){function n(t){t&&t.usrico?r.util.setUserImage(e("#sex_image"),t.usrico):"0"==t.sex?e("#sex_image").attr("src","resources/img/user/user-female.png"):"1"==t.sex&&e("#sex_image").attr("src","resources/img/user/user-female.png")}function o(e){switch(e){case"menu_my_order":l();break;case"menu_my_cart":d();break;case"menu_my_fav":c();break;case"menu_my_coupon":m();break;case"menu_my_address":u();break;case"menu_account_setting":_();break;case"menu_my_browse":x();break;case"menu_my_comment":A();break;case"menu_my_message":window.location.href="../../../my_message.html"}}function l(){document.title=e.i18n.map.MyOrderTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").show(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").hide(),y()}function d(){document.title=e.i18n.map.MyCartTitle,e("#order_list_wrap").hide(),e("#cart_list_wrap").show(),e("#fav_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").hide(),g()}function c(){document.title=e.i18n.map.MyFavTitle,e("#fav_list_wrap").show(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").hide(),w()}function m(){document.title=e.i18n.map.MyCouponTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").show(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").hide(),C()}function u(){document.title=e.i18n.map.MyAddressTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").show(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").hide(),v(),p()}function _(){document.title=e.i18n.map.MyAccountSettingTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").show(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").hide();var t=sessionStorage.getItem("userInfo");if(t){t=JSON.parse(t),e("#account_setting_first_name_input").val(t.firstName),e("#account_setting_last_name_input").val(t.lastName);for(var s=document.getElementsByName("gender"),i=0;i<s.length;i++)s[i].value==t.sex&&(s[i].checked=!0)}}function p(){r.dao.getUserAddress({userId:r.util.getUserId(),addrType:1},function(t){var s=t;s&&s.length>0?(e("#billing_address_list").html(e("#addressItemTempl").tmpl(s)),e("#billing_address_list li #phone_number_label").text(e.i18n.map.PhoneNumberlabel),e("#billing_address_list li .button-wrap button:nth-child(1)").text(e.i18n.map.Edit),e("#billing_address_list li .button-wrap button:nth-child(2)").text(e.i18n.map.Delete),e("#billing_address_list li .button-wrap button").click(function(){h(s,e(this),function(){v()})}),e("#billing_address_list").show(),e("#billing_address_empty_wrap").hide()):(e("#billing_address_list").hide(),e("#billing_address_empty_wrap").show())})}function h(t,s,i){if("edit"==s[0].id){e(".edit-address-mask").removeClass("hide");var a=s.parent().parent().data().data;U=t[a],console.log("currentAddr = "+U),e("#first_name_input").val(U.recFirstname),e("#last_name_input").val(U.recLastname),e("#address_input").val(U.streetAddr),e("#address_2_input").val(U.extendAddr),e("#city_input").val(U.city),e("#postal_code_input").val(U.postCode),e("#email_input").val(U.email),e("#phone_input").val(U.telephone),e("#phone_2_input").val(U.telephone1),1==U.isDefault?e("#default_input").attr("checked",!0):e("#default_input").attr("checked",!1),I(U.country,U.fullCountry)}else r.dao.delAddress({addrId:s.data().data},function(e){console.log("删除成功"),i()})}function v(){r.dao.getUserAddress({userId:r.util.getUserId(),addrType:0},function(t){var s=t;s&&s.length>0?(e("#shipping_address_list").html(e("#addressItemTempl").tmpl(s)),e("#shipping_address_list li #phone_number_label").text(e.i18n.map.PhoneNumberlabel),e("#shipping_address_list li .button-wrap button:nth-child(1)").text(e.i18n.map.Edit),e("#shipping_address_list li .button-wrap button:nth-child(2)").text(e.i18n.map.Delete),e("#shipping_address_list li .button-wrap button").click(function(){h(s,e(this),function(){v()})}),e("#shipping_address_list").show(),e("#shipping_address_empty_wrap").hide()):(e("#shipping_address_list").hide(),e("#shipping_address_empty_wrap").show())})}function y(){var t=r.util.getAdvSource().u;t||(t=r.util.getQueryString("u"));var s="";t&&(s="?u="+t);var i=r.util.encodeMenuType(r.util.getUvid());r.dao.getUserOrder({userId:r.util.getUserId()},function(t){var a=t;if(a&&a.length>0){for(var n=0;n<a.length;n++){var o=a[n],l=r.util.getCurrencySymbol(o.correncyCode);l||(l=r.util.getCurrencySymbol(r.util.getLocalCurrency())),o.realCost=r.util.formatProductPrice(o.realCost,l),o.totalCost=r.util.formatProductPrice(o.totalCost,l),0==o.paymentStatus?o.paymentStatusString=e.i18n.map.OrderStatusPendding:1==o.paymentStatus||10==o.paymentStatus?o.paymentStatusString=e.i18n.map.OrderStatusSuccess:2==o.paymentStatus?o.paymentStatusString=e.i18n.map.OrderStatusFail:3==o.paymentStatus?o.paymentStatusString=e.i18n.map.OrderStatusDelay:4==o.paymentStatus&&(o.paymentStatusString=e.i18n.map.OrderStatusDelivered),o.crTimeString=r.util.formatOrderDateTime(o.crTime);for(var d=0;d<o.spCart.length;d++){var c=o.spCart[d];c.mainImgpath=r.util.picUrl+c.mainImgpath;var m=r.util.formatProductName(c.productName)+"-d-"+r.util.encodeMenuType(c.productId)+"-"+r.util.encodeMenuType(c.productColorId)+"-"+i+".html"+s;c.href=m}o.customServiceUrl="../../../my_message.html?index=2&orderId="+o.orderId}e("#order_item_list").html(e("#orderItemTempl").tmpl(a)),e("#order_item_list #color_title").html(e.i18n.map.ColorTitle),e("#order_item_list .order-number").html(e.i18n.map.OrderNumber),e("#order_item_list .order-detail").html(e.i18n.map.OrderDetails),e("#order_item_list #ViewLogistics").html(e.i18n.map.ViewLogistics),e("#order_item_list #ContinuePayment").html(e.i18n.map.ContinuePayment),e("#order_item_list #ToCommnet").html(e.i18n.map.ToCommnet),e("#order_item_list #AdditionalCommnet").html(e.i18n.map.AdditionalCommnet),e("#order_item_list #BuyAgain").html(e.i18n.map.BuyAgain),e("#order_item_list #CustomServiceBtn").html(e.i18n.map.CustomServiceBtn),e("#order_item_list").show(),e("#order_empty_wrap").hide(),e("#order_item_list #BuyAgain").each(function(){e(this).click(function(){e(".loading-mask").removeClass("hide");var t=e(this).data().data,s=a[t].spCart;r.dao.merge2cart({inputParams:JSON.stringify(s)},function(){window.location.href="../../../shopping_cart.html"},null,function(){e(".loading-mask").addClass("hide")})})})}else e("#order_item_list").hide(),e("#order_empty_wrap").show()})}function g(){var t={currencyId:r.util.getLocalCurrency(),userId:r.util.getUserId(),cart:[],applyCpNo:r.util.getCouponCode()};r.dao.shoppingCart({inputParams:JSON.stringify(t)},function(t){if(t.cart&&t.cart.length>0){var s=0,i=r.util.getCurrencySymbol(r.util.getLocalCurrency()),a=r.util.getAdvSource().u;a||(a=r.util.getQueryString("u"));var n="";a&&(n="?u="+a);for(var o=r.util.encodeMenuType(r.util.getUvid()),l=0;l<t.cart.length;l++){var d=t.cart[l];d.displayImg=r.util.picUrl+d.displayImg,d.cost=r.util.formatProductPrice(d.cost,i);var c=r.util.formatProductName(d.productName)+"-d-"+r.util.encodeMenuType(d.productId)+"-"+r.util.encodeMenuType(d.productColorId)+"-"+o+".html"+n;d.href=c,s+=Number(d.productNum)}e("#cart_list").html(e("#cartTempl").tmpl(t.cart)),e("#cart_list #color_title").html(e.i18n.map.ColorTitle),e("#cart_list #remove_label").html(e.i18n.map.Remove),s>0?(e("#cart_product_number").html(s),e("#cart_product_number").show()):(e("#cart_product_number").html("0"),e("#cart_product_number").show());for(var m=["1","2","3","4","5"],l=0;l<t.cart.length;l++){var u=e("#qtyItemTempl").tmpl(m);e("#"+l).find(".dropdown-menu").html(u),e("#"+l+" .dropdown-menu li").each(function(s){e(this).click(function(){var i=m[s],r=e(this).parent().parent().parent().parent()[0].id;e("#"+r).find("#qty_content").html(i),f(e(this).parent().parent().parent().parent().data().data,i,t)})}),e("#"+l+" .remove-btn").each(function(){e(this).click(function(){console.log("del "+e(this).parent().parent().data().data+"item"),f(e(this).parent().parent().parent().parent().data().data,0,t)})})}}else e("#cart_list").hide(),e("#cart_empty_wrap").show(),e("#cart_product_number").html("0"),e("#cart_product_number").show()},function(){e("#cart_list").hide(),e("#cart_empty_wrap").show()})}function f(e,t,s){if(console.log("changeProductNumber"),r.util.checkIsLogin()){var i=s.cart[e];i.productNum=Number(t),i.userId=r.util.getUserId(),r.dao.shoppingCartMt({inputParams:JSON.stringify([i])},function(e){g()})}else if(localStorage.productList){var a=JSON.parse(localStorage.productList);if(0==Number(t))a.splice(e,1);else{var i=a[e];i.productNum=Number(t)}localStorage.setItem("productList",JSON.stringify(a)),g()}}function w(){r.dao.getUserExtInfo({userId:r.util.getUserId(),currencyId:r.util.getLocalCurrency(),type:"2"},function(t){var s=t.attention.products;if(s&&s.length>0){var i=r.util.getCurrencySymbol(r.util.getLocalCurrency()),a=r.util.getAdvSource().u;a||(a=r.util.getQueryString("u"));var n="";a&&(n="?u="+a);for(var o=r.util.encodeMenuType(r.util.getUvid()),l=0;l<s.length;l++){var d=s[l];d.orgPrice=r.util.formatProductPrice(d.orgPrice,i),d.curPrice=r.util.formatProductPrice(d.curPrice,i),d.imgDisplay=r.util.picUrl+d.imgDisplay,d.height=r.util.getImageHeight();var c=r.util.formatProductName(d.productName)+"-d-"+r.util.encodeMenuType(d.productId)+"-"+r.util.encodeMenuType(d.productColorId)+"-"+o+".html"+n;d.href=c}e("#fav_item_list").html(e("#favItemTempl").tmpl(s)),e("#fav_item_list .icon-delete").each(function(){e(this).click(function(){var t=e(this).data().data;r.dao.attentionProduct({userId:r.util.getUserId(),productId:s[t].productId,colorId:s[t].productColorId,type:"2"},function(){w()})})}),e("#fav_item_list").show(),e("#fav_empty_wrap").hide()}else e("#fav_item_list").hide(),e("#fav_empty_wrap").show()})}function C(){r.dao.getCoupon({userId:r.util.getUserId(),currencyId:r.util.getLocalCurrency()},function(t){if(t){var s=[t];e("#coupon_item_list").html(e("#couponItemTempl").tmpl(s)),e("#coupon_item_list #code_text").html(e.i18n.map.Code),e("#coupon_item_list").show(),e("#coupon_empty_wrap").hide()}else e("#coupon_item_list").hide(),e("#coupon_empty_wrap").show()})}function b(t,s){return!e(t).parent().hasClass("has-error")&&""!==e(t).val()||(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e(s).css("visibility","visible"),!1)}function I(t,s){var i=document.getElementById("countryList");O=t||(sessionStorage.country_belong?sessionStorage.country_belong:i.options[0].value),e("#countryList option[value='"+O+"']").prop("selected","selected"),e.getJSON("/resources/json/country.json",function(t){var s=i.selectedIndex;if(B=t,t&&t[s]&&t[s].state&&t[s].state.length>0)S(t[s].state,!0),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}e("#countryList").on("change",function(){var s=e(this).find("option:selected").val();O=s;var r=i.selectedIndex;if(t&&t[r]&&t[r].state&&t[r].state.length>0)S(t[r].state,!1),e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();else{document.getElementById("provinceList").length=0,e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show()}})})}function S(t,s){if(t&&t.length>0){e("#provice_selected_wrap").show(),e("#provice_input_wrap").hide();var i=t;document.getElementById("provinceList").length=0;for(var r=0;r<i.length;r++){var a="<option value='"+i[r]+"'>"+i[r]+"</option>";s&&U&&U.province==i[r]&&(a="<option value='"+i[r]+"' selected>"+i[r]+"</option>"),e("#provinceList").append(a)}}else e("#provice_selected_wrap").hide(),e("#provice_input_wrap").show(),U&&e("#province_input").val(U.province)}function N(){var t=r.util.getUserId();if(t){var s=e("input[type='radio'][name='gender']:checked").val();r.dao.userInfoModify({userId:t,sex:s,firstName:e("#account_setting_first_name_input").val(),lastName:e("#account_setting_last_name_input").val()},function(t){var i=sessionStorage.getItem("userInfo");i&&(i=JSON.parse(i),i.sex=s,i.firstName=e("#account_setting_first_name_input").val(),i.lastName=e("#account_setting_last_name_input").val(),sessionStorage.setItem("userInfo",JSON.stringify(i)),e("#login_btn").text(i.firstName+i.lastName)),e("#modify_information_success_message").show()})}}function k(){var t=r.util.getUserId();t&&r.dao.mdpwd({userId:t,oldPwd:e("#modify_old_pwd_input").val(),newPwd:e("#modify_new_pwd_input").val(),checkCode:""},function(t){e("#modify_pwd_success_message").removeClass("alert-danger"),e("#modify_pwd_success_message").addClass("alert-success"),e("#modify_pwd_success_message").html(e.i18n.map.ModifyPwdSuccess),e("#modify_pwd_success_message").show()},function(t){e("#modify_pwd_success_message").removeClass("alert-success"),e("#modify_pwd_success_message").addClass("alert-danger"),e("#modify_pwd_success_message").html(t.msg),e("#modify_pwd_success_message").show()})}function P(){r.dao.logout({},function(){e("#login_btn i").removeClass("hide"),e("#login_btn img").addClass("hide"),sessionStorage.setItem("userId",""),sessionStorage.setItem("userInfo",""),sessionStorage.setItem("couponCode",""),sessionStorage.setItem("applyCouponCode",""),self!=top?window.parent.frames.location.href="./../../../login.html?u="+util.getQueryString("u")+"&uvid="+r.util.getUvid():location.href="./../../../login.html?uvid="+r.util.getUvid()})}function T(e){if(B)for(var t=0;t<B.length;t++){var s=B[t];if(s.code==e)return s.name}return e}function x(){document.title=e.i18n.map.RecentlyBrowseTitle,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").show(),e("#my_comment_wrap").hide(),M()}function M(){var t=[];localStorage.currentBrowseList&&(t=JSON.parse(localStorage.currentBrowseList));var s={currencyId:r.util.getLocalCurrency(),products:t};r.dao.productsViewed({inputParams:JSON.stringify(s)},function(t){if(t&&t.length>0){var s=r.util.getCurrencySymbol(r.util.getLocalCurrency()),i=r.util.getAdvSource().u;i||(i=r.util.getQueryString("u"));var a="";i&&(a="?u="+i);for(var n=r.util.encodeMenuType(r.util.getUvid()),o=0;o<t.length;o++){var l=t[o];l.orgPrice=r.util.formatProductPrice(l.orgPrice,s),l.curPrice=r.util.formatProductPrice(l.curPrice,s),l.imgDisplay=r.util.picUrl+l.imgDisplay,l.height=r.util.getImageHeight();var d=r.util.formatProductName(l.productName)+"-d-"+r.util.encodeMenuType(l.productId)+"-"+r.util.encodeMenuType(l.productColorId)+"-"+n+".html"+a;l.href=d}e("#recently_browse_list").html(e("#recentlyBrowseTempl").tmpl(t)),e("#recently_browse_wrap .empty-data").css("display","none")}else e("#recently_browse_wrap .empty-data").css("display","block")})}function A(){document.title=e.i18n.map.MyComment,e("#fav_list_wrap").hide(),e("#cart_list_wrap").hide(),e("#order_list_wrap").hide(),e("#coupons_list_wrap").hide(),e("#address_list_wrap").hide(),e("#account_setting_wrap").hide(),e("#recently_browse_wrap").hide(),e("#my_comment_wrap").show(),e("#my_comment_wrap .tab").removeClass("selected"),e("#my_comment_wrap .tab:first-child").addClass("selected"),L(1),e("#my_comment_wrap .tab").each(function(){e(this).click(function(){e("#my_comment_wrap .tab").removeClass("selected"),e(this).addClass("selected"),L(e(this).data().data+1)})})}function L(t){e("#my_comment_wrap .loading-my-comment").removeClass("hide"),e("#my_comment_wrap .my-comment-list-wrap").addClass("hide"),e("#my_comment_wrap .empty-data").addClass("hide"),r.dao.getMyCommentList({userId:r.util.getUserId(),type:t},function(s){if(s&&s.length>0){var i=r.util.getAdvSource().u;i||(i=r.util.getQueryString("u"));var a="";i&&(a="?u="+i);for(var n=r.util.encodeMenuType(r.util.getUvid()),o=0;o<s.length;o++){var l=s[o];l.mainImgpath=r.util.picUrl+l.mainImgpath,l.type=t,l.href=r.util.formatProductName(l.productName)+"-d-"+r.util.encodeMenuType(l.productId)+"-"+r.util.encodeMenuType(l.productColorId)+"-"+n+".html"+a}e("#my_comment_list").html(e("#myCommentTempl").tmpl(s)),e("#my_comment_list #color_title").html(e.i18n.map.ColorTitle),e("#my_comment_list #ToCommnet").html(e.i18n.map.ToCommnet),e("#my_comment_list #AdditionalCommnet").html(e.i18n.map.AdditionalCommnet),e("#my_comment_list #ViewComment").html(e.i18n.map.ViewComment),e("#my_comment_list #ProductDetailTitle").html(e.i18n.map.ProductDetailTitle),e("#my_comment_list #CommentRatingLabel").html(e.i18n.map.CommentRatingLabel),e("#my_comment_list #Opration").html(e.i18n.map.Opration),2!=t&&3!=t||e("#my_comment_list .comment-info-wrap input").each(function(){e(this).rating({step:1,size:"xs",showClear:!1,min:0,max:5,disabled:!0,showCaption:!1}).rating("showStars",e(this).data().data)}),e("#my_comment_wrap .loading-my-comment").addClass("hide"),e("#my_comment_wrap .my-comment-list-wrap").removeClass("hide"),e("#my_comment_wrap .empty-data").addClass("hide")}else e("#my_comment_wrap .loading-my-comment").addClass("hide"),e("#my_comment_wrap .my-comment-list-wrap").addClass("hide"),e("#my_comment_wrap .empty-data").removeClass("hide")},function(){e("#my_comment_wrap .loading-my-comment").addClass("hide"),e("#my_comment_wrap .my-comment-list-wrap").addClass("hide"),e("#my_comment_wrap .empty-data").removeClass("hide")})}console.log("my_account.js");var U,O,B=null,D=r.util.getQueryString("id");console.log("my_account.js---id= "+D),r.initLoginStatus(function(t){if(t){if(sessionStorage.userInfo){var s=JSON.parse(sessionStorage.userInfo);s.firstName?e("#name").text(s.firstName+s.lastName):s.email&&e("#name").text(s.email),n(s)}9==D?window.location.href="../../../my_message.html":8==D?(A(),e(".menu-list span").removeClass("selected"),e("#menu_my_comment").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyComment)):7==D?(x(),e(".menu-list span").removeClass("selected"),e("#menu_my_browse").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.RecentlyBrowseTitle)):6==D?(_(),e(".menu-list span").removeClass("selected"),e("#menu_account_setting").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.AccountSetting)):5==D?(u(),e(".menu-list span").removeClass("selected"),e("#menu_my_address").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.ManageAddressBook)):4==D?(m(),e(".menu-list span").removeClass("selected"),e("#menu_my_coupon").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyCoupons)):3==D?(c(),e(".menu-list span").removeClass("selected"),e("#menu_my_fav").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyFavorites)):2==D?(d(),e(".menu-list span").removeClass("selected"),e("#menu_my_cart").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyCart)):(l(),e(".menu-list span").removeClass("selected"),e("#menu_my_order").addClass("selected"),e(".menu-content-wrap .title").text(e.i18n.map.MyOrder))}else window.location.href="../../../login.html"}),function(){e(".menu-item-parent .menu-item-wrap").bind("click",function(){e(this).hasClass("selected")||(e(".menu-item-parent .menu-item-wrap").removeClass("selected"),e(this).addClass("selected"),e(".menu-content-wrap .title").text(e(this).text()),o(e(this)[0].id))}),e("#logout_btn").click(function(){P()}),e("#sava_base_information").click(function(){var e=!0;e=b("#account_setting_first_name_input","#account_setting_error_first_name")&&e,(e=b("#account_setting_last_name_input","#account_setting_error_last_name")&&e)&&N()}),e("#sava_new_pwd").click(function(){var t=!0;t=b("#modify_old_pwd_input","#old_pwd_error")&&t,t=b("#modify_new_pwd_input","#new_pwd_error")&&t,t=b("#modify_confirm_new_pwd_input","#confirm_new_pwd_error")&&t,e("#modify_new_pwd_input").val()!==e("#modify_confirm_new_pwd_input").val()&&(t=!1,e("#modify_pwd_success_message").removeClass("alert-success"),e("#modify_pwd_success_message").addClass("alert-danger"),e("#modify_pwd_success_message").html(e.i18n.map.PasswordNotMatch),e("#modify_pwd_success_message").show()),t&&k()}),e("#add_new_addr_btn").click(function(){U=null;var t=sessionStorage.getItem("userInfo");t&&(t=JSON.parse(t),e("#first_name_input").val(t.firstName),e("#last_name_input").val(t.lastName),e("#email_input").val(t.email)),e("#address_input").val(""),e("#address_2_input").val(""),e("#city_input").val(""),e("#postal_code_input").val(""),e("#phone_input").val(""),e("#phone_2_input").val(""),e("#selected_province_span").text(""),e("#selected_country_span").text(""),e(".edit-address-mask").removeClass("hide"),I()}),e("#save_address_btn").click(function(){var t=!0,s=b("#first_name_input","#error_first_name");t&&((t=s&&t)||e("#first_name_input").focus());var i=b("#last_name_input","#error_last_name");t&&((t=i&&t)||e("#last_name_input").focus());var a=b("#address_input","#error_address");t&&((t=a&&t)||e("#address_input").focus());var n=b("#city_input","#error_city");t&&((t=n&&t)||e("#city_input").focus());var o=b("#postal_code_input","#error_postal_code");t&&((t=o&&t)||e("#postal_code_input").focus());var l=b("#email_input","#error_email");t&&((t=l&&t)||e("#email_input").focus());var d=b("#phone_input","#error_phone");if(t&&((t=d&&t)||e("#phone_input").focus()),e("#provice_input_wrap").is(":visible")){var c=b("#province_input","#error_province");t&&((t=c&&t)||e("#province_input").focus())}var m=e("#provinceList").val();if(e("#provice_input_wrap").is(":visible")&&(m=e("#province_input").val()),t){var u={userId:r.util.getUserId(),country:O,fullCountry:T(O),province:m,city:e("#city_input").val(),streetAddr:e("#address_input").val(),extendAddr:e("#address_2_input").val(),email:e("#email_input").val(),postCode:e("#postal_code_input").val(),isBillAddr:"0",telephone:e("#phone_input").val(),telephone1:e("#phone_2_input").val(),recFirstname:e("#first_name_input").val(),recLastname:e("#last_name_input").val()};U?(u.addrId=U.addrId,U.isBillAddr||(U.isBillAddr="0"),u.isBillAddr=U.isBillAddr,e("#default_input").get(0).checked?u.isDefault=1:u.isDefault=0,r.dao.updateAddress({inputParams:JSON.stringify(u)},function(t){e(".edit-address-mask").addClass("hide"),"1"==U.isBillAddr?p():v(),U=null})):r.dao.addAddress({inputParams:JSON.stringify(u)},function(t){e(".edit-address-mask").addClass("hide"),v()})}}),e("#cancel_save_address_btn").click(function(){e(".edit-address-mask").addClass("hide")})}(),function(){e("#account_setting_first_name_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#account_setting_error_first_name").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#account_setting_error_first_name").css("visibility","hidden"))}),e("#account_setting_last_name_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#account_setting_error_last_name").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#account_setting_error_last_name").css("visibility","hidden"))}),e("#modify_old_pwd_input").blur(function(){var t=r.util.checkPassword(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#old_pwd_error").css("visibility","visible")):-1==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#old_pwd_error").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#old_pwd_error").css("visibility","hidden"))}),e("#modify_new_pwd_input").blur(function(){var t=r.util.checkPassword(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#new_pwd_error").css("visibility","visible")):-1==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#new_pwd_error").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#new_pwd_error").css("visibility","hidden"))}),e("#modify_confirm_new_pwd_input").blur(function(){var t=r.util.checkPassword(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#confirm_new_pwd_error").css("visibility","visible")):-1==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#confirm_new_pwd_error").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#confirm_new_pwd_error").css("visibility","hidden"))}),e("#first_name_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_first_name").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_first_name").css("visibility","hidden"))}),e("#last_name_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_last_name").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_last_name").css("visibility","hidden"))}),e("#address_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_address").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_address").css("visibility","hidden"))}),e("#city_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_city").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_city").css("visibility","hidden"))}),e("#province_input").blur(function(){var t=r.util.checkNull(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_province").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_province").css("visibility","hidden"))}),e("#postal_code_input").blur(function(){var t=r.util.checkPhone(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").css("visibility","visible")):-1==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_postal_code").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_postal_code").css("visibility","hidden"))}),e("#email_input").blur(function(){var t=r.util.checkEmail(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").css("visibility","visible")):-1==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_email").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_email").css("visibility","hidden"))}),e("#phone_input").blur(function(){var t=r.util.checkPhone(e(this).val());console.log(t),0==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").css("visibility","visible")):-1==t?(e(this).parent().removeClass("has-success"),e(this).parent().addClass("has-error"),e("#error_phone").css("visibility","visible")):1==t&&(e(this).parent().removeClass("has-error"),e(this).parent().addClass("has-success"),e("#error_phone").css("visibility","hidden"))})}()});