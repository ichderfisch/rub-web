'use strict';

var gulp = require('gulp');

// CSS & JS
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Dev-Server
var webserver = require('gulp-connect');
var livereload = require('gulp-livereload');

// For autoprefixer due to old version of Node and npm
require('es6-promise').polyfill();

/**
 *
 * Table of Content
 * ----------------
 * build
 * copy
 * copy:html
 * copy:misc
 * copy:license
 * js
 * js:init
 * js:scripts
 * sass:build
 * sass:dev
 * watch
 * webserver
 *
 **/

gulp.task('build', ['copy', 'js', 'sass:build'], function (){
});

gulp.task('copy', ['copy:html', 'copy:images', 'copy:misc', 'copy:license'], function(){
});

gulp.task('copy:html', function() {
    return gulp.src([
        'private/*.html'
    ])
    .pipe(gulp.dest('./public/'));
});

gulp.task('copy:images', function() {
    return gulp.src([
        'private/images/**/*'
    ])
    .pipe(gulp.dest('./public/images/'));
});

gulp.task('copy:misc', function(){
    return gulp.src([
        // Copy all files
        'private/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!private/images/',
        '!private/images/**/*',
        '!private/scss',
        '!private/scss/**/*',
        '!private/js',
        '!private/js/**/*',
        '!private/**/*.html',

        // Not needed in build
        '!private/vendor/',
        '!private/vendor/**/*'
    ])
    .pipe(gulp.dest('./public/'));
});

gulp.task('copy:license', function() {
    return gulp.src('LICENSE.txt')
    .pipe(gulp.dest('./public/'));
});

gulp.task('js', ['js:init', 'js:scripts'], function(){
});

gulp.task('js:init', function () {
    return gulp.src(['./private/js/init/init.*.js'])
    .pipe(concat('init.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('js:scripts', function () {
    return gulp.src([
        'vendor/jquery/dist/jquery.min.js',
        'vendor/superfish/js/jquery.superfish-1.5.0.js',
        'vendor/cycle/jquery.cycle.all.js',
        'private/js/kontrast/kontrast.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass:build', function () {
    return gulp.src('./private/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
        cascade: false
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:dev', function () {
    return gulp.src('./private/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./private/**/*.js', ['js']);
    gulp.watch('./private/scss/**/*.scss', ['sass:dev']);
});

gulp.task('webserver', ['watch'], function() {
    webserver.server({
        root: 'public'
    });
});
