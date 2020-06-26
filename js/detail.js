"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","star","viewer","wall"],function(t,e,i,a,r,o,s,n){function l(){t("#play_btn").removeClass("hide"),t("#play_btn").click(function(){if(X){t("#iframe_loading").removeClass("hide"),t("#video").addClass("hide"),t("#video").attr("src",X);document.getElementById("video").onload=function(){t("#iframe_loading").addClass("hide"),t("#video").removeClass("hide")}}t("#video_mask").removeClass("hide"),t("#video_mask #close_video_btn").click(function(){t("#video").attr("src",""),t("#video_mask").addClass("hide")})})}function c(){t("#custom_confirm_btn").unbind("click").click(function(){u(2)}),t("#custom_wrap_mask #close_btn, #custom_wrap_mask #custom_cancel_btn").unbind("click").click(function(){b()})}function d(e){var i=[];if(1==e){var a=Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val());if(a<=0)return void alert(t.i18n.map.QuantityIsNull);for(var o={userId:r.util.getUserId(),productName:W.productName,productImage:W.productImage,productId:W.productId,productColorId:W.productColorId,productNum:a,attrOpts:[],attrString:""},s=null,n=0;n<R.color_data[0].dyn_attrs.length;n++){var l={},c=R.color_data[0].dyn_attrs[n];s=null==s?c.attr_name+": "+t("#"+T(c.attr_name)+"_list").find("option:selected").text():s+","+c.attr_name+": "+t("#"+T(c.attr_name)+"_list").find("option:selected").text(),l.attrType=c.attrID,l.attrOptId=t("#"+T(c.attr_name)+"_list").val(),o.attrOpts.push(l)}o.attrString=s,i.push(JSON.parse(JSON.stringify(o)))}else if(2==e)for(var o={userId:r.util.getUserId(),productId:W.productId,productColorId:W.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:""}]},n=0;n<Q.length;n++){var d=Q[n],u=t("#"+d.optId+"_number_list").val();console.log(u),"11"==u&&((u=t("#"+d.optId+"_number_list").parent().find("input").val())||(u=0)),u>0&&(o.productNum=u,o.attrOpts=[{attrType:d.attrType,attrOptId:d.optId}],i.push(JSON.parse(JSON.stringify(o))))}return i}function u(e){var i=null;if(null==(i=K?g(e):d(e))||0==i.length)return void b();t("#product_name").html(i[0].productName),t("#product_attr").html(i[0].attrString),t("#product_image").attr("src",i[0].productImage),r.util.checkIsLogin()?m(i):p(i)}function m(e){r.dao.merge2cart({inputParams:JSON.stringify(e)},function(){O();var i=Number(t("#cart_product_number").text());t("#cart_product_number").text(i+e.length),b()},function(t){b(),alert(t.msg)})}function p(e){var i=localStorage.productList;if(i=i?JSON.parse(i):[],0==i.length)i=e;else for(var a=0;a<e.length;a++){for(var r=e[a],o=!1,s=JSON.stringify(r.attrOpts),n=0;n<i.length;n++){var l=i[n];r.productId==l.productId&&r.productColorId==l.productColorId&&s==JSON.stringify(l.attrOpts)&&(l.productNum=l.productNum+r.productNum,o=!0)}o||i.push(r)}localStorage.productList=JSON.stringify(i);for(var c=0,n=0;n<i.length;n++)c=parseInt(c)+parseInt(i[n].productNum);t("#cart_product_number").html(c),t("#cart_product_number").show(),O(),b()}function _(t){for(var e=0;e<t.length;e++)for(var i=t[e],a=JSON.stringify(i.attrOpts),r=e+1;r<t.length;r++){var o=t[r];a==JSON.stringify(o.attrOpts)&&(i.productNum=i.productNum+o.productNum,t.splice(r,1),r-=1)}return t}function g(e){var i=[];if(1==e){var a=Number(t("#qty_list").val())<=10?Number(t("#qty_list").val()):Number(t("#number_input").val());if(a<=0)return void alert(t.i18n.map.QuantityIsNull);for(var o={userId:r.util.getUserId(),productId:W.productId,productName:W.productName,productImage:W.productImage,productColorId:W.productColorId,productNum:a,attrOpts:[],attrString:""},s=null,n=0;n<R.color_data[0].dyn_attrs.length;n++){var l={},c=R.color_data[0].dyn_attrs[n];"2"==c.attrID?(l.attrType=c.attrID,l.attrOptId=t("#"+c.attr_name_id+"_list").val(),s=null==s?c.attr_name+": "+t("#"+c.attr_name_id+"_list").find("option:selected").text():s+","+c.attr_name+": "+t("#"+c.attr_name_id+"_list").find("option:selected").text()):(l.attrType=c.attrID,l.attrOptId=c.input_cmp.optId,"3"==c.attrID?(l.custominfo=t("#print_number_input").val(),l.custominfo&&(s=null==s?c.attr_name+": "+l.custominfo:s+","+c.attr_name+": "+l.custominfo)):"4"==c.attrID?(l.custominfo=t("#print_name_input").val(),l.custominfo&&(s=null==s?c.attr_name+": "+l.custominfo:s+","+c.attr_name+": "+l.custominfo)):s=null==s?c.attr_name+": "+t("#"+c.attr_name_id+"_list").find("option:selected").text():s+","+c.attr_name+": "+t("#"+c.attr_name_id+"_list").find("option:selected").text()),o.attrOpts.push(l)}o.attrString=s,i.push(JSON.parse(JSON.stringify(o)))}else if(2==e){var o={userId:r.util.getUserId(),productId:W.productId,productColorId:W.productColorId,productNum:1,attrOpts:[{attrType:"",attrOptId:"",custominfo:""}]};if(V&&V.length>0)for(var n=0;n<V.length;n++)for(var d=V[n],u=0;u<d.customs.length;u++){for(var l=[{attrType:d.attrType,attrOptId:d.optId}],m=d.customs[u].attrs,p=0;p<m.length;p++){var g=m[p],h=t("#print_input_"+d.optId+"_"+g.attrID+"_"+g.position).val();l.push({attrType:g.attrID,attrOptId:g.input_cmp.optId,custominfo:h})}o.attrOpts=l,i.push(JSON.parse(JSON.stringify(o)))}}return _(i)}function h(){Q&&Q.length>0&&(t("#size_list").html(t("#customSizeItem").tmpl(Q)),t("#size_list select option[value=11]").html(t.i18n.map.MoreNumber),w(!1),t("#size_list select").change(function(){console.log("#size_list select value = "+t(this).val()),"11"==t(this).val()?(t(this).hide(),t(this).parent().find("input").show()):w(!0)}),t("#size_list input").blur(function(){console.log("#size_list input");var e=t(this).val();if(console.log("#size_list input number = "+e),e&&e<=10){var i=t(this).parent().find("select")[0].id;t("#"+i.substring(i.indexOf("_")+1)+" option[value="+e+"]").prop("selected","selected")}else if(e&&e>10){var i=t(this).parent().find("select")[0].id,a="#"+i.substring(i.indexOf("_")+1);t(a).hide(),t(a).parent().find("input").show(),t(a).parent().find("input").val(e)}w(!0)})),c()}function f(){h(),t("#custom_wrap_mask").removeClass("hide"),t("body").css("overflow","hidden")}function v(e){for(var i=[],a=0;a<Q.length;a++){var r=Q[a],o=t("#custom_"+r.optId+"_number_list").val();if(Number(o)>10&&(o=t("#"+r.optId+"_number_input").val()),e||!r.number?r.number=o:Number(r.number)>Number(o)&&(o=r.number),Number(o)<=10?t("#custom_"+r.optId+"_number_list option[value="+o+"]").prop("selected","selected"):(t("#custom_"+r.optId+"_number_list").hide(),t("#custom_"+r.optId+"_number_list").parent().find("input").show(),t("#custom_"+r.optId+"_number_list").parent().find("input").val(o)),r.customs=[],o>0){for(var s=0;s<o;s++){for(var n=0;n<G.length;n++){G[n].position=s;var l=t("#print_input_"+r.optId+"_"+G[n].attrID+"_"+G[n].position).val();G[n].custominfo=l}r.customs.push(JSON.parse(JSON.stringify({attrs:G})))}i.push(r)}}return i}function b(){t("#custom_wrap_mask").addClass("hide"),t("body").css("overflow","auto")}function I(e){console.log("initProductImage midimg setImage"),t("#vertical img:first").attr("src",e[0].big_img),-1==F.indexOf(e[0].big_img)&&t("#imageLoading").removeClass("hide"),t("#product_image_wrap").html(t("#productImageTempl").tmpl(e)),s?t("#product_image_wrap").viewer("update"):s=t("#product_image_wrap").viewer({url:"data-original",toolbar:{zoomIn:!1,zoomOut:!1,oneToOne:!1,reset:!1,prev:{show:!0,size:"large"},play:!1,next:{show:!0,size:"large"},rotateLeft:!1,rotateRight:!1,flipHorizontal:!1,flipVertical:!1},navbar:!1,movable:!0,title:!1,transition:!1,button:!1}),"1"==sessionStorage.detail_image_style&&(t(".panel .panel-body .product-image-wrap .product-image").css("width","100%"),t(".panel .panel-body .product-image-wrap .product-image").css("text-align","center"))}function y(e){1==e.length?(W.productColorId=e[0].color_id,W.productName=e[0].pcName,W.productImage=e[0].img_groups[0].small_img,D(e[0].isattention)):(t("#color_data_wrap").removeClass("hide"),t("#color_list").html(t("#colorItem").tmpl(e)),t(t("#color_list li")[A]).find("span").css("display","block"),t(t("#color_list li")[A]).find("img").addClass("selected-image-border"),t("#color_desc").html(e[A].color_des),W.productColorId=e[A].color_id,W.productName=e[A].pcName,W.productImage=e[A].img_groups[0].small_img,D(e[A].isattention),t("#color_list li").bind("click",function(){if("none"==t(this).find("span").css("display")){t("#color_list li").find("span").css("display","none"),t("#color_list li").find("img").removeClass("selected-image-border"),t(this).find("span").css("display","block"),t(this).find("img").addClass("selected-image-border");var i=t(this).data().data;t("#color_desc").html(e[i].color_des),t("#name").html(e[i].pcName),t("#product_ext_name").html(e[i].pcNameExt),t("#current_price").html(e[i].current_price),t("#original_price").html(e[i].original_price),t("#price_off").html(e[i].disCount+"%"),W.productColorId=e[i].color_id,W.productName=e[i].pcName,W.productImage=e[i].img_groups[0].small_img,D(e[i].isattention),X=e[i].videos&&e[i].videos.length>0?e[i].videos[0].path:null,I(e[i].img_groups),C(e[i].dyn_attrs)}}))}function C(e,i){K=!1,G=[],Q=[],t("#customBtn").addClass("hide"),t("#attr_name_hint").html(t.i18n.map.PrintNameHint),t("#attr_number_hint").html(t.i18n.map.PrintNumberHint);for(var a=r.util.getCurrencySymbol(r.util.getLocalCurrency()),o=0;o<e.length;o++){var s=e[o];if(s.domain_list&&s.domain_list.length>0&&(t("#"+s.attr_name+"_content").html(s.domain_list[0]),s.selectedAttr=s.domain_list[0].optId,s.attr_name_id=T(s.attr_name),"2"==s.attrID))for(var n=0;n<s.domain_list.length;n++){var l=s.domain_list[n];l.attrType=s.attrID,Q.push(l)}s.input_cmp&&(G.push(s),K=!0,t("#customBtn").removeClass("hide")),"3"==s.attrID&&(t("#print_number_price").html("+"+r.util.formatProductPrice(s.input_cmp.price,a)),t("#detail_print_number_price").html("+"+r.util.formatProductPrice(s.input_cmp.price,a))),"4"==s.attrID&&(t("#print_name_price").html("+"+r.util.formatProductPrice(s.input_cmp.price,a)),t("#detail_print_name_price").html("+"+r.util.formatProductPrice(s.input_cmp.price,a)))}t("#dyn_attrs_list").html(t("#dynAttrsItem").tmpl(e)),t("#size_guide").html(t.i18n.map.SizeGuide);var c=host+"/"+r.util.getDomainName();r.isLoadTest&&(c="https://cdn.jsdelivr.net/gh/oophzh/soccershopping/merreventa"),t("#size_guide_image").attr("src",c+"/size-guide-img.jpg"),K?t("#print_number_input")[0]||(t("#custom_wrap").removeClass("hide"),t("#custom_type_list").val(0),t("#custom_attrs_list").hide(),t("#custom_attrs_list").html(t("#customAttrsItem").tmpl(G))):t("#custom_wrap").addClass("hide"),t("#dyn_attrs_list select").change(function(){console.log("#dyn_attrs_list select value = "+t(this).val()),"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#dyn_attrs_list input").blur(function(){var e=t(this).val();if(e<=10){var i=t(this).parent().find("select")[0].id;t("#custom_"+i+" option[value="+e+"]").prop("selected","selected")}else{var i=t(this).parent().find("select")[0].id,a="#"+i;t(a).hide(),t(a).parent().find("input").show(),t(a).parent().find("input").val(e)}}),t("#size_guide").click(function(){t("#size_guide_mask").removeClass("hide"),t("body").css("overflow","hidden")}),t("#size_guide_mask #close_size_guide_btn").click(function(){t("#size_guide_mask").addClass("hide"),t("body").css("overflow","auto")})}function w(e){V=v(e),t("#custome_attr_list").html(""),t("#custome_attr_list").html(t("#customAttrItem").tmpl(V))}function S(){r.dao.productDetail({productId:q,currencyId:r.util.getLocalCurrency(),userId:r.util.getUserId()},function(e){if(e.product_id){R=e;var i=e;W.productId=R.product_id;for(var a=r.util.getCurrencySymbol(r.util.getLocalCurrency()),o=0;o<i.color_data.length;o++){var s=i.color_data[o];s.original_price=r.util.formatProductPrice(s.original_price,a),s.current_price=r.util.formatProductPrice(s.current_price,a),s.img_display=r.util.picUrl+s.img_display,s.color_img=r.util.picUrl+s.color_img,s.width=200,s.height=200;for(var n=0;n<s.img_groups.length;n++){var l=s.img_groups[n];l.small_img=r.util.picUrl+l.small_img,l.big_img=r.util.picUrl+l.big_img}}var c="en";localStorage.selectedLanguage&&(c=JSON.parse(localStorage.selectedLanguage).langCode),i.product_des&&"en"==c?t(".description").html(i.product_des):(t("#product_image_wrap").css("border-top","none"),t("#product_image_wrap").css("margin-top","0"),t("#product_image_wrap").css("padding-top","0")),document.title=i.product_name;for(var o=0;o<i.color_data.length;o++)if(E==i.color_data[o].color_id){A=o;break}if(X=i.color_data[A].videos&&i.color_data[A].videos.length>0?i.color_data[A].videos[0].path:null,I(i.color_data[A].img_groups),t("#name").html(i.color_data[A].pcName),t("#product_ext_name").html(i.color_data[A].pcNameExt),t("#current_price").html(i.color_data[A].current_price),t("#original_price").html(i.color_data[A].original_price),t("#price_off").html(i.color_data[A].disCount+"%"),"0"==i.color_data[A].isFreeShipping)if(i.advtxts&&i.advtxts.length>0){for(var d="",o=0;o<i.advtxts.length;o++)d=d+i.advtxts[o]+"<br>";t("#shipping_info").html(d),t("#shipping_info").parent().parent().show()}else t("#shipping_info").parent().parent().hide();else"1"==i.color_data[A].isFreeShipping?t("#shipping_info").html(t.i18n.map.FreeshippingHint):t("#shipping_info").parent().parent().hide();sessionStorage.s_fm_bg&&t("#shipping_info").css("background",sessionStorage.s_fm_bg),sessionStorage.s_fm_fc&&t("#shipping_info").css("color",sessionStorage.s_fm_fc),t("#price_wrap").css("display","block"),E||(E=i.color_data[A].color_id),y(i.color_data),C(i.color_data[A].dyn_attrs),P(i.product_type),r.util.menu=[],r.util.getClassifyNames(i.product_type,function(){k()}),N(),t("#print_wrap").show()}})}function k(){if(r.util.menu&&r.util.menu.length>0){var e=r.util.getAdvSource().u;e||(e=r.util.getQueryString("u"));var i="";e&&(i="?u="+e);var a=r.util.menu.reverse();a.push({menu_name:document.title});for(var o="<li><a id='breadcrumb_home' href='/'>"+t.i18n.map.Home+"</a></li>",s=0;s<a.length;s++)if(s!==a.length-1){var n=r.util.formatProductName(a[s].menu_name)+"-l-"+r.util.encodeMenuType(a[s].menu_type)+"-"+r.util.encodeMenuType(r.util.getUvid())+".html"+i;"1"==a[s].supportgp&&(n=r.util.formatProductName(a[s].menu_name)+"-g-"+r.util.encodeMenuType(a[s].menu_type)+"-"+r.util.encodeMenuType(r.util.getUvid())+".html"+i),o=o+"<li><a href='"+n+"'>"+a[s].menu_name+"</a></li>"}t(".breadcrumb").html(o)}}function N(){var t=localStorage.currentBrowseList;t=t?JSON.parse(t):[];for(var e=0;e<t.length;e++){var i=t[e];if(i.productId===q&&i.productColorId===E){t.splice(e,1);break}}var a={productId:q,productColorId:E};t.push(a),t.length>30&&(t=t.splice(1,t.length-1)),localStorage.setItem("currentBrowseList",JSON.stringify(t))}function P(e){r.dao.productsRel({menuType:e,productId:q,productColorId:W.productColorId},function(e){var i=r.util.getAdvSource().u;i||(i=r.util.getQueryString("u"));var a="";i&&(a="?u="+i);for(var o=r.util.encodeMenuType(r.util.getUvid()),s=0;s<e.length;s++){var n=e[s];n.imgDisplay=r.util.picUrl+n.imgDisplay;var l=r.util.formatProductName(n.prdName)+"-d-"+r.util.encodeMenuType(n.productId)+"-"+r.util.encodeMenuType(n.productColorId)+"-"+o+".html"+a;n.detailUrl=l}t("#peripheral_products_list").html(t("#peripheralProductListTempl").tmpl(e))})}function x(){t("#waitting_icon").removeClass("hide"),t("#success_icon").addClass("hide"),t("#success_text").addClass("hide"),t("#add_to_cart_success_mask").removeClass("hide"),t("body").css("overflow","hidden")}function O(){t("#waitting_icon").addClass("hide"),t("#success_icon").removeClass("hide"),t("#success_text").removeClass("hide")}function z(){t("#add_to_cart_success_mask").addClass("hide"),t("body").css("overflow","auto")}function T(t){return t?t=t.replace(new RegExp(" ","gm"),"_"):t}function L(){r.dao.getCommentsByPrd({currentPage:Y.curPage,productId:q},function(e){if(e.page&&(Y.amount=e.page.amount,Y.pageSize=e.page.pageSize),e&&e.comments.length>0){for(var i=e.comments,a=0;a<i.length;a++){var o=i[a];o.crtime=r.util.formatOrderDateTime(o.crtime),o.usrico&&(o.usrImage=r.util.userIconUrl+o.usrico,o.usrErrorImage='javascript:this.src="resources/img/user/'+o.usrico+'";');for(var s=0;s<o.zps.length;s++){var n=o.zps[s];n.crtime=r.util.formatOrderDateTime(n.crtime);for(var l=0;l<n.shareimgs.length;l++)n.shareimgs[l]=r.util.commentPicUrl+n.shareimgs[l]}for(var s=0;s<o.shareimgs.length;s++)o.shareimgs[s]=r.util.commentPicUrl+o.shareimgs[s]}t("#comment_list").html(t("#commentItemTempl").tmpl(i)),t("#comment_list #color_title").html(t.i18n.map.ColorTitle),t("#comment_list .reply-text").html(t.i18n.map.DetailCommentReply),t(".empty-data").addClass("hide"),t("#comment_list .comment-item-wrap input").each(function(){t(this).rating({step:1,size:"xs",showClear:!1,min:0,max:5,disabled:!0,showCaption:!1}).rating("showStars",t(this).data().data)}),t("#comment_list .image-wrap img").each(function(){t(this).click(function(){t(this).parent().find("img").removeClass("selected"),t(this).addClass("selected");var e=t(this).data().data,i=t(this).parent().parent().find(".big-image-wrap");if(0==i.find(".owl-item").length){for(var a=i.data().data,r=a.split(","),o=[],s=0;s<r.length;s++){var n=r[s];o.push(n)}t("#commentBigImageTempl").tmpl(o).appendTo(i[0]),i.owlCarousel({nav:!0,loop:!1,slideBy:"1",autoPlay:!1,rewind:!1,smartSpeed:70,items:1,dots:!1,startPosition:e,navText:['<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="fill: #f1f1f1;"></path></svg>','<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="fill: #f1f1f1;"></path></svg>']}),i.removeClass("hide"),i.find(".owl-item img").click(function(){i.addClass("hide")})}else i.trigger("to.owl.carousel",[e]),i.removeClass("hide")})})}else t(".empty-data").removeClass("hide")})}function D(e){r.util.checkIsLogin()&&("1"==e?(t("#add_fav").addClass("selected"),t("#add_fav").removeClass("icon-heart "),t("#add_fav").addClass("icon-aixin")):t("#add_fav").removeClass("selected")),t("#add_fav").removeClass("hide"),t("#btn_wrap").removeClass("hide"),t("#addFavBtn").unbind("click").click(function(){r.util.checkIsLogin()?r.dao.attentionProduct({userId:r.util.getUserId(),productId:W.productId,colorId:W.productColorId,type:t("#add_fav").hasClass("selected")?"2":"1"},function(){t("#add_fav").hasClass("selected")?(t("#add_fav").removeClass("selected"),t("#add_fav").removeClass("icon-aixin"),t("#add_fav").addClass("icon-heart ")):(t("#add_fav").removeClass("icon-heart"),t("#add_fav").addClass("selected"),t("#add_fav").addClass("icon-aixin"))}):window.location.href="../../../login.html?uvid="+r.util.getUvid()})}function U(){B(),t("#more_btn").click(function(){n.loadingData||(Z.curPage=Z.curPage+1,t("#cell_loading").removeClass("hide"),n.loadData(B))})}function B(){r.dao.listImgWall({currentPage:Z.curPage,terminal:r.util.isMobile()?"2":"1",currencyId:r.util.getLocalCurrency(),prdId:q},function(e){if(e.page){if(1==Z.curPage){Z.amount=e.page.amount,Z.pageSize=e.page.pageSize;var i=0;i=Z.amount%Z.pageSize==0?parseInt(Z.amount/Z.pageSize):parseInt(Z.amount/Z.pageSize)+1,Z.totalPage=i}}else Z.totalPage=0,Z.amount=0;0==Z.amount?t("#pic_wall_list_wrap").addClass("hide"):(t("#pic_wall_list_wrap").removeClass("hide"),1==Z.curPage&&(n.init(document.getElementById("cells"),document.getElementById("picWallTempl").innerHTML),n.setCompleteCallback(function(){t("#cell_loading").addClass("hide"),M(),Z.curPage==Z.totalPage&&t("#more_btn").addClass("hide")})),n.loadingData=!0,n.concatData(J(e.imgs)))})}function J(t){for(var e=0;e<t.length;e++){var i=t[e];i.aiName=r.util.imgWallUrl+i.aiName,i&&i.aiHref?i.aiHref=i.aiHref:i.aiHref="javascript:void(0)";var a=r.util.getCurrencySymbol(r.util.getLocalCurrency());i.curPrice=r.util.formatProductPrice(i.curPrice,a),i.orgPrice=r.util.formatProductPrice(i.orgPrice,a)}return t}function M(){t("#cells img").each(function(){t(this).click(function(){$?t("#cells").viewer("update"):$=t("#cells").viewer({url:"data-original",toolbar:{zoomIn:!1,zoomOut:!1,oneToOne:!1,reset:!1,prev:{show:!0,size:"large"},play:!1,next:{show:!0,size:"large"},rotateLeft:!1,rotateRight:!1,flipHorizontal:!1,flipVertical:!1},navbar:!1,movable:!0,title:!1,transition:!1,button:!1,hide:function(){t("#wall_buy_wrap").addClass("hide")},show:function(){t("#wall_buy_wrap").removeClass("hide")},view:function(e){var i=n.picData[e.detail.index];t("#wall_buy_btn").attr("href",i.aiHref),i.productName?(t("#wall_product_name").html(i.productName),t("#wall_product_price").html(i.curPrice),t("#wall_product_del_price").html(i.orgPrice)):(t("#wall_product_name").html(""),t("#wall_product_price").html(""),t("#wall_product_del_price").html(""))}})})})}console.log("detail.js");var H=window.location.href,j=r.util.getDetailParams(H),q=r.util.decodeMenuType(j[j.length-3]),E=r.util.decodeMenuType(j[j.length-2]),A=0,R={},W={productId:"",productColorId:""},F=[],Q=[],V=[],G=[],K=!1,X=null,Y={amount:0,curPage:1,pageSize:0},s=null,Z={amount:0,curPage:1,pageSize:0,totalPage:0},$=null;r.setCurrencyCodeCallback(function(){S(),sessionStorage.messageSwitch&&"1"==sessionStorage.messageSwitch?t("#contactUsBtn").removeClass("hide"):t("#contactUsBtn").addClass("hide"),sessionStorage.picWallSwitch&&"1"==sessionStorage.picWallSwitch?U():t("#pic_wall_list_wrap").addClass("hide")}),r.setLanguageCallback(function(){t("#breadcrumb_home").text(t.i18n.map.Home)}),r.initLoginStatus(),function(){sessionStorage.commentSwitch&&"1"==sessionStorage.commentSwitch?(L(),t("#comment_list_wrap").removeClass("hide")):t("#comment_list_wrap").addClass("hide")}(),function(){sessionStorage.btn_bg&&(t(".custom-btn").css("background",sessionStorage.btn_bg),t(".add-to-cart-success-mask .add-to-cart-success-wrap #close_add_to_cart_success_btn").css("background",sessionStorage.btn_bg)),sessionStorage.btn_fc&&(t(".custom-btn").css("color",sessionStorage.btn_fc),t(".add-to-cart-success-mask .add-to-cart-success-wrap #close_add_to_cart_success_btn").css("color",sessionStorage.btn_fc)),t("#addCartBtn").unbind("click").click(function(){console.log("addCartBtn"),x(),u(1)}),t("#customBtn").click(function(){f()}),t("#midimg").load(function(e){console.log("big image loading"),t("#imageLoading").addClass("hide"),null!==X&&l(),F.push(e.currentTarget.currentSrc)}),t("#midimg").error(function(){console.log("big image error"),t("#imageLoading").addClass("hide"),null!==X&&l()}),t("#coupon_btn").click(function(){r.util.checkIsLogin()?window.location.href="../../../my_account.html?id=4&uvid="+r.util.getUvid():window.location.href="../../../login.html?uvid="+r.util.getUvid()}),document.getElementById("qty_list").value=1,t("#qty_list").change(function(){"11"==t(this).val()&&(t(this).hide(),t(this).parent().find("input").show())}),t("#custom_type_list").change(function(){"0"==t(this).val()?(t("#custom_attrs_list").css("display","none"),t("#detail_custom_hint").css("display","none"),t("#print_number_input").val(""),t("#print_name_input").val("")):"1"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","none"),t("#print_number_input").val(""),t("#custom_item_4").css("display","block")):"2"==t(this).val()?(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","none"),t("#print_name_input").val("")):"3"==t(this).val()&&(t("#custom_attrs_list").css("display","block"),t("#detail_custom_hint").css("display","block"),t("#custom_item_3").css("display","block"),t("#custom_item_4").css("display","block"))}),t("#add_to_cart_success_mask #close_add_to_cart_success_btn, #add_to_cart_success_mask #continue_shopping_btn").click(function(){z()}),t("#add_to_cart_success_mask #go_to_cart_btn").click(function(){window.location.href="../../../shopping_cart.html",z()}),c(),t(".detail-bottom-content .panel-heading").click(function(){var e=t(this).parent().find(".panel-body");e.hasClass("hide")?(e.removeClass("hide"),t(this).find(".panel-heading-arrow").removeClass("icon-jiantou-xia-cuxiantiao"),t(this).find(".panel-heading-arrow").addClass("icon-jiantou-shang-cuxiantiao")):(e.addClass("hide"),t(this).find(".panel-heading-arrow").addClass("icon-jiantou-xia-cuxiantiao"),t(this).find(".panel-heading-arrow").removeClass("icon-jiantou-shang-cuxiantiao"))}),t("#prev_btn").unbind("click").click(function(){Y.curPage>1&&(Y.curPage=Y.curPage-1,L()),t("#page").bootstrapPaginator("showPrevious")}),t("#next_btn").unbind("click").click(function(){var e=0;e=Y.amount%Y.pageSize==0?parseInt(Y.amount/Y.pageSize):parseInt(Y.amount/Y.pageSize)+1,Y.curPage<e&&(Y.curPage=Y.curPage+1,L()),t("#page").bootstrapPaginator("showNext")}),t("#contactUsBtn").unbind("click").click(function(){r.util.getUserId()?window.location.href="../../../my_message.html?index=2&productId="+W.productId+"&productColorId="+W.productColorId:window.location.href="../../../login.html"}),t("#midimg").unbind("click").click(function(e){s&&t("#product_image_wrap").viewer("view")})}()});