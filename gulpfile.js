var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
    return gulp.src('src/css/app.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('src/css/'))
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src('src/*.html')
      .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['src/**/*'], ['sass']);
    gulp.watch('src/*.html', ['html']);
});