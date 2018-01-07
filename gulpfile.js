<<<<<<< HEAD
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');

gulp.task('watch:image', () => {
    return gulp.src([
        'public/src/images/*.png', 
        'public/src/images/*.jpg', 
        'public/src/images/*.jpeg'
        ])
        .pipe(imagemin())
        .pipe(gulp.dest('public/src/images/min'));
});

gulp.task('watch:sass', function () {
    return gulp.src('public/src/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass()).on('error', sass.logError)
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(sourcemaps.write())
            .pipe(minifyCSS())
            .pipe(gulp.dest('public/src/css/min'))
});

gulp.task('watch', function(){
    gulp.watch([
        'public/src/images/*.png', 
        'public/src/images/*.jpg', 
        'public/src/images/*.jpeg'
    ], ["watch:image"]);
    gulp.watch('public/src/sass/*.scss', ["watch:sass"]);
});

=======
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');

gulp.task('watch:image', () => {
    return gulp.src([
        'public/src/images/*.png', 
        'public/src/images/*.jpg', 
        'public/src/images/*.jpeg'
        ])
        .pipe(imagemin())
        .pipe(gulp.dest('public/src/images/min'));
});

gulp.task('watch:sass', function () {
    return gulp.src('public/src/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass()).on('error', sass.logError)
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(sourcemaps.write())
            .pipe(minifyCSS())
            .pipe(gulp.dest('public/src/css/min'))
});

gulp.task('watch', function(){
    gulp.watch([
        'public/src/images/*.png', 
        'public/src/images/*.jpg', 
        'public/src/images/*.jpeg'
    ], ["watch:image"]);
    gulp.watch('public/src/sass/*.scss', ["watch:sass"]);
});

>>>>>>> 837f5ca07b1d8f9fbefac2cd9301058fe174b4cd
gulp.task('default',  ['watch']);