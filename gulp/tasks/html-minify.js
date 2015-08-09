var gulp = require('gulp');
var gulpConfig = require('../config.js');
var buildMetaDataFactory = require('build-meta-data');
var minifyHtml = require('gulp-htmlmin');
var gutil = require('gulp-util');

gulp.task('html-minify', 'Minify the HTML', function(done) {
  var stream = gulp.src(gulpConfig.htmlFiles, {
    base: gulpConfig.webPath
  })
  .pipe(minifyHtml({collapseWhitespace: true}))
  .pipe(gulp.dest(gulpConfig.buildPath));

  stream.on('end', function() {
    done();
  });

  stream.on('error', function(err) {
    done(err);
  });
});
