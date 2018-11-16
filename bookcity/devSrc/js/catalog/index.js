require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.catalog", "render", "phoneEvent"], ($, querystring, ServiceArticlelog, render, event) => {

        let { articlelog } = ServiceArticlelog
        var query = querystring(window.location.search)
        console.log(query)
        articlelog(query).then((data) => {
            console.log(data.data)
            init(data.data)
        })

        function init(data) {
            render('#log', data, '.log')
        }
        $('#back').click(function() {
            window.location.href = '/page/articleRead.html' + window.location.search
        })

    })
})