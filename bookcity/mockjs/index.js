var app = require("../config/httpRequest.js")

var homeJson = require('./mock/home.json');
var hotJson = require('./mock/search-hot.json');
var zhuJson = require('./mock/search-zhu.json');
var tianJson = require('./mock/search-tian.json');
var detail_352876 = require('./mock/352876.json');
var recommend = require('./mock/recommend.json');
var articleClass = require('./mock/articleClass.json');
var articleDetail = require('./mock/articleDetail.json');
var femaleJson = require('./mock/female.json');
var chapterList = require('./mock/chapter-list.json');
var artical1 = require('./mock/artical/data1.json');
var artical2 = require('./mock/artical/data2.json');
var artical3 = require('./mock/artical/data3.json');
var artical4 = require('./mock/artical/data4.json');

var fetch = require("node-fetch")

var userList = [{
    userName: 'smjie',
    passWord: '123456',
    userId: randomNum(10)
}]

var obj = {
    '/api/home': homeJson,
    '/api/loadMore?pagenum=1&count=10': recommend,
    '/api/hot': hotJson,
    '/api/search?key=诛仙': zhuJson,
    '/api/search?key=择天记': tianJson,
    '/api/detail?fiction_id=352876': detail_352876,
    '/api/female': femaleJson,
    '/api/chapter?fiction_id=352876': chapterList,
    '/api/artical?fiction_id=352876&chapter_id=1': artical1,
    '/api/artical?fiction_id=352876&chapter_id=2': artical2,
    '/api/artical?fiction_id=352876&chapter_id=3': artical3,
    '/api/artical?fiction_id=352876&chapter_id=4': artical4
}

//首页首次加载所需数据
app.get("/api/home", (req, res, next) => {

        res.send(homeJson)
    })
    //首页滑动加载接口
app.get("/api/loadMore", (req, res, next) => {
    console.log(req.body)
    let { pagenum, count } = req.query
    let recommends = recommend
    let data = {...recommends,
        ... {
            items: recommends.items.slice((pagenum - 1) * count, pagenum * count)
        }
    }
    res.send(data)
})

app.get('/api/search', (req, res, next) => {
    let { pagenum, count } = req.query
    let recommends = recommend

    res.send(recommends)
})

//分类列表接口
app.get("/api/getArticleClass", (req, res, next) => {

    let id = req.query.id;
    //console.log(id)
    let data = null
    articleClass.some((i) => {
        // console.log(i)
        if (i.ad_setting_id == id) {
            data = i
            return true
        } else {
            return false
        }
    })

    if (data) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: data
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }


})

app.get("/api/getArticleClass", (req, res, next) => {

    let id = req.query.id;
    //console.log(id)
    let data = null
    articleClass.some((i) => {
        // console.log(i)
        if (i.id == id) {
            data = i
            return true
        } else {
            return false
        }
    })

    if (data) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: data
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }


})

app.get("/api/getArticleDetail", (req, res, next) => {

    let bookid = req.query.bookId;
    console.log(bookid)
    let data = []
    articleDetail.forEach(i => {
        data.push(...i.data.data)
    });
    //console.log(data)
    // console.log(articleDetail)
    var result = null
    data.some((i) => {
        if (i.fiction_id == bookid) {
            result = i
            return true
        } else {
            return false
        }
    })

    if (result) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: result
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }


})

app.post("/api/login", (req, res, next) => {
    let { user, pwd } = req.body
    var result = null
    console.log(userList)
    userList.some((i) => {

        if (i.userName == user && i.passWord == pwd) {
            result = i
            return true
        } else {
            return false
        }
    })

    if (result) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: result.userId
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }
})

function randomNum(num) {
    let str = ""
    for (let i = 0; i < num; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

var articleRead = [{
    fiction_id: 46525,
    chapterList: [{
            chapter_id: 1,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=2edfe283fce845c98e4040cf8d339fb2&token=NuXIzAh93h2w99ricPIxalBX-zOpF5Pc5geLw3shDXqpVT4U21tYEPnsmXPWfZ4xw2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=h1GkIamDm5WdRZvqrtiOuyL41us"
        },
        {
            chapter_id: 2,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=a65656b16bef4d5d908c58a0be1fe7af&token=NuXIzAh93h2w99ricPIxasFLxx8GjRlX9ptXrfY_tex0V-Uei5y4t_WXXyRfhDTew2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=KjHzro1LGIktTYB51iLb4aCJey4"
        },
        {
            chapter_id: 3,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=30aab1eeb8ef4824a651a197e4b8c458&token=NuXIzAh93h2w99ricPIxalRJSknBP7rWF0TpXqiGzXZ7UNU6MzdZaInTtuvmz5Gcw2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=gVjYf_Jy8kUCwKJuSc2uiSPnoxA"
        },
        {
            chapter_id: 4,
            url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=ef1b7d89339a4a46bde4a9027ebb3386&token=NuXIzAh93h2w99ricPIxasVR1KdQApCLK57GLHbNbKAAgokiAuYaQMi690VsHva0w2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=4jmoetLE0L-wvE79agnDDs5l0lE"
        }
    ]
}]

app.get("/api/getArticleRead", (req, res, next) => {
    let { fiction_id, chapter_id } = req.query
    var result = null
    let state = articleRead.some((i) => {
        if (i.fiction_id == fiction_id) {
            return i.chapterList.some((j) => {
                if (j.chapter_id == chapter_id) {
                    result = j.url
                    return true
                } else {
                    return false
                }
            })

        } else {
            return false
        }
    })

    if (state) {

        fetch(result)
            .then(res => res.text())
            .then((body) => {
                // console.log(body)
                try {
                    function duokan_fiction_chapter(data) {
                        res.send({
                            code: "2010",
                            data,
                            msg: "数据读取成功"
                        })
                    }
                    eval(body)

                } catch (err) {
                    res.send({
                        code: "2011",
                        msg: "数据不存在"
                    })
                }
            })
    } else {
        res.send({
            code: "2011",
            msg: "数据不存在"
        })
    }
})

app.get('/api/getArticlelog', (req, res, next) => {
    let bookid = req.query.bookId;
    console.log(bookid)
    let data = []
    let state = chapterList.some((i) => {
        // console.log(i)
        if (i.item.fiction_id == bookid) {
            data = i.item
            return true
        } else {
            return false
        }
    })

    if (state) {
        res.send({
            code: "2010",
            msg: "有数据",
            data: data
        })
    } else {
        res.send({
            code: "2011",
            msg: "无数据"
        })
    }
})

module.exports = app.run