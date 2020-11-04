const { src, dest } = require('gulp')
const gulpEsbuild = require('gulp-esbuild')
const gulp = require("gulp");

function backend() {
    return src('./src/bg/js/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/js/'))
}

function backMods() {
    return src('./src/bg/js/modules/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/js/modules/'))
}

function backPopup() {
    return src('./src/bg/js/popup/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/js/popup/'))
}

function bangumiApp() {
    return src('./src/bg/bangumiApp/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/bangumiApp/'))
}

function pageHandler() {
    return src('./src/bg/pageHandler/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/pageHandler/'))
}

function common() {
    return src('./src/common/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/common/'))
}

function fg() {
    return src('./src/fg/js/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/fg/js/'))
}

function fgMod() {
    return src('./src/fg/js/module/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/fg/js/module/'))
}

gulp.task("default",(e)=>{
    console.log("Compressing...")
    backend()
    bangumiApp()
    backMods()
    backPopup()
    pageHandler()
    fg()
    fgMod()
    common()
    e()
    console.log("Done.")
})
