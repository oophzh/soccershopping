"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","star"],function(e,t,n,i,a,r){function o(t,n){e("#orderId").html(t),a.dao.getOrderDetail({orderId:t},function(t){w=[],null==R&&(R=1!=t.cmtTpe),e("#orderDate").html(a.util.formatOrderDateTime(t.crTime));var i=a.util.getCurrencySymbol(t.correncyCode);i||(i=a.util.getCurrencySymbol(a.util.getLocalCurrency()));var r=a.util.getAdvSource().u;r||(r=a.util.getQueryString("u"));var o="";r&&(o="?u="+r);for(var l=a.util.encodeMenuType(a.util.getUvid()),m=0;m<t.spCart.length;m++){var s=t.spCart[m];s.displayImg=a.util.picUrl+s.displayImg,s.productPrice=a.util.formatProductPrice(s.productPrice,i);var c=a.util.formatProductName(s.productName)+"-d-"+a.util.encodeMenuType(s.productId)+"-"+a.util.encodeMenuType(s.productColorId)+"-"+l+".html"+o;s.href=c,R?s.zjcmId&&"0"!=s.zjcmId||(s.serverImageList=[],s.imageList=[],w.push(s)):s.cmId&&"0"!=s.cmId||(s.serverImageList=[],s.imageList=[],w.push(s))}f(),n&&0==w.length&&(e("#submit_comment_success_mask").addClass("hide"),""===document.referrer?window.location.href="/":window.history.go(-1))})}function l(t){for(var n=0;n<t.length;n++)R?e("#comment_star_input_"+n).parent().parent().addClass("hide"):e("#comment_star_input_"+n).rating({step:1,size:"xs",showClear:!1,min:0,max:5,showCaption:!1}).rating("update",5),e("#cart_list #comment_content_input_"+n).attr("placeholder",e.i18n.map.CommentContentPlaceHolder),e("#cart_list #comment_video_input_"+n).attr("placeholder",e.i18n.map.CommentVideoPlaceHolder),e("#upload_input_"+n).change(function(){var n=e(this)[0].id;y=Number(n.substring(n.lastIndexOf("_")+1)),console.log("updateInputIndex = "+y);var i=null,a=document.getElementById("upload_input_"+y);if(a.files)i=a.files[0],s(i);else{a.select(),a.blur();var r=document.selection.createRange().text;console.log("filePath = "+r),t[y].imageList.push(r),v()}}),I(n,500),e("#comment_content_input_"+n).bind("input propertychange",function(){var t=e(this)[0].id;I(Number(t.substring(t.lastIndexOf("_")+1)),500-e(this).val().length)})}function m(e,t){h(g(e,t))}function s(t){t.size>L?(alert(e.i18n.map.CommentMaxFileSize),e("#upload_input_"+y).val("")):t.size>b?(c(t),u(t,m)):(c(t),d(t,m))}function c(e){var t=window.URL||window.webkitURL,n=t.createObjectURL(e);w[y].imageList.push(n),v()}function d(e,t){var n=new FileReader;n.onload=function(){var i=n.result;t(i,e.name)},n.readAsDataURL(e)}function u(t,n){if("undefined"==typeof FileReader)console.log("The current browser kernel does not support base64 image compression"),d(t,n);else try{var i=new FileReader;i.onload=function(i){var a=e("<img/>");a.load(function(){var e=this.height/(this.width/300),i=document.createElement("canvas"),a=i.getContext("2d"),r=0,o=0,l=0,m=0,s="";i.width=300,i.height=e,a.clearRect(0,0,300,e),this.width>300?(r=Math.round(300),o=e,l=Math.round((r-300)/2)):(o=Math.round(e),r=300,m=Math.round((o-e)/2)),a.drawImage(this,l,m,r,o);var s=i.toDataURL("image/jpeg");n(s,t.name)}),a.attr("src",i.target.result)},i.readAsDataURL(t)}catch(e){console.log("Compression failed!"),d(t,n)}}function g(e,t){for(var n=e.split(","),i=n[0].match(/:(.*?);/)[1],a=atob(n[1]),r=a.length,o=new Uint8Array(r);r--;)o[r]=a.charCodeAt(r);return new File([o],t,{type:i})}function p(t){w[y].serverImageList.push(t),e("#comment_image_list_"+y+" .comment-image-item:last-child").find(".icon-spinner").addClass("hide")}function h(t){console.log("updateImage");var n=new FormData;n.append("file",t),a.dao.uploadCommentImg(n,function(e){p(e)},null,function(){e("#upload_input_"+y).val("")})}function _(e){e&&0!=e.length&&a.dao.delCommentImg({inputParams:JSON.stringify(e)},function(){if(1==e.length){for(var t=e[0],n=-1,i=0;i<w[y].serverImageList.length;i++)if(t==w[y].serverImageList[i]){n=i;break}-1!==n&&(w[y].serverImageList.splice(n,1),w[y].imageList.splice(n,1),v(!0))}else for(var i=0;i<w.length;i++)w[i].serverImageList=[],w[i].imageList=[]})}function f(){e("#cart_list").html(e("#cartTempl").tmpl(w)),e("#cart_list #color_title").html(e.i18n.map.ColorTitle),e("#cart_list #rating_label").html(e.i18n.map.CommentRatingLabel),e("#cart_list #content_label").html(e.i18n.map.CommentContentLabel),e("#cart_list #video_label").html(e.i18n.map.CommentVideoLabel),l(w)}function v(t){var n=w[y].imageList;n&&n.length>0?(e("#comment_image_list_"+y).html(e("#commentImageTempl").tmpl(n)),t||e("#comment_image_list_"+y+" .comment-image-item:last-child").find(".icon-spinner").removeClass("hide"),e("#comment_image_list_"+y).removeClass("hide"),e("#comment_image_list_"+y+" .icon-close").each(function(){e(this).click(function(){var t=e(this).parent().parent()[0].id;y=Number(t.substring(t.lastIndexOf("_")+1));for(var n=e(this).parent().find("img")[0].src,i=-1,a=0;a<w[y].imageList.length;a++)if(n==w[y].imageList[a]){i=a;break}if(-1!==i){_([w[y].serverImageList[i]])}})}),3==n.length&&e("#update_layout_"+y).addClass("hide")):e("#comment_image_list_"+y).addClass("hide")}function I(t,n){var i=e.i18n.map.CommentContentHint;i=i.replace("%",n);var a=i.substring(0,i.indexOf(n)),r=i.substring(i.indexOf(n)+ +(""+n).length,i.length);e("#word_number_"+t).html(a+"<span class='red'>"+n+"</span>"+r)}a.initLoginStatus();var C=a.util.getQueryString("id"),L=4194304,b=102400,w=[],y=0,R=null;!function(){window.onbeforeunload=function(e){for(var t=[],n=0;n<w.length;n++){var i=w[n].serverImageList;i&&i.length>0&&(t=t.concat(i))}t.length>0&&_(t)},e("#addCommentBtn").click(function(){var t=a.util.getUserId();if(!t)return void(window.location.href="../../../login.html");for(var n=[],i=[],r=0;r<w.length;r++){var o=w[r],l=e("#comment_star_input_"+r).val(),m=e("#comment_content_input_"+r).val();if(R&&(l="5"),l&&m){var s={shareimgs:w[r].serverImageList,sharevideo:"",videourl:e("#comment_video_input_"+r).val(),orderId:C,productId:o.productId,productColorId:o.productColorId,cmId:o.cmId&&"0"!==o.cmId?o.cmId:null,attrDes:o.attrDes,tEval:R?null:l,content:m,userId:t};n.push(s)}else w[r].serverImageList&&w[r].serverImageList.length>0&&(i=i.concat(w[r].serverImageList))}if(0==n.length)return void alert("请至少填写一个商品的评分和评价内容");var c=n;a.dao.submitComment({inputParams:JSON.stringify(c)},function(){e("#submit_comment_success_mask").removeClass("hide"),_(i)})}),e("#confirmBtn").click(function(){e("#submit_comment_success_mask").addClass("hide"),o(C,!0)})}(),o(C)});