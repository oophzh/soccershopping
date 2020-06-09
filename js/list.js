"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","bootstrapPaginator"],function(e,t,i,a,n,r){function o(){sessionStorage.list_lable_bg&&e(".product-label-item").css("background",sessionStorage.list_lable_bg),sessionStorage.list_lable_fc&&e(".product-label-item").css("color",sessionStorage.list_lable_fc),e("#prev_btn").unbind("click").click(function(){_.curPage>1&&(_.curPage=_.curPage-1,e("html").scrollTop(0),u()),e("#page").bootstrapPaginator("showPrevious"),e("#top_page").bootstrapPaginator("showPrevious")}),e("#next_btn").unbind("click").click(function(){var t=0;t=_.amount%_.pageSize==0?parseInt(_.amount/_.pageSize):parseInt(_.amount/_.pageSize)+1,_.curPage<t&&(_.curPage=_.curPage+1,e("html").scrollTop(0),u()),e("#page").bootstrapPaginator("showNext"),e("#top_page").bootstrapPaginator("showNext")})}function s(){if(n.util.menu&&n.util.menu.length>0){var t=n.util.getAdvSource().u;t||(t=n.util.getQueryString("u"));var i="";t&&(i="?u="+t);for(var a=n.util.menu.reverse(),r="<li><a id='breadcrumb_home' href='/'>"+e.i18n.map.Home+"</a></li>",o=0;o<a.length;o++){var s=n.util.formatProductName(a[o].menu_name)+"-l-"+n.util.encodeMenuType(a[o].menu_type)+"-"+n.util.encodeMenuType(n.util.getUvid())+".html"+i;"1"==a[o].supportgp&&(s=n.util.formatProductName(a[o].menu_name)+"-g-"+n.util.encodeMenuType(a[o].menu_type)+"-"+n.util.encodeMenuType(n.util.getUvid())+".html"+i),o==a.length-1?(r=r+"<li class='active'><a href='"+s+"'>"+a[o].menu_name+"</a></li>",e("#product_classify_name").html(a[o].menu_name),document.title=a[o].menu_name):r=r+"<li><a href='"+s+"'>"+a[o].menu_name+"</a></li>"}e(".breadcrumb").html(r),e(".breadcrumb").removeClass("hide")}}function u(){e("#list_loading").removeClass("hide"),n.dao.productsbymenuandtag({currencyId:n.util.getLocalCurrency(),productType:x,currentPage:_.curPage,orderby:f,tags:v.join(",")},function(t){if(c(t.tags),t.page){_.amount=t.page.amount,_.pageSize=t.page.pageSize;var i=(_.curPage-1)*_.pageSize+1,a=_.curPage*_.pageSize;a>_.amount&&(a=_.amount),e("#current_product_number").html(i+"-"+a),e("#product_total_number").html(_.amount)}else e("#current_product_number").html("0-0"),e("#product_total_number").html(0);var n=t.products;n&&n.length>0?(m(n),h(n),g(),e("#item_list").show(),e(".empty-data").hide()):(e("#item_list").hide(),e(".empty-data").show()),e(".sort-wrap").removeClass("invisibility"),l(),e(".loading-mask").addClass("hide"),e("footer").removeClass("invisibility")},null,function(){e(".loading-mask").addClass("hide"),e("footer").removeClass("invisibility"),e("#list_loading").addClass("hide")}),c()}function l(){if(sessionStorage.menus&&!n.util.isMobile()){var t=JSON.parse(sessionStorage.menus);if(t=d(t)){e("#classify_list_wrap").html(e("#classifyListTempl").tmpl(t)),e("#classify_list_wrap_parent").removeClass("hide"),e("#classify_list_wrap a").each(function(){var t=e(this).attr("href");if(t&&t.indexOf("-l-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),o=n.util.getListParams(t),s=o[o.length-2];s=n.util.encodeMenuType(s);var u=t.substring(0,t.indexOf("-l-")),l=n.util.formatProductName(u)+"-l-"+s+"-"+r+".html"+a;e(this).attr("href",l)}else if(t&&t.indexOf("-g-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),o=n.util.getListParams(t),s=o[o.length-2];s=n.util.encodeMenuType(s);var u=t.substring(0,t.indexOf("-g-")),l=n.util.formatProductName(u)+"-g-"+s+"-"+r+".html"+a;e(this).attr("href",l)}});var i=x;C&&(i=C);for(var a=e("#classify_list_wrap span"),r=0;r<a.length;r++){a[r].id==i?e(a[r]).addClass("selected"):e(a[r]).removeClass("selected");for(var o=0;o<n.util.menu.length;o++)if(a[r].id==n.util.menu[o].menu_type){"classify_list_wrap"!==e(a[r]).parent().parent().parent().parent()[0].id&&"div"!==e(a[r]).parent().parent().parent().parent()[0].tagName.toLowerCase()&&(e(a[r]).parent().parent().parent().parent().find("ul:first").removeClass("hide"),e(a[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").addClass("icon-jiantou-shang-cuxiantiao"),e(a[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").removeClass("icon-jiantou-xia-cuxiantiao"));break}}p(C?n.util.menu[n.util.menu.length-2]:n.util.menu[n.util.menu.length-1]),e("#classify_list_wrap #arrow_icon").bind("click",function(){e(this).find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(e(this).parent().parent().parent().find("ul:first").removeClass("hide"),e(this).find("i").removeClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").addClass("icon-jiantou-shang-cuxiantiao")):(e(this).parent().parent().parent().find("ul:first").addClass("hide"),e(this).find("i").addClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}),e("#classify_list_wrap .media-body a").bind("click",function(){if("javascript:void(0)"==e(this).attr("href")){event.stopPropagation();var t=e(this).parent().parent().find(".media-right #arrow_icon");t.find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(t.parent().parent().parent().find("ul:first").removeClass("hide"),t.find("i").removeClass("icon-jiantou-xia-cuxiantiao"),t.find("i").addClass("icon-jiantou-shang-cuxiantiao")):(t.parent().parent().parent().find("ul:first").addClass("hide"),t.find("i").addClass("icon-jiantou-xia-cuxiantiao"),t.find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}})}}else if(sessionStorage.menus&&n.util.isMobile()){e("#classify_list_wrap_parent").hide();var t=JSON.parse(sessionStorage.menus);if(t=d(t)){e("#menu_list_wrap").html(e("#menuListTempl").tmpl(t)),e("#menu_list_wrap a").each(function(){event.stopPropagation();var t=e(this).attr("href");if(t&&t.indexOf("-l-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),o=n.util.getListParams(t),s=o[o.length-2];s=n.util.encodeMenuType(s);var u=t.substring(0,t.indexOf("-l-")),l=n.util.formatProductName(u)+"-l-"+s+"-"+r+".html"+a;e(this).attr("href",l)}else if(t&&t.indexOf("-g-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),o=n.util.getListParams(t),s=o[o.length-2];s=n.util.encodeMenuType(s);var u=t.substring(0,t.indexOf("-g-")),l=n.util.formatProductName(u)+"-g-"+s+"-"+r+".html"+a;e(this).attr("href",l)}});var i=x;C&&(i=C);for(var a=e("#menu_list_wrap span"),r=0;r<a.length;r++){a[r].id==i?e(a[r]).addClass("selected"):e(a[r]).removeClass("selected");for(var o=0;o<n.util.menu.length;o++)if(a[r].id==n.util.menu[o].menu_type){"menu_list_wrap"!==e(a[r]).parent().parent().parent().parent()[0].id&&"div"!==e(a[r]).parent().parent().parent().parent()[0].tagName.toLowerCase()&&(e(a[r]).parent().parent().parent().parent().find("ul:first").removeClass("hide"),e(a[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").addClass("icon-jiantou-shang-cuxiantiao"),e(a[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").removeClass("icon-jiantou-xia-cuxiantiao"));break}}p(C?n.util.menu[n.util.menu.length-2]:n.util.menu[n.util.menu.length-1]),e("#menu_list_wrap #arrow_icon").bind("click",function(){event.stopPropagation(),e(this).find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(e(this).parent().parent().parent().find("ul:first").removeClass("hide"),e(this).find("i").removeClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").addClass("icon-jiantou-shang-cuxiantiao")):(e(this).parent().parent().parent().find("ul:first").addClass("hide"),e(this).find("i").addClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}),e("#menu_list_wrap .media-body a").bind("click",function(){if("javascript:void(0)"==e(this).attr("href")){event.stopPropagation();var t=e(this).parent().parent().find(".media-right #arrow_icon");t.find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(t.parent().parent().parent().find("ul:first").removeClass("hide"),t.find("i").removeClass("icon-jiantou-xia-cuxiantiao"),t.find("i").addClass("icon-jiantou-shang-cuxiantiao")):(t.parent().parent().parent().find("ul:first").addClass("hide"),t.find("i").addClass("icon-jiantou-xia-cuxiantiao"),t.find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}})}}}function p(t){if("1"==sessionStorage.show_group_classify&&t&&"1"==t.supportgp){var i=JSON.parse(JSON.stringify(t.next_menu));i.push({menu_name:e.i18n.map.ViewAll[0],menu_type:t.menu_type});var a=n.util.getAdvSource().u;a||(a=n.util.getQueryString("u"));var r="";a&&(r="&u="+a);for(var o=n.util.encodeMenuType(n.util.getUvid()),s=0;s<i.length;s++)s==i.length-1?i[s].href=n.util.formatProductName(i[s].menu_name)+"-l-"+n.util.encodeMenuType(i[s].menu_type)+"-"+o+".html"+r:i[s].href=n.util.formatProductName(i[s].menu_name)+"-l-"+n.util.encodeMenuType(i[s].menu_type)+"-"+o+".html?parentId="+n.util.encodeMenuType(t.menu_type)+r,n.util.menu[n.util.menu.length-1].menu_type==i[s].menu_type?i[s].selected=!0:i[s].selected=!1;e("#group_sub_classify").html(e("#groupSubClassifyTempl").tmpl(i)),e("#group_sub_classify").removeClass("hide")}}function d(t){for(var i=0;i<t.length;i++)if(t[i].next_menu.length>0){t[i].next_menu=t[i].next_menu.concat([{menu_name:e.i18n.map.ViewAll,menu_type:t[i].menu_type,next_menu:"",p_menu_type:t[i].p_menu_type,supportgp:"0"}]);for(var a=0;a<t[i].next_menu.length;a++){var n=t[i].next_menu[a];n.next_menu.length>0&&(n.next_menu=n.next_menu.concat([{menu_name:e.i18n.map.ViewAll,menu_type:n.menu_type,next_menu:"",p_menu_type:n.p_menu_type,supportgp:"0"}]))}}return t}function c(t){t&&t.length>0&&(e("#label_list_wrap").html(e("#labelListTempl").tmpl(t)),e("#label_list_wrap").removeClass("hide"),e(".label-item").each(function(){for(var t=0;t<v.length;t++)e(this)[0].id==v[t]&&e(this).addClass("selected")}),e(".label-item").bind("click",function(t){var i=e(this)[0].id;if(e(this).hasClass("selected")){e(this).removeClass("selected");for(var a=0;a<v.length;a++)v[a]==i&&v.splice(a,1)}else e(this).addClass("selected"),v.push(i);console.log(v),u()}))}function m(t){var i=n.util.getCurrencySymbol(n.util.getLocalCurrency()),a=n.util.getAdvSource().u;a||(a=n.util.getQueryString("u"));var r=n.util.encodeMenuType(n.util.getUvid()),s="";a&&(s="?u="+a);for(var u=0;u<t.length;u++){for(var l=t[u],p=0;p<l.display_data.length;p++){var d=l.display_data[p];d.original_price=n.util.formatProductPrice(d.original_price,i),d.current_price=n.util.formatProductPrice(d.current_price,i),d.img_display=n.util.picUrl+d.img_display,d.color_img=n.util.picUrl+d.color_img,d.height=n.util.getImageHeight(),d.top=Number(n.util.getImageHeight())-50,d.href=n.util.formatProductName(l.product_name)+"-d-"+n.util.encodeMenuType(l.product_id)+"-"+n.util.encodeMenuType(d.color_id)+"-"+r+".html"+s}l.showColor=sessionStorage.img_block}e("#item_list").html(e("#productItemTempl").tmpl(t)),e("#item_list #label1").text(e.i18n.map.Label1),e("#item_list #label2").text(e.i18n.map.Label2),o()}function g(){var t=0;t=_.amount%_.pageSize==0?parseInt(_.amount/_.pageSize):parseInt(_.amount/_.pageSize)+1,n.util.isMobile()&&t>1?(e("#prev_btn").show(),e("#next_btn").show()):(e("#prev_btn").hide(),e("#next_btn").hide()),e(function(){var i={bootstrapMajorVersion:1,currentPage:_.curPage,numberOfPages:5,totalPages:t,shouldShowPage:!0,onPageClicked:function(t,a,n,r){_.curPage!==r&&(_.curPage=r,e("html").scrollTop(0),u(),i.currentPage=r,"top_page"==t.currentTarget.id?e("#page").bootstrapPaginator(i):e("#top_page").bootstrapPaginator(i))},onPageChanged:function(e,t,i){var a=window.location.href;a.indexOf("/#/")>-1&&(a=a.substring(0,a.indexOf("/#/"))),history.pushState("","",a+"/#/"+i)}};e("#page").bootstrapPaginator(i),e("#top_page").bootstrapPaginator(i)})}function h(t){e("#item_list .color-wrap img").bind("click",function(i){i.stopPropagation();var a=e(this).parent().parent().parent().data().data,n=e(this).data().data,r=t[a].display_data[n];e(this).parent().parent().find("img").removeClass("selected"),e(this).addClass("selected");var o=r.href;e(this).parent().parent().parent().find("a:first").attr("href",o),e(this).parent().parent().parent().find("img:first").attr("src",r.img_display),e(this).parent().parent().parent().find(".product-name").html(r.pcName),e(this).parent().parent().parent().find(".product-ext-name").html(r.pcNameExt),e(this).parent().parent().parent().find(".price-wrap .goods-price").html(r.current_price),e(this).parent().parent().parent().find(".price-wrap .goods-del-price").html(r.original_price)})}console.log("list.js"),n.util.getCookie("isFirst")||(n.util.setCookie("isFirst",0),e(".loading-mask").removeClass("hide")),n.initLoginStatus(),n.setLanguageCallback(function(){e("#breadcrumb_home").text(e.i18n.map.Home),e("#sort_method").html(e.i18n.map.SortRecommended)});var f=1,_={amount:0,curPage:1,pageSize:0},v=[],y=window.location.href,b=n.util.getListParams(y),x=n.util.decodeMenuType(b[b.length-2]),C=n.util.decodeMenuType(n.util.getQueryString("parentId"));y.indexOf("/#/")>-1&&(_.curPage=parseInt(y.substring(y.indexOf("/#/")+3))),n.util.menu=[],n.util.getClassifyNames(x,function(){s(),e("#sort_method").html(e.i18n.map.SortRecommended)}),n.util.isMobile()?(e("#menu_icon").removeClass("hide"),e("#menu_icon").click(function(){e("body").css("overflow","hidden"),e("#menu_mask").removeClass("hide"),e("#menu_mask").click(function(){e("body").css("overflow","auto"),e("#menu_mask").addClass("hide")})}),e("#breadcrumb").css("height","50px"),e("#breadcrumb").css("padding","15px")):e("#menu_icon").addClass("hide"),e("#sort_method").html(e.i18n.map.SortRecommended),e("#sort_list li a").bind("click",function(){e("#sort_method").html(e(this)[0].text),_.curPage=1,f=Number(e(this)[0].id),u()}),n.setCurrencyCodeCallback(function(){u(x)}),function(){n.dao.getMenuAdsCnt({productType:x},function(t){t?(e(".category-adv-wrap").show(),e(".category-adv-wrap").html(t)):e(".category-adv-wrap").hide()})}()});