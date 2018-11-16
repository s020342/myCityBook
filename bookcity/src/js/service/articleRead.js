define([
    "$",
], function($) {
    let service = {
        articleRead(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getArticleRead",
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