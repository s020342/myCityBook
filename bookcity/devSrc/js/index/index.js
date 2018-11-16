require(["/js/app.js", "require"], (data, require) => {
    require(["$", "render", "Index.scroll", "Index.swiper", "Service.index", "event"], ($, render, Bscroll, Swiper, ServiceIndex, event) => {

        sessionStorage.setItem('id', 123)
            //主函数
        function init(data) {
            // console.log(ServiceIndex)
            let { homeService, loadMoreService } = ServiceIndex
            Promise.all([homeService(), loadMoreService({ pagenum: 1, count: 2 })]).then((data) => {
                // console.log(data)
                renderInit(data)
                listen(data)
            }).catch((err) => {
                console.log(err)
            })
        }
        init()
            //全局存储中心
        var store = {
                upData: []
            }
            //数据处理
        function dataInit(data) {
            let homeData = data[0]
                // store.upData = data[1].items
            let handle = {
                //顶部轮播数据
                topData() {
                    return homeData.items[0].data.data.filter((i, index) => {
                        if (index > 1) {
                            return true
                        } else {
                            return false
                        }
                    })
                },
                //本周最火
                hotData() {
                    return homeData.items[1]
                },
                //推荐
                moreData() {
                    return homeData.items.slice(2, homeData.items.length - 3)
                },
                //上拉加载获取数据
                getUpData() {
                    return store.upData
                },
                //上拉加载设置数据
                setUpData(arr) {
                    store.upData = [...store.upData, ...arr]
                }
            }
            return handle
        }


        //渲染初始化
        function renderInit(data) {
            let { topData, hotData, moreData, setUpData, getUpData } = dataInit(data)
                //    头部渲染
            render("#top_banner", topData(), ".classify")
                // 本周最火
            render("#hot", hotData(), ".hot")

            //自动渲染推荐
            render("#more", moreData(), ".more")
                //给upData设置初始数据
            setUpData(data[1].items)
                //console.log(getUpData())
            sessionStorage.setItem("moreData", JSON.stringify(getUpData()))
            render("#books", getUpData(), ".books")


        }
        //事件监听
        function listen(data) {

            let { topData, hotData, moreData } = dataInit(data)
            let listen = {
                    //推荐换一换监听
                    changeRecommendListen() {
                        let data = moreData()
                        data.forEach((i, index) => {
                            $(".change" + index).click(() => {

                                let newData = data[index].data.data.sort((a, b) => {
                                    return Math.random() - 0.5
                                })
                                data[index].data.data = newData;
                                console.log(data)
                                render("#more", data, ".more")
                                listen.changeRecommendListen(data)
                            })
                        });
                    },
                    //书城书架切换
                    changeBookListen() {

                        $(".he-ul li").click(function() {
                            event.emit("scroll", $(this).index())

                            $(this).addClass("color").siblings().removeClass("color");
                        })
                    },
                    //首页搜索点击切换
                    changeSearchListen() {

                        $("#indexSearch").focus(function() {
                            event.emit("scroll", 1)

                            $(".he-ul li").eq(1).addClass("color").siblings().removeClass("color");
                        })
                    },
                    //搜索页事件点击切换
                    changeSearchsListen() {
                        let { indexSearchService } = ServiceIndex
                        var brr = [];
                        $("#searchText")[0].oninput = function() {
                            var val = this.value;
                            id = sessionStorage.getItem('user');

                            brr.push(val)
                            var html = "";
                            brr.forEach((i, index) => {
                                html += '<li>' + i + '</li>'
                            })

                            var arr = [];
                            if (val != "") {
                                indexSearchService({ id, text: val }).then((data) => {

                                    data.items.forEach((i, index) => {

                                            if (i.title.includes(val) || i.authors.includes(val)) {
                                                arr.push(i)

                                            }
                                        })
                                        // console.log(arr)
                                    render("#books-all", arr, ".books-all")
                                        //详情跳转
                                        // $(".articleClassGo").click(function() {
                                        //     console.log(2)
                                        //     window.location.href = "/page/details.html?id=" + $(this).attr("id")
                                        // })
                                })
                            } else {
                                $(".books-all").html("")
                                $('.box').html(html)
                            }

                        }

                        $("#searchText").focus(function() {
                            $('.box').show()
                        })

                        $("#searchText").blur(function() {
                            $('.box').hide()
                        })
                    },
                    //分类跳转
                    articleClassGoListen() {

                        let { indexgetHistoryService } = ServiceIndex

                        $(".articleClassGo").click(function() {
                            window.location.href = "/page/articleClass.html?id=" + $(this).attr("id")
                        })

                    },
                }
                //监听的调用
            for (let i in listen) {
                listen[i]()
            }

        }
    })
})