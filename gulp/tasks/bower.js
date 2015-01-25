var gulp = require('gulp');
var gutil = require('gulp-util');
var async = require('async');
var del = require('del');
var spawn = require('child_process').spawn;
var gulpConfig = require('../config.js');
var fs = require('fs');
var globArray = require('glob-array');

gulp.task('bower', 'Download bower packages and clean the directories', function(done) {
  var bowerInstallDirectory = JSON.parse(fs.readFileSync(process.cwd() + '/.bowerrc', {
    encoding: 'utf8'
  })).directory;

  function bowerInstall(cb) {
    var command = 'bower install';
    gutil.log(gutil.colors.cyan('running command:'), command);
    var childProcess = spawn('bower', ['install'], {
      cwd: process.cwd(),
      stdio: 'inherit'
    }).on('close', cb);
  }

  function bowerFullClean(cb) {
    del('./' + bowerInstallDirectory, cb);
  }

  function bowerClean(cb) {
    var base = process.cwd() + '/' + bowerInstallDirectory + '/';
    var fullPatterns = [];

    gulpConfig.tasks.bowerClean.forEach(function(pattern) {
      if(pattern.substr(0, 1) === '!') {
        fullPatterns.push('!' + base + pattern.substr(1));
      } else {
        fullPatterns.push(base + pattern);
      }
    });

    globArray.sync(fullPatterns).forEach(function(path) {
      del.sync(path);
    });

    cb();
  }

  async.series([
    bowerFullClean,
    bowerInstall,
    bowerClean
  ], done);
});
