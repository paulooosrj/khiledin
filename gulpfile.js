const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('watch:image', () => {
	return gulp.src('public/src/images/*')
        		.pipe(imagemin())
        		.pipe(gulp.dest('public/src/images/min'));
});

gulp.task('watch', () => {
	gulp.watch('public/src/images/*', gulp.parallel('watch:image'));
});
gulp.task('default',  gulp.series('watch'));