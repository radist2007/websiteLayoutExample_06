'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: './app/assets'
  })
});

gulp.task('pug', function() {
  return gulp.src('./app/pages/*.pug')
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest('app/assets/'))
    .pipe(browserSync.stream());
});

gulp.task('sass:layout&blocks', function() {
	return gulp.src([
                  './app/blocks/**/*.sass',
                  './app/layout/*.sass',
                  ])
	// .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError ))
	.pipe(sass().on("error",  sass.logError ))
	// .pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
  .pipe(concat('styles.css'))
	.pipe(gulp.dest('./app/assets/css'))
	.pipe(browserSync.reload( {stream: true} ))
});

gulp.task('sass:pages', function() {
	return gulp.src('./app/pages/*.sass')
	.pipe(sass().on("error",  sass.logError ))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('./app/assets/css'))
	.pipe(browserSync.reload( {stream: true} ))
});

gulp.task('sass', gulp.series('sass:layout&blocks','sass:pages'));

gulp.task('js:vendor', function(){
  // return gulp.src('./app/pages/*.js')
  //  .pipe(gulp.dest('./app/assets/js'))
  console.log('js:vendor');
});

gulp.task('js:pages', function(){
  return gulp.src('./app/pages/*.js')
   .pipe(gulp.dest('./app/assets/js'))
   .pipe(browserSync.reload( {stream: true} ))

});

gulp.task('js', gulp.series('js:pages'));

gulp.task('watch:pug', function(){
  gulp.watch([
              './app/pages/*.pug',
              './app/blocks/**/*.pug',
              './app/layout/**/*.pug'
              ], gulp.series('pug'));
});

gulp.task('watch:sass', function(){
  gulp.watch('./app/pages/*.sass',gulp.series('sass:pages'))
  gulp.watch(['./app/blocks/**/*.sass','./app/layout/*.sass'],gulp.series('sass:layout&blocks'))
});

gulp.task('watch:js', function(){
  gulp.watch('./app/pages/*.js', gulp.series('js:pages'))

});

gulp.task('watch', gulp.parallel(
  'watch:pug',
  'watch:sass',
  'watch:js'
));

gulp.task('default', gulp.series(
  'pug',
  'sass',
  'js',
  gulp.parallel(
    'serve',
    'watch'
)));