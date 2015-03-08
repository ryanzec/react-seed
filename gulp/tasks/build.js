var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', 'Builds the code along with running quality checks (tests, hints, etc...)', function(done) {
  runSequence(
    'eslint',
    'i18n',
    'code-coverage',
    ['sass', 'html-minify', 'browserify-production', 'copy-static-assets'],
    //'static-rewrite',
    'complexity',
    done
  );
});

gulp.task('build-quick', 'Builds the code without running quality checks', function(done) {
  runSequence(
    'i18n',
    ['sass', 'html-minify', 'browserify', 'copy-static-assets'],
    //'static-rewrite',
    done
  );
});
