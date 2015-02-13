var gulp = require('gulp');
var gulpConfig = require('../config.js');
var buildMetaDataFactory = require('build-meta-data');
var gutil = require('gulp-util');
var config = gulpConfig.tasks.copyStaticAssets;
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var globArray = require('glob-array');

gulp.task('copy-static-assets', 'Copy static assets to the build folder', function(done) {
  var buildMetaData = buildMetaDataFactory.create(process.cwd() + '/gulp/build-meta-data/static-assets.json');
  var assets = [];

  config.staticAssetFolders.forEach(function(folder) {
    config.staticAssetExtensions.forEach(function(extension) {
      assets.push(folder + '/**/*.' + extension);
    });
  });

  if(config.manualGlobs.length > 0) {
    assets = assets.concat(globArray.sync(config.manualGlobs));
  }

  _.forEach(config.manualAssets, function(to, from) {
    var toDirectory = path.dirname(process.cwd() + '/' + to);

    if(!fs.existsSync(toDirectory)) {
      mkdirp.sync(toDirectory);
    }

    fs.writeFileSync(process.cwd() + '/' + to, fs.readFileSync(process.cwd() + '/' + from));
  });

  var changedFiles = buildMetaData.getChangedFiles(assets);

  if(changedFiles.length > 0) {
    var stream = gulp.src(assets, {
      base: gulpConfig.webPath
    })
    .pipe(gulp.dest(gulpConfig.buildPath));

    stream.on('end', function() {
      buildMetaData.addBuildMetaDataFiles(changedFiles);

      if(buildMetaData.writeFile()) {
        gutil.log(gutil.colors.cyan('writing build meta data file: ' + buildMetaData.filePath));
      }

      done();
    });

    stream.on('error', function(err) {
      done(err);
    });
  } else {
    done();
  }
});
