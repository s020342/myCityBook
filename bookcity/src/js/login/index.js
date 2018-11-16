require(["/js/app.js", "require"], (data, require) => {
    require(["$", "querystring", "Service.login"], ($, querystring, ServiceLogin) => {
        let { loginService } = ServiceLogin
        console.log(2)
        $(".load").click(function() {
            console.log(2)
            let obj = {
                user: $("#user").val(),
                pwd: $("#pwd").val()
            }
            loginService(obj).then((data) => {
                if (data.code == "2010") {
                    let url = sessionStorage.getItem("page")
                    console.log(url)
                    sessionStorage.setItem("userId", data.data)
                    if (url) {
                        window.location.href = url
                    } else {
                        window.location.href = "/page/index.html"
                    }

                } else {
                    alert("登录失败")
                }
            })
        })
        $(".register").click(() => {
            window.location.href = "/page/register.html?page=" + querystring(window.location.search).page

        })
    })
})