var gulp = require('gulp');
var gutil = require('gulp-util');
var helpers = require('../helpers');

gulp.task('code-coverage', 'Run mocha tests with coverage reporting turned on', function(done) {
  helpers.childProcess('node', [
    'tasks/mocha-runner.js',
    '--coverage'
  ], function(error, stdout, stderr) {
    if(stderr) {
      gutil.log(gutil.colors.red(stderr));
    } else {
      console.log(stdout);
    }

    done();
  });
});
