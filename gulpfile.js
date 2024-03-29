var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
var aliasify = require('aliasify');

gulp.task('browserify', function() {
  browserify('./js/src/index.js', {debug: true})
    .transform(babelify, {presets: ["es2015"]})
    .transform(aliasify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('build.js'))
    .pipe(gulp.dest('./js/dest'))
});

gulp.task('watch', function() {
  gulp.watch('./js/src/*.js', ['browserify'])
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);