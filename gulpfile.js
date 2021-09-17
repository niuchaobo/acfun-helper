const { src, dest } = require('gulp')
const gulpEsbuild = require('gulp-esbuild')
const gulpHtmlmin = require('gulp-htmlmin')
var strip = require('gulp-strip-comments');
const gulp = require("gulp");
const del = require('del');

var options = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: false,
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

function backendRComment() {
    return src('./src/bg/*.js')
        .pipe(strip())
        .pipe(dest('./final/bg/'))
}

function backendHtmlRComment() {
    return src('./src/bg/*.html')
        .pipe(strip())
        .pipe(gulp.dest('./final/bg/'));
}

function backModsRComment() {
    return src('./src/bg/modules/*.js')
        .pipe(strip()).pipe(dest('./final/bg/modules/'))
}

function backPopupRComment() {
    return src('./src/bg/popup/*.js')
        .pipe(strip()).pipe(dest('./final/bg/popup/'))
}

function bangumiAppRComment() {
    return src('./src/bg/bangumiApp/*.js')
        .pipe(strip()).pipe(dest('./final/bg/bangumiApp/'))
}

function pageHandlerRComment() {
    return src('./src/bg/pageHandler/*.js')
        .pipe(strip()).pipe(dest('./final/bg/pageHandler/'))
}

function commonRComment() {
    return src('./src/common/*.js')
        .pipe(strip()).pipe(dest('./final/common/'))
}

function fgRComment() {
    return src('./src/fg/*.js')
        .pipe(strip()).pipe(dest('./final/fg/'))
}

function fgModRComment() {
    return src('./src/fg/modules/*.js')
        .pipe(strip()).pipe(dest('./final/fg/modules/'))
}

async function zipFiles() {
    const zip = require('gulp-zip');
    const path = require('path');
    const fs = require('fs');
    let manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "/src/manifest.json")).toString())
    return gulp.src('final/**')
        .pipe(zip(`acfun-helper-${manifest['version']}.zip.crx`))
        .pipe(gulp.dest('./'))
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

gulp.task("clean", (e) => {
    console.log("Cleaning...")
    backendRComment()
    bangumiAppRComment()
    backModsRComment()
    backPopupRComment()
    pageHandlerRComment()
    fgRComment()
    fgModRComment()
    commonRComment()
    backendHtmlRComment()
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

gulp.task('zip', async function (e) {
    console.log("Compress files to a zip file.");
    await zipFiles();
    e();
})
