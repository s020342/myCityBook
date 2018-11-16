define([
    "$",
], function($) {
    let service = {
        articlelog(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/getArticlelog",
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