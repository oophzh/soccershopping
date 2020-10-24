"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","bootstrapPaginator"],function(t,i,e,r,a,o){function s(){var i=t.i18n.map.FreeShippingTitle;i&&(i=i[0].replace("$price",sessionStorage.freeShippingAmount),t("#free_shipping_tab").html(i)),sessionStorage.priceRange&&"undefined"!==sessionStorage.priceRange?(t("#free_shipping_tab").addClass("active"),t("#recently_browser_tab").removeClass("active"),t("#shipping_list_wrap").removeClass("hide"),t("#recently_browse_wrap").addClass("hide")):t("#recently_browser_tab").addClass("active")}function n(){a.dao.getCoupon({userId:a.util.getUserId(),currencyId:a.util.getLocalCurrency()},function(i){if(i){var e=[i];t("#coupon_list_wrap").html(t("#couponListTempl").tmpl(e)),t("#coupon_list_wrap #code_text").html(t.i18n.map.Code),sessionStorage.setItem("couponCode",i.cpId),t("#coupon_code_input").val(i.cpId)}})}function l(){z=!1;var i="";1==sessionStorage.applyCouponCode&&(i=a.util.getCouponCode());var e={};if(a.util.checkIsLogin())e={currencyId:a.util.getLocalCurrency(),userId:a.util.getUserId(),cart:[],applyCpNo:i};else{if(!localStorage.productList||"[]"===localStorage.productList)return t("#cart_cost_title").hide(),t("#cart_cost_wrap").hide(),t("#cart_list").hide(),t("#empty_cart").show(),t("#product_total_number").html(0),t("#cart_product_number").html("0"),t("#cart_product_number").show(),t("#mb_cart_product_number").html("0"),t("#mb_cart_product_number").show(),t(".loading-mask").addClass("hide"),t(".main-wrap").hasClass("invisibility")&&t(".main-wrap").removeClass("invisibility"),void t("#markup_product_wrap").addClass("hide");e={currencyId:a.util.getLocalCurrency(),userId:"",cart:JSON.parse(localStorage.productList),applyCpNo:i}}a.dao.shoppingCart({inputParams:JSON.stringify(e)},function(i){t(".loading-mask").addClass("hide"),i.cart&&i.cart.length>0?(t("#cart_list").show(),t("#cart_cost_title").show(),t("#cart_cost_wrap").show(),t("#empty_cart").hide(),c(i),W||(W=!0,t.getJSON("/resources/json/country.json",function(t){}))):(t("#cart_cost_title").hide(),t("#cart_cost_wrap").hide(),t("#cart_list").hide(),t("#empty_cart").show(),t("#product_total_number").html(0),t("#cart_product_number").html("0"),t("#cart_product_number").show(),t("#mb_cart_product_number").html("0"),t("#mb_cart_product_number").show(),t("#markup_product_wrap").addClass("hide")),t(".main-wrap").hasClass("invisibility")&&(t(".main-wrap").removeClass("invisibility"),t(".loading-mask").addClass("hide"))},function(){t(".loading-mask").addClass("hide")})}function c(i){var e=0,r=a.util.getCurrencySymbol(a.util.getLocalCurrency()),o=a.util.getAdvSource().u;o||(o=a.util.getQueryString("u"));a.util.encodeMenuType(a.util.getUvid());B=[],H=[];for(var s=0;s<i.cart.length;s++){var n=i.cart[s];n.displayImg=a.util.picUrl+n.displayImg,n.cost=a.util.formatProductPrice(n.cost,r),n.unitPrice=a.util.formatProductPrice(n.unitPrice,r);var l="jg_detail.html?i="+n.productId+"&c="+n.productColorId;n.href=l,e+=Number(n.productNum),n.prdAttrFlg&&"2"==n.prdAttrFlg?H.push(n):B.push(n)}if(t("#cart_list").html(t("#cartTempl").tmpl(B)),t("#cart_list #color_title").html(t.i18n.map.ColorTitle),t("#cart_list #remove_label").html(t.i18n.map.Remove),H&&H.length>0){t("#markup_product_wrap").removeClass("hide"),i.jgtitle&&t("#un_markup_tip").html(i.jgtitle),t("#markup_product_list").html(t("#markupProductTempl").tmpl(H));for(var s=0;s<H.length;s++)H[s].productNum<=10?t("#markup_qty_list_"+s+" option[value="+H[s].productNum+"]").attr("selected","selected"):(t("#markup_qty_list_"+s).hide(),t("#markup_qty_list_"+s).parent().find("input").show(),t("#markup_qty_list_"+s).parent().find("input").val(H[s].productNum)),H[s].productNum>0?(t("#markup_product_list #markup_qty_list_"+s).prop("disabled",!1),t("#markup_product_list #"+s+" #add_btn i").addClass("selected"),t("#markup_product_list #"+s+" #add_btn i").removeClass("icon-gouwuche"),t("#markup_product_list #"+s+" #add_btn i").addClass("icon-radio")):(t("#markup_product_list #markup_qty_list_"+s).prop("disabled",!0),t("#markup_product_list #"+s+" #add_btn i").removeClass("selected"),t("#markup_product_list #"+s+" #add_btn i").addClass("icon-gouwuche"),t("#markup_product_list #"+s+" #add_btn i").removeClass("icon-radio")),t("#markup_product_list #"+s+" #add_btn i").each(function(){t(this).click(function(){if(i.reachjg&&"1"==i.reachjg){var e=t(this).parent().parent().parent().data().data;t(this).hasClass("selected")?(t(this).removeClass("selected"),t(this).addClass("icon-gouwuche"),t(this).removeClass("icon-radio"),t("#markup_product_list #markup_qty_list_"+s).prop("disabled",!0),console.log("delete "+e+" item"),d(e+B.length,0,i)):(t(this).addClass("selected"),t(this).removeClass("icon-gouwuche"),t(this).addClass("icon-radio"),t("#markup_product_list #markup_qty_list_"+s).prop("disabled",!1),console.log("select "+e+" item"),F.productName=H[e].productName,F.productImage=H[e].displayImg,F.productId=H[e].productId,F.productColorId=H[e].productColorId,F.prdAttrFlg="2",I())}else{var r=i.jgtitle.substring(i.jgtitle.indexOf(">")+1);alert(r.substring(0,r.indexOf("<")))}})}),t("#markup_product_list .qty-content select option[value=11]").html(t.i18n.map.MoreNumber),t("#markup_product_list .qty-content select").change(function(){if("11"==t(this).val())t(this).hide(),t(this).parent().find("input").show();else{var e=t(this).find("option:selected").text();d(t(this).parent().parent().data().data+B.length,e,i)}}),t("#markup_product_list .qty-content input").blur(function(){var e=t(this).val();d(t(this).parent().parent().data().data+B.length,e,i)});if(!a.util.checkIsLogin()&&"1"!==i.reachjg)for(var c=JSON.parse(localStorage.productList),s=0;s<c.length;s++)"2"==c[s].prdAttrFlg&&(c.splice(s,1),localStorage.setItem("productList",JSON.stringify(c)))}t("#product_total_number").html(e),e>0?(t("#cart_product_number").html(e),t("#cart_product_number").show(),t("#mb_cart_product_number").html(e),t("#mb_cart_product_number").show()):(t("#cart_product_number").html("0"),t("#cart_product_number").show(),t("#mb_cart_product_number").html("0"),t("#mb_cart_product_number").show());var p=3;sessionStorage.maxnum_allowed&&(p=Number(sessionStorage.maxnum_allowed)),e<=p&&t("#error_message").addClass("hide");for(var s=0;s<B.length;s++)B[s].productNum<=10?t("#qty_list_"+s+" option[value="+B[s].productNum+"]").attr("selected","selected"):(t("#qty_list_"+s).hide(),t("#qty_list_"+s).parent().find("input").show(),t("#qty_list_"+s).parent().find("input").val(B[s].productNum)),t("#"+s+" .remove-btn").each(function(){t(this).click(function(){console.log("del "+t(this).parent().parent().data().data+"item"),d(t(this).parent().parent().parent().parent().data().data,0,i)})});t("#cart_list .qty-content select option[value=11]").html(t.i18n.map.MoreNumber),t("#cart_list .qty-content select").change(function(){if("11"==t(this).val())t(this).hide(),t(this).parent().find("input").show();else{var e=t(this).find("option:selected").text();d(t(this).parent().parent().data().data,e,i)}}),t("#cart_list .qty-content input").blur(function(){var e=t(this).val();d(t(this).parent().parent().data().data,e,i)});for(var s=0;s<i.dis_info.length;s++){var u=i.dis_info[s];u.disAmount<0?u.disAmount="-"+a.util.formatProductPrice(-u.disAmount,r):u.disAmount="+"+a.util.formatProductPrice(u.disAmount,r),8==u.policyId&&(z=!0)}if(t("#dis_info_list").html(t("#disInfoTempl").tmpl(i.dis_info)),t("#shipping_cost_list").html(t("#shippingCostTempl").tmpl(i.dis_info)),sessionStorage.logistics_info?(t("#logistics_info").removeClass("hide"),t("#logistics_info").html(sessionStorage.logistics_info)):t("#logistics_info").addClass("hide"),z?(t("#apply_btn").text(t.i18n.map.Cancel),t("#apply_btn").css("background","#333")):(t("#apply_btn").text(t.i18n.map.Apply),t("#apply_btn").css("background","#00aa00")),i.reachFreeShipping&&1==i.reachFreeShipping)t("#free_tip").css("color","#fff"),t("#free_tip").html(i.freeShippingInfo);else{t("#free_tip").css("color","#fff");var m=t.i18n.map.FreeShippingTip;if(m&&(m=m.replace("$price","<span style='color: #ea5455;'>"+i.freeShippingInfo+"</span>"),m=m+"<span id='free_tip_add_more' class='free-tip-add-more'>"+t.i18n.map.AddFreeShipping+"</span>"),t("#free_tip").html(m),t("#free_tip_add_more").click(function(){t("#free_shipping_tab").addClass("active"),t("#recently_browser_tab").removeClass("active"),t("#shipping_list_wrap").removeClass("hide"),t("#recently_browse_wrap").addClass("hide"),window.scrollTo(0,t("#free_shipping_tab").offset().top-150)}),sessionStorage.priceRange&&"undefined"!==sessionStorage.priceRange){var _=JSON.parse(sessionStorage.priceRange);_&&_.length>0&&t("#free_tip_add_more").css("display","inline-block")}else t("#free_tip_add_more").css("display","none")}t("#sub_total").html(a.util.formatProductPrice(i.amount,r)),t("#total").html(a.util.formatProductPrice(i.amountNoShipping,r)),t("#grand_total").html(a.util.formatProductPrice(i.realAmount,r)),i.cpPromptInfo&&t("#coupon_use_info").html(i.cpPromptInfo),q=i.realAmount,T=i.amountAllowed}function d(i,e,r){if(a.util.checkIsLogin()){var o=r.cart[i];o.productNum=Number(e),o.userId=a.util.getUserId(),t(".loading-mask").removeClass("hide"),a.dao.shoppingCartMt({inputParams:JSON.stringify([o])},function(t){l()})}else if(localStorage.productList){t(".loading-mask").removeClass("hide");var s=JSON.parse(localStorage.productList);if(0==Number(e))s.splice(i,1);else{var o=s[i];o.productNum=Number(e)}1==s.length&&"2"==s[0].prdAttrFlg&&(s=[]),localStorage.setItem("productList",JSON.stringify(s)),l()}}function p(){var i=[];localStorage.currentBrowseList&&(i=JSON.parse(localStorage.currentBrowseList));var e={currencyId:a.util.getLocalCurrency(),products:i};a.dao.productsViewed({inputParams:JSON.stringify(e)},function(i){if(i&&i.length>0){i.length>10&&(i=i.slice(0,10));var e=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=a.util.getAdvSource().u;r||(r=a.util.getQueryString("u"));var o="";r&&(o="?u="+r);for(var s=a.util.encodeMenuType(a.util.getUvid()),n=0;n<i.length;n++){var l=i[n];if(l.orgPrice=a.util.formatProductPrice(l.orgPrice,e),l.curPrice=a.util.formatProductPrice(l.curPrice,e),l.imgDisplay=a.util.picUrl+l.imgDisplay,a.util.isMobile()){var c=460,d=a.util.getImageHeight(),p=(document.body.clientWidth-380-50)/5-10;l.height=parseInt(d*p/c)}else{var c=231,d=a.util.getImageHeight(),p=140;l.height=parseInt(d*p/c)}var u=a.util.formatProductName(l.productName)+"-d-"+a.util.encodeMenuType(l.productId)+"-"+a.util.encodeMenuType(l.productColorId)+"-"+s+".html"+o;l.href=u}t("#product_viewed_list_wrap").html(t("#productViewedListTempl").tmpl(i)),t("#recently_browse_wrap").find(".free-shpping-empty-data").addClass("hide")}else t("#recently_browse_wrap").find(".free-shpping-empty-data").removeClass("hide")})}function u(){if(sessionStorage.priceRange&&"undefined"!==sessionStorage.priceRange){var i=JSON.parse(sessionStorage.priceRange);i&&i.length>0&&(t("#price_zone_list").html(t("#priceZoneTempl").tmpl(i)),t(t("#price_zone_list").find("li")[V]).addClass("current"),t("#price_zone_list li").each(function(){t(this).click(function(){V=t(this)[0].id,t("#price_zone_list").find("li").removeClass("current"),t(this).addClass("current"),Q.curPage=1,m(i[V].from,i[V].to)})}),t("#price_zone_list").find("li").removeClass("current"),t(t("#price_zone_list").find("li")[V]).addClass("current"),m(i[V].from,i[V].to))}else t("#free_shipping_tab").addClass("hide"),t("#shipping_list_wrap").addClass("hide"),t("#recently_browse_wrap").removeClass("hide")}function m(i,e){t("#shipping_list_wrap .shipping-list-loading-data").removeClass("hide"),a.dao.productsByPriceRange({currencyId:a.util.getLocalCurrency(),currentPage:Q.curPage,from:i,to:e},function(i){i.page&&(Q.amount=i.page.amount,Q.pageSize=i.page.pageSize);var e=i.products;if(e&&e.length>0){for(var r=a.util.getCurrencySymbol(a.util.getLocalCurrency()),o=0;o<e.length;o++){var s=e[o];if(s.original_price=a.util.formatProductPrice(s.original_price,r),s.current_price=a.util.formatProductPrice(s.current_price,r),s.img_display=a.util.picUrl+s.img_display,a.util.isMobile()){var n=460,l=a.util.getImageHeight(),c=(document.body.clientWidth-380-50)/5-10;s.height=parseInt(l*c/n)}else{var n=240,l=a.util.getImageHeight(),c=140;s.height=parseInt(l*c/n)}}t("#shipping_list").html(t("#shippingListTempl").tmpl(e)),t(".free-shipping-item").each(function(){t(this).click(function(){g(t(this)[0].id)})}),1==Q.curPage&&_(),t("#shipping_list_wrap").find(".free-shpping-empty-data").addClass("hide"),t("#shipping_list_wrap").find("#page_wrap").removeClass("hide"),t("#shipping_list_wrap").find("#shipping_list").removeClass("hide"),t("#shipping_list_wrap .shipping-list-loading-data").addClass("hide")}else t("#shipping_list_wrap").find(".free-shpping-empty-data").removeClass("hide"),t("#shipping_list_wrap").find("#page_wrap").addClass("hide"),t("#shipping_list_wrap").find("#shipping_list").addClass("hide"),t("#shipping_list_wrap .shipping-list-loading-data").addClass("hide")},function(){t("#shipping_list_wrap").find(".free-shpping-empty-data").removeClass("hide"),t("#shipping_list_wrap").find("#page_wrap").addClass("hide"),t("#shipping_list_wrap").find("#shipping_list").addClass("hide"),t("#shipping_list_wrap .shipping-list-loading-data").addClass("hide")})}function _(){var i=0;i=Q.amount%Q.pageSize==0?Q.amount/Q.pageSize:Q.amount/Q.pageSize+1,t(function(){var e={bootstrapMajorVersion:1,currentPage:Q.curPage,numberOfPages:5,totalPages:i,shouldShowPage:!0,onPageClicked:function(i,r,a,o){Q.curPage=o;var s=JSON.parse(sessionStorage.priceRange);m(s[V].from,s[V].to),e.currentPage=o,t("#page").bootstrapPaginator(e)}};t("#page").bootstrapPaginator(e)})}function g(i){a.dao.productDetail({productId:i,currencyId:a.util.getLocalCurrency()},function(i){if(i.product_id){F.productName=i.product_name,F.productId=i.product_id,F.prdAttrFlg="";for(var e=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=0;r<i.color_data.length;r++){var o=i.color_data[r];o.original_price=a.util.formatProductPrice(o.original_price,e),o.current_price=a.util.formatProductPrice(o.current_price,e),o.img_display=a.util.picUrl+o.img_display,o.color_img=a.util.picUrl+o.color_img,o.width=200,o.height=200;for(var s=0;s<o.img_groups.length;s++){var n=o.img_groups[s];n.small_img=a.util.picUrl+n.small_img,n.big_img=a.util.picUrl+n.big_img}}i.product_des?t(".description").html(i.product_des):t(".description").parent().parent().hide(),t("#name").html(i.color_data[M].pcName),t("#product_ext_name").html(i.color_data[M].pcNameExt),t("#current_price").html(i.color_data[M].current_price),t("#original_price").html(i.color_data[M].original_price),h(i.color_data),f(i.color_data[M].dyn_attrs),x(),A(i.color_data[M].img_groups),t("#product_detail_mask").removeClass("hide"),t("#product_detail_mask #close_btn").click(function(){t("#product_detail_mask").addClass("hide")})}})}function h(i){1==i.length?F.productColorId=i[0].color_id:(t("#color_data_wrap").removeClass("hide"),t("#color_list").html(t("#colorItem").tmpl(i)),t(t("#color_list li")[M]).find("span").css("display","block"),t(t("#color_list li")[M]).find("img").addClass("selected-image-border"),t("#color_desc").html(i[M].color_des),F.productColorId=i[M].color_id,t("#color_list li").bind("click",function(){if("none"==t(this).find("span").css("display")){t("#color_list li").find("span").css("display","none"),t("#color_list li").find("img").removeClass("selected-image-border"),t(this).find("span").css("display","block"),t(this).find("img").addClass("selected-image-border");var e=t(this).data().data;t("#color_desc").html(i[e].color_des),t("#name").html(i[e].pcName),t("#product_ext_name").html(i[e].pcNameExt),t("#current_price").html(i[e].current_price),t("#original_price").html(i[e].original_price),F.productColorId=i[e].color_id,A(i[e].img_groups)}}))}function f(i){D=!1,R=[],U=[],t("#customBtn").addClass("hide"),t("#dyn_attrs_list").html(t("#dynAttrsItem").tmpl(i)),t("#attr_name_hint").html(t.i18n.map.PrintNameHint),t("#attr_number_hint").html(t.i18n.map.PrintNumberHint),t("#dyn_attrs_list option[value=11]").html(t.i18n.map.MoreNumber);for(var e=a.util.getCurrencySymbol(a.util.getLocalCurrency()),r=0;r<i.length;r++){var o=i[r];if(o.domain_list&&o.domain_list.length>0&&(t("#"+o.attr_name+"_content").html(o.domain_list[0]),o.selectedAttr=o.domain_list[0].optId,"Size"==o.attr_name)){t("#size_guide").html(t.i18n.map.SizeGuide);for(var s=0;s<o.domain_list.length;s++){var n=o.domain_list[s];n.attrType=o.attrID,U.push(n)}}o.input_cmp&&(R.push(o),D=!0,t("#customBtn").removeClass("hide")),"3"==o.attrID&&t("#print_number_price").html("+"+a.util.formatProductPrice(o.input_cmp.price,e)),"4"==o.attrID&&t("#print_name_price").html("+"+a.util.formatProductPrice(o.input_cmp.price,e))}b(),t("#dyn_attrs_list select").change(function(){console.log("#dyn_attrs_list select value = "+t(this).val()),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):(t("#custom_"+t(this)[0].id+" option[value="+t(this).val()+"]").prop("selected","selected"),v())}),t("#dyn_attrs_list input").blur(function(){var i=t(this).val();if(i<=10){var e=t(this).parent().find("select")[0].id;t("#custom_"+e+" option[value="+i+"]").prop("selected","selected")}else{var e=t(this).parent().find("select")[0].id,r="#"+e;t(r).hide(),t(r).parent().find("input").show(),t(r).parent().find("input").val(i)}v()}),t("#size_guide").click(function(){t("#size_guide_mask").removeClass("hide"),t("body").css("overflow","hidden")}),t("#size_guide_mask #close_btn").click(function(){t("#size_guide_mask").addClass("hide"),t("body").css("overflow","auto")})}function v(){E=y(),t("#custome_attr_list").html(""),t("#custome_attr_list").html(t("#customAttrItem").tmpl(E))}function b(){U&&U.length>0&&(t("#size_list").html(t("#customSizeItem").tmpl(U)),t("#size_list select option[value=11]").html(t.i18n.map.MoreNumber),v(),t("#size_list select").change(function(){console.log("#size_list select value = "+t(this).val()),t("#"+t(this)[0].id.substring(t(this)[0].id.indexOf("_")+1)+" option[value="+t(this).val()+"]").prop("selected","selected"),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):v()}),t("#size_list input").blur(function(){var i=t(this).val();if(i<=10){var e=t(this).parent().find("select")[0].id;t("#"+e.substring(e.indexOf("_")+1)+" option[value="+i+"]").prop("selected","selected")}else{var e=t(this).parent().find("select")[0].id,r="#"+e.substring(e.indexOf("_")+1);t(r).hide(),t(r).parent().find("input").show(),t(r).parent().find("input").val(i)}v()})),L()}function C(){b(),t("#custom_wrap_mask").removeClass("hide"),t("body").css("overflow","hidden")}function y(){for(var i=[],e=0;e<U.length;e++){var r=U[e],a=t("#"+r.optId+"_number_list").val();if("11"==a&&((a=t("#"+r.optId+"_number_list").parent().find("input").val())||(a=0)),r.number=a,Number(a)<=10?t("#custom_"+r.optId+"_number_list option[value="+a+"]").prop("selected","selected"):(t("#custom_"+r.optId+"_number_list").hide(),t("#custom_"+r.optId+"_number_list").parent().find("input").show(),t("#custom_"+r.optId+"_number_list").parent().find("input").val(a)),r.customs=[],a>0){for(var o=0;o<a;o++){for(var s=0;s<R.length;s++){R[s].position=o;var n=t("#print_input_"+r.optId+"_"+R[s].attrID+"_"+R[s].position).val();R[s].custominfo=n}r.customs.push(JSON.parse(JSON.stringify({attrs:R})))}i.push(r)}}return i}function w(){t("#custom_wrap_mask").addClass("hide"),t("body").css("overflow","auto")}function I(){var t=null;null!=(t=D?P():O())&&0!=t.length&&(a.util.checkIsLogin()?S(t):k(t))}function S(i){a.dao.merge2cart({inputParams:JSON.stringify(i)},function(){l()},function(t){alert(t.msg)},function(i){t("#product_detail_mask").addClass("hide")})}function k(i){var e=localStorage.productList;if(e=e?JSON.parse(e):[],0==e.length)e=i;else for(var r=0;r<i.length;r++){for(var a=i[r],o=!1,s=JSON.stringify(a.attrOpts),n=0;n<e.length;n++){var c=e[n];c.productId==a.productId&&c.productColorId==a.productColorId&&s==JSON.stringify(c.attrOpts)&&(c.productNum=c.productNum+a.productNum,o=!0)}if(!o){e.push(a);for(var n=0;n<e.length;n++)"2"==e[n].prdAttrFlg&&(e.push(e[n]),e.splice(n,1))}}localStorage.productList=JSON.stringify(e);for(var d=0,n=0;n<e.length;n++)d=parseInt(d)+parseInt(e[n].productNum);t("#cart_product_number").html(d),t("#cart_product_number").show(),t("#mb_cart_product_number").html(d),t("#mb_cart_product_number").show(),t("#product_detail_mask").addClass("hide"),l()}function N(t){for(var i=0;i<t.length;i++)for(var e=t[i],r=JSON.stringify(e.attrOpts),a=i+1;a<t.length;a++){var o=t[a];r==JSON.stringify(o.attrOpts)&&(e.productNum=e.productNum+o.productNum,t.splice(a,1),a-=1)}return t}function P(){var i=[],e={userId:a.util.getUserId(),productName:F.productName,productId:F.productId,productColorId:F.productColorId,productNum:1,prdAttrFlg:F.prdAttrFlg,attrOpts:[{attrType:"",attrOptId:"",custominfo:""}]};if(E&&E.length>0)for(var r=0;r<E.length;r++)for(var o=E[r],s=0;s<o.customs.length;s++){for(var n=[{attrType:o.attrType,attrOptId:o.optId}],l=o.customs[s].attrs,c=0;c<l.length;c++){var d=l[c],p=t("#print_input_"+o.optId+"_"+d.attrID+"_"+d.position).val();n.push({attrType:d.attrID,attrOptId:d.input_cmp.optId,custominfo:p})}e.attrOpts=n,i.push(JSON.parse(JSON.stringify(e)))}return console.log(i),N(i)}function O(){var t=[],i={userId:a.util.getUserId(),productName:F.productName,productImage:F.productImage,productId:F.productId,productColorId:F.productColorId,prdAttrFlg:F.prdAttrFlg,productNum:1,attrOpts:[],attrString:""};return i.attrString="",t.push(JSON.parse(JSON.stringify(i))),t}function L(){t("#custom_confirm_btn").unbind("click").click(function(){I()}),t("#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn").unbind("click").click(function(){w()})}function x(){t("#qty_list option[value='1']").prop("selected","selected");var i=t("#qty_list").find("option:selected").val();F.productNum=Number(i),t("#qty_list").on("change",function(){var i=t(this).find("option:selected").text();F.productNum=Number(i)})}function A(i){t("#small_image_list").length>0&&t("#small_image_list").html(t("#productSmallImage").tmpl(i)),t("#small_image_list li:first").attr("id","onlickImg"),t("#vertical img:first").attr("src",i[0].big_img),-1==j.indexOf(i[0].big_img)&&t("#imageLoading").removeClass("hide"),J()}function J(){var i=null;t(document).ready(function(){t("#imageMenu li img").bind("click",function(){"onlickImg"!=t(this).attr("id")&&(t("#midimg").attr("src",t(this).data().data),-1==j.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"),t("#imageMenu li").removeAttr("id"),t(this).parent().attr("id","onlickImg"))}).bind("mouseover",function(){"onlickImg"!=t(this).attr("id")&&(window.clearTimeout(i),t("#midimg").attr("src",t(this).data().data),-1==j.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"))}).bind("mouseout",function(){"onlickImg"!=t(this).attr("id")&&(t("#midimg").attr("src",t(this).data().data),-1==j.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"),t(this).removeAttr("style"),i=window.setTimeout(function(){t("#midimg").attr("src",t("#onlickImg img").data().data),-1==j.indexOf(t("#onlickImg img").data().data)&&t("#imageLoading").removeClass("hide")},1e3))})})}console.log("cart.js");var T="",q="",z=!1,M=0,F={productId:"",productColorId:""},j=[],U=[],E=[],R=[],D=!1,B=[],H=[],V=0,Q={amount:0,curPage:1,pageSize:8},W=!1;!function(){t("#continue_shopping_btn").click(function(){window.location.href="/"}),t("#checkout_btn").click(function(){var i=Number(t("#product_total_number").text()),e=3;if(sessionStorage.maxnum_allowed&&(e=Number(sessionStorage.maxnum_allowed)),i>e)t("#error_message").html(t.i18n.map.maxErrorMsg1+" "+e+t.i18n.map.maxErrorMsg2),t("#error_message").removeClass("hide"),setTimeout(function(){alert(t.i18n.map.maxErrorMsg1+" "+e+t.i18n.map.maxErrorMsg2)},1);else if(q>T){var r=a.util.getCurrencySymbol(a.util.getLocalCurrency());t("#error_message").html(t.i18n.map.maxAmountErrorMsg1+" "+a.util.formatProductPrice(q,r)+" "+t.i18n.map.maxAmountErrorMsg2+" "+a.util.formatProductPrice(T,r)+". "+t.i18n.map.maxAmountErrorMsg3),t("#error_message").removeClass("hide"),setTimeout(function(){alert(t.i18n.map.maxAmountErrorMsg1+" "+a.util.formatProductPrice(q,r)+" "+t.i18n.map.maxAmountErrorMsg2+" "+a.util.formatProductPrice(T,r)+". "+t.i18n.map.maxAmountErrorMsg3)},1)}else t("#error_message").addClass("hide"),a.util.checkIsLogin()?window.location.href="../../../checkout_shipping.html":window.location.href="../../../login.html"}),t("#apply_btn").click(function(){z?(sessionStorage.setItem("applyCouponCode",0),t("#coupon_use_info").html(""),l()):t("#coupon_code_input").val()&&a.util.getCouponCode()&&(a.util.getCouponCode()===t("#coupon_code_input").val()?(sessionStorage.setItem("applyCouponCode",1),t(".loading-mask").removeClass("hide")):(sessionStorage.setItem("applyCouponCode",0),t("#coupon_use_info").html(t.i18n.map.ErrorCouponCode)),l())}),t("#free_shipping_tab").click(function(){t("#free_shipping_tab").addClass("active"),t("#recently_browser_tab").removeClass("active"),t("#shipping_list_wrap").removeClass("hide"),t("#recently_browse_wrap").addClass("hide")}),t("#recently_browser_tab").click(function(){t("#recently_browser_tab").addClass("active"),t("#free_shipping_tab").removeClass("active"),t("#shipping_list_wrap").addClass("hide"),t("#recently_browse_wrap").removeClass("hide")}),t("#midimg").load(function(i){console.log("big image loading"),t("#imageLoading").addClass("hide"),j.push(i.currentTarget.currentSrc)}),t("#addCartBtn").unbind("click").click(function(){console.log("addCartBtn"),I()}),t("#customBtn").click(function(){C()})}(),a.setLanguageCallback(function(){s(),l()}),a.setCurrencyCodeCallback(function(){s(),l(),p(),u(),n()}),a.initLoginStatus(function(i){a.util.getLocalCurrency()&&(l(),p(),u()),i?(t("#coupon_hint_wrap").addClass("hide"),t("#coupon_hint_wrap").attr("href","javascript:void(0)"),n()):(t("#coupon_hint_wrap").removeClass("hide"),t("#coupon_hint_wrap").attr("href","login.html"))})});