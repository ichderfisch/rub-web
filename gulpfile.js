'use strict';

var gulp = require('gulp');

// CSS & JS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

// Dev-Server
var webserver = require('gulp-connect');
var livereload = require('gulp-livereload');

/**
 *
 * Table of Content
 * ----------------
 * build
 * copy
 * copy:html
 * copy:misc
 * copy:license
 * js:init
 * js:scripts
 * sass:build
 * sass:dev
 * watch
 * webserver
 *
 **/

gulp.task('build', ['copy', 'js:scripts', 'js:init', 'sass:build'], function (){
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
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:dev', function () {
  return gulp.src('./private/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./private/**/*.js', ['js:init', 'js:scripts']);
  gulp.watch('./private/scss/**/*.scss', ['sass:dev']);
});

gulp.task('webserver', function() {
  webserver.server({
    root: 'public',
    livereload: true
  });
});
