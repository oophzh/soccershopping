require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	common.initLoginStatus();
	
	var id = common.util.getQueryString('id');
	console.log("order_detail.js---id= " + id);

	getOrderDetail(id);

	function getOrderDetail(id) {
		common.dao.getOrderDetail({
			orderId: id
		}, function(result) {
			var currencyConf = common.util.getCurrencySymbol(result.correncyCode);
			if (!currencyConf) {
				currencyConf = common.util.getCurrencySymbol(common.util.getLocalCurrency());
			}
			var cartList = result.spCart;
			for (var i = 0; i < cartList.length; i++) {
				var cartItem = cartList[i];
				cartItem.displayImg = common.util.picUrl + cartItem.displayImg;
				cartItem.productPrice = common.util.formatProductPrice(cartItem.productPrice, currencyConf);
			}
			$("#cart_list").html($("#cartTempl").tmpl(cartList));

			handleOrderInfo(result);

			var orderDisInfos = result.orderDisInfos;
			for (var i = 0; i < orderDisInfos.length; i++) {
				var disInfoItem = orderDisInfos[i];
				if (disInfoItem.disCost < 0) {
					disInfoItem.disCost = "-" + common.util.formatProductPrice(-disInfoItem.disCost, currencyConf);
				} else {
					disInfoItem.disCost = common.util.formatProductPrice(disInfoItem.disCost, currencyConf);
				}
			}
			$('#dis_info_list').html($("#disInfoTempl").tmpl(orderDisInfos));

			$('#sub_total').html(common.util.formatProductPrice(result.totalCost,currencyConf));
			$('#grand_total').html(common.util.formatProductPrice(result.realCost,currencyConf));
		});
	}

	function handleOrderInfo(result) {
		var orderDetailData = [];
			var item = {};
			item.label = $.i18n.map.OrderNumber + ":";
			item.value = result.orderId;
			orderDetailData.push(item);

			item = {};
			item.label = $.i18n.map.OrderDate + ":";
			item.value = common.util.formatOrderDateTime(result.crTime);
			orderDetailData.push(item);

			if (result.shippingAddr) {
				item = {};
				item.label = $.i18n.map.ShippedTo + ":";
				item.value = result.shippingAddr.recFirstname + " " + result.shippingAddr.recLastname 
					+ "(" + result.shippingAddr.streetAddr + " " + result.shippingAddr.extendAddr
					+ " " + result.shippingAddr.city + "," + result.shippingAddr.province 
					+ " " + result.shippingAddr.postCode + "," + result.shippingAddr.fullCountry + ")";
				orderDetailData.push(item);
	
				item = {};
				item.label = '';
				item.value = $.i18n.map.PhoneNumberlabel + ": " + result.shippingAddr.telephone;
				orderDetailData.push(item);
			}			

			if (result.billAddr) {
				item = {};
				item.label = $.i18n.map.BilledTo + ":";
				item.value = result.billAddr.recFirstname + " " + result.billAddr.recLastname 
					+ "(" + result.billAddr.streetAddr + " " + result.billAddr.extendAddr
					+ " " + result.billAddr.city + "," + result.billAddr.province 
					+ " " + result.billAddr.postCode + "," + result.billAddr.fullCountry + ")";
				orderDetailData.push(item);

				item = {};
				item.label = '';
				item.value = $.i18n.map.PhoneNumberlabel + ": " + result.billAddr.telephone;
				orderDetailData.push(item);
			}
			
			item = {};
			item.label = $.i18n.map.OrderStatus + ":";
			if (result.paymentStatus == 0) {
				result.paymentStatusString = $.i18n.map.OrderStatusPendding;
			} else if (result.paymentStatus == 1 || result.paymentStatus == 5 || result.paymentStatus == 10) {
				result.paymentStatusString = $.i18n.map.OrderStatusSuccess;
			} else if (result.paymentStatus == 3) {
				result.paymentStatusString = $.i18n.map.OrderStatusDelay;
			} else {
				result.paymentStatusString = $.i18n.map.OrderStatusFail;
			}

			item.value = result.paymentStatusString;
			orderDetailData.push(item);
			
			$("#order_info").html($("#orderInfoTempl").tmpl(orderDetailData));
	}
});