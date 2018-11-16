require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.class", "render"], ($, querystring, ServiceArticleClass, render) => {
        let { articleClassService } = ServiceArticleClass


        let query = querystring(window.location.search)
            // console.log(query)
        articleClassService(query).then((data) => {
            console.log(data)
            init(data)
        })


        function init(data) {
            // console.log(data.data)
            render("#wrap", data, ".wrap")
                //console.log(query.id)
            $(".goDetail").click(function() {
                //window.sessionStorage.setItem('bookId', $(this).attr("id"))
                window.location.href = "/page/articleDetail.html?id=" + query.id + "&bookId=" + $(this).attr("id")
            })
        }
    })
})