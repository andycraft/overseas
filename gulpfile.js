"use strict";

//===========================================
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    uglify = require('gulp-uglify-es').default,
    spritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    notify = require("gulp-notify"),
    fileinclude = require('gulp-file-include');

//===========================================
var buildPath = 'build/',
    path = {
        build: {
            home: buildPath,
            html: buildPath + '**/*.html',
            htmlHome: buildPath + '*.html',
            htmlRigger: buildPath + 'html/*.html',
            htmlRiggerFiles: buildPath + 'html/**/*.html',
            js:   buildPath + 'js/**/*.js',
            jsPath: buildPath + 'js/',
            jsLib: buildPath + 'js/lib/**/*.js',
            jsLibPath: buildPath + 'js/lib/',
            sass: buildPath + 'sass/**/*.+(sass|scss)',
            css:  buildPath + 'css/**/*.css',
            cssPath:  buildPath + 'css/',
            icon: buildPath + 'img/icons/*.+(png|jpg)',
            img:  buildPath + 'img/**/*.*',
            fonts:  buildPath + 'fonts/**/*.*'
        },
        dist: {
            home: 'dist/',
            js: 'dist/js/',
            css: 'dist/css/',
            img: 'dist/img/',
            image: 'dist/image/',
            fonts: 'dist/fonts/'
        }
    };

// HTML
// ===========================================
gulp.task('html:build', function () {
    gulp.src(path.build.htmlRigger)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.dist.home))
        .pipe(reload({stream: true}));
});

// SASS/SCSS
// ===========================================
gulp.task('sass:build', function () {
    return gulp.src(path.build.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", notify.onError()))
        .pipe(autoprefixer(['last 10 versions', '> 1%', 'ie > 8']))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.extname = ".min.css"
        }))
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});

// JavaScript
// ===========================================
gulp.task('js:build', function(){
    return gulp.src(path.build.jsLib)
        .pipe(order([
            'jquery.min.js',
            'jquery.validate.js',
            'additional-methods.js',
            path.build.jsLib
        ]))
        .pipe(sourcemaps.init())
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .on('error', function(err) {
            console.error('Error in compress task', err.toString());
        });
});

gulp.task('jsMain:build', function(){
    return gulp.src(path.build.jsPath + 'app.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .on('error', function(err) {
            console.error('Error in compress task', err.toString());
        });
});

// Image build
// //===========================================
gulp.task('img:build', function () {
    gulp.src(path.build.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img))
});

// Image copy
// //===========================================
gulp.task('img:copy', function () {
    gulp.src(path.build.img)
        .pipe(gulp.dest(path.dist.img))
});

// Fonts copy
// //===========================================
gulp.task('fonts:copy', function () {
    gulp.src(path.build.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

// Clean
//===========================================
gulp.task('clean:dist', function () {
    return gulp.src(path.dist.home, {read: false})
        .pipe(clean());
});

// Server
//===========================================
gulp.task('webServer', function () {
    browserSync({
        server: {
            baseDir: "./dist/"
        },
        online: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "webServer"
    });
});

// Watch
// ===========================================
gulp.task('watch', function () {
    gulp.watch(path.build.htmlRiggerFiles, ['html:build']);
    gulp.watch(path.build.fonts).on('change', browserSync.reload);
    gulp.watch(path.build.img).on('change', browserSync.reload);
    gulp.watch(path.build.sass, ['sass:build']);
    gulp.watch(path.build.jsLib, ['js:build']);
    gulp.watch(path.build.jsPath + 'app.js', ['jsMain:build']);
    gulp.watch(path.build.js).on('change', browserSync.reload);
});

// Gulp task default
//===========================================
gulp.task('default', [
    'html:build',
    'sass:build',
    'js:build',
    'jsMain:build',
    'fonts:copy',
    'img:build',
    'webServer'
]);

// Gulp task develop
//===========================================
gulp.task('dev', [
    'html:build',
    'sass:build',
    'js:build',
    'jsMain:build',
    'img:copy',
    'fonts:copy',
    'webServer',
    'watch'
]);
