require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'owlCarousel', 'common'], function ($, tmpl, i18n, bootstrap, owlCarousel, common) {
	console.log("home.js");

	var new_arrivals = '';
	var best_sellers = '';

	common.setCurrencyCodeCallback(function() {
		getHomeProduct();
		// getTopClub();
	});
	console.log('common.sessionStorageEnable = ' + common.sessionStorageEnable);
	if (common.sessionStorageEnable) {
		common.initLoginStatus();
	}

	if(self != top) {
		$(document.body).parent().addClass('overflowY');
	}

	var getHomeDataTimer = null;
	function getHomeProduct() {
		if (!common.util.getLocalCurrency()) {
			getHomeDataTimer = setInterval(function() {
				getHomeProduct();
				// getTopClub();
			}, 500);
			return;
		} else {
			if (getHomeDataTimer) {
				clearInterval(getHomeDataTimer);
			}
		}

		common.dao.homePageProduct({
			currencyId: common.util.getLocalCurrency()
		}, function (result) {
			var currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
			var u = common.util.getQueryString('u');
			var uvid = common.util.encodeMenuType(common.util.getUvid());
			var queryParams = "";
			if (u) {
				queryParams = "?u=" + u;
			}

			new_arrivals = result.new_arrivals;
			if (new_arrivals) {
				for (var i = 0; i < new_arrivals.length; i++) {
					var product = new_arrivals[i];
	
					for (var j = 0; j < product.display_data.length; j++) {
						var colorProduct = product.display_data[j];
	
						colorProduct.original_price = common.util.formatProductPrice(colorProduct.original_price, currencyConf);
						colorProduct.current_price = common.util.formatProductPrice(colorProduct.current_price, currencyConf);
						colorProduct.img_display = common.util.picUrl + colorProduct.img_display;
						colorProduct.color_img = common.util.picUrl + colorProduct.color_img;
						colorProduct.height = common.util.getHomeImageHeight();
						colorProduct.href = common.util.formatProductName(product.product_name) + "-d-" + common.util.encodeMenuType(product.product_id) + "-" + common.util.encodeMenuType(colorProduct.color_id) + "-" + uvid + ".html" + queryParams;
					}
					product.showColor = sessionStorage.img_block;
				}
				$("#new_bxslider").html($("#productItemTempl").tmpl(new_arrivals));
				$('#new_bxslider_wrap').show();
			} else {
				$('#new_bxslider_wrap').hide();
			}			

			best_sellers = result.best_sellers;
			if (best_sellers) {
				for (var i = 0; i < best_sellers.length; i++) {
					var product = best_sellers[i];
	
					for (var j = 0; j < product.display_data.length; j++) {
						var colorProduct = product.display_data[j];
	
						colorProduct.original_price = common.util.formatProductPrice(colorProduct.original_price, currencyConf);
						colorProduct.current_price = common.util.formatProductPrice(colorProduct.current_price, currencyConf);
						colorProduct.img_display = common.util.picUrl + colorProduct.img_display;
						colorProduct.color_img = common.util.picUrl + colorProduct.color_img;
						colorProduct.height = common.util.getHomeImageHeight();
						colorProduct.href = common.util.formatProductName(product.product_name) + "-d-" + common.util.encodeMenuType(product.product_id) + "-" + common.util.encodeMenuType(colorProduct.color_id) + "-" + uvid + ".html" + queryParams;
					}
					product.showColor = sessionStorage.img_block;
				}
				$("#best_bxslider").html($("#productItemTempl").tmpl(best_sellers));
				$('#best_bxslider_wrap').show();
			} else {
				$('#best_bxslider_wrap').hide();
			}
			
			initEvent(new_arrivals, best_sellers);

			var topClubs = result.top_club;
			if (topClubs && topClubs.length > 0) {
				for (var i = 0; i < topClubs.length; i++) {
					if (topClubs[i].menu_icon) {
						topClubs[i].menu_icon = common.util.picUrl + topClubs[i].menu_icon;
					}

					if (topClubs[i].product && topClubs[i].product.display_data && topClubs[i].product.display_data.length > 0 && topClubs[i].product.display_data[0].img_display) {
						topClubs[i].product.display_data[0].img_display = common.util.picUrl + topClubs[i].product.display_data[0].img_display;
						topClubs[i].product.display_data[0].height = common.util.getHomeImageHeight();
						topClubs[i].product.link = common.util.formatProductName(topClubs[i].product.product_name) + "-d-" + common.util.encodeMenuType(topClubs[i].product.product_id) + "-" + common.util.encodeMenuType(topClubs[i].product.display_data[0].color_id) + "-" + uvid + ".html" + queryParams;
					}
					
					topClubs[i].link = common.util.formatProductName(topClubs[i].menu_name) + "-l-" + common.util.encodeMenuType(topClubs[i].menu_type) + "-" + uvid + ".html" + queryParams;
				}
				var topClubList = topClubs;
				$("#topClubList").html($("#categotyItemTempl").tmpl(topClubList));
				// $("#topClubList").html($("#clubItemTempl").tmpl(topClubList));
				$("#topClubListWrap").show();
			} else {
				$("#topClubListWrap").hide();
			}

			var topTeams = result.top_team;
			if (topTeams && topTeams.length > 0) {
				for (var i = 0; i < topTeams.length; i++) {
					if (topTeams[i].menu_icon) {
						topTeams[i].menu_icon = common.util.picUrl + topTeams[i].menu_icon;
					}

					if (topTeams[i].product && topTeams[i].product.display_data && topTeams[i].product.display_data.length > 0 && topTeams[i].product.display_data[0].img_display) {
						topTeams[i].product.display_data[0].img_display = common.util.picUrl + topTeams[i].product.display_data[0].img_display;
						topTeams[i].product.display_data[0].height = common.util.getHomeImageHeight();
						topTeams[i].product.link = common.util.formatProductName(topTeams[i].product.product_name) + "-d-" + common.util.encodeMenuType(topTeams[i].product.product_id) + "-" + common.util.encodeMenuType(topTeams[i].product.display_data[0].color_id) + "-" + uvid + ".html" + queryParams;
					}

					topTeams[i].link = common.util.formatProductName(topTeams[i].menu_name) + "-l-" + common.util.encodeMenuType(topTeams[i].menu_type) + "-" + uvid + ".html" + queryParams;
				}
				var topTeamsList = topTeams;
				$("#topNationalList").html($("#categotyItemTempl").tmpl(topTeamsList));
				// $("#topNationalList").html($("#clubItemTempl").tmpl(topTeamsList));
				$("#topTeamListWrap").show();
			} else {
				$("#topTeamListWrap").hide();
			}

			$('#topClubList, #topNationalList').trigger('destroy.owl.carousel');
			$('#topClubList, #topNationalList').owlCarousel({
				nav: true,
				loop: false,
				slideBy: 'page',
				// dotsEach: 1,
				autoPlay: true,
				rewind: false,
				smartSpeed: 70,
				responsive: {
					0: {
						items: 1
					},
					480: {
						items: 4
					},
					600: {
						items: 4
					},
					960: {
						items: 4
					},
					1200: {
						items: 4
					},
					1550: {
						items: 5
					},
					1650: {
						items: 6
					}
				},
				navText: [
					'<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="fill: #f1f1f1;"></path></svg>',
					'<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="fill: #f1f1f1;"></path></svg>'
				]
			});

			$('.loading-mask').addClass('hide');
			$('.main-wrap').removeClass('invisibility');
			$('footer').removeClass('invisibility');
		}, null, function() {
			$('.loading-mask').addClass('hide');
			$('.main-wrap').removeClass('invisibility');
			$('footer').removeClass('invisibility');

			$("a").each(function(){
				var href = $(this).attr('href');
				var u = common.util.getQueryString('u');

				if (href && href.indexOf('-l-') > -1) {
					return;
				} else if (href && href.indexOf('-d-') > -1) {
					return;
				} else {
					if (href && href.indexOf('uvid=') < 0 && href !== 'javascript:void(0)') {
						if (href == '/') {
							href = href + "?uvid=" + common.util.getUvid();
						} else if (href && href.indexOf('uvid=') < 0 && href.indexOf("ssl-checker.html#hostname=") == -1) {
							var d = href.length - 'html'.length;
							if (d >= 0 && href.lastIndexOf('html') == d) {
								href = href + "?uvid=" + common.util.getUvid();
							} else {
								href = href + "&uvid=" + common.util.getUvid();
							}
						}
					}
	
					if (u && href !== 'javascript:void(0)') {
						if (href == '/') {
							href = href + "?u=" + u;
						} else if (href) {
							var d = href.length - 'html'.length;
							if (d >= 0 && href.lastIndexOf('html') == d) {
								href = href + "?u=" + u;
							} else {
								href = href + "&u=" + u;
							}
						}
					}
				}
				
				$(this).attr('href', href);
			});
		});
	}

	function getTopClub() {		
		common.dao.getHomeTopCategoty({
			currencyId: common.util.getLocalCurrency()
		}, function (result) {
			var u = common.util.getAdvSource().u;
			if (!u) {
				u = common.util.getQueryString('u');
			}
			var uvid = common.util.encodeMenuType(common.util.getUvid());
			var queryParams = "";
			if (u) {
				queryParams = "?u=" + u;
			}

			
		});		
	}

	function initEvent(new_arrivals, best_sellers) {
		$('#new_bxslider, #best_bxslider').trigger('destroy.owl.carousel');
		$('#new_bxslider, #best_bxslider').owlCarousel({
			nav: true,
			loop: false,
			slideBy: 'page',
			// dotsEach: 1,
			autoPlay: true,
			rewind: false,
			smartSpeed: 70,
			responsive: {
				0: {
					items: 1
				},
				480: {
					items: 4
				},
				600: {
					items: 4
				},
				960: {
					items: 4
				},
				1200: {
					items: 4
				},
				1550: {
					items: 5
				},
				1650: {
					items: 6
				}
			},
			navText: [
				'<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="fill: #f1f1f1;"></path></svg>',
				'<svg viewBox="0 0 24 24" style="width:40px;height:40px;background: rgba(0,0,0,0.3);border-radius: 50%;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="fill: #f1f1f1;"></path></svg>'
			]
		});

		$("#new_bxslider li .color-wrap img").bind('click', function (e) {
			colorItemClickEvent(e, $(this), new_arrivals);
		});

		$("#best_bxslider li .color-wrap img").bind('click', function (e) {
			colorItemClickEvent(e, $(this), best_sellers);
		});
		
		// $('#best_bxslider li .image-wrap, #new_bxslider li .image-wrap').each(function() {
		// 	var productId = $(this).parent()[0].id;
			
		// 	var href = '';
		// 	var colorId = '';
		// 	if (sessionStorage.img_block == 1) {
		// 		if ($(this).parent().find('.selected')[0]) {
		// 			colorId = $(this).parent().find('.selected')[0].id;
		// 		} else if ($(this).parent().find('.color-wrap').find('img')[0]){
		// 			colorId = $(this).parent().find('.color-wrap').find('img')[0].id;
		// 		}
		// 	}

		// 	if (colorId) {
		// 		href = 'detail.html?productId=' + productId + '&colorId=' + colorId;
		// 	} else {
		// 		href = 'detail.html?productId=' + productId;
		// 	}

		// 	$(this).attr('href', href);
		// });
	}

	function colorItemClickEvent(e, ele, data) {
		// console.log("colorItemClickEvent");
		// debugger
		e.stopPropagation();

		var index = ele.parent().parent().parent().data().data;
		var childIndex = ele.data().data;
		var data = data[index].display_data[childIndex];

		ele.parent().parent().find('img').removeClass('selected');
		ele.addClass('selected');
		
		// var colorId = ele.attr('id');
		// var productId = ele.parent().parent().parent().attr('id');
		// var href = 'detail.html?productId=' + productId + '&colorId=' + colorId;

		// var t = common.util.getQueryString('t');
		// var u = common.util.getQueryString('u');
		// if (t && u && href.indexOf('&uvid=') < 0) {
		// 	var advsParams = "&t=" + t + "&u=" + u + "&uvid=" + common.util.getUvid();
		// 	href = href + advsParams;
		// }
		// console.log(data);
		var href = data.href;

		ele.parent().parent().parent().find('a:first').attr('href', href);
		ele.parent().parent().parent().find('img:first').attr('src', data.img_display);
		ele.parent().parent().parent().find('.price-wrap .goods-price').html(data.current_price);
		ele.parent().parent().parent().find('.price-wrap .goods-del-price').html(data.original_price);
	}
});