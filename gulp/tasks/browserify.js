var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var gulpConfig = require('../config.js');
var through = require('through2');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var runGulpTask = function(options, done) {
  var count = 2;

  var libraries = browserify();
  var application = browserify();

  gulpConfig.tasks.browserify.transformers.forEach(function(transform) {
    libraries.transform(transform);
    application.transform(transform);
  });

  gulpConfig.tasks.browserify.libraries.forEach(function(metaData) {
    if(metaData.path) {
      libraries.require(metaData.path, {
        expose: metaData.name
      });
    } else {
      libraries.require(metaData.name);
    }

    application.external(metaData.name);
  });

  application.add(process.cwd() + '/web/app/application.jsx');

  var libraryStream = libraries.bundle()
  .pipe(source('libraries.js'));

  if(options.mode === 'production') {
    libraryStream.pipe(streamify(uglify()));
  }

  libraryStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));

  var applicationStream = application.bundle()
  .pipe(source('application.js'));

  if(options.mode === 'production') {
    applicationStream.pipe(streamify(uglify()));
  }

  applicationStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
}

gulp.task('browserify', function(done) {
  runGulpTask({
    mode: 'development'
  }, done);
});

gulp.task('browserify-production', function(done) {
  runGulpTask({
    mode: 'production'
  }, done);
});
