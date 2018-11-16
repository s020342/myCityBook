require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.detail", "render"], ($, querystring, ServiceArticleDetail, render) => {
        let { articleDetail } = ServiceArticleDetail

        let query = querystring(window.location.search)
        var bookId = query.bookId
        var obj = null
        articleDetail(query).then((data) => {
            console.log(data)
            init(data.data)
        })


        function init(data) {
            render("#book", data, ".book")

            $('.read').click(function() {
                if (!sessionStorage.getItem("userId")) {
                    sessionStorage.setItem("page", window.location.href)
                    window.location.href = "/page/login.html"

                } else {
                    let id = sessionStorage.getItem("userId")
                    window.location.href = "/page/articleRead.html?id=" + id + "&bookId=" + bookId
                }
            })
        }

        $("#back").click(function() {
            location.href = "/page/articleClass.html?id=" + query.id
        })


    })
})