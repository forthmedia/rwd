var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default', ['watch']);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('grid', function() {
    return gulp.src('src/grid/scss/grid.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/grid/css'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

////////// COMBINE & MINIFY
gulp.task('minify', function() {
    return gulp.src('src/*.html')
      .pipe(useref())
      // minify only if JavaScript
      .pipe(gulpIf('*.js', uglify()))
      // minify only if CSS
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('dist'))
});

////////// CLEAN DISTRIBUTION FOLDER
gulp.task('clean', function() {
  return del.sync('dist');
});

////////// BUILD DISTRIBUTION FOLDER
gulp.task('build', function (callback) {
  runSequence('clean', ['sass', 'minify', 'images', 'fonts'],
    callback
  )
})
