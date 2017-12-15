var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('src/assets/css/app.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('src/assets/css/'))
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*'], ['sass']);
});