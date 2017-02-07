'use strict';

var gulp = require('gulp');
var data = require('gulp-data');

var path = require('path');
var fs   = require('fs');

// CSS & JS
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Pug
var pug = require('gulp-pug');

// Dev-Server
var webserver = require('gulp-connect');
var livereload = require('gulp-livereload');

// var pages = JSON.parse(fs.readFileSync('./dev/pages/_pages.json'));

var paths = {
    source: './dev/',
    private: './private/',
    build: './public/'
}

var buildFiles = {
    root: paths.source + '*.*',
    css: paths.source + 'css/*.css',
    js: paths.source + 'js/*.js',
    img: paths.source + 'images/**/*',
    example: {
        root: paths.build + 'example/',
        css: paths.build + 'example/css/',
        js: paths.build + 'example/js/',
        img: paths.build + 'example/images/',
        pug: paths.source + 'pages/example/*.pug',
        meta: paths.source + 'pages/example/_metadata.json',
        html: paths.build + 'example/'
    }
}

// For autoprefixer due to old version of Node and npm
require('es6-promise').polyfill();

/**
 *
 * Projects
 * 1. Example
 *
 **/

gulp.task('build:example:css', ['scss:build'], function() {
    return gulp.src(buildFiles.css)
    .pipe(gulp.dest(buildFiles.example.css))
});

gulp.task('build:example:js', ['js:build'], function() {
    return gulp.src(buildFiles.js)
    .pipe(gulp.dest(buildFiles.example.js))
});

gulp.task('build:example:img', function() {
    return gulp.src(buildFiles.img)
    .pipe(gulp.dest(buildFiles.example.img))
});

gulp.task('build:example:misc', function() {
    return gulp.src(buildFiles.root)
    .pipe(gulp.dest(buildFiles.example.root))
});

gulp.task('build:example:html', function() {
    return gulp.src(buildFiles.example.pug)
    .pipe(data( function(file) {
        return JSON.parse(
            fs.readFileSync(buildFiles.example.meta)
        )
    }))
    .pipe(pug({
        pretty: true,
    }))
    .pipe(gulp.dest(buildFiles.example.html))
    .pipe(livereload());
});

gulp.task('build:example', [
    'build:example:css',
    'build:example:js',
    'build:example:img',
    'build:example:misc',
    'build:example:html'
], function() {
});

gulp.task('build', ['build:example'], function (){
});

/**
 * Helper
 * Table of Content
 * ----------------
 * js:build
 * scss:build
 * scss:dev
 * watch
 * webserver
 *
 **/

gulp.task('js:build', function () {
    return gulp.src([
        'dev/vendor/jquery/dist/jquery.min.js',
        'dev/vendor/superfish/js/jquery.superfish-1.5.0.js',
        'dev/vendor/cycle/jquery.cycle.all.js',
        'dev/js/kontrast/kontrast.js',
        'dev/js/init/init.*.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dev/js'));
});

gulp.task('scss:build', function () {
    return gulp.src('./dev/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
        cascade: false
    }))
    .pipe(gulp.dest('./dev/css'))
    .pipe(livereload());
});

gulp.task('scss:dev', function () {
    return gulp.src('./dev/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dev/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./dev/**/*.pug', ['build']);
    gulp.watch('./dev/**/*.json', ['build']);
    gulp.watch('./dev/**/*.js', ['build']);
    gulp.watch('./dev/scss/**/*.scss', ['build']);
});

gulp.task('webserver', ['watch'], function() {
    webserver.server({
        root: 'public'
    });
});
