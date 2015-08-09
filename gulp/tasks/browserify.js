var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var gulpConfig = require('../config.js');
var through = require('through2');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

gulp.task('browserify', function(done) {
  runSequence(
    'browserify-libraries',
    'browserify-application',
    'browserify-mocked-api',
    'browserify-mocked-local-storage',
    done
  );
});

gulp.task('browserify-libraries', function(done) {
  var count = 1;

  var libraries = browserify();

  gulpConfig.tasks.browserify.transformers.forEach(function(transform) {
    libraries.transform(transform);
  });

  gulpConfig.tasks.browserify.libraries.forEach(function(metaData) {
    if(metaData.path) {
      libraries.require(process.cwd() + '/' + metaData.path, {
        expose: metaData.name
      });
    } else {
      libraries.require(metaData.name);
    }
  });

  var libraryStream = libraries.bundle()
  .on('error', function(err){
    var message;

    if(err.description)
      message = 'browserify error: ' + err.description + ' when parsing ' + err.fileName + ' | Line ' + err.lineNumber + ', Column ' + err.column;
    else {
      message = err.message;
    }

    gutil.log(gutil.colors.red(message));

    this.emit('end');
  })
  .pipe(source('libraries.js'));

  libraryStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
});

gulp.task('browserify-application', function(done) {
  var count = 1;

  var application = browserify();

  gulpConfig.tasks.browserify.transformers.forEach(function(transform) {
    application.transform(transform);
  });

  gulpConfig.tasks.browserify.libraries.forEach(function(metaData) {
    application.external(metaData.name);
  });

  application.add(process.cwd() + '/web/app/application.jsx');

  var applicationStream = application.bundle()
  .on('error', function(err){
    var message;

    if(err.description)
      message = 'browserify error: ' + err.description + ' when parsing ' + err.fileName + ' | Line ' + err.lineNumber + ', Column ' + err.column;
    else {
      message = err.message;
    }

    gutil.log(gutil.colors.red(message));

    this.emit('end');
  })
  .pipe(source('application.js'));

  applicationStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
});

gulp.task('browserify-mocked-local-storage', function(done) {
  var count = 1;

  var mockedLocalStorage = browserify();

  gulpConfig.tasks.browserify.transformers.forEach(function(transform) {
    mockedLocalStorage.transform(transform);
  });

  gulpConfig.tasks.browserify.libraries.forEach(function(metaData) {
    mockedLocalStorage.external(metaData.name);
  });

  mockedLocalStorage.add(process.cwd() + '/web/app/mock/local-storage.js');

  var mockedLocalStorageStream = mockedLocalStorage.bundle()
  .on('error', function(err){
    var message;

    if(err.description)
      message = 'browserify error: ' + err.description + ' when parsing ' + err.fileName + ' | Line ' + err.lineNumber + ', Column ' + err.column;
    else {
      message = err.message;
    }

    gutil.log(gutil.colors.red(message));

    this.emit('end');
  })
  .pipe(source('mocked-local-storage.js'));

  mockedLocalStorageStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
})

gulp.task('browserify-mocked-api', function(done) {
  var count = 1;
  var mocked = browserify();

  mocked.add(process.cwd() + '/web/app/mock/api.js');

  var mockedStream = mocked.bundle()
  .on('error', function(err){
    var message;

    if(err.description)
      message = 'browserify error: ' + err.description + ' when parsing ' + err.fileName + ' | Line ' + err.lineNumber + ', Column ' + err.column;
    else {
      message = err.message;
    }

    gutil.log(gutil.colors.red(message));

    this.emit('end');
  })
  .pipe(source('mocked-api.js'));

  mockedStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
});

gulp.task('browserify-production', function(done) {
  process.env.NODE_ENV = 'production';

  runSequence(
    'browserify',
    'browserify-uglify',
    done
  );
});

gulp.task('browserify-uglify', function(done) {
  var count = 2;

  gulp.src(['web/build/application.js'])
  .pipe(uglify())
  .pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));

  gulp.src(['web/build/libraries.js'])
  .pipe(uglify())
  .pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
});
