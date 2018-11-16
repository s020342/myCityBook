require(["/js/app.js", "require"], (data, require) => {
    require(["$", "render", "bscroll", "swiper", "Service.index"], ($, render, BScroll, Swiper, ServiceIndex) => {
        let scroll = new BScroll('.slide-one', {
            scrollY: true,
            click: true,
            pullDownRefresh: {
                threshold: 60,
                stop: 55
            },
            pullUpLoad: {
                threshold: -100
            }
        })

        scroll.on("pullingDown", function() {
            setTimeout(() => {
                $('.down').html('正在刷新')
                setTimeout(() => {
                    window.location.reload()
                    scroll.finishPullDown()
                    $('.down').html('刷新完毕')
                    scroll.refresh();
                }, 1000)
            }, 500)

        })
        let page = 2;

        scroll.on("pullingUp", () => {

            $('.down').html('正在加载')
            setTimeout(function() {
                add()
                scroll.refresh();
                scroll.finishPullUp();
                $('.down').html('上拉加载')
            }, 2000)
        })

        function add() {
            let { loadMoreService } = ServiceIndex
            if (page < 3) {
                loadMoreService({ pagenum: page, count: 2 }).then((data) => {
                    let moreData = sessionStorage.getItem("moreData")
                    let arr = [...JSON.parse(moreData), ...data.items]
                    sessionStorage.setItem("moreData", JSON.stringify(arr))
                        // console.log(arr)
                    render("#books", arr, ".books")
                })
            } else {
                scroll.refresh();
                scroll.finishPullUp();
                $('.down').html('上拉加载')
            }
        }
    })
})