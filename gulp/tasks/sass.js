var gulp = require('gulp');
var buildMetaDataFactory = require('build-meta-data');
var gulpConfig = require('../config.js');
var gutil = require('gulp-util');
var _ = require('lodash');
var helpers = require('../helpers');

gulp.task('sass', 'Compile SASS into CSS', function(done) {
  var buildMetaData = buildMetaDataFactory.create(process.cwd() + '/gulp/build-meta-data/sass.json');
  var sassFiles = buildMetaData.getChangedFiles(gulpConfig.sassFiles);
  var commandError = false;

  if(sassFiles.length > 0) {
    var files = gulpConfig.compileFiles.sass;
    var count = Object.keys(files).length;

    _.forEach(files, function(destination, source) {
      helpers.childProcess('sass', [
        '--scss',
        '-t',
        'compressed',
        source,
        destination
      ], function(error, stdout, stderr) {
        if(stderr) {
          commandError = true;
          gutil.log(gutil.colors.red(stderr));
        }

        count -= 1;

        if(count === 0) {
          if(commandError === false) {
            buildMetaData.addBuildMetaDataFiles(sassFiles);

            if(buildMetaData.writeFile()) {
              gutil.log(gutil.colors.cyan('writing build meta data file: ' + buildMetaData.filePath));
            }
          }

          done();
        }
      });
    });
  } else {
    done();
  }
});
