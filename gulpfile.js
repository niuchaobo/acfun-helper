const { src, dest } = require('gulp')
const gulpEsbuild = require('gulp-esbuild')
const gulpHtmlmin = require('gulp-htmlmin')
const gulp = require("gulp");
const del = require('del');

var options = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true
};

function backend() {
    return src('./src/bg/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/'))
}

function backendHtml() {
    return src('./src/bg/*.html')
        .pipe(gulpHtmlmin(options))
        .pipe(gulp.dest('./final/bg/'));
}

function backMods() {
    return src('./src/bg/modules/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/modules/'))
}

function backPopup() {
    return src('./src/bg/popup/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/bg/popup/'))
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
    return src('./src/fg/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/fg/'))
}

function fgMod() {
    return src('./src/fg/modules/*.js')
        .pipe(gulpEsbuild({
            minify: true,
            loader: {
                '.js': 'js'
            }
        }))
        .pipe(dest('./final/fg/modules/'))
}

gulp.task("default", (e) => {
    console.log("Compressing...")
    backend()
    bangumiApp()
    backMods()
    backPopup()
    pageHandler()
    fg()
    fgMod()
    common()
    backendHtml()
    e()
    console.log("Done.")
})

gulp.task('betaSlim', function (e) {
    console.log("Remove Extra Files...")
    del([
        'src/bg/guide.html',
        'src/bg/lab.html',
        'src/bg/luckyUserManage.html',
        'src/bg/update-log.html',
        'src/bg/images/option-*',
        'src/bg/images/step*',
        'src/bg/ServiceWorker/',
        'src/lib/Wasm/',
        'final/bg/guide.html',
        'final/bg/lab.html',
        'final/bg/luckyUserManage.html',
        'final/bg/update-log.html',
        'final/bg/images/option-*',
        'final/bg/images/step*',
        'final/bg/ServiceWorker/',
        'final/lib/Wasm/'
    ], e);
    e();
});