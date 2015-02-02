var gulp              = require('gulp'),
    plumber           = require('gulp-plumber'),
    jshint            = require('gulp-jshint'),
    jshintReporter    = require('jshint-stylish'),
    concat            = require('gulp-concat'),
    uglify            = require('gulp-uglify'),
    less              = require('gulp-less'),
    watch             = require('gulp-watch'),
    gutil             = require('gulp-util'),
    expect            = require('gulp-expect-file'),
    uncss             = require('gulp-uncss'),
    csso              = require('gulp-csso');

// clean + autoprefix
var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});


gulp.task('default', function() {

  var watchJs    = ['devAssets/js/resto.js'],
      watchLess  = ['devAssets/less/*/*.less'];

	gulp.watch(watchJs, ['build-js']);
	gulp.watch(watchLess, ['build-less']);

});

// LESS
gulp.task('build-less', function () {

  var lessFile    =  'devAssets/less/site.less',
      htmlFiles   =  'app/index.html',
      destFolder  =  'app/assets/css/';

  return gulp.src(lessFile)
         .pipe(plumber())
         .pipe(expect(lessFile))
         .pipe(less({ plugins: [autoprefix, cleancss] }))
         .pipe(uncss({
            html: [htmlFiles],
            ignore: [
                ".fade",
                ".fade.in",
                ".collapse",
                ".collapse.in",
                ".collapsing",
                ".alert-danger",
                /\.open/
            ]
          }))
         .pipe(csso())
         .pipe(gulp.dest(destFolder))
         .on('error', gutil.log);
});


// JS
gulp.task('build-js', function () {
  
  var jQuery    = 'bower_components/jquery/dist/jquery.min.js',
      bootStrap = 'bower_components/components-bootstrap/js/bootstrap.min.js',
      restoJS   = 'devAssets/js/resto.js';

  return gulp.src([jQuery, bootStrap, restoJS])
         .pipe(plumber())
         .pipe(concat('todo.min.js'))
         .pipe(uglify())
         .pipe(jshint())
         .pipe(gulp.dest('./app/assets/js/'))
         .on('error', gutil.log);
});

//REMOVE unused CSS
/*
gulp.task('unused', function() {
  gulp.src('./app/site.css')
  .pipe(uncss({
    html: ['./app/index.html']
  }))
  .pipe(gulp.dest('./app'))
  
  .on('error', gutil.log);
});*/