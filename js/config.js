var requireConfig = {
    baseUrl: '/resources/js/apps/',
    paths: {
        jquery: '../libs/jquery-1.11.3.min',
        tmpl: '../libs/jquery.tmpl',
        bootstrap: '../plugin/bootstrap/bootstrap.min',
        i18n: '../libs/jquery.i18n.properties',
        superSlide: '../libs/jquery.SuperSlide.2.1.1',
        common: '../libs/common_new',
        bootstrapPaginator: '../libs/bootstrap-paginator.min',
        owlCarousel: '../libs/owl.carousel.min',
        error: '../libs/error'
    },	
    waitSeconds: 0,
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        i18n: {
            deps: ['jquery'],
            exports: 'i18n'
        },
        bootstrapPaginator: {
            deps: ['jquery'],
            exports: 'bootstrapPaginator'
        },
        owlCarousel: {
            deps: ['jquery'],
            exports: 'owlCarousel'
        },
        superSlide: {
            deps: ['jquery'],
            exports: 'superSlide'
        },
        common: {
            deps: ['jquery', 'tmpl', 'i18n', 'superSlide', 'owlCarousel'],
            exports: 'common'
        }
    } 
};

require.config(requireConfig);
require(['jquery', 'tmpl', 'i18n', 'bootstrap', 'owlCarousel', 'bootstrapPaginator', 'common']);