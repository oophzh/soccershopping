"use strict";
require.config(requireConfig),require(["jquery","tmpl","i18n","bootstrap","common","bootstrapPaginator"],function(e,t,i,a,n,r){function s(){sessionStorage.list_lable_bg&&e(".product-label-item").css("background",sessionStorage.list_lable_bg),sessionStorage.list_lable_fc&&e(".product-label-item").css("color",sessionStorage.list_lable_fc),e("#category_icon_parent").click(function(){e("body").css("overflow","hidden"),e("#menu_mask").removeClass("hide"),e("#menu_mask").click(function(){e("body").css("overflow","auto"),e("#menu_mask").addClass("hide")})}),e("#load_more_btn").unbind("click").click(function(){C.curPage<x&&!S&&(S=!0,C.curPage=C.curPage+1,e("#list_refresh_loading").removeClass("hide"),o())}),n.util.isMobile()&&e(window).bind("scroll",function(){e(document).scrollTop()+e(window).height()>e(document).height()-10&&!S&&C.curPage<x&&(S=!0,C.curPage=C.curPage+1,e("#list_refresh_loading").removeClass("hide"),o())})}function l(){if(n.util.menu&&n.util.menu.length>0){var t=n.util.getAdvSource().u;t||(t=n.util.getQueryString("u"));var i="";t&&(i="?u="+t);for(var a=n.util.menu.reverse(),r="<li><a id='breadcrumb_home' href='/'>"+e.i18n.map.Home+"</a></li>",s=0;s<a.length;s++){var l=n.util.formatProductName(a[s].menu_name)+"-l-"+n.util.encodeMenuType(a[s].menu_type)+"-"+n.util.encodeMenuType(n.util.getUvid())+".html"+i;"1"==a[s].supportgp&&(l=n.util.formatProductName(a[s].menu_name)+"-g-"+n.util.encodeMenuType(a[s].menu_type)+"-"+n.util.encodeMenuType(n.util.getUvid())+".html"+i),s==a.length-1?(r=r+"<li class='active'><a href='"+l+"'>"+a[s].menu_name+"</a></li>",e("#product_classify_name").html(a[s].menu_name),document.title=a[s].menu_name):r=r+"<li><a href='"+l+"'>"+a[s].menu_name+"</a></li>"}e(".breadcrumb").html(r),e(".breadcrumb").removeClass("hide")}}function o(){e("#list_loading").removeClass("hide"),n.dao.productsbymenuandtag({currencyId:n.util.getLocalCurrency(),productType:k,currentPage:C.curPage,orderby:b,tags:w.join(",")},function(t){if(g(t.tags),t.page){C.amount=t.page.amount,C.pageSize=t.page.pageSize,C.curPage=t.page.curPage;var i=(C.curPage-1)*C.pageSize+1,a=C.curPage*C.pageSize;a>C.amount&&(a=C.amount),n.util.isMobile()?e("#current_product_number").html("1-"+a):e("#current_product_number").html(i+"-"+a),e("#product_total_number").html(C.amount),x=C.amount%C.pageSize==0?parseInt(C.amount/C.pageSize):parseInt(C.amount/C.pageSize)+1}else e("#current_product_number").html("0-0"),e("#product_total_number").html(0);var r=t.products;r&&r.length>0?(h(r),y(r),f(),e("#item_list").show(),e(".empty-data").hide()):(e("#item_list").hide(),e(".empty-data").show()),e(".sort-wrap").removeClass("invisibility"),u(),e(".loading-mask").addClass("hide"),e("footer").removeClass("invisibility"),S=!1},null,function(){e(".loading-mask").addClass("hide"),e("footer").removeClass("invisibility"),e("#list_loading").addClass("hide"),e("#list_refresh_loading").addClass("hide")}),g()}function u(){if(sessionStorage.menus&&!n.util.isMobile()){var t=JSON.parse(sessionStorage.menus);if(t=p(t)){e("#classify_list_wrap").html(e("#classifyListTempl").tmpl(t)),e("#classify_list_wrap_parent").removeClass("hide"),e("#classify_list_wrap a").each(function(){var t=e(this).attr("href");if(t&&t.indexOf("-l-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),s=n.util.getListParams(t),l=s[s.length-2];l=n.util.encodeMenuType(l);var o=t.substring(0,t.indexOf("-l-")),u=n.util.formatProductName(o)+"-l-"+l+"-"+r+".html"+a;e(this).attr("href",u)}else if(t&&t.indexOf("-g-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),s=n.util.getListParams(t),l=s[s.length-2];l=n.util.encodeMenuType(l);var o=t.substring(0,t.indexOf("-g-")),u=n.util.formatProductName(o)+"-g-"+l+"-"+r+".html"+a;e(this).attr("href",u)}});var i=k;M&&(i=M);for(var a=e("#classify_list_wrap span"),r=0;r<a.length;r++){a[r].id==i?e(a[r]).addClass("selected"):e(a[r]).removeClass("selected");for(var s=0;s<n.util.menu.length;s++)if(a[r].id==n.util.menu[s].menu_type){"classify_list_wrap"!==e(a[r]).parent().parent().parent().parent()[0].id&&"div"!==e(a[r]).parent().parent().parent().parent()[0].tagName.toLowerCase()&&(e(a[r]).parent().parent().parent().parent().find("ul:first").removeClass("hide"),e(a[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").addClass("icon-jiantou-shang-cuxiantiao"),e(a[r]).parent().parent().parent().parent().find(".icon-jiantou-xia-cuxiantiao:first").removeClass("icon-jiantou-xia-cuxiantiao"));break}}d(M?n.util.menu[n.util.menu.length-2]:n.util.menu[n.util.menu.length-1]);var l=n.util.menu[n.util.menu.length-1];l&&l.next_menu.length>0?m(l):(l=n.util.menu[n.util.menu.length-2],m(l)),e("#classify_list_wrap #arrow_icon").bind("click",function(){e(this).find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(e(this).parent().parent().parent().find("ul:first").removeClass("hide"),e(this).find("i").removeClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").addClass("icon-jiantou-shang-cuxiantiao")):(e(this).parent().parent().parent().find("ul:first").addClass("hide"),e(this).find("i").addClass("icon-jiantou-xia-cuxiantiao"),e(this).find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}),e("#classify_list_wrap .media-body a").bind("click",function(){if("javascript:void(0)"==e(this).attr("href")){event.stopPropagation();var t=e(this).parent().parent().find(".media-right #arrow_icon");t.find("i").hasClass("icon-jiantou-xia-cuxiantiao")?(t.parent().parent().parent().find("ul:first").removeClass("hide"),t.find("i").removeClass("icon-jiantou-xia-cuxiantiao"),t.find("i").addClass("icon-jiantou-shang-cuxiantiao")):(t.parent().parent().parent().find("ul:first").addClass("hide"),t.find("i").addClass("icon-jiantou-xia-cuxiantiao"),t.find("i").removeClass("icon-jiantou-shang-cuxiantiao"))}})}}else if(sessionStorage.menus&&n.util.isMobile()){e("#classify_list_wrap_parent").hide();var t=JSON.parse(sessionStorage.menus);if(t=p(t)){if(e("#menu_list_wrap").html(e("#menuListTempl").tmpl(t)),e("#menu_list_wrap a").each(function(){e(this).click(function(){event.stopPropagation();var t=e(this).attr("href");if(t&&t.indexOf("-l-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),s=n.util.getListParams(t),l=s[s.length-2];l=n.util.encodeMenuType(l);var o=t.substring(0,t.indexOf("-l-")),u=n.util.formatProductName(o)+"-l-"+l+"-"+r+".html"+a;e(this).attr("href",u)}else if(t&&t.indexOf("-g-")>-1){var i=n.util.getAdvSource().u;i||(i=n.util.getQueryString("u"));var a="";i&&(a="?u="+i);var r=n.util.encodeMenuType(n.util.getUvid()),s=n.util.getListParams(t),l=s[s.length-2];l=n.util.encodeMenuType(l);var o=t.substring(0,t.indexOf("-g-")),u=n.util.formatProductName(o)+"-g-"+l+"-"+r+".html"+a;e(this).attr("href",u)}})}),sessionStorage.selected_category_id)for(var a=e("#menu_list_wrap span"),r=0;r<a.length;r++)a[r].id==sessionStorage.selected_category_id?(e(a[r]).addClass("sale-selected"),e(a[r]).parent().parent().parent().find("li .classify-title").addClass("red")):e(a[r]).removeClass("sale-selected");for(var i=k,a=e("#menu_list_wrap span"),r=0;r<a.length;r++){a[r].id==i?e(a[r]).addClass("selected"):e(a[r]).removeClass("selected");for(var s=0;s<n.util.menu.length;s++)if(a[r].id==n.util.menu[s].menu_type){"menu_list_wrap"!==e(a[r]).parent().parent().parent()[0].id&&"div"!==e(a[r]).parent().parent().parent()[0].tagName.toLowerCase()&&(e(a[r]).parent().parent().parent().find("ul:first").css("display","block"),e(a[r]).parent().parent().parent().find(".icon-21:first").addClass("icon-jianhao"),e(a[r]).parent().parent().parent().find(".icon-21:first").removeClass("icon-21"),e(a[r]).parent().parent().parent().css("background","#F5F5F5"));break}}d(M?n.util.menu[n.util.menu.length-2]:n.util.menu[n.util.menu.length-1]);var l=n.util.menu[n.util.menu.length-1];l&&l.next_menu.length>0?m(l):(l=n.util.menu[n.util.menu.length-2],m(l)),e("#menu_list_wrap #arrow_icon").bind("click",function(){event.stopPropagation(),e(this).find("i").hasClass("icon-21")?(e(this).parent().parent().css("background","#F5F5F5"),e(this).parent().find(".left-title-wrap .classify-title").addClass("open"),e(this).parent().parent().find("ul:first").slideDown(500),e(this).find("i").removeClass("icon-21"),e(this).find("i").addClass("icon-jianhao")):(e(this).parent().hasClass("second-menu-item")||e(this).parent().parent().css("background","#fff"),e(this).parent().find(".left-title-wrap .classify-title").removeClass("open"),e(this).parent().parent().find("ul:first").slideUp(500),e(this).find("i").addClass("icon-21"),e(this).find("i").removeClass("icon-jianhao"))})}}}function d(t){if("1"==sessionStorage.show_group_classify&&t&&"1"==t.supportgp){var i=JSON.parse(JSON.stringify(t.next_menu));i.push({menu_name:e.i18n.map.ViewAll[0],menu_type:t.menu_type});var a=n.util.getAdvSource().u;a||(a=n.util.getQueryString("u"));var r="";a&&(r="&u="+a);for(var s=n.util.encodeMenuType(n.util.getUvid()),l=0;l<i.length;l++)l==i.length-1?i[l].href=n.util.formatProductName(i[l].menu_name)+"-l-"+n.util.encodeMenuType(i[l].menu_type)+"-"+s+".html"+r:i[l].href=n.util.formatProductName(i[l].menu_name)+"-l-"+n.util.encodeMenuType(i[l].menu_type)+"-"+s+".html?parentId="+n.util.encodeMenuType(t.menu_type)+r,n.util.menu[n.util.menu.length-1].menu_type==i[l].menu_type?i[l].selected=!0:i[l].selected=!1;e("#group_sub_classify").html(e("#groupSubClassifyTempl").tmpl(i)),e("#group_sub_classify").removeClass("hide")}}function m(t){if(t){var i=t.next_menu;if((i=i.concat([{menu_name:1==e.i18n.map.ViewAll.length?e.i18n.map.ViewAll[0]:e.i18n.map.ViewAll,menu_type:t.menu_type,next_menu:"",p_menu_type:t.p_menu_type,supportgp:t.supportgp,tagimg:t.tagimg,menu_icon:t.menu_icon}]))&&i.length>0&&i[0].tagimg){var a=n.util.getAdvSource().u;a||(a=n.util.getQueryString("u"));var r="";a&&(r="&u="+a);for(var s=n.util.encodeMenuType(n.util.getUvid()),l=0;l<i.length;l++)i[l].href=n.util.formatProductName(i[l].menu_name)+"-l-"+n.util.encodeMenuType(i[l].menu_type)+"-"+s+".html"+r,i[l].menu_type==k?i[l].selected=!0:i[l].selected=!1,i[l].tagimg&&-1==i[l].tagimg.indexOf("http")&&(i[l].tagimg=n.util.picUrl+i[l].tagimg);e("#sub_classify_list").html(e("#subClassifyListTempl").tmpl(i)),e(".sub-classify-wrap").removeClass("hide")}}}function p(t){for(var i=0;i<t.length;i++)if(t[i].next_menu.length>0){t[i].next_menu=t[i].next_menu.concat([{menu_name:e.i18n.map.ViewAll,menu_type:t[i].menu_type,next_menu:"",p_menu_type:t[i].p_menu_type,supportgp:"0"}]);for(var a=0;a<t[i].next_menu.length;a++){var n=t[i].next_menu[a];n.next_menu.length>0&&(n.next_menu=n.next_menu.concat([{menu_name:e.i18n.map.ViewAll,menu_type:n.menu_type,next_menu:"",p_menu_type:n.p_menu_type,supportgp:"0"}]))}}return t}function c(){n.dao.getMenuAdsCnt({productType:k},function(t){t?(e(".category-adv-wrap").show(),e(".category-adv-wrap").html(t)):e(".category-adv-wrap").hide()})}function g(t){t&&t.length>0&&(e("#label_list_wrap").html(e("#labelListTempl").tmpl(t)),e("#label_list_wrap").removeClass("hide"),e(".label-item").each(function(){for(var t=0;t<w.length;t++)e(this)[0].id==w[t]&&e(this).addClass("selected")}),e(".label-item").bind("click",function(t){var i=e(this)[0].id;if(e(this).hasClass("selected")){e(this).removeClass("selected");for(var a=0;a<w.length;a++)w[a]==i&&w.splice(a,1)}else e(this).addClass("selected"),w.push(i);console.log(w),o()}))}function h(t){var i=n.util.getCurrencySymbol(n.util.getLocalCurrency()),a=n.util.getAdvSource().u;a||(a=n.util.getQueryString("u"));var r=n.util.encodeMenuType(n.util.getUvid()),l="";a&&(l="?u="+a);for(var o=0;o<t.length;o++){for(var u=t[o],d=0;d<u.display_data.length;d++){var m=u.display_data[d];m.original_price=n.util.formatProductPrice(m.original_price,i),m.current_price=n.util.formatProductPrice(m.current_price,i),m.img_display=n.util.picUrl+m.img_display,m.color_img=n.util.picUrl+m.color_img,m.height=n.util.getImageHeight(),m.top=Number(n.util.getImageHeight())-50,m.href=n.util.formatProductName(u.product_name)+"-d-"+n.util.encodeMenuType(u.product_id)+"-"+n.util.encodeMenuType(m.color_id)+"-"+r+".html"+l,m.disCount&&sessionStorage.listOffSwitch&&"1"==sessionStorage.listOffSwitch?m.disCount=Number(m.disCount):m.disCount="",n.util.isMobile()?m.target="_blank":m.target="_self"}u.showColor=sessionStorage.img_block}if(n.util.isMobile()){1==C.curPage&&e("#item_list").html("");var p=e("#item_list").html();e("#item_list").html(e("#productItemTempl").tmpl(t)),p+=e("#item_list").html(),e("#item_list").html(p)}else e("#item_list").html(e("#productItemTempl").tmpl(t));e("#item_list #new_label").text(e.i18n.map.listNewLabel),s()}function f(){n.util.isMobile()?(e("#top_page").addClass("hide"),_(x)):(e("#top_page").removeClass("hide"),v(x))}function _(t){t>1&&C.curPage<t?(e("#load_more_btn").removeClass("hide"),e("#list_refresh_loading").removeClass("hide")):(e("#load_more_btn").addClass("hide"),e("#list_refresh_loading").addClass("hide"))}function v(t){e("#load_more_btn").addClass("hide"),e("#list_loading").addClass("hide"),e(function(){var i={bootstrapMajorVersion:1,currentPage:C.curPage,totalPages:t,shouldShowPage:!0,onPageClicked:function(t,a,n,r){C.curPage!==r&&(C.curPage=r,e("html").scrollTop(0),o(),i.currentPage=r,"top_page"==t.currentTarget.id?e("#page").bootstrapPaginator(i):e("#top_page").bootstrapPaginator(i))},onPageChanged:function(e,t,i){var a=window.location.href;a.indexOf("/#/")>-1&&(a=a.substring(0,a.indexOf("/#/"))),history.pushState("","",a+"/#/"+i)}};e("#page").bootstrapPaginator(i),e("#top_page").bootstrapPaginator(i)})}function y(t){e("#item_list .color-wrap img").bind("click",function(i){i.stopPropagation();var a=e(this).parent().parent().parent().data().data,n=e(this).data().data,r=t[a].display_data[n];e(this).parent().parent().find("img").removeClass("selected"),e(this).addClass("selected");var s=r.href;e(this).parent().parent().parent().find("a:first").attr("href",s),e(this).parent().parent().parent().find("img:first").attr("src",r.img_display),e(this).parent().parent().parent().find(".product-name").html(r.pcName),e(this).parent().parent().parent().find(".product-ext-name").html(r.pcNameExt),e(this).parent().parent().parent().find(".price-wrap .goods-price").html(r.current_price),e(this).parent().parent().parent().find(".price-wrap .goods-del-price").html(r.original_price)})}console.log("list.js"),n.util.getCookie("isFirst")||(n.util.setCookie("isFirst",0),e(".loading-mask").removeClass("hide")),n.initLoginStatus(),n.setLanguageCallback(function(){e("#breadcrumb_home").text(e.i18n.map.Home),e("#sort_method").html(e.i18n.map.SortRecommended)});var b=1,C={amount:0,curPage:1,pageSize:0},w=[],S=!1,x=0,P=window.location.href,T=n.util.getListParams(P),k=n.util.decodeMenuType(T[T.length-2]),M=n.util.decodeMenuType(n.util.getQueryString("parentId"));P.indexOf("/#/")>-1&&(C.curPage=parseInt(P.substring(P.indexOf("/#/")+3))),n.util.menu=[],n.util.getClassifyNames(k,function(){l(),e("#sort_method").html(e.i18n.map.SortRecommended)}),e("#sort_method").html(e.i18n.map.SortRecommended),e("#sort_list li a").bind("click",function(){e("#sort_method").html(e(this)[0].text),C.curPage=1,b=Number(e(this)[0].id),o()}),n.setCurrencyCodeCallback(function(){o(k),c(),sessionStorage.s_fm_bg&&e("#load_more_btn").css("background",sessionStorage.s_fm_bg),sessionStorage.s_fm_fc&&e("#load_more_btn").css("color",sessionStorage.s_fm_fc)})});