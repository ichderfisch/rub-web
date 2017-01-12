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

// Misc
// const pkg = require('package.json');
// const dirs = pkg['configs'].directories;

gulp.task('webserver', function() {
  webserver.server({
    root: 'public',
    livereload: true
  });
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

gulp.task('js:init', function () {
  return gulp.src(['./private/js/init/init.*.js'])
    .pipe(concat('init.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function () {
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

gulp.task('build', ['js:scripts', 'js:init', 'sass'], function (){
});
