"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(t,i,r,e,o){function a(){t("#custom_confirm_btn").unbind("click").click(function(){s(2)}),t("#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn").unbind("click").click(function(){h()})}function n(i){var r=[];if(1==i){var e=Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val());if(e<=0)return void alert(t.i18n.map.QuantityIsNull);for(var a={userId:o.util.getUserId(),productId:z.productId,productColorId:z.productColorId,productNum:e,attrOpts:[]},n=0;n<P.color_data[0].dyn_attrs.length;n++){var s={},l=P.color_data[0].dyn_attrs[n];if("2"==l.attrID){s.attrType=l.attrID,s.attrOptId=t("#"+l.attr_name+"_list").val(),a.attrOpts.push(s);break}}r.push(JSON.parse(JSON.stringify(a)))}else if(2==i)for(var a={userId:o.util.getUserId(),productId:z.productId,productColorId:z.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:""}]},n=0;n<U.length;n++){var c=U[n],u=t("#"+c.optId+"_number_list").val();console.log(u),"11"==u&&((u=t("#"+c.optId+"_number_list").parent().find("input").val())||(u=0)),u>0&&(a.productNum=u,a.attrOpts=[{attrType:c.attrType,attrOptId:c.optId}],r.push(JSON.parse(JSON.stringify(a))))}return r}function s(t){var i=null;if(null==(i=M?d(t):n(t))||0==i.length)return void h();o.util.checkIsLogin()?l(i):c(i)}function l(t){o.dao.merge2cart({inputParams:JSON.stringify(t)},function(){k(),h()},function(t){h(),alert(t.msg)})}function c(i){var r=localStorage.productList;if(r=r?JSON.parse(r):[],0==r.length)r=i;else for(var e=0;e<i.length;e++){for(var o=i[e],a=!1,n=JSON.stringify(o.attrOpts),s=0;s<r.length;s++){var l=r[s];o.productId==l.productId&&o.productColorId==l.productColorId&&n==JSON.stringify(l.attrOpts)&&(l.productNum=l.productNum+o.productNum,a=!0)}a||r.push(o)}localStorage.productList=JSON.stringify(r);for(var c=0,s=0;s<r.length;s++)c=parseInt(c)+parseInt(r[s].productNum);t("#cart_product_number").html(c),t("#cart_product_number").show(),k(),h()}function u(t){for(var i=0;i<t.length;i++)for(var r=t[i],e=JSON.stringify(r.attrOpts),o=i+1;o<t.length;o++){var a=t[o];e==JSON.stringify(a.attrOpts)&&(r.productNum=r.productNum+a.productNum,t.splice(o,1),o-=1)}return t}function d(i){var r=[];if(1==i){var e=Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val());if(e<=0)return void alert(t.i18n.map.QuantityIsNull);for(var a={userId:o.util.getUserId(),productId:z.productId,productColorId:z.productColorId,productNum:e,attrOpts:[]},n=0;n<P.color_data[0].dyn_attrs.length;n++){var s={},l=P.color_data[0].dyn_attrs[n];"2"==l.attrID?(s.attrType=l.attrID,s.attrOptId=t("#"+l.attr_name+"_list").val()):(s.attrType=l.attrID,s.attrOptId=l.input_cmp.optId,"3"==l.attrID?s.custominfo=t("#print_number_input").val():"4"==l.attrID&&(s.custominfo=t("#print_name_input").val())),a.attrOpts.push(s)}r.push(JSON.parse(JSON.stringify(a)))}else if(2==i){var a={userId:o.util.getUserId(),productId:z.productId,productColorId:z.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:"",custominfo:""}]};if(x&&x.length>0)for(var n=0;n<x.length;n++)for(var c=x[n],d=0;d<c.customs.length;d++){for(var s=[{attrType:c.attrType,attrOptId:c.optId}],p=c.customs[d].attrs,_=0;_<p.length;_++){var m=p[_],h=t("#print_input_"+c.optId+"_"+m.attrID+"_"+m.position).val();s.push({attrType:m.attrID,attrOptId:m.input_cmp.optId,custominfo:h})}a.attrOpts=s,r.push(JSON.parse(JSON.stringify(a)))}}return u(r)}function p(){U&&U.length>0&&(t("#size_list").html(t("#customSizeItem").tmpl(U)),t("#size_list select option[value=11]").html(t.i18n.map.MoreNumber),y(!1),t("#size_list select").change(function(){console.log("#size_list select value = "+t(this).val()),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):y(!0)}),t("#size_list input").blur(function(){console.log("#size_list input");var i=t(this).val();if(console.log("#size_list input number = "+i),i&&i<=10){var r=t(this).parent().find("select")[0].id;t("#"+r.substring(r.indexOf("_")+1)+" option[value="+i+"]").prop("selected","selected")}else if(i&&i>10){var r=t(this).parent().find("select")[0].id,e="#"+r.substring(r.indexOf("_")+1);t(e).hide(),t(e).parent().find("input").show(),t(e).parent().find("input").val(i)}y(!0)})),a()}function _(){p(),t("#custom_wrap_mask").removeClass("hide"),t("body").css("overflow","hidden")}function m(i){for(var r=[],e=0;e<U.length;e++){var o=U[e],a=t("#custom_"+o.optId+"_number_list").val();if(Number(a)>10&&(a=t("#"+o.optId+"_number_input").val()),i||!o.number?o.number=a:Number(o.number)>Number(a)&&(a=o.number),Number(a)<=10?t("#custom_"+o.optId+"_number_list option[value="+a+"]").prop("selected","selected"):(t("#custom_"+o.optId+"_number_list").hide(),t("#custom_"+o.optId+"_number_list").parent().find("input").show(),t("#custom_"+o.optId+"_number_list").parent().find("input").val(a)),o.customs=[],a>0){for(var n=0;n<a;n++){for(var s=0;s<q.length;s++){q[s].position=n;var l=t("#print_input_"+o.optId+"_"+q[s].attrID+"_"+q[s].position).val();q[s].custominfo=l}o.customs.push(JSON.parse(JSON.stringify({attrs:q})))}r.push(o)}}return r}function h(){t("#custom_wrap_mask").addClass("hide"),t("body").css("overflow","auto")}function g(i){console.log("initProductImage midimg setImage"),t("#vertical img:first").attr("src",i[0].big_img),-1==L.indexOf(i[0].big_img)&&t("#imageLoading").removeClass("hide");var r=i.slice(1,i.length);t("#product_image_wrap").html(t("#productImageTempl").tmpl(r))}function f(i){1==i.length?z.productColorId=i[0].color_id:(t("#color_data_wrap").removeClass("hide"),t("#color_list").html(t("#colorItem").tmpl(i)),t(t("#color_list li")[D]).find("span").css("display","block"),t(t("#color_list li")[D]).find("img").addClass("selected-image-border"),t("#color_desc").html(i[D].color_des),z.productColorId=i[D].color_id,t("#color_list li").bind("click",function(){if("none"==t(this).find("span").css("display")){t("#color_list li").find("span").css("display","none"),t("#color_list li").find("img").removeClass("selected-image-border"),t(this).find("span").css("display","block"),t(this).find("img").addClass("selected-image-border");var r=t(this).data().data;t("#color_desc").html(i[r].color_des),t("#name").html(i[r].pcName),t("#product_ext_name").html(i[r].pcNameExt),t("#current_price").html(i[r].current_price),t("#original_price").html(i[r].original_price),t("#price_off").html(i[r].disCount+"%"),z.productColorId=i[r].color_id,g(i[r].img_groups),v(i[r].dyn_attrs)}}))}function v(i,r){M=!1,q=[],U=[],t("#customBtn").addClass("hide"),t("#attr_name_hint").html(t.i18n.map.PrintNameHint),t("#attr_number_hint").html(t.i18n.map.PrintNumberHint);for(var e=o.util.getCurrencySymbol(o.util.getLocalCurrency()),a=0;a<i.length;a++){var n=i[a];if(n.domain_list&&n.domain_list.length>0&&(t("#"+n.attr_name+"_content").html(n.domain_list[0]),n.selectedAttr=n.domain_list[0].optId,"2"==n.attrID))for(var s=0;s<n.domain_list.length;s++){var l=n.domain_list[s];l.attrType=n.attrID,U.push(l)}n.input_cmp&&(q.push(n),M=!0,t("#customBtn").removeClass("hide")),"3"==n.attrID&&(t("#print_number_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e)),t("#detail_print_number_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e))),"4"==n.attrID&&(t("#print_name_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e)),t("#detail_print_name_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e)))}t("#dyn_attrs_list").html(t("#dynAttrsItem").tmpl(i)),t("#size_guide").html(t.i18n.map.SizeGuide);var c=host.substring(0,host.length-7)+"/"+o.util.getDomainName();o.isLoadTest&&(c="https://cdn.jsdelivr.net/gh/oophzh/soccershopping/merreventa"),t("#size_guide_image").attr("src",c+"/size-guide-img.jpg"),M?t("#print_number_input")[0]||(t("#custom_wrap").show(),t("#custom_type_list").val(0),t("#custom_attrs_list").hide(),t("#custom_attrs_list").html(t("#customAttrsItem").tmpl(q))):t("#custom_wrap").hide(),t("#dyn_attrs_list select").change(function(){console.log("#dyn_attrs_list select value = "+t(this).val()),"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#dyn_attrs_list input").blur(function(){var i=t(this).val();if(i<=10){var r=t(this).parent().find("select")[0].id;t("#custom_"+r+" option[value="+i+"]").prop("selected","selected")}else{var r=t(this).parent().find("select")[0].id,e="#"+r;t(e).hide(),t(e).parent().find("input").show(),t(e).parent().find("input").val(i)}}),t("#size_guide").click(function(){t("#size_guide_mask").removeClass("hide"),t("body").css("overflow","hidden")}),t("#size_guide_mask #close_size_guide_btn").click(function(){t("#size_guide_mask").addClass("hide"),t("body").css("overflow","auto")})}function y(i){x=m(i),t("#custome_attr_list").html(""),t("#custome_attr_list").html(t("#customAttrItem").tmpl(x))}function I(){o.dao.productDetail({productId:T,currencyId:o.util.getLocalCurrency()},function(i){if(i.product_id){P=i;var r=i;z.productId=P.product_id;for(var e=o.util.getCurrencySymbol(o.util.getLocalCurrency()),a=0;a<r.color_data.length;a++){var n=r.color_data[a];n.original_price=o.util.formatProductPrice(n.original_price,e),n.current_price=o.util.formatProductPrice(n.current_price,e),n.img_display=o.util.picUrl+n.img_display,n.color_img=o.util.picUrl+n.color_img,n.width=200,n.height=200;for(var s=0;s<n.img_groups.length;s++){var l=n.img_groups[s];l.small_img=o.util.picUrl+l.small_img,l.big_img=o.util.picUrl+l.big_img}}var c="en";localStorage.selectedLanguage&&(c=JSON.parse(localStorage.selectedLanguage).langCode),r.product_des&&"en"==c?t(".description").html(r.product_des):(t("#product_image_wrap").css("border-top","none"),t("#product_image_wrap").css("margin-top","0"),t("#product_image_wrap").css("padding-top","0")),document.title=r.product_name;for(var a=0;a<r.color_data.length;a++)if(J==r.color_data[a].color_id){D=a;break}if(g(r.color_data[D].img_groups),t("#name").html(r.color_data[D].pcName),t("#product_ext_name").html(r.color_data[D].pcNameExt),t("#current_price").html(r.color_data[D].current_price),t("#original_price").html(r.color_data[D].original_price),t("#price_off").html(r.color_data[D].disCount+"%"),"0"==r.color_data[D].isFreeShipping)if(r.advtxts&&r.advtxts.length>0){for(var u="",a=0;a<r.advtxts.length;a++)u=u+r.advtxts[a]+"<br>";t("#shipping_info").html(u),t("#shipping_info").parent().parent().show()}else t("#shipping_info").parent().parent().hide();else"1"==r.color_data[D].isFreeShipping?t("#shipping_info").html(t.i18n.map.FreeshippingHint):t("#shipping_info").parent().parent().hide();t("#price_wrap").css("display","block"),J||(J=r.color_data[D].color_id),f(r.color_data),v(r.color_data[D].dyn_attrs),C(r.product_type),o.util.menu=[],o.util.getClassifyNames(r.product_type,function(){b()}),N(),t("#print_wrap").show()}})}function b(){if(o.util.menu&&o.util.menu.length>0){var i=o.util.getAdvSource().u;i||(i=o.util.getQueryString("u"));var r="";i&&(r="?u="+i);var e=o.util.menu.reverse();e.push({menu_name:document.title});for(var a="<li><a id='breadcrumb_home' href='/'>"+t.i18n.map.Home+"</a></li>",n=0;n<e.length;n++)if(n==e.length-1);else{var s=e[n].menu_name+"-l-"+o.util.encodeMenuType(e[n].menu_type)+"-"+o.util.encodeMenuType(o.util.getUvid())+".html"+r;"1"==e[n].supportgp&&(s="./../../../group.html?type="+o.util.encodeMenuType(e[n].menu_type)),a=a+"<li><a href='"+s+"'>"+e[n].menu_name+"</a></li>"}t(".breadcrumb").html(a)}}function N(){var t=localStorage.currentBrowseList;t=t?JSON.parse(t):[];for(var i=0;i<t.length;i++){var r=t[i];if(r.productId===T&&r.productColorId===J){t.splice(i,1);break}}var e={productId:T,productColorId:J};t.push(e),t.length>30&&(t=t.splice(1,t.length-1)),localStorage.setItem("currentBrowseList",JSON.stringify(t))}function C(i){o.dao.productsRel({menuType:i,productId:T,productColorId:z.productColorId},function(i){var r=o.util.getAdvSource().u;r||(r=o.util.getQueryString("u"));var e="";r&&(e="?u="+r);for(var a=o.util.encodeMenuType(o.util.getUvid()),n=0;n<i.length;n++){var s=i[n];s.imgDisplay=o.util.picUrl+s.imgDisplay;var l=o.util.formatProductName(s.prdName)+"-d-"+o.util.encodeMenuType(s.productId)+"-"+o.util.encodeMenuType(s.productColorId)+"-"+a+".html"+e;s.detailUrl=l}t("#peripheral_products_list").html(t("#peripheralProductListTempl").tmpl(i))})}function k(){t("#add_to_cart_success_mask").removeClass("hide"),t("body").css("overflow","hidden")}function O(){t("#add_to_cart_success_mask").addClass("hide"),t("body").css("overflow","auto")}console.log("detail.js");var w=window.location.href,S=o.util.getDetailParams(w),T=o.util.decodeMenuType(S[S.length-3]),J=o.util.decodeMenuType(S[S.length-2]),D=0,P={},z={productId:"",productColorId:""},L=[],U=[],x=[],q=[],M=!1;o.setCurrencyCodeCallback(function(){I()}),o.setLanguageCallback(function(){t("#breadcrumb_home").text(t.i18n.map.Home)}),o.initLoginStatus(),function(){t("#addCartBtn").unbind("click").click(function(){console.log("addCartBtn"),s(1)}),t("#customBtn").click(function(){_()}),t("#midimg").load(function(i){console.log("big image loading"),t("#imageLoading").addClass("hide"),L.push(i.currentTarget.currentSrc)}),t("#coupon_btn").click(function(){o.util.checkIsLogin()?window.location.href="../../../my_account.html?id=4&uvid="+o.util.getUvid():w.href="../../../login.html?uvid="+o.util.getUvid()}),document.getElementById("qty_list").value=1,t("#qty_list").change(function(){"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#custom_type_list").change(function(){"0"==t(this).val()?(t("#custom_attrs_list").css("display","none"),t("#detail_custom_hint").css("display","none"),t("#print_number_input").val(""),t("#print_name_input").val("")):"1"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","none"),t("#print_number_input").val(""),t("#custom_item_4").css("display","block")):"2"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","none"),t("#print_name_input").val("")):"3"==t(this).val()&&(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","block"))}),t("#add_to_cart_success_mask #close_add_to_cart_success_btn, #add_to_cart_success_mask #continue_shopping_btn").click(function(){O()}),t("#add_to_cart_success_mask #go_to_cart_btn").click(function(){window.location.href="../../../shopping_cart.html",O()}),a()}()});