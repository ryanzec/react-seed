var gulp = require('gulp');
var gutil = require('gulp-util');
var helpers = require('../helpers');

gulp.task('mocha', 'Run mocha tests', function(done) {
  helpers.childProcess('node', [
    '--harmony',
    'tasks/mocha-runner.js'
  ], function(error, stdout, stderr) {
    if(stderr) {
      gutil.log(gutil.colors.red(stderr));
    } else {
      console.log(stdout);
    }

    done();
  });
});
