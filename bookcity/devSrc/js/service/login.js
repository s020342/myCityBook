define([
    "$",
], function($) {
    let service = {
        loginService(data) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "/api/login",
                    type: "post",
                    data: data
                }).then((data) => {
                    resolve(data)
                })
            })
        }
    }
    return service
})