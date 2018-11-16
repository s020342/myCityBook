define([
    "$",
], function($) {
    let service = {
        articleDetail(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getArticleDetail",
                    type: "get",
                    data: data
                }).then((data) => {
                    resolve(data)
                })
            })
        }
    }
    return service
})