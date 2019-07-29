const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
/*const streamqueue  = require('streamqueue');
const uglify = require('gulp-uglify-es').default;*/

gulp.task('watch:image', () => {
    return gulp.src([
        'app/public/src/images/*.png',
        'app/public/src/images/*.jpg',
        'app/public/src/images/*.jpeg'
        ])
        .pipe(imagemin())
        .pipe(gulp.dest('app/public/src/images/min'));
});

gulp.task('watch:sass', function () {
    return gulp.src('app/public/src/sass/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass()).on('error', sass.logError)
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(sourcemaps.write())
            .pipe(minifyCSS())
            .pipe(gulp.dest('app/public/src/css/min'))
});

// gulp.task('scripts', function() {
//         return streamqueue({ objectMode: true },
//             gulp.src('./app/public/src/js/min/emojione.js'),
//             gulp.src('./app/public/src/js/min/clipboard.js'),
//             gulp.src('./app/public/src/js/min/jquery.js'),
//             gulp.src('./app/public/src/js/min/electron.js'),
//             gulp.src('./app/public/src/js/min/chat.js'),
//             gulp.src('./app/public/src/js/min/app.js')
//         )
//         .pipe(uglify())
//         .pipe(gulp.dest('./app/public/src/js/min/'));
// });

gulp.task('watch', function(){
    gulp.watch([
        'app/public/src/images/*.png',
        'app/public/src/images/*.jpg',
        'app/public/src/images/*.jpeg'
    ], ["watch:image"]);
    gulp.watch('app/public/src/sass/*.scss', ["watch:sass"]);
    // gulp.watch('app/public/src/js/min/*.js', ["scripts"]);
});

gulp.task('default',  ['watch']);
