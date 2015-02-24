var gulp = require('gulp');
var gutil = require('gulp-util');
var helpers = require('../helpers');
var gulpConfig = require('../config.js');

gulp.task('i18n', 'Build i18n files', function(done) {
  var languages = gulpConfig.tasks.i18n.languages;
  var count = languages.length + 1;

  helpers.childProcess('./node_modules/.bin/messageformat', [
    '--locale',
    gulpConfig.tasks.i18n.nodeLanguage,
    '--module',
    'web/locale/' + gulpConfig.tasks.i18n.nodeLanguage,
    '--output',
    'test/i18n-node.js'
  ], function(error, stdout, stderr) {
    if(stderr) {
      gutil.log(gutil.colors.red(stderr));
    }

    count -= 1;

    if(count == 0) {
      done();
    }
  });

  languages.forEach(function(language) {
    helpers.childProcess('./node_modules/.bin/messageformat', [
      '--locale',
      language,
      'web/locale/' + language,
      '--output',
      'web/locale/' + language + '/i18n.js'
    ], function(error, stdout, stderr) {
      if(stderr) {
        gutil.log(gutil.colors.red(stderr));
      }

      count -= 1;

      if(count == 0) {
        done();
      }
    });
  });
});
