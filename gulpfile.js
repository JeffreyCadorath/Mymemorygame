const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
 
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

