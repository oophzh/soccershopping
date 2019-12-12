require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'common'], function ($, tmpl, i18n, bootstrap, common) {
	console.log("size_guide.js");
	common.initLoginStatus();
});