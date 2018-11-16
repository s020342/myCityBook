require.config({
    // baseUrl: '/', //基础路径
    paths: {
        //service模块
        "Service.index": "/js/service/index",
        "Service.class": "/js/service/articleClass",
        "Service.detail": "/js/service/articleDetail",
        "Service.read": "/js/service/articleRead",
        "Service.login": "/js/service/login",
        "Service.catalog": "/js/service/catalog",



        //项目封装依赖模块
        "render": "/js/libs/handlebars/render",
        "hdbexpress": "/js/libs/handlebars/hdbexpress",
        "event": "/js/libs/event",
        "base64": "/js/libs/base64",
        "phoneEvent": "/js/libs/phoneEvent",


        //业务模块
        "Index.index": "/js/index/index",
        "Index.scroll": "/js/index/scroll",
        "Index.swiper": "/js/index/swiper",
        "querystring": "/js/libs/querystring",



        //第三方非标准模块
        "$": "/static/js/utils/jquery-2.1.1.min",
        "handlebars": "/static/js/utils/handlebars-v4.0.11",
        "bscroll": "/static/js/utils/bscroll",
        "swiper": "/static/js/utils/swiper-3.4.2.min",


        //css非标准模块
        "cswiper": "/static/css/swiper.min.css",

    },
    shim: {
        "$": {
            deps: [],
            exports: "$"
        },
        "handlebars": {
            deps: [],
            exports: "handlebars"
        },
        "swiper": {
            deps: [],
            exports: "Swiper"
        },
        "bscroll": {
            deps: [],
            exports: "Bscroll"
        }
    }
})