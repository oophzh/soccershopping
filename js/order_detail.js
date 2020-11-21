"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(t,e,r,i,a){function s(e){e&&e.usrico?a.util.setUserImage(t("#sex_image"),e.usrico):"0"==e.sex?t("#sex_image").attr("src","resources/img/user/user-female.png"):"1"==e.sex&&t("#sex_image").attr("src","resources/img/user/user-female.png")}function l(e){var r=[],i={};i.label=t.i18n.map.OrderNumber+":",i.value=e.orderId,r.push(i),i={},i.label=t.i18n.map.OrderDate+":",i.value=a.util.formatOrderDateTime(e.crTime),r.push(i),e.shippingAddr&&(i={},i.label=t.i18n.map.ShippedTo+":",i.value=e.shippingAddr.recFirstname+" "+e.shippingAddr.recLastname+"("+e.shippingAddr.streetAddr+" "+e.shippingAddr.extendAddr+" "+e.shippingAddr.city+","+e.shippingAddr.province+" "+e.shippingAddr.postCode+","+e.shippingAddr.fullCountry+")",r.push(i),i={},i.label="",i.value=t.i18n.map.PhoneNumberlabel+": "+e.shippingAddr.telephone,r.push(i)),e.billAddr&&(i={},i.label=t.i18n.map.BilledTo+":",i.value=e.billAddr.recFirstname+" "+e.billAddr.recLastname+"("+e.billAddr.streetAddr+" "+e.billAddr.extendAddr+" "+e.billAddr.city+","+e.billAddr.province+" "+e.billAddr.postCode+","+e.billAddr.fullCountry+")",r.push(i),i={},i.label="",i.value=t.i18n.map.PhoneNumberlabel+": "+e.billAddr.telephone,r.push(i)),i={},i.label=t.i18n.map.OrderStatus+":",0==e.paymentStatus?e.paymentStatusString=t.i18n.map.OrderStatusPendding:1==e.paymentStatus?e.paymentStatusString=t.i18n.map.OrderStatusSuccess:2==e.paymentStatus?e.paymentStatusString=t.i18n.map.OrderStatusFail:3==e.paymentStatus?e.paymentStatusString=t.i18n.map.OrderStatusDelay:4==e.paymentStatus&&(e.paymentStatusString=t.i18n.map.OrderStatusDelivered),i.value=e.paymentStatusString,r.push(i),t("#order_info").html(t("#orderInfoTempl").tmpl(r))}a.initLoginStatus(function(e){if(e){if(sessionStorage.userInfo){var r=JSON.parse(sessionStorage.userInfo);r.firstName?t("#name").text(r.firstName+r.lastName):r.email&&t("#name").text(r.email),s(r)}sessionStorage.commentSwitch&&"1"==sessionStorage.commentSwitch?t("#menu_my_comment").removeClass("hide"):t("#menu_my_comment").addClass("hide"),sessionStorage.messageSwitch&&"1"==sessionStorage.messageSwitch?t("#menu_my_message").removeClass("hide"):t("#menu_my_message").addClass("hide")}else window.location.href="../../../login.html"});var n=a.util.getQueryString("id");!function(e){a.dao.getOrderDetail({orderId:e},function(e){var r=a.util.getCurrencySymbol(e.correncyCode);r||(r=a.util.getCurrencySymbol(a.util.getLocalCurrency()));var i=a.util.getAdvSource().u;i||(i=a.util.getQueryString("u"));var s="";i&&(s="?u="+i);for(var n=a.util.encodeMenuType(a.util.getUvid()),o=e.spCart,d=0;d<o.length;d++){var u=o[d];if(u.displayImg=a.util.picUrl+u.displayImg,u.productPrice=a.util.formatProductPrice(u.productPrice,r),"2"==u.attrFlg){var m=a.util.formatProductName(u.productName)+"-d-"+a.util.encodeMenuType(u.productId)+"-"+a.util.encodeMenuType(u.productColorId)+"-"+n+".html"+s;u.href=m}else{var m=a.util.formatProductName(u.productName)+"-d-"+a.util.encodeMenuType(u.productId)+"-"+a.util.encodeMenuType(u.productColorId)+"-"+n+".html"+s;u.href=m}if(u.subCarts&&u.subCarts.length>0)for(var p=0;p<u.subCarts.length;p++){var c=u.subCarts[p];c.attrDes&&c.attrDes.length>0?c.colorImgpath=a.util.picUrl+c.colorImgpath:(u.subCarts.splice(p,1),p-=1)}}t("#cart_list").html(t("#cartTempl").tmpl(o)),t("#cart_list #color_title").html(t.i18n.map.ColorTitle),t("#cart_list #item").html(t.i18n.map.Item),t("#cart_list #qty").html(t.i18n.map.Qty),t("#cart_list #unit").html(t.i18n.map.Unit),l(e);var g=[];g.push({disCost:e.totalCost,disTitle:t.i18n.map.SubTotal,policyId:-1}),g=g.concat(e.orderDisInfos),g.push({disCost:e.realCost,disTitle:t.i18n.map.GrandTotal,policyId:-1});for(var d=0;d<g.length;d++){var h=g[d];h.disCost<0?h.disCost="-"+a.util.formatProductPrice(-h.disCost,r):h.disCost="+"+a.util.formatProductPrice(h.disCost,r)}t("#dis_info_list").html(t("#disInfoTempl").tmpl(g)),t("#sub_total").html(a.util.formatProductPrice(e.totalCost,r)),t("#grand_total").html(a.util.formatProductPrice(e.realCost,r))})}(n),function(){t(".menu-item-parent .menu-item-wrap").bind("click",function(){t(this).hasClass("selected")||(t(".menu-item-parent .menu-item-wrap").removeClass("selected"),t(this).addClass("selected"),t(".menu-content-wrap .title").text(t(this).text()))})}()});