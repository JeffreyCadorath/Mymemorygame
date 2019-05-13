const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
 
gulp.task('styles', () => {
  return gulp.src('./src/**/*.css')
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./dest/css'))
});

gulp.task('imageMin', () => {
  return gulp.src('./src/images/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./dest/images'));
});



gulp.task('js', () => {
  return gulp.src([
    './src/js/resources.js', 
    './src/js/app.js', 
    './src/js/engine.js'
  ])
  .pipe(babel({
    presets: ['@babel/preset-env'],
    plugins: ["@babel/plugin-proposal-class-properties"]
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dest/js'))
});

