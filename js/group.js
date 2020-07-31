"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common"],function(i,t,e,n,a){function r(){a.dao.getGroupInfo({productType:c},function(t){if(t&&t.length>0){var e=a.util.getAdvSource().u;e||(e=a.util.getQueryString("u"));var n="";e&&(n="?u="+e);for(var r=a.util.encodeMenuType(a.util.getUvid()),o=0;o<t.length;o++)for(var u=t[o],l=u.childMenus,s=0;s<l.length;s++){var d=l[s];d.imgPath&&(d.imgPath=a.util.picUrl+d.imgPath),d.adsImgPath&&(d.adsImgPath=a.util.picUrl+d.adsImgPath),d.href=a.util.formatProductName(d.typeDes)+"-l-"+a.util.encodeMenuType(d.productTypeId)+"-"+r+".html?parentId="+a.util.encodeMenuType(c)+n,l.length<=4?d.style="width: calc("+100/l.length+"% - 5px);":5==l.length?s<2?(d.style="width: calc(50% - 5px);",d.row="row1"):s>=2&&s<=4&&(d.style="width: calc(33.3333% - 5px);",d.row="row2"):6==l.length?(d.style="width: calc(33.3333% - 5px);",s<3?d.row="row1":s>=3&&s<6&&(d.row="row2")):7==l.length?s<3?(d.style="width: calc(33.3333% - 5px);",d.row="row1"):s>=3&&s<=6&&(d.style="width: calc(25% - 5px);",d.row="row2"):(d.style="width: calc(25% - 5px);",d.row=s<4?"row1":s>=3&&s<8?"row2":"row3")}i("#group_list").html(i("#groupItemTempl").tmpl(t));for(var f=i("#group_list .group-sub-classify-list-wrap"),o=0;o<f.length;o++){if(0==i(f[o]).find(".row1").length){var h=i(f[o]).find(".group-sub-classify-desc");if(h.length>0){for(var g=0,s=0;s<h.length;s++)h[s].offsetHeight>g&&(g=h[s].offsetHeight);h.css("height",g)}}if(i(f[o]).find(".row1").length>0){var h=i(f[o]).find(".row1 .group-sub-classify-desc");if(h.length>0){for(var g=0,s=0;s<h.length;s++)h[s].offsetHeight>g&&(g=h[s].offsetHeight);h.css("height",g)}}if(i(f[o]).find(".row2").length>0){var h=i(f[o]).find(".row2 .group-sub-classify-desc");if(h.length>0){for(var g=0,s=0;s<h.length;s++)h[s].offsetHeight>g&&(g=h[s].offsetHeight);h.css("height",g)}}if(i(f[o]).find(".row3").length>0){var h=i(f[o]).find(".row3 .group-sub-classify-desc");if(h.length>0){for(var g=0,s=0;s<h.length;s++)h[s].offsetHeight>g&&(g=h[s].offsetHeight);h.css("height",g)}}}}},null,function(){u()})}function o(){if(a.util.menu&&a.util.menu.length>0){var t=a.util.getAdvSource().u;t||(t=a.util.getQueryString("u"));var e="";t&&(e="?u="+t);for(var n=a.util.menu.reverse(),r="<li><a id='breadcrumb_home' href='/'>"+i.i18n.map.Home+"</a></li>",o=0;o<n.length;o++){var u=a.util.formatProductName(n[o].menu_name)+"-l-"+a.util.encodeMenuType(n[o].menu_type)+"-"+a.util.encodeMenuType(a.util.getUvid())+".html"+e;"1"==n[o].supportgp&&(u=a.util.formatProductName(n[o].menu_name)+"-g-"+a.util.encodeMenuType(n[o].menu_type)+"-"+a.util.encodeMenuType(a.util.getUvid())+".html"+e),o==n.length-1?(r=r+"<li class='active'><a href='"+u+"'>"+n[o].menu_name+"</a></li>",i("#product_classify_name").html(n[o].menu_name),document.title=n[o].menu_name):r=r+"<li><a href='"+u+"'>"+n[o].menu_name+"</a></li>"}i(".breadcrumb").html(r),i(".breadcrumb").removeClass("hide")}}function u(){i(".loading-mask").addClass("hide"),i(".main-wrap").removeClass("invisibility"),i("footer").removeClass("invisibility")}function l(){var t=JSON.parse(sessionStorage.menus);if(t=a.util.handleMenu(t)){i("#menu_list_wrap").html(i("#menuListTempl").tmpl(t)),i("#menu_list_wrap a").each(function(){i(this).click(function(){event.stopPropagation();var t=a.util.getAdvSource().u;t||(t=a.util.getQueryString("u"));var e="";t&&(e="?u="+t);var n=a.util.encodeMenuType(a.util.getUvid()),r=i(this).attr("href");if(r&&r.indexOf("-l-")>-1){var o=a.util.getListParams(r),u=o[o.length-2];u=a.util.encodeMenuType(u);var l=r.substring(0,r.indexOf("-l-")),s=a.util.formatProductName(l)+"-l-"+u+"-"+n+".html"+e;i(this).attr("href",s)}else if(r&&r.indexOf("-g-")>-1){var o=a.util.getListParams(r),u=o[o.length-2];u=a.util.encodeMenuType(u);var l=r.substring(0,r.indexOf("-g-")),s=a.util.formatProductName(l)+"-g-"+u+"-"+n+".html"+e;i(this).attr("href",s)}})});for(var e=a.util.menu[a.util.menu.length-1].menu_type,n=i("#menu_list_wrap span"),r=0;r<n.length;r++){n[r].id==e?i(n[r]).addClass("selected"):i(n[r]).removeClass("selected");for(var o=0;o<a.util.menu.length;o++)if(n[r].id==a.util.menu[o].menu_type){"menu_list_wrap"!==i(n[r]).parent().parent().parent().parent()[0].id&&"div"!==i(n[r]).parent().parent().parent().parent()[0].tagName.toLowerCase()&&(i(n[r]).parent().parent().parent().parent().find("ul:first").removeClass("hide"),i(n[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").addClass("icon-jiantou-shang-cuxiantiao"),i(n[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").removeClass("icon-jiantou-xia-cuxiantiao"));break}}i("#menu_list_wrap #arrow_icon").bind("click",function(){event.stopPropagation(),i(this).find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(i(this).parent().parent().parent().find("ul:first").removeClass("hide"),i(this).find("i").removeClass("icon-jiantou-xia-cuxiantiao"),i(this).find("i").addClass("icon-jiantou-shang-cuxiantiao")):(i(this).parent().parent().parent().find("ul:first").addClass("hide"),i(this).find("i").addClass("icon-jiantou-xia-cuxiantiao"),i(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}),i("#menu_list_wrap .media-body a").bind("click",function(){if("javascript:void(0)"==i(this).attr("href")){event.stopPropagation();var t=i(this).parent().parent().find(".media-right #arrow_icon");t.find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(t.parent().parent().parent().find("ul:first").removeClass("hide"),t.find("i").removeClass("icon-jiantou-xia-cuxiantiao"),t.find("i").addClass("icon-jiantou-shang-cuxiantiao")):(t.parent().parent().parent().find("ul:first").addClass("hide"),t.find("i").addClass("icon-jiantou-xia-cuxiantiao"),t.find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}})}}console.log("group.js"),a.util.getCookie("isFirst")||(a.util.setCookie("isFirst",0),i(".loading-mask").removeClass("hide")),a.initLoginStatus();var s=window.location.href,d=a.util.getListParams(s),c=a.util.decodeMenuType(d[d.length-2]);a.setLanguageCallback(function(){r(),a.util.menu=[],a.util.getClassifyNames(c,function(){document.title=a.util.menu[0].menu_name,o(),l()})})});