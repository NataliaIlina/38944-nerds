var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var del = require('del');
var run = require('run-sequence');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var postcss = require('gulp-postcss');
var csscomb = require('gulp-csscomb');

gulp.task('style', function() {
  gulp.src('less/style.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(autoprefixer({
      browsers: [
         'last 1 version',
         'last 2 Chrome versions',
         'last 2 Firefox versions',
         'last 2 Opera versions',
         'last 2 Edge versions'
      ]
    }))
  .pipe(gulp.dest('css'))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', ['style'], function(){
  browserSync.init({
    server: '.'
  });
  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('*.html').on('change', browserSync.reload);
});


gulp.task('images', function() {
   return gulp.src('img/**/*.{png,jpg,gif}')
   .pipe(imagemin([
     imagemin.optipng({optimizationLevel:3})
   ]))
   .pipe(gulp.dest('img'));
});

gulp.task('svg-img', function() {
  return gulp.src('img/**/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('img'));
});


gulp.task('symbol', function() {
 return gulp.src('img/icons/*.svg')
 .pipe(svgmin())
 .pipe(svgstore({
   inlineSvg: true
 }))
 .pipe(rename('symbols.svg'))
 .pipe(gulp.dest('img'));
});

gulp.task('csscomb', function() {
  return gulp.src('less/blocks/*.less')
  .pipe(plumber())
  .pipe(csscomb())
  .pipe(gulp.dest('less/blocks/'))
});
