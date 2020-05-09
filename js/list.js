"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","bootstrapPaginator"],function(e,t,i,a,n,r){function o(){e("#menu_icon").click(function(){e("body").css("overflow","hidden"),e("#menu_mask").removeClass("hide")}),e("#menu_mask").click(function(){e("body").css("overflow","auto"),e("#menu_mask").addClass("hide")}),e("#prev_btn").unbind("click").click(function(){f.curPage>1&&(f.curPage=f.curPage-1,e("html").scrollTop(0),u()),e("#page").bootstrapPaginator("showPrevious"),e("#top_page").bootstrapPaginator("showPrevious")}),e("#next_btn").unbind("click").click(function(){var t=0;t=f.amount%f.pageSize==0?parseInt(f.amount/f.pageSize):parseInt(f.amount/f.pageSize)+1,f.curPage<t&&(f.curPage=f.curPage+1,e("html").scrollTop(0),u()),e("#page").bootstrapPaginator("showNext"),e("#top_page").bootstrapPaginator("showNext")})}function s(){if(n.util.menu&&n.util.menu.length>0){var t=n.util.getAdvSource().u;t||(t=n.util.getQueryString("u"));var i="";t&&(i="?u="+t);for(var a=n.util.menu.reverse(),r="<li><a id='breadcrumb_home' href='/'>"+e.i18n.map.Home+"</a></li>",o=0;o<a.length;o++){var s=a[o].menu_name+"-l-"+n.util.encodeMenuType(a[o].menu_type)+"-"+n.util.encodeMenuType(n.util.getUvid())+".html"+i;"1"==a[o].supportgp&&(s="./../../../group.html?type="+n.util.encodeMenuType(a[o].menu_type)),o==a.length-1?(r=r+"<li class='active'><a href='"+s+"'>"+a[o].menu_name+"</a></li>",e("#product_classify_name").html(a[o].menu_name),document.title=a[o].menu_name):r=r+"<li><a href='"+s+"'>"+a[o].menu_name+"</a></li>"}e(".breadcrumb").html(r),e(".breadcrumb").removeClass("hide")}}function u(){e("#list_loading").removeClass("hide"),n.dao.productsbymenuandtag({currencyId:n.util.getLocalCurrency(),productType:b,currentPage:f.curPage,orderby:g,tags:_.join(",")},function(t){if(d(t.tags),t.page){f.amount=t.page.amount,f.pageSize=t.page.pageSize;var i=(f.curPage-1)*f.pageSize+1,a=f.curPage*f.pageSize;a>f.amount&&(a=f.amount),e("#current_product_number").html(i+"-"+a),e("#product_total_number").html(f.amount)}else e("#current_product_number").html("0-0"),e("#product_total_number").html(0);var n=t.products;n&&n.length>0?(c(n),h(n),m(),e("#item_list").show(),e(".empty-data").hide()):(e("#item_list").hide(),e(".empty-data").show()),e(".sort-wrap").removeClass("invisibility"),l(),e(".loading-mask").addClass("hide"),e("footer").removeClass("invisibility")},null,function(){e(".loading-mask").addClass("hide"),e("footer").removeClass("invisibility"),e("#list_loading").addClass("hide")}),d()}function l(){if(sessionStorage.menus&&!n.util.isMobile()){var t=JSON.parse(sessionStorage.menus);if(t=p(t)){e("#classify_list_wrap").html(e("#classifyListTempl").tmpl(t)),e("#classify_list_wrap_parent").removeClass("hide"),e("#classify_list_wrap a").each(function(){var t=e(this).attr("href");if(t&&t.indexOf("-l-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),o=n.util.getListParams(t),s=o[o.length-2];s=n.util.encodeMenuType(s);var u=t.substring(0,t.indexOf("-l-")),l=n.util.formatProductName(u)+"-l-"+s+"-"+r+".html"+a;e(this).attr("href",l)}else if(t&&t.indexOf("group.html")>-1){var r=n.util.encodeMenuType(n.util.getUvid()),p=t.substring(t.indexOf("menu_type=")+10),l="./../../../group.html?type="+n.util.encodeMenuType(p)+"&uvid="+r;e(this).attr("href",l)}});for(var i=e("#classify_list_wrap span"),a=0;a<i.length;a++){i[a].id==b?e(i[a]).addClass("selected"):e(i[a]).removeClass("selected");for(var r=0;r<n.util.menu.length;r++)if(i[a].id==n.util.menu[r].menu_type){"classify_list_wrap"!==e(i[a]).parent().parent().parent().parent()[0].id&&"div"!==e(i[a]).parent().parent().parent().parent()[0].tagName.toLowerCase()&&(e(i[a]).parent().parent().parent().parent().find("ul:first").removeClass("hide"),e(i[a]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").addClass("icon-jiantou-shang-cuxiantiao"),e(i[a]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").removeClass("icon-jiantou-xia-cuxiantiao"));break}}e("#classify_list_wrap #arrow_icon").bind("click",function(){e(this).find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(e(this).parent().parent().parent().find("ul:first").removeClass("hide"),e(this).find("i").removeClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").addClass("icon-jiantou-shang-cuxiantiao")):(e(this).parent().parent().parent().find("ul:first").addClass("hide"),e(this).find("i").addClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}),e("#classify_list_wrap .media-body a").bind("click",function(){if("javascript:void(0)"==e(this).attr("href")){event.stopPropagation();var t=e(this).parent().parent().find(".media-right #arrow_icon");t.find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(t.parent().parent().parent().find("ul:first").removeClass("hide"),t.find("i").removeClass("icon-jiantou-xia-cuxiantiao"),t.find("i").addClass("icon-jiantou-shang-cuxiantiao")):(t.parent().parent().parent().find("ul:first").addClass("hide"),t.find("i").addClass("icon-jiantou-xia-cuxiantiao"),t.find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}})}}else if(sessionStorage.menus&&n.util.isMobile()){e("#classify_list_wrap_parent").hide();var t=JSON.parse(sessionStorage.menus);if(t=p(t)){e("#menu_list_wrap").html(e("#menuListTempl").tmpl(t)),e("#menu_list_wrap a").each(function(){event.stopPropagation();var t=e(this).attr("href");if(t&&t.indexOf("-l-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),o=n.util.getListParams(t),s=o[o.length-2];s=n.util.encodeMenuType(s);var u=t.substring(0,t.indexOf("-l-")),l=n.util.formatProductName(u)+"-l-"+s+"-"+r+".html"+a;e(this).attr("href",l)}else if(t&&t.indexOf("group.html")>-1){var r=n.util.encodeMenuType(n.util.getUvid()),p=t.substring(t.indexOf("menu_type=")+10),l="./../../../group.html?type="+n.util.encodeMenuType(p)+"&uvid="+r;e(this).attr("href",l)}});for(var i=e("#menu_list_wrap span"),a=0;a<i.length;a++){i[a].id==b?e(i[a]).addClass("selected"):e(i[a]).removeClass("selected");for(var r=0;r<n.util.menu.length;r++)if(i[a].id==n.util.menu[r].menu_type){"menu_list_wrap"!==e(i[a]).parent().parent().parent().parent()[0].id&&"div"!==e(i[a]).parent().parent().parent().parent()[0].tagName.toLowerCase()&&(e(i[a]).parent().parent().parent().parent().find("ul:first").removeClass("hide"),e(i[a]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").addClass("icon-jiantou-shang-cuxiantiao"),e(i[a]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").removeClass("icon-jiantou-xia-cuxiantiao"));break}}e("#menu_list_wrap #arrow_icon").bind("click",function(){event.stopPropagation(),e(this).find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(e(this).parent().parent().parent().find("ul:first").removeClass("hide"),e(this).find("i").removeClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").addClass("icon-jiantou-shang-cuxiantiao")):(e(this).parent().parent().parent().find("ul:first").addClass("hide"),e(this).find("i").addClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}),e("#menu_list_wrap .media-body a").bind("click",function(){if("javascript:void(0)"==e(this).attr("href")){event.stopPropagation();var t=e(this).parent().parent().find(".media-right #arrow_icon");t.find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(t.parent().parent().parent().find("ul:first").removeClass("hide"),t.find("i").removeClass("icon-jiantou-xia-cuxiantiao"),t.find("i").addClass("icon-jiantou-shang-cuxiantiao")):(t.parent().parent().parent().find("ul:first").addClass("hide"),t.find("i").addClass("icon-jiantou-xia-cuxiantiao"),t.find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}})}}}function p(t){for(var i=0;i<t.length;i++)if(t[i].next_menu.length>0){t[i].next_menu=t[i].next_menu.concat([{menu_name:e.i18n.map.ViewAll,menu_type:t[i].menu_type,next_menu:"",p_menu_type:t[i].p_menu_type,supportgp:"0"}]);for(var a=0;a<t[i].next_menu>0;a++){var n=t[i].next_menu[a];n.next_menu.length>0&&(n[a].next_menu=n[a].next_menu.concat([{menu_name:e.i18n.map.ViewAll,menu_type:n[a].menu_type,next_menu:"",p_menu_type:n[a].p_menu_type,supportgp:"0"}]))}}return t}function d(t){t&&t.length>0&&(e("#label_list_wrap").html(e("#labelListTempl").tmpl(t)),e(".label-item").each(function(){for(var t=0;t<_.length;t++)e(this)[0].id==_[t]&&e(this).addClass("selected")}),e(".label-item").bind("click",function(t){var i=e(this)[0].id;if(e(this).hasClass("selected")){e(this).removeClass("selected");for(var a=0;a<_.length;a++)_[a]==i&&_.splice(a,1)}else e(this).addClass("selected"),_.push(i);console.log(_),u()}))}function c(t){var i=n.util.getCurrencySymbol(n.util.getLocalCurrency()),a=n.util.getAdvSource().u;a||(a=n.util.getQueryString("u"));var r=n.util.encodeMenuType(n.util.getUvid()),s="";a&&(s="?u="+a);for(var u=0;u<t.length;u++){for(var l=t[u],p=0;p<l.display_data.length;p++){var d=l.display_data[p];d.original_price=n.util.formatProductPrice(d.original_price,i),d.current_price=n.util.formatProductPrice(d.current_price,i),d.img_display=n.util.picUrl+d.img_display,d.color_img=n.util.picUrl+d.color_img,d.height=n.util.getImageHeight(),d.href=n.util.formatProductName(l.product_name)+"-d-"+n.util.encodeMenuType(l.product_id)+"-"+n.util.encodeMenuType(d.color_id)+"-"+r+".html"+s}l.showColor=sessionStorage.img_block}e("#item_list").html(e("#productItemTempl").tmpl(t)),e("#item_list #label1").text(e.i18n.map.Label1),e("#item_list #label2").text(e.i18n.map.Label2),o()}function m(){var t=0;t=f.amount%f.pageSize==0?parseInt(f.amount/f.pageSize):parseInt(f.amount/f.pageSize)+1,n.util.isMobile()&&t>1?(e("#prev_btn").show(),e("#next_btn").show()):(e("#prev_btn").hide(),e("#next_btn").hide()),e(function(){var i={bootstrapMajorVersion:1,currentPage:f.curPage,numberOfPages:5,totalPages:t,shouldShowPage:!0,onPageClicked:function(t,a,n,r){f.curPage!==r&&(f.curPage=r,e("html").scrollTop(0),u(),i.currentPage=r,"top_page"==t.currentTarget.id?e("#page").bootstrapPaginator(i):e("#top_page").bootstrapPaginator(i))},onPageChanged:function(e,t,i){var a=window.location.href;a.indexOf("/#/")>-1&&(a=a.substring(0,a.indexOf("/#/"))),history.pushState("","",a+"/#/"+i)}};e("#page").bootstrapPaginator(i),e("#top_page").bootstrapPaginator(i)})}function h(t){e("#item_list .color-wrap img").bind("click",function(i){i.stopPropagation();var a=e(this).parent().parent().parent().data().data,n=e(this).data().data,r=t[a].display_data[n];e(this).parent().parent().find("img").removeClass("selected"),e(this).addClass("selected");var o=r.href;e(this).parent().parent().parent().find("a:first").attr("href",o),e(this).parent().parent().parent().find("img:first").attr("src",r.img_display),e(this).parent().parent().parent().find(".product-name").html(r.pcName),e(this).parent().parent().parent().find(".product-ext-name").html(r.pcNameExt),e(this).parent().parent().parent().find(".price-wrap .goods-price").html(r.current_price),e(this).parent().parent().parent().find(".price-wrap .goods-del-price").html(r.original_price)})}console.log("list.js"),n.util.getCookie("isFirst")||(n.util.setCookie("isFirst",0),e(".loading-mask").removeClass("hide")),n.initLoginStatus(),n.setLanguageCallback(function(){e("#breadcrumb_home").text(e.i18n.map.Home),e("#sort_method").html(e.i18n.map.SortRecommended)});var g=1,f={amount:0,curPage:1,pageSize:0},_=[],v=window.location.href,x=n.util.getListParams(v),b=n.util.decodeMenuType(x[x.length-2]);v.indexOf("/#/")>-1&&(f.curPage=parseInt(v.substring(v.indexOf("/#/")+3))),n.util.menu=[],n.util.getClassifyNames(b,function(){s(),e("#sort_method").html(e.i18n.map.SortRecommended)}),n.util.isMobile()?(e("#menu_icon").removeClass("hide"),e("#breadcrumb").css("height","50px"),e("#breadcrumb").css("padding","15px")):e("#menu_icon").addClass("hide"),e("#sort_method").html(e.i18n.map.SortRecommended),e("#sort_list li a").bind("click",function(){e("#sort_method").html(e(this)[0].text),f.curPage=1,g=Number(e(this)[0].id),u()}),n.setCurrencyCodeCallback(function(){u(b)}),function(){n.dao.getMenuAdsCnt({productType:b},function(t){t?(e(".category-adv-wrap").show(),e(".category-adv-wrap").html(t)):e(".category-adv-wrap").hide()})}()});