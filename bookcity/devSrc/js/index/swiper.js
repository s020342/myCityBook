require(["/js/app.js", "require"], (data, require) => {
    require(["$", "swiper", "event"], ($, Swiper, event) => {
        var mySwiper = new Swiper(".swiper-container", {
            onSlideChangeEnd: function(swiper) {
                // alert(swiper.activeIndex);
                $(".he-ul li").eq(swiper.activeIndex).addClass("color").siblings().removeClass("color");
            }
        })

        //通过event进行用户点击事件监听
        event.on("scroll", function(index) {
            mySwiper.slideTo(index)
        })

    })
})