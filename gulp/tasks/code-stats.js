var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('code-stats', 'Generate code stats', function(done) {
  //TODO: add task back in after they are fixed after the demo
  runSequence(
    'i18n',
    'eslint',
    'code-coverage',
    'complexity',
    done
  );
});
