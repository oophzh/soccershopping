"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","star","wall","front"],function(t,e,i,a,r,o,n,l){function s(){t("#play_btn").removeClass("hide"),t("#play_btn").click(function(){if(it){t("#iframe_loading").removeClass("hide"),t("#video").addClass("hide"),t("#video").attr("src",it);document.getElementById("video").onload=function(){t("#iframe_loading").addClass("hide"),t("#video").removeClass("hide")}}t("#video_mask").removeClass("hide"),t("#video_mask #close_video_btn").click(function(){t("#video").attr("src",""),t("#video_mask").addClass("hide")})})}function d(){t("#custom_confirm_btn").unbind("click").click(function(){u(2)}),t("#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn").unbind("click").click(function(){y()})}function c(e){var i=[];if(1==e){var a=Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val());if(a<=0)return void alert(t.i18n.map.QuantityIsNull);for(var o={userId:r.util.getUserId(),productName:X.productName,productImage:X.productImage,productId:X.productId,productColorId:X.productColorId,productNum:a,attrOpts:[],attrString:""},n=null,l=0;l<K.color_data[0].dyn_attrs.length;l++){var s={},d=K.color_data[0].dyn_attrs[l];n=null==n?d.attr_name+": "+t("#"+T(d.attr_name)+"_list").find("option:selected").text():n+","+d.attr_name+": "+t("#"+T(d.attr_name)+"_list").find("option:selected").text(),s.attrType=d.attrID,s.attrOptId=t("#"+T(d.attr_name)+"_list").val(),o.attrOpts.push(s)}o.attrString=n,i.push(JSON.parse(JSON.stringify(o)))}else if(2==e)for(var o={userId:r.util.getUserId(),productId:X.productId,productColorId:X.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:""}]},l=0;l<Z.length;l++){var c=Z[l],u=t("#"+c.optId+"_number_list").val();console.log(u),"11"==u&&((u=t("#"+c.optId+"_number_list").parent().find("input").val())||(u=0)),u>0&&(o.productNum=u,o.attrOpts=[{attrType:c.attrType,attrOptId:c.optId}],i.push(JSON.parse(JSON.stringify(o))))}return i}function u(e){var i=null;if(null==(i=et?g(e):c(e))||0==i.length)return void y();t("#product_name").html(i[0].productName),t("#product_attr").html(i[0].attrString),t("#product_image").attr("src",i[0].productImage),r.util.checkIsLogin()?m(i):p(i)}function m(e){r.dao.merge2cart({inputParams:JSON.stringify(e)},function(){x();var i=Number(t("#cart_product_number").text());t("#cart_product_number").text(i+e.length),t("#mb_cart_product_number").text(i+e.length),y()},function(t){y(),alert(t.msg)})}function p(e){var i=localStorage.productList;if(i=i?JSON.parse(i):[],0==i.length)i=e;else for(var a=0;a<e.length;a++){for(var r=e[a],o=!1,n=JSON.stringify(r.attrOpts),l=0;l<i.length;l++){var s=i[l];r.productId==s.productId&&r.productColorId==s.productColorId&&n==JSON.stringify(s.attrOpts)&&(s.productNum=s.productNum+r.productNum,o=!0)}o||i.push(r)}localStorage.productList=JSON.stringify(i);for(var d=0,l=0;l<i.length;l++)d=parseInt(d)+parseInt(i[l].productNum);t("#cart_product_number").html(d),t("#cart_product_number").show(),t("#mb_cart_product_number").html(d),t("#mb_cart_product_number").show(),x(),y()}function _(t){for(var e=0;e<t.length;e++)for(var i=t[e],a=JSON.stringify(i.attrOpts),r=e+1;r<t.length;r++){var o=t[r];a==JSON.stringify(o.attrOpts)&&(i.productNum=i.productNum+o.productNum,t.splice(r,1),r-=1)}return t}function g(e){var i=[];if(1==e){var a=Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val());if(a<=0)return void alert(t.i18n.map.QuantityIsNull);for(var o={userId:r.util.getUserId(),productId:X.productId,productName:X.productName,productImage:X.productImage,productColorId:X.productColorId,productNum:a,attrOpts:[],attrString:""},n=null,l=0;l<K.color_data[0].dyn_attrs.length;l++){var s={},d=K.color_data[0].dyn_attrs[l];"2"==d.attrID?(s.attrType=d.attrID,s.attrOptId=t("#"+d.attr_name_id+"_list").val(),n=null==n?d.attr_name+": "+t("#"+d.attr_name_id+"_list").find("option:selected").text():n+","+d.attr_name+": "+t("#"+d.attr_name_id+"_list").find("option:selected").text()):(s.attrType=d.attrID,s.attrOptId=d.input_cmp.optId,"3"==d.attrID?(s.custominfo=t("#print_number_input").val(),s.custominfo&&(n=null==n?d.attr_name+": "+s.custominfo:n+","+d.attr_name+": "+s.custominfo)):"4"==d.attrID?(s.custominfo=t("#print_name_input").val(),s.custominfo&&(n=null==n?d.attr_name+": "+s.custominfo:n+","+d.attr_name+": "+s.custominfo)):n=null==n?d.attr_name+": "+t("#"+d.attr_name_id+"_list").find("option:selected").text():n+","+d.attr_name+": "+t("#"+d.attr_name_id+"_list").find("option:selected").text()),o.attrOpts.push(s)}o.attrString=n,i.push(JSON.parse(JSON.stringify(o)))}else if(2==e){var o={userId:r.util.getUserId(),productId:X.productId,productColorId:X.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:"",custominfo:""}]};if($&&$.length>0)for(var l=0;l<$.length;l++)for(var c=$[l],u=0;u<c.customs.length;u++){for(var s=[{attrType:c.attrType,attrOptId:c.optId}],m=c.customs[u].attrs,p=0;p<m.length;p++){var g=m[p],h=t("#print_input_"+c.optId+"_"+g.attrID+"_"+g.position).val();s.push({attrType:g.attrID,attrOptId:g.input_cmp.optId,custominfo:h})}o.attrOpts=s,i.push(JSON.parse(JSON.stringify(o)))}}return _(i)}function h(){Z&&Z.length>0&&(t("#size_list").html(t("#customSizeItem").tmpl(Z)),t("#size_list select option[value=11]").html(t.i18n.map.MoreNumber),w(!1),t("#size_list select").change(function(){console.log("#size_list select value = "+t(this).val()),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):w(!0)}),t("#size_list input").blur(function(){console.log("#size_list input");var e=t(this).val();if(console.log("#size_list input number = "+e),e&&e<=10){var i=t(this).parent().find("select")[0].id;t("#"+i.substring(i.indexOf("_")+1)+" option[value="+e+"]").prop("selected","selected")}else if(e&&e>10){var i=t(this).parent().find("select")[0].id,a="#"+i.substring(i.indexOf("_")+1);t(a).hide(),t(a).parent().find("input").show(),t(a).parent().find("input").val(e)}w(!0)})),d()}function f(){h(),t("#custom_wrap_mask").removeClass("hide"),t("body").css("overflow","hidden")}function v(e){for(var i=[],a=0;a<Z.length;a++){var r=Z[a],o=t("#custom_"+r.optId+"_number_list").val();if(Number(o)>10&&(o=t("#"+r.optId+"_number_input").val()),e||!r.number?r.number=o:Number(r.number)>Number(o)&&(o=r.number),Number(o)<=10?t("#custom_"+r.optId+"_number_list option[value="+o+"]").prop("selected","selected"):(t("#custom_"+r.optId+"_number_list").hide(),t("#custom_"+r.optId+"_number_list").parent().find("input").show(),t("#custom_"+r.optId+"_number_list").parent().find("input").val(o)),r.customs=[],o>0){for(var n=0;n<o;n++){for(var l=0;l<tt.length;l++){tt[l].position=n;var s=t("#print_input_"+r.optId+"_"+tt[l].attrID+"_"+tt[l].position).val();tt[l].custominfo=s}r.customs.push(JSON.parse(JSON.stringify({attrs:tt})))}i.push(r)}}return i}function y(){t("#custom_wrap_mask").addClass("hide"),t("body").css("overflow","auto")}function b(e){console.log("initProductImage midimg setImage"),t("#vertical img:first").attr("src",e[0].big_img),-1==Y.indexOf(e[0].big_img)&&t("#imageLoading").removeClass("hide"),t("#product_image_wrap").html(t("#productImageTempl").tmpl(e)),t("#product_image_wrap img.lazy").lazyload({effect:"fadeIn"}),rt?t("#product_image_wrap").viewer("update"):rt=t("#product_image_wrap").viewer({url:"data-original",toolbar:{zoomIn:!1,zoomOut:!1,oneToOne:!1,reset:!1,prev:{show:!0,size:"large"},play:!1,next:{show:!0,size:"large"},rotateLeft:!1,rotateRight:!1,flipHorizontal:!1,flipVertical:!1},navbar:!1,movable:!0,title:!1,transition:!1,button:!1}),"1"==sessionStorage.detail_image_style&&(t(".panel .panel-body .product-image-wrap .product-image").css("width","100%"),t(".panel .panel-body .product-image-wrap .product-image").css("text-align","center"))}function C(e){1==e.length?(X.productColorId=e[0].color_id,X.productName=e[0].pcName,X.productImage=e[0].img_groups[0].small_img,U(e[0].isattention)):(t("#color_data_wrap").removeClass("hide"),t("#color_list").html(t("#colorItem").tmpl(e)),t(t("#color_list li")[G]).find("span").css("display","block"),t(t("#color_list li")[G]).find("img").addClass("selected-image-border"),t("#color_desc").html(e[G].color_des),X.productColorId=e[G].color_id,X.productName=e[G].pcName,X.productImage=e[G].img_groups[0].small_img,U(e[G].isattention),t("#color_list li").bind("click",function(){if("none"==t(this).find("span").css("display")){t("#color_list li").find("span").css("display","none"),t("#color_list li").find("img").removeClass("selected-image-border"),t(this).find("span").css("display","block"),t(this).find("img").addClass("selected-image-border");var i=t(this).data().data;t("#color_desc").html(e[i].color_des),t("#name").html(e[i].pcName),t("#product_ext_name").html(e[i].pcNameExt),t("#current_price").html(e[i].current_price),t("#original_price").html(e[i].original_price),e[i].disCount&&"-0"!=e[i].disCount?t("#price_off").html(Math.abs(Number(e[i].disCount))+"% OFF"):t("#price_off").hide(),X.productColorId=e[i].color_id,X.productName=e[i].pcName,X.productImage=e[i].img_groups[0].small_img,U(e[i].isattention),it=e[i].videos&&e[i].videos.length>0?e[i].videos[0].path:null,b(e[i].img_groups),I(e[i].dyn_attrs)}}))}function I(e,i){et=!1,tt=[],Z=[],t("#customBtn").addClass("hide"),t("#attr_name_hint").html(t.i18n.map.PrintNameHint),t("#attr_number_hint").html(t.i18n.map.PrintNumberHint);for(var a=r.util.getCurrencySymbol(r.util.getLocalCurrency()),o=0;o<e.length;o++){var n=e[o];if(n.domain_list&&n.domain_list.length>0&&(t("#"+n.attr_name+"_content").html(n.domain_list[0]),n.selectedAttr=n.domain_list[0].optId,n.attr_name_id=T(n.attr_name),"2"==n.attrID))for(var l=0;l<n.domain_list.length;l++){var s=n.domain_list[l];s.attrType=n.attrID,Z.push(s)}n.input_cmp&&(tt.push(n),et=!0,t("#customBtn").removeClass("hide")),"3"==n.attrID&&(t("#print_number_price").html("+"+r.util.formatProductPrice(n.input_cmp.price,a)),t("#detail_print_number_price").html("+"+r.util.formatProductPrice(n.input_cmp.price,a))),"4"==n.attrID&&(t("#print_name_price").html("+"+r.util.formatProductPrice(n.input_cmp.price,a)),t("#detail_print_name_price").html("+"+r.util.formatProductPrice(n.input_cmp.price,a)))}t("#dyn_attrs_list").html(t("#dynAttrsItem").tmpl(e)),t("#size_guide").html(t.i18n.map.SizeGuide);var d="";sessionStorage.advDomainUrl&&"undefined"!=sessionStorage.advDomainUrl?d=sessionStorage.advDomainUrl:(d=host+"/"+r.util.getDomainName(),r.isLocalTest&&(d="https://cdn.jsdelivr.net/gh/oophzh/soccershopping/joyerialove.shop")),t("#size_guide_image").attr("src",d+"/size-guide-img.jpg"),et?t("#print_number_input")[0]||(t("#custom_wrap").removeClass("hide"),t("#custom_type_list").val(0),t("#custom_attrs_list").hide(),t("#custom_attrs_list").html(t("#customAttrsItem").tmpl(tt))):t("#custom_wrap").addClass("hide"),t("#dyn_attrs_list select").change(function(){console.log("#dyn_attrs_list select value = "+t(this).val()),"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#dyn_attrs_list input").blur(function(){var e=t(this).val();if(e<=10){var i=t(this).parent().find("select")[0].id;t("#custom_"+i+" option[value="+e+"]").prop("selected","selected")}else{var i=t(this).parent().find("select")[0].id,a="#"+i;t(a).hide(),t(a).parent().find("input").show(),t(a).parent().find("input").val(e)}}),t("#size_guide").click(function(){t("#size_guide_mask").removeClass("hide"),t("body").css("overflow","hidden")}),t("#size_guide_mask #close_size_guide_btn").click(function(){t("#size_guide_mask").addClass("hide"),t("body").css("overflow","auto")})}function w(e){$=v(e),t("#custome_attr_list").html(""),t("#custome_attr_list").html(t("#customAttrItem").tmpl($))}function k(){r.dao.productDetail({productId:W,currencyId:r.util.getLocalCurrency(),userId:r.util.getUserId()},function(e){if(e.product_id){K=e;var i=e;X.productId=K.product_id;for(var a=r.util.getCurrencySymbol(r.util.getLocalCurrency()),o=0;o<i.color_data.length;o++){var n=i.color_data[o];n.original_price=r.util.formatProductPrice(n.original_price,a),n.current_price=r.util.formatProductPrice(n.current_price,a),n.img_display=r.util.picUrl+n.img_display,n.color_img=r.util.picUrl+n.color_img,n.width=200,n.height=200;for(var l=0;l<n.img_groups.length;l++){var s=n.img_groups[l];s.small_img=r.util.picUrl+s.small_img,s.big_img=r.util.picUrl+s.big_img}}i.product_des?t(".description").html(i.product_des):(t("#product_image_wrap").css("border-top","none"),t("#product_image_wrap").css("margin-top","0"),t("#product_image_wrap").css("padding-top","0")),document.title=i.product_name;for(var o=0;o<i.color_data.length;o++)if(V==i.color_data[o].color_id){G=o;break}if(i.new_wf&&"1"==i.new_wf?t("#new_label").show():t("#new_label").hide(),it=i.color_data[G].videos&&i.color_data[G].videos.length>0?i.color_data[G].videos[0].path:null,b(i.color_data[G].img_groups),t("#name").html(i.color_data[G].pcName),t("#product_ext_name").html(i.color_data[G].pcNameExt),t("#current_price").html(i.color_data[G].current_price),t("#original_price").html(i.color_data[G].original_price),i.color_data[G].disCount&&"-0"!=i.color_data[G].disCount?t("#price_off").html(Math.abs(Number(i.color_data[G].disCount))+"% OFF"):t("#price_off").hide(),"0"==i.color_data[G].isFreeShipping)if(i.advtxts&&i.advtxts.length>0){for(var d="",o=0;o<i.advtxts.length;o++)d=d+i.advtxts[o]+"<br>";t("#shipping_info").html(d),t("#shipping_info").parent().parent().show()}else t("#shipping_info").parent().parent().hide();else"1"==i.color_data[G].isFreeShipping?t("#shipping_info").html(t.i18n.map.FreeshippingHint):t("#shipping_info").parent().parent().hide();sessionStorage.s_fm_bg&&t("#shipping_info").css("background",sessionStorage.s_fm_bg),sessionStorage.s_fm_fc&&t("#shipping_info").css("color",sessionStorage.s_fm_fc),t("#price_wrap").css("display","block"),V||(V=i.color_data[G].color_id),C(i.color_data),I(i.color_data[G].dyn_attrs),t(".product-info-wrap").removeClass("hide"),t(".product-placeholder-wrap").addClass("hide"),r.util.menu=[],r.util.getClassifyNames(i.product_type,function(){S(),M()}),P(),t("#print_wrap").show()}})}function S(){if(r.util.menu&&r.util.menu.length>0){var e=r.util.getAdvSource().u;e||(e=r.util.getQueryString("u"));var i="";e&&(i="?u="+e);var a=JSON.parse(JSON.stringify(r.util.menu.reverse()));a.push({menu_name:document.title});for(var o="<li><a id='breadcrumb_home' href='/'>"+t.i18n.map.Home+"</a></li>",n=0;n<a.length;n++)if(n!==a.length-1){var l=r.util.formatProductName(a[n].menu_name)+"-l-"+r.util.encodeMenuType(a[n].menu_type)+"-"+r.util.encodeMenuType(r.util.getUvid())+".html"+i;"1"==a[n].supportgp&&(l=r.util.formatProductName(a[n].menu_name)+"-g-"+r.util.encodeMenuType(a[n].menu_type)+"-"+r.util.encodeMenuType(r.util.getUvid())+".html"+i),o=o+"<li><a href='"+l+"'>"+a[n].menu_name+"</a></li>"}t(".breadcrumb").html(o)}}function P(){var t=localStorage.currentBrowseList;t=t?JSON.parse(t):[];for(var e=0;e<t.length;e++){var i=t[e];if(i.productId===W&&i.productColorId===V){t.splice(e,1);break}}var a={productId:W,productColorId:V};t.push(a),t.length>30&&(t=t.splice(1,t.length-1)),localStorage.setItem("currentBrowseList",JSON.stringify(t))}function N(){t("#waitting_icon").removeClass("hide"),t("#success_icon").addClass("hide"),t("#success_text").addClass("hide"),t("#add_to_cart_success_mask").removeClass("hide"),t("body").css("overflow","hidden")}function x(){t("#waitting_icon").addClass("hide"),t("#success_icon").removeClass("hide"),t("#success_text").removeClass("hide")}function z(){t("#add_to_cart_success_mask").addClass("hide"),t("body").css("overflow","auto")}function T(t){return t?t=t.replace(new RegExp(" ","gm"),"_"):t}function L(){r.dao.getCommentsByPrd({currentPage:at.curPage,productId:W,userId:r.util.getUserId()},function(e){if(!e)return t("#comment_list_wrap").addClass("hide"),void t("#product_star").addClass("hide");if(e.avgEval&&(t("#product_star_input").rating({step:.1,size:"xs",showClear:!1,min:0,max:5,disabled:!0,showCaption:!1}).rating("showStars",e.avgEval),t("#product_star_text").html(e.avgEval),t("#product_star").removeClass("hide")),e.page&&(at.amount=e.page.amount,at.pageSize=e.page.pageSize),e&&e.comments.length>0){for(var i=e.comments,a=0;a<i.length;a++){var o=i[a];o.crtime=r.util.formatOrderDateTime(o.crtime),o.usrico&&(o.usrImage=r.util.userIconUrl+o.usrico,o.usrErrorImage='javascript:this.src="resources/img/user/'+o.usrico+'";');for(var n=0;n<o.zps.length;n++){var l=o.zps[n];l.crtime=r.util.formatOrderDateTime(l.crtime);for(var s=0;s<l.shareimgs.length;s++)l.shareimgs[s]=r.util.commentPicUrl+l.shareimgs[s]}for(var n=0;n<o.shareimgs.length;n++)o.shareimgs[n]=r.util.commentPicUrl+o.shareimgs[n]}t("#comment_list").html(t("#commentItemTempl").tmpl(i)),t("#comment_list #color_title").html(t.i18n.map.ColorTitle),t("#comment_list .reply-text").html(t.i18n.map.DetailCommentReply),t("#comment_list img.lazy").lazyload({effect:"fadeIn"}),t(".empty-data").addClass("hide"),t("#comment_list .comment-item-wrap input").each(function(){t(this).rating({step:1,size:"xs",showClear:!1,min:0,max:5,disabled:!0,showCaption:!1}).rating("showStars",t(this).data().data)}),t("#comment_list .image-wrap img").each(function(){t(this).click(function(){t(this).parent().find("img").removeClass("selected"),t(this).addClass("selected"),O(t(this).parent())})}),t("#comment_list .top-wrap").each(function(){t(this).click(function(){var e=t(this).data().data;if(e){t("#iframe_loading").removeClass("hide"),t("#video").addClass("hide"),t("#video").attr("src",e);document.getElementById("video").onload=function(){t("#iframe_loading").addClass("hide"),t("#video").removeClass("hide")}}t("#video_mask").removeClass("hide"),t("#video_mask #close_video_btn").click(function(){t("#video").attr("src",""),t("#video_mask").addClass("hide")})})})}else t(".empty-data").removeClass("hide")})}function O(t){lt=t.viewer({url:"data-original",toolbar:{zoomIn:!1,zoomOut:!1,oneToOne:!1,reset:!1,prev:{show:!0,size:"large"},play:!1,next:{show:!0,size:"large"},rotateLeft:!1,rotateRight:!1,flipHorizontal:!1,flipVertical:!1},navbar:!1,movable:!0,title:!1,transition:!1,button:!1,hide:function(){t.find("img").removeClass("selected")}})}function U(e){r.util.checkIsLogin()&&("1"==e?(t("#add_fav").addClass("selected"),t("#add_fav").removeClass("icon-heart "),t("#add_fav").addClass("icon-aixin")):t("#add_fav").removeClass("selected")),t("#add_fav").removeClass("hide"),t("#btn_wrap").removeClass("hide"),t("#addFavBtn").unbind("click").click(function(){r.util.checkIsLogin()?r.dao.attentionProduct({userId:r.util.getUserId(),productId:X.productId,colorId:X.productColorId,type:t("#add_fav").hasClass("selected")?"2":"1"},function(){t("#add_fav").hasClass("selected")?(t("#add_fav").removeClass("selected"),t("#add_fav").removeClass("icon-aixin"),t("#add_fav").addClass("icon-heart ")):(t("#add_fav").removeClass("icon-heart"),t("#add_fav").addClass("selected"),t("#add_fav").addClass("icon-aixin"))}):window.location.href="../../../login.html?uvid="+r.util.getUvid()})}function D(){r.dao.listImgWall({currentPage:ot.curPage,terminal:r.util.isMobile()?"2":"1",currencyId:r.util.getLocalCurrency(),prdId:W},function(e){if(e.page){if(1==ot.curPage){ot.amount=e.page.amount,ot.pageSize=e.page.pageSize;var i=0;i=ot.amount%ot.pageSize==0?parseInt(ot.amount/ot.pageSize):parseInt(ot.amount/ot.pageSize)+1,ot.totalPage=i}}else ot.totalPage=0,ot.amount=0;0==ot.amount?t("#pic_wall_list_wrap").addClass("hide"):(t("#pic_wall_list_wrap").removeClass("hide"),1==ot.curPage&&(n.init(document.getElementById("cells"),document.getElementById("picWallTempl").innerHTML),n.setCompleteCallback(function(){t("#cell_loading").addClass("hide"),E(),ot.curPage==ot.totalPage&&t("#more_btn").addClass("hide")})),n.loadingData=!0,n.concatData(B(e.imgs)))})}function B(t){for(var e=0;e<t.length;e++){var i=t[e];i.aiName=r.util.imgWallUrl+i.aiName,i&&i.aiHref?i.aiHref=i.aiHref:i.aiHref="javascript:void(0)";var a=r.util.getCurrencySymbol(r.util.getLocalCurrency());i.curPrice=r.util.formatProductPrice(i.curPrice,a),i.orgPrice=r.util.formatProductPrice(i.orgPrice,a)}return t}function E(){t("#cells img").each(function(){t(this).click(function(){nt?t("#cells").viewer("update"):nt=t("#cells").viewer({url:"data-original",toolbar:{zoomIn:!1,zoomOut:!1,oneToOne:!1,reset:!1,prev:{show:!0,size:"large"},play:!1,next:{show:!0,size:"large"},rotateLeft:!1,rotateRight:!1,flipHorizontal:!1,flipVertical:!1},navbar:!1,movable:!0,title:!1,transition:!1,button:!1,hide:function(){t("#wall_buy_wrap").addClass("hide")},show:function(){t("#wall_buy_wrap").removeClass("hide"),H(n.picData[nt[0].viewer.index].cp)},view:function(e){var i=n.picData[e.detail.index];t("#wall_buy_btn").attr("href",i.aiHref),i.productName?(t("#wall_product_name").html(i.productName),t("#wall_product_price").html(i.curPrice),t("#wall_product_del_price").html(i.orgPrice)):(t("#wall_product_name").html(""),t("#wall_product_price").html(""),t("#wall_product_del_price").html(""))}})})})}function M(){var e=JSON.parse(sessionStorage.menus);if(e=r.util.handleMenu(e)){t("#menu_list_wrap").html(t("#menuListTempl").tmpl(e)),t("#menu_list_wrap a").each(function(){t(this).click(function(){event.stopPropagation();var e=r.util.getAdvSource().u;e||(e=r.util.getQueryString("u"));var i="";e&&(i="?u="+e);var a=r.util.encodeMenuType(r.util.getUvid()),o=t(this).attr("href");if(o&&o.indexOf("-l-")>-1){var n=r.util.getListParams(o),l=n[n.length-2];l=r.util.encodeMenuType(l);var s=o.substring(0,o.indexOf("-l-")),d=r.util.formatProductName(s)+"-l-"+l+"-"+a+".html"+i;t(this).attr("href",d)}else if(o&&o.indexOf("-g-")>-1){var n=r.util.getListParams(o),l=n[n.length-2];l=r.util.encodeMenuType(l);var s=o.substring(0,o.indexOf("-g-")),d=r.util.formatProductName(s)+"-g-"+l+"-"+a+".html"+i;t(this).attr("href",d)}})});for(var i=r.util.menu[r.util.menu.length-1].menu_type,a=t("#menu_list_wrap span"),o=0;o<a.length;o++){a[o].id==i?t(a[o]).addClass("selected"):t(a[o]).removeClass("selected");for(var n=0;n<r.util.menu.length;n++)if(a[o].id==r.util.menu[n].menu_type){"menu_list_wrap"!==t(a[o]).parent().parent().parent()[0].id&&"div"!==t(a[o]).parent().parent().parent()[0].tagName.toLowerCase()&&(t(a[o]).parent().parent().parent().find("ul:first").css("display","block"),t(a[o]).parent().parent().parent().find(".icon-21:first").addClass("icon-jianhao"),t(a[o]).parent().parent().parent().find(".icon-21:first").removeClass("icon-21"));break}}t("#menu_list_wrap #arrow_icon").bind("click",function(){event.stopPropagation(),t(this).find("i").hasClass("icon-21")?(t(this).parent().parent().find("ul:first").slideDown(500),t(this).find("i").removeClass("icon-21"),t(this).find("i").addClass("icon-jianhao")):(t(this).parent().parent().find("ul:first").slideUp(500),t(this).find("i").addClass("icon-21"),t(this).find("i").removeClass("icon-jianhao"))})}}function H(t){var e,i=r.statistic.getPerformanceTiming();e=i?{page:"/imgwall?cp="+t,t_leaving:i.startTime,t_ldpage:i.loadPage,t_enter:i.startTime,uvid:r.util.getUvid(),ctryCode:r.util.getCookie("current_country"),referer:document.referrer}:{page:"/imgwall?cp="+t,t_leaving:(new Date).getTime(),t_ldpage:(new Date).getTime(),t_enter:(new Date).getTime(),uvid:r.util.getUvid(),ctryCode:r.util.getCookie("current_country"),referer:document.referrer},r.dao.statistic(e,function(){})}function J(){r.dao.getallviewofprd({currencyId:r.util.getLocalCurrency(),prdId:W,userId:r.util.getUserId(),terminal:r.util.isMobile()?"2":"1"},function(e){for(var i=0;i<e.length;i++){var a=e[i];"pvr-pl"==a.key?j(a):"pvr-iw"==a.key?R(a):"pvr-xh"==a.key?q(a):"pvr-tl"==a.key||"pvr-dp"==a.key&&F(a)}t("#custom_function_wrap [data-i18n-text]").each(function(){var e=t(this).html(),i=/<(.*)>/;if(i.test(e)){var a=i.exec(e)[0];t(this).html(a+t.i18n.prop(t(this).data("i18n-text")))}else t(this).text(t.i18n.prop(t(this).data("i18n-text")))})})}function j(e){var i=document.createElement("div");if(l.front(document.getElementById("commentTempl").innerHTML,{},i),document.getElementById("custom_function_wrap").appendChild(i),e.avgEval&&(t("#product_star_input").rating({step:.1,size:"xs",showClear:!1,min:0,max:5,disabled:!0,showCaption:!1}).rating("showStars",e.avgEval),t("#product_star_text").html(e.avgEval),t("#product_star").removeClass("hide")),e.page&&(at.amount=e.page.amount,at.pageSize=e.page.pageSize),e&&e.comments.length>0){for(var a=e.comments,o=0;o<a.length;o++){var n=a[o];n.crtime=r.util.formatOrderDateTime(n.crtime),n.usrico&&(n.usrImage=r.util.userIconUrl+n.usrico,n.usrErrorImage='javascript:this.src="resources/img/user/'+n.usrico+'";');for(var s=0;s<n.zps.length;s++){var d=n.zps[s];d.crtime=r.util.formatOrderDateTime(d.crtime);for(var c=0;c<d.shareimgs.length;c++)d.shareimgs[c]=r.util.commentPicUrl+d.shareimgs[c]}for(var s=0;s<n.shareimgs.length;s++)n.shareimgs[s]=r.util.commentPicUrl+n.shareimgs[s]}t("#comment_list").html(t("#commentItemTempl").tmpl(a)),t("#comment_list #color_title").html(t.i18n.map.ColorTitle),t("#comment_list .reply-text").html(t.i18n.map.DetailCommentReply),t("#comment_list img.lazy").lazyload({effect:"fadeIn"}),t(".empty-data").addClass("hide"),t("#comment_list .comment-item-wrap input").each(function(){t(this).rating({step:1,size:"xs",showClear:!1,min:0,max:5,disabled:!0,showCaption:!1}).rating("showStars",t(this).data().data)}),t("#comment_list .image-wrap img").each(function(){t(this).click(function(){t(this).parent().find("img").removeClass("selected"),t(this).addClass("selected"),O(t(this).parent())})}),t("#comment_list .top-wrap").each(function(){t(this).click(function(){var e=t(this).data().data;if(e){t("#iframe_loading").removeClass("hide"),t("#video").addClass("hide"),t("#video").attr("src",e);document.getElementById("video").onload=function(){t("#iframe_loading").addClass("hide"),t("#video").removeClass("hide")}}t("#video_mask").removeClass("hide"),t("#video_mask #close_video_btn").click(function(){t("#video").attr("src",""),t("#video_mask").addClass("hide")})})})}else t(".empty-data").removeClass("hide")}function R(e){var i=document.createElement("div");if(l.front(document.getElementById("picWallWrapTempl").innerHTML,{},i),document.getElementById("custom_function_wrap").appendChild(i),e.page){if(1==ot.curPage){ot.amount=e.page.amount,ot.pageSize=e.page.pageSize;var a=0;a=ot.amount%ot.pageSize==0?parseInt(ot.amount/ot.pageSize):parseInt(ot.amount/ot.pageSize)+1,ot.totalPage=a}}else ot.totalPage=0,ot.amount=0;0==ot.amount?t("#pic_wall_list_wrap").addClass("hide"):(t("#pic_wall_list_wrap").removeClass("hide"),1==ot.curPage&&(n.init(document.getElementById("cells"),document.getElementById("picWallTempl").innerHTML),n.setCompleteCallback(function(){t("#cell_loading").addClass("hide"),E(),ot.curPage==ot.totalPage&&t("#more_btn").addClass("hide")})),n.loadingData=!0,n.concatData(B(e.imgs)))}function q(e){var i=document.createElement("div");l.front(document.getElementById("likeRelatedTempl").innerHTML,{},i),document.getElementById("custom_function_wrap").appendChild(i),1==e.style&&(t("#likeRelatedList").addClass("mhn-slide"),t("#likeRelatedList").addClass("owl-carousel"),t("#likeRelatedList").addClass("owl-theme")),t("#like_related_title").html(e.title);var a=e.data;if(a){var o=r.util.getCurrencySymbol(r.util.getLocalCurrency()),n=r.util.getQueryString("u"),s=r.util.encodeMenuType(r.util.getUvid()),d="";n&&(d="?u="+n);for(var c=0;c<a.length;c++)for(var u=a[c],m=0;m<u.display_data.length;m++){var p=u.display_data[m];p.original_price=r.util.formatProductPrice(p.original_price,o),p.current_price=r.util.formatProductPrice(p.current_price,o),p.img_display=r.util.picUrl+p.img_display,p.color_img=r.util.picUrl+p.color_img,p.height=r.util.getHomeImageHeight(),p.top=Number(r.util.getHomeImageHeight())-70,p.href=r.util.formatProductName(u.product_name)+"-d-"+r.util.encodeMenuType(u.product_id)+"-"+r.util.encodeMenuType(p.color_id)+"-"+s+".html"+d}1==e.style?(t("#likeRelatedList").html(t("#productItemTempl1").tmpl(a)),t("#likeRelatedList").trigger("destroy.owl.carousel"),t("#likeRelatedList").owlCarousel({nav:!0,loop:!1,slideBy:"page",autoPlay:!0,rewind:!1,smartSpeed:70,responsive:{0:{items:1},480:{items:3},600:{items:3},960:{items:3},1200:{items:4},1550:{items:4},1650:{items:4}},navText:['<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="fill: #f1f1f1;"></path></svg>','<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="fill: #f1f1f1;"></path></svg>'],lazyLoad:!0})):2==e.style&&(t("#likeRelatedList").html(t("#productItemTempl2").tmpl(a)),t("#likeRelatedList img.lazy").lazyload({effect:"fadeIn"}))}}function F(e){var i=document.createElement("div");l.front(document.getElementById("daPeiTempl").innerHTML,{},i),document.getElementById("custom_function_wrap").appendChild(i),1==e.style&&(t("#dapeiList").addClass("mhn-slide"),t("#dapeiList").addClass("owl-carousel"),t("#dapeiList").addClass("owl-theme")),t("#dapei_title").html(e.title);var a=e.data;if(a){var o=r.util.getCurrencySymbol(r.util.getLocalCurrency()),n=r.util.getQueryString("u"),s=r.util.encodeMenuType(r.util.getUvid()),d="";n&&(d="?u="+n);for(var c=0;c<a.length;c++)for(var u=a[c],m=0;m<u.display_data.length;m++){var p=u.display_data[m];p.original_price=r.util.formatProductPrice(p.original_price,o),p.current_price=r.util.formatProductPrice(p.current_price,o),p.img_display=r.util.picUrl+p.img_display,p.color_img=r.util.picUrl+p.color_img,p.height=r.util.getHomeImageHeight(),p.top=Number(r.util.getHomeImageHeight())-70,p.href=r.util.formatProductName(u.product_name)+"-d-"+r.util.encodeMenuType(u.product_id)+"-"+r.util.encodeMenuType(p.color_id)+"-"+s+".html"+d}t("#dapeiList").html(t("#productItemTempl1").tmpl(a)),1==e.style?(t("#dapeiList").trigger("destroy.owl.carousel"),t("#dapeiList").owlCarousel({nav:!0,loop:!1,slideBy:"page",autoPlay:!0,rewind:!1,smartSpeed:70,responsive:{0:{items:1},480:{items:3},600:{items:3},960:{items:3},1200:{items:4},1550:{items:4},1650:{items:4}},navText:['<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="fill: #f1f1f1;"></path></svg>','<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="fill: #f1f1f1;"></path></svg>'],lazyLoad:!0})):2==e.style&&(t("#dapeiList").html(t("#productItemTempl2").tmpl(a)),t("#dapeiList img.lazy").lazyload({effect:"fadeIn"}))}}console.log("detail.js");var A=window.location.href,Q=r.util.getDetailParams(A),W=r.util.decodeMenuType(Q[Q.length-3]),V=r.util.decodeMenuType(Q[Q.length-2]),G=0,K={},X={productId:"",productColorId:""},Y=[],Z=[],$=[],tt=[],et=!1,it=null,at={amount:0,curPage:1,pageSize:0},rt=null,ot={amount:0,curPage:1,pageSize:0,totalPage:0},nt=null,lt=null;r.setCurrencyCodeCallback(function(){k(),J()}),r.setLanguageCallback(function(){t("#breadcrumb_home").text(t.i18n.map.Home)}),r.initLoginStatus(),function(){sessionStorage.btn_bg&&(t(".custom-btn").css("background",sessionStorage.btn_bg),t(".add-to-cart-success-mask .add-to-cart-success-wrap #close_add_to_cart_success_btn").css("background",sessionStorage.btn_bg)),sessionStorage.btn_fc&&(t(".custom-btn").css("color",sessionStorage.btn_fc),t(".add-to-cart-success-mask .add-to-cart-success-wrap #close_add_to_cart_success_btn").css("color",sessionStorage.btn_fc)),t("#addCartBtn").unbind("click").click(function(){console.log("addCartBtn"),N(),u(1)}),t("#customBtn").click(function(){f()}),t("#midimg").load(function(e){console.log("big image loading"),t("#imageLoading").addClass("hide"),null!==it&&s(),Y.push(e.currentTarget.currentSrc)}),t("#midimg").error(function(){console.log("big image error"),t("#imageLoading").addClass("hide"),null!==it&&s()}),t("#coupon_btn").click(function(){
r.util.checkIsLogin()?window.location.href="../../../my_account.html?id=4&uvid="+r.util.getUvid():window.location.href="../../../login.html?uvid="+r.util.getUvid()}),document.getElementById("qty_list").value=1,t("#qty_list").change(function(){"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#custom_type_list").change(function(){"0"==t(this).val()?(t("#custom_attrs_list").css("display","none"),t("#detail_custom_hint").css("display","none"),t("#print_number_input").val(""),t("#print_name_input").val("")):"1"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","none"),t("#print_number_input").val(""),t("#custom_item_4").css("display","block")):"2"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","none"),t("#print_name_input").val("")):"3"==t(this).val()&&(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","block"))}),t("#add_to_cart_success_mask #close_add_to_cart_success_btn, #add_to_cart_success_mask #continue_shopping_btn").click(function(){z()}),t("#add_to_cart_success_mask #go_to_cart_btn").click(function(){window.location.href="../../../shopping_cart.html",z()}),d(),t(document).on("click",".detail-bottom-content .panel-heading",function(){var e=t(this).parent().find(".panel-body");e.hasClass("hide")?(e.removeClass("hide"),t(this).find(".panel-heading-arrow").removeClass("icon-jiantou-xia-cuxiantiao"),t(this).find(".panel-heading-arrow").addClass("icon-jiantou-shang-cuxiantiao")):(e.addClass("hide"),t(this).find(".panel-heading-arrow").addClass("icon-jiantou-xia-cuxiantiao"),t(this).find(".panel-heading-arrow").removeClass("icon-jiantou-shang-cuxiantiao"))}),t("#prev_btn").unbind("click").click(function(){at.curPage>1&&(at.curPage=at.curPage-1,L()),t("#page").bootstrapPaginator("showPrevious")}),t("#next_btn").unbind("click").click(function(){var e=0;e=at.amount%at.pageSize==0?parseInt(at.amount/at.pageSize):parseInt(at.amount/at.pageSize)+1,at.curPage<e&&(at.curPage=at.curPage+1,L()),t("#page").bootstrapPaginator("showNext")}),t("#contactUsBtn").unbind("click").click(function(){r.util.getUserId()?window.location.href="../../../my_message.html?index=2&productId="+X.productId+"&productColorId="+X.productColorId:window.location.href="../../../login.html"}),t("#midimg").unbind("click").click(function(e){rt&&t("#product_image_wrap").viewer("view")}),t("#product_star").unbind("click").click(function(e){t("html, body").animate({scrollTop:t("#comment_list_wrap")[0].offsetTop-100})}),t(document).on("click","#more_btn",function(){n.loadingData||(ot.curPage=ot.curPage+1,t("#cell_loading").removeClass("hide"),n.loadData(D))})}()});