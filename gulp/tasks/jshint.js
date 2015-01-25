var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpConfig = require('../config.js');

gulp.task('jshint', 'Run JSHint against the JavaScript code', function() {
  //TODO: need to add support for JSX here
  return gulp.src(gulpConfig.jsHintFiles)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
