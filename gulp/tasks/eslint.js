var gulp = require('gulp');
var gutil = require('gulp-util');
var helpers = require('../helpers');
var gulpConfig = require('../config.js');

gulp.task('eslint', 'Run ESLint on code', function(done) {
  helpers.childProcess('node_modules/.bin/eslint', [
    '--ext',
    '.js',
    '--ext',
    '.jsx',
    gulpConfig.appPath
  ], function(error, stdout, stderr) {
    if(stderr) {
      gutil.log(gutil.colors.red(stderr));
    } else {
      console.log(stdout);
    }

    done();
  });
});
