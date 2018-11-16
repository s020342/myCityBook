require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.read", "render", "base64", "phoneEvent"], ($, querystring, ServiceArticleRead, render, base64, event) => {
        let { articleRead } = ServiceArticleRead
        // console.log(window.location.search)
        articleRead({ fiction_id: 46525, chapter_id: 1 }).then((data) => {
            console.log(data)
            console.log(JSON.parse(base64.decode(data.data)))
            init(JSON.parse(base64.decode(data.data)))
        })

        function init(data) {
            render("#read-container", data, ".read-container")
            listen()
        }

        function listen() {
            let eventObj = {
                //弹出层的显示：
                popupControl() {

                    event("body").tap(() => {
                        $(".mask").toggle()
                    })

                    //目录

                    event('.Catalog').tap(function(event) {

                        event.stopPropagation();
                        window.location.href = '/page/catalog.html' + window.location.search
                    })

                    //返回
                    event('#back').tap(function(e) {
                        e.stopPropagation();
                        window.location.href = '/page/articleDetail.html' + window.location.search
                    })

                    event('.fonts').tap(function(e) {
                        e.stopPropagation();
                        $('.font').toggle()
                    })

                    //字体大小
                    var a = 0;
                    event('#big').tap(function(e) {
                        e.stopPropagation();
                        a++
                        $('.he-cont').css({
                            fontSize: a * 10 + 'px'
                        })
                    })

                    var a = 10
                    event('#small').tap(function(e) {
                        e.stopPropagation();
                        a--
                        $('.he-cont').css({
                            fontSize: a * 6 + 'px'
                        })
                    })

                    //背景切换
                    event('#color').tap(function(e) {
                        e.stopPropagation();
                        var color = e.target.className
                            // console.log(color)
                        if (color == "black") {
                            $('body').css({
                                background: color,
                                "color": "#fff"
                            })
                        } else {
                            $('body').css({
                                background: color,
                                "color": "#333"
                            })
                        }

                    })

                    //夜间切换
                    event('.night').tap(function(e) {
                        e.stopPropagation();

                        if ($('.night').text() == '夜间') {
                            $('.night').text("白天")
                            $('body').css({
                                background: "#fff",
                                "color": "#333"
                            })
                        } else {
                            $('.night').text("夜间")
                            $('body').css({
                                background: "#333",
                                "color": "rgb(122, 104, 56)"
                            })
                        }

                    })

                    //上一页
                    var n = 3;
                    event('.fot-prev').tap(function(e) {
                        e.stopPropagation();
                        $('.fot-start').html(n - 1)
                        articleRead({ fiction_id: 46525, chapter_id: 1 + n }).then((data) => {
                            console.log(data)
                            console.log(JSON.parse(base64.decode(data.data)))
                            init(JSON.parse(base64.decode(data.data)))
                        })
                        n--;



                    })

                    //下一页
                    var m = 0;
                    event('.fot-next').tap(function(e) {
                            e.stopPropagation();
                            m++
                            $('.fot-start').html(m + 1)
                            if (m > 3) {
                                alert('不，')
                            } else {

                                articleRead({ fiction_id: 46525, chapter_id: 1 + m }).then((data) => {
                                    console.log(data)
                                    console.log(JSON.parse(base64.decode(data.data)))
                                    init(JSON.parse(base64.decode(data.data)))
                                })
                            }
                        })
                        //下载
                    event('.download').tap(function(e) {
                        e.stopPropagation();

                        var $eleForm = $("<form method='get'></form>");

                        $eleForm.attr("action", "https://codeload.github.com/douban/douban-client/legacy.zip/master");

                        $(document.body).append($eleForm);

                        //提交表单，实现下载
                        $eleForm.submit();

                    })
                }
            }
            for (const key in eventObj) {
                if (eventObj.hasOwnProperty(key)) {
                    eventObj[key]()
                }
            }
        }


    })
})