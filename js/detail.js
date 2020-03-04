"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(t,i,r,e,o){function a(){t("#custom_confirm_btn").unbind("click").click(function(){l(2)}),t("#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn").unbind("click").click(function(){h()})}function n(i){var r=[];if(1==i){for(var e={userId:o.util.getUserId(),productId:D.productId,productColorId:D.productColorId,productNum:t("#qty_list").val(),attrOpts:[]},a=0;a<L.color_data[0].dyn_attrs.length;a++){var n={},l=L.color_data[0].dyn_attrs[a];if("2"==l.attrID){n.attrType=l.attrID,n.attrOptId=t("#"+l.attr_name+"_list").val(),e.attrOpts.push(n);break}}r.push(JSON.parse(JSON.stringify(e)))}else if(2==i)for(var e={userId:o.util.getUserId(),productId:D.productId,productColorId:D.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:""}]},a=0;a<x.length;a++){var s=x[a],c=t("#"+s.optId+"_number_list").val();console.log(c),"11"==c&&((c=t("#"+s.optId+"_number_list").parent().find("input").val())||(c=0)),c>0&&(e.productNum=c,e.attrOpts=[{attrType:s.attrType,attrOptId:s.optId}],r.push(JSON.parse(JSON.stringify(e))))}return r}function l(t){var i=null;if(null==(i=M?d(t):n(t))||0==i.length)return void h();o.util.checkIsLogin()?s(i):c(i)}function s(t){o.dao.merge2cart({inputParams:JSON.stringify(t)},function(){window.location.href="../../../shopping_cart.html",h()},function(t){h(),alert(t.msg)})}function c(i){var r=localStorage.productList;if(r=r?JSON.parse(r):[],0==r.length)r=i;else for(var e=0;e<i.length;e++){for(var o=i[e],a=!1,n=JSON.stringify(o.attrOpts),l=0;l<r.length;l++){var s=r[l];o.productId==s.productId&&o.productColorId==s.productColorId&&n==JSON.stringify(s.attrOpts)&&(s.productNum=s.productNum+o.productNum,a=!0)}a||r.push(o)}localStorage.productList=JSON.stringify(r);for(var c=0,l=0;l<r.length;l++)c=parseInt(c)+parseInt(r[l].productNum);t("#cart_product_number").html(c),t("#cart_product_number").show(),window.location.href="../../../shopping_cart.html",h()}function u(t){for(var i=0;i<t.length;i++)for(var r=t[i],e=JSON.stringify(r.attrOpts),o=i+1;o<t.length;o++){var a=t[o];e==JSON.stringify(a.attrOpts)&&(r.productNum=r.productNum+a.productNum,t.splice(o,1),o-=1)}return t}function d(i){var r=[];if(1==i){for(var e={userId:o.util.getUserId(),productId:D.productId,productColorId:D.productColorId,productNum:Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val()),attrOpts:[]},a=0;a<L.color_data[0].dyn_attrs.length;a++){var n={},l=L.color_data[0].dyn_attrs[a];"2"==l.attrID?(n.attrType=l.attrID,n.attrOptId=t("#"+l.attr_name+"_list").val()):(n.attrType=l.attrID,n.attrOptId=l.input_cmp.optId,"3"==l.attrID?n.custominfo=t("#print_number_input").val():"4"==l.attrID&&(n.custominfo=t("#print_name_input").val())),e.attrOpts.push(n)}r.push(JSON.parse(JSON.stringify(e)))}else if(2==i){var e={userId:o.util.getUserId(),productId:D.productId,productColorId:D.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:"",custominfo:""}]};if(U&&U.length>0)for(var a=0;a<U.length;a++)for(var s=U[a],c=0;c<s.customs.length;c++){for(var n=[{attrType:s.attrType,attrOptId:s.optId}],d=s.customs[c].attrs,p=0;p<d.length;p++){var m=d[p],_=t("#print_input_"+s.optId+"_"+m.attrID+"_"+m.position).val();n.push({attrType:m.attrID,attrOptId:m.input_cmp.optId,custominfo:_})}e.attrOpts=n,r.push(JSON.parse(JSON.stringify(e)))}}return console.log(r),u(r)}function p(){x&&x.length>0&&(t("#size_list").html(t("#customSizeItem").tmpl(x)),t("#size_list select option[value=11]").html(t.i18n.map.MoreNumber),y(!1),t("#size_list select").change(function(){console.log("#size_list select value = "+t(this).val()),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):y(!0)}),t("#size_list input").blur(function(){var i=t(this).val();if(i<=10){var r=t(this).parent().find("select")[0].id;t("#"+r.substring(r.indexOf("_")+1)+" option[value="+i+"]").prop("selected","selected")}else{var r=t(this).parent().find("select")[0].id,e="#"+r.substring(r.indexOf("_")+1);t(e).hide(),t(e).parent().find("input").show(),t(e).parent().find("input").val(i)}y(!0)})),a()}function m(){p(),t("#custom_wrap_mask").removeClass("hide"),t("body").css("overflow","hidden")}function _(i){for(var r=[],e=0;e<x.length;e++){var o=x[e];if(i||!o.number){var a=t("#custom_"+o.optId+"_number_list").val();o.number=a}else{var a=t("#custom_"+o.optId+"_number_list").val();Number(o.number)>Number(a)&&(a=o.number)}if(Number(a)<=10?t("#custom_"+o.optId+"_number_list option[value="+a+"]").prop("selected","selected"):(t("#custom_"+o.optId+"_number_list").hide(),t("#custom_"+o.optId+"_number_list").parent().find("input").show(),t("#custom_"+o.optId+"_number_list").parent().find("input").val(a)),o.customs=[],a>0){for(var n=0;n<a;n++){for(var l=0;l<z.length;l++){z[l].position=n;var s=t("#print_input_"+o.optId+"_"+z[l].attrID+"_"+z[l].position).val();z[l].custominfo=s}o.customs.push(JSON.parse(JSON.stringify({attrs:z})))}r.push(o)}}return r}function h(){t("#custom_wrap_mask").addClass("hide"),t("body").css("overflow","auto")}function g(i){t("#small_image_list").length>0&&t("#small_image_list").html(t("#productSmallImage").tmpl(i)),t("#small_image_list li:first").attr("id","onlickImg"),t("#vertical img:first").attr("src",i[0].big_img),-1==P.indexOf(i[0].big_img)&&t("#imageLoading").removeClass("hide"),f()}function f(){var i=null;t(document).ready(function(){t("#imageMenu li img").bind("click",function(){"onlickImg"!=t(this).attr("id")&&(t("#midimg").attr("src",t(this).data().data),-1==P.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"),t("#imageMenu li").removeAttr("id"),t(this).parent().attr("id","onlickImg"))}).bind("mouseover",function(){"onlickImg"!=t(this).attr("id")&&(window.clearTimeout(i),t("#midimg").attr("src",t(this).data().data),-1==P.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"))}).bind("mouseout",function(){"onlickImg"!=t(this).attr("id")&&(t("#midimg").attr("src",t(this).data().data),-1==P.indexOf(t(this).data().data)&&t("#imageLoading").removeClass("hide"),t(this).removeAttr("style"),i=window.setTimeout(function(){t("#midimg").attr("src",t("#onlickImg img").data().data),-1==P.indexOf(t("#onlickImg img").data().data)&&t("#imageLoading").removeClass("hide")},1e3))})})}function v(i){1==i.length?D.productColorId=i[0].color_id:(t("#color_data_wrap").removeClass("hide"),t("#color_list").html(t("#colorItem").tmpl(i)),t(t("#color_list li")[J]).find("span").css("display","block"),t(t("#color_list li")[J]).find("img").addClass("selected-image-border"),t("#color_desc").html(i[J].color_des),D.productColorId=i[J].color_id,t("#color_list li").bind("click",function(){if("none"==t(this).find("span").css("display")){t("#color_list li").find("span").css("display","none"),t("#color_list li").find("img").removeClass("selected-image-border"),t(this).find("span").css("display","block"),t(this).find("img").addClass("selected-image-border");var r=t(this).data().data;t("#color_desc").html(i[r].color_des),t("#name").html(i[r].pcName),t("#product_ext_name").html(i[r].pcNameExt),t("#current_price").html(i[r].current_price),t("#original_price").html(i[r].original_price),t("#price_off").html(i[r].disCount+"%"),D.productColorId=i[r].color_id,g(i[r].img_groups),I(i[r].dyn_attrs)}}))}function I(i,r){M=!1,z=[],x=[],t("#customBtn").addClass("hide"),t("#attr_name_hint").html(t.i18n.map.PrintNameHint),t("#attr_number_hint").html(t.i18n.map.PrintNumberHint);for(var e=o.util.getCurrencySymbol(o.util.getLocalCurrency()),a=0;a<i.length;a++){var n=i[a];if(n.domain_list&&n.domain_list.length>0&&(t("#"+n.attr_name+"_content").html(n.domain_list[0]),n.selectedAttr=n.domain_list[0].optId,"2"==n.attrID))for(var l=0;l<n.domain_list.length;l++){var s=n.domain_list[l];s.attrType=n.attrID,x.push(s)}n.input_cmp&&(z.push(n),M=!0,t("#customBtn").removeClass("hide")),"3"==n.attrID&&(t("#print_number_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e)),t("#detail_print_number_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e))),"4"==n.attrID&&(t("#print_name_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e)),t("#detail_print_name_price").html("+"+o.util.formatProductPrice(n.input_cmp.price,e)))}t("#dyn_attrs_list").html(t("#dynAttrsItem").tmpl(i)),t("#dyn_attrs_list option[value=11]").html(t.i18n.map.MoreNumber),t("#size_guide").html(t.i18n.map.SizeGuide),M?t("#print_number_input")[0]||(t("#custom_wrap").show(),t("#custom_type_list").val(0),t("#custom_attrs_list").hide(),t("#custom_attrs_list").html(t("#customAttrsItem").tmpl(z))):t("#custom_wrap").hide(),t("#dyn_attrs_list select").change(function(){console.log("#dyn_attrs_list select value = "+t(this).val()),"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#dyn_attrs_list input").blur(function(){var i=t(this).val();if(i<=10){var r=t(this).parent().find("select")[0].id;t("#custom_"+r+" option[value="+i+"]").prop("selected","selected")}else{var r=t(this).parent().find("select")[0].id,e="#"+r;t(e).hide(),t(e).parent().find("input").show(),t(e).parent().find("input").val(i)}}),t("#size_guide").click(function(){t("#size_guide_mask").removeClass("hide"),t("body").css("overflow","hidden")}),t("#size_guide_mask #close_size_guide_btn").click(function(){t("#size_guide_mask").addClass("hide")})}function y(i){U=_(i),t("#custome_attr_list").html(""),t("#custome_attr_list").html(t("#customAttrItem").tmpl(U))}function b(){o.dao.productDetail({productId:w,currencyId:o.util.getLocalCurrency()},function(i){if(i.product_id){L=i;var r=i;D.productId=L.product_id;for(var e=o.util.getCurrencySymbol(o.util.getLocalCurrency()),a=0;a<r.color_data.length;a++){var n=r.color_data[a];n.original_price=o.util.formatProductPrice(n.original_price,e),n.current_price=o.util.formatProductPrice(n.current_price,e),n.img_display=o.util.picUrl+n.img_display,n.color_img=o.util.picUrl+n.color_img,n.width=200,n.height=200;for(var l=0;l<n.img_groups.length;l++){var s=n.img_groups[l];s.small_img=o.util.picUrl+s.small_img,s.big_img=o.util.picUrl+s.big_img}}var c="en";localStorage.selectedLanguage&&(c=JSON.parse(localStorage.selectedLanguage).langCode),r.product_des&&"en"==c?t(".description").html(r.product_des):t(".description").parent().parent().hide(),document.title=r.product_name;for(var a=0;a<r.color_data.length;a++)if(T==r.color_data[a].color_id){J=a;break}if(t("#name").html(r.color_data[J].pcName),t("#product_ext_name").html(r.color_data[J].pcNameExt),t("#current_price").html(r.color_data[J].current_price),t("#original_price").html(r.color_data[J].original_price),t("#price_off").html(r.color_data[J].disCount+"%"),"0"==r.color_data[J].isFreeShipping)if(r.advtxts&&r.advtxts.length>0){for(var u="",a=0;a<r.advtxts.length;a++)u=u+r.advtxts[a]+"<br>";t("#shipping_info").html(u),t("#shipping_info").parent().parent().show()}else t("#shipping_info").parent().parent().hide();else"1"==r.color_data[J].isFreeShipping?t("#shipping_info").html(t.i18n.map.FreeshippingHint):t("#shipping_info").parent().parent().hide();t("#price_wrap").css("display","block"),T||(T=r.color_data[J].color_id),v(r.color_data),I(r.color_data[J].dyn_attrs),g(r.color_data[J].img_groups),O(r.product_type),o.util.menu=[],o.util.getClassifyNames(r.product_type,function(){C()}),N(),t("#print_wrap").show()}})}function C(){if(o.util.menu&&o.util.menu.length>0){var i=o.util.getAdvSource().u;i||(i=o.util.getQueryString("u"));var r="";i&&(r="?u="+i);var e=o.util.menu.reverse();e.push({menu_name:document.title});for(var a="<li><a id='breadcrumb_home' href='/'>"+t.i18n.map.Home+"</a></li>",n=0;n<e.length;n++)if(n==e.length-1)a=a+"<li class='active'>"+e[n].menu_name+"</li>",t("#product_classify_name").html(e[n].menu_name);else{var l=e[n].menu_name+"-l-"+o.util.encodeMenuType(e[n].menu_type)+"-"+o.util.encodeMenuType(o.util.getUvid())+".html"+r;a=a+"<li><a href='"+l+"'>"+e[n].menu_name+"</a></li>"}t(".breadcrumb").html(a)}}function N(){var t=sessionStorage.currentBrowseList;t=t?JSON.parse(t):[];for(var i=0;i<t.length;i++){var r=t[i];if(r.productId===w&&r.productColorId===T){t.splice(i,1);break}}var e={productId:w,productColorId:T};t.push(e),t.length>10&&(t=t.splice(1,t.length-1)),sessionStorage.setItem("currentBrowseList",JSON.stringify(t))}function O(i){o.dao.productsRel({menuType:i,productId:w,productColorId:D.productColorId},function(i){var r=o.util.getAdvSource().u;r||(r=o.util.getQueryString("u"));var e="";r&&(e="?u="+r);for(var a=o.util.encodeMenuType(o.util.getUvid()),n=0;n<i.length;n++){var l=i[n];l.imgDisplay=o.util.picUrl+l.imgDisplay;var s=o.util.formatProductName(l.prdName)+"-d-"+o.util.encodeMenuType(l.productId)+"-"+o.util.encodeMenuType(l.productColorId)+"-"+a+".html"+e;l.detailUrl=s}t("#peripheral_products_list").html(t("#peripheralProductListTempl").tmpl(i))})}console.log("detail.js");var k=window.location.href,S=o.util.getDetailParams(k),w=o.util.decodeMenuType(S[S.length-3]),T=o.util.decodeMenuType(S[S.length-2]),J=0,L={},D={productId:"",productColorId:""},P=[],x=[],U=[],z=[],M=!1;o.setCurrencyCodeCallback(function(){b()}),o.setLanguageCallback(function(){t("#breadcrumb_home").text(t.i18n.map.Home)}),o.initLoginStatus(),function(){t("#addCartBtn").unbind("click").click(function(){console.log("addCartBtn"),l(1)}),t("#customBtn").click(function(){m()}),t("#midimg").load(function(i){console.log("big image loading"),t("#imageLoading").addClass("hide"),P.push(i.currentTarget.currentSrc)}),t("#coupon_btn").click(function(){o.util.checkIsLogin()?window.location.href="../../../my_account.html?id=4&uvid="+o.util.getUvid():k.href="../../../login.html?uvid="+o.util.getUvid()}),t("#qty_list").change(function(){"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#custom_type_list").change(function(){"0"==t(this).val()?(t("#custom_attrs_list").css("display","none"),t("#detail_custom_hint").css("display","none"),t("#print_number_input").val(""),t("#print_name_input").val("")):"1"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","none"),t("#print_number_input").val(""),t("#custom_item_4").css("display","block")):"2"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","none"),t("#print_name_input").val("")):"3"==t(this).val()&&(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","block"))}),a()}()});