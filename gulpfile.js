var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jshintReporter = require('jshint-stylish'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util');

// clean + autoprefix
var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});


gulp.task('default', function() {
	gulp.watch('./devAssets/js/resto.js', ['build-js']);
	gulp.watch('./devAssets/less/*/*.less', ['build-less']);
});

// LESS
gulp.task('build-less',function () {
  gulp.src('./devAssets/less/site.less')
	.pipe(less({ plugins: [autoprefix, cleancss] }))
    .pipe(gulp.dest('./app/assets/css/'))
    .on('error', gutil.log);
});

// JS
gulp.task('build-js',function () {
  gulp.src(['./bower_components/jquery/dist/jquery.min.js'
  			,'./bower_components/components-bootstrap/js/bootstrap.min.js'
  			,'./devAssets/js/resto.js'])
  .pipe(concat('todo.min.js'))
  .pipe(uglify())
  .pipe(jshint())
  .pipe(gulp.dest('./app/assets/js/'))
  .on('error', gutil.log);

});

