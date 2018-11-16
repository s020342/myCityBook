// var gulp = require("gulp");
// var browserify = require("browserify");
// var source = require('vinyl-source-stream');
// var tsify = require("tsify");
// var uglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
// var buffer = require('vinyl-buffer');
// var paths = {
//     pages: ['src/*.html']
// };

// gulp.task("copy-html", function() {
//     return gulp.src(paths.pages)
//         .pipe(gulp.dest("dist"));
// });

// gulp.task("default", ["copy-html"], function() {
//     return browserify({
//             basedir: '.',
//             debug: true,
//             entries: ['src/main.ts'],
//             cache: {},
//             packageCache: {}
//         })
//         .plugin(tsify)
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(sourcemaps.init({ loadMaps: true }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest("dist"));
// });

var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream'); //模块化打包插件，用来输出打包或编译后文件的
var watchify = require("watchify"); //监听ts文件改变
var tsify = require("tsify"); //将ts文件进行es5规范转换的
var gutil = require("gulp-util"); //日志工具
var uglify = require('gulp-uglify'); //压缩js文件的
var sourcemaps = require('gulp-sourcemaps'); //将打包的js文件，以sourceMap形式创建sourcemap文件
var buffer = require('vinyl-buffer'); //转换buffer的
var webserver = require("gulp-webserver") //启动服务

var sequence = require('gulp-sequence'); //gulp启动任务的命令
var chokidar = require('chokidar'); //文件监听


var paths = {
    pages: ['src/**/*.html']
};

var fs = require("fs")
var path = require("path")
var src = "./src/ts/page"
try {
    var arr = fs.readdirSync(path.resolve(src)).map((i) => {
        return src + "/" + i
    })
} catch (error) {
    console.log(error)
}


//基于ts的模块化打包进行监听的
var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: arr,
    cache: {},
    packageCache: {}
}).plugin(tsify));





//每次检测到ts文件改变后，进行重新打包
function bundle() {
    return watchedBrowserify
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/js"))
}


gulp.task("build", ["htmlCopy", "cssCopy", "staticCopy"], bundle)

//使用html拷贝
gulp.task("htmlCopy", function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

//使用css拷贝
gulp.task("cssCopy", function() {
    return gulp.src("./src/css/**/*.css")
        .pipe(gulp.dest("dist/css"));
});

//使用static拷贝
gulp.task("staticCopy", function() {
    return gulp.src("./src/static/**/*")
        .pipe(gulp.dest("dist"));
});

//启动本地服务
gulp.task("server", ["build"], function() {
    gulp.src('./dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: "page/index.html"
        }))

    sequence(['taskListen'], () => {
        console.log("监听成功")
    })
})


gulp.task("taskListen", () => {
    //html文件的监听
    chokidar.watch("./src/page/**/*.html").on("all", () => {
            sequence(['htmlCopy'], () => {
                console.log("html更新成功")
            })
        })
        //sass文件的监听
    chokidar.watch("./src/css/**/*.css").on("all", () => {
        sequence(['cssCopy'], () => {
            console.log("css")
        })
    })

    //ts文件的监听
    chokidar.watch("./src/ts/**/*.ts").on("all", () => {

            bundle()
        })
        //static文件的监听
    chokidar.watch("./src/static/**/*").on("all", () => {
        sequence(['staticCopy'], () => {
            console.log("static更新成功")
        })
    })
})



gulp.task("default", ["server"]);