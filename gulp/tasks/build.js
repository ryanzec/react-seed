var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', 'Builds the code along with running quality checks (tests, hints, etc...)', function(done) {
  runSequence(
    'jshint',
    ['sass', 'html-minify', 'browserify-production', 'copy-static-assets'],
    'static-rewrite',
    'complexity',
    done
  );
});

gulp.task('build-quick', 'Builds the code without running quality checks', function(done) {
  runSequence(
    ['sass', 'html-minify', 'browserify', 'copy-static-assets'],
    'static-rewrite',
    done
  );
});
