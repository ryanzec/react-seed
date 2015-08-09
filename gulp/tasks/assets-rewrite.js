var gulp = require('gulp');
var gulpConfig = require('../config.js');
var buildMetaDataFactory = require('build-meta-data');
var globArray = require('glob-array');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var crypto = require('crypto');

var config = require('../config.js').tasks.assetsRewrite;
var currentDomainKey = 0;

gulp.task('assets-rewrite', 'Rewrite asset urls', function(done) {
  var buildMetaData = buildMetaDataFactory.create(process.cwd() + '/gulp/build-meta-data/assets-rewrite.json');

  function getRewriteAssetsPath(asset, fullPath) {
    var shasum = crypto.createHash('sha1');
    var filePath = fullPath;

    if(!fs.existsSync(filePath) && config.preprocessors && config.preprocessors[path.extname(filePath)]) {
      filePath = filePath.substr(0, filePath.length - path.extname(filePath).length) + config.preprocessors[path.extname(filePath)];
    } else if(!fs.existsSync(filePath) && asset.substr(0, 6) === 'build/') {
      filePath = filePath.replace(asset, asset.substr(6));
      asset = asset.substr(6);
    }

    shasum.update(fs.readFileSync(filePath, {
      encoding: 'utf8'
    }));
    var sha = shasum.digest('hex');
    var assetParts = asset.split('/');

    if(config.addStatic === true) {
      assetParts.splice(0, 0, 'static', sha);
    }

    var buildIndex = (config.addStatic === true ? 2 : 0);

    if(assetParts[buildIndex] !== gulpConfig.buildDirectoryName && config.noBuildVersion.indexOf(asset) === -1) {
      assetParts.splice(buildIndex, 0, gulpConfig.buildDirectoryName);
    }

    return assetParts.join('/');
  };

  var rewritableAssetExtensions = _.map(config.fileTypesToRewrite, function(item) {
    return '.' + item;
  });
  var processAssetExtensions = _.map(config.fileTypesToProcess, function(item) {
    return '.' + item;
  });

  var allAssets = globArray.sync(config.assetPatterns);
  var rewriteAssets = [];

  allAssets.forEach(function(item) {
    if(fs.statSync(process.cwd() + '/' + item).isDirectory() === false && rewritableAssetExtensions.indexOf(path.extname(item)) !== -1) {
      rewriteAssets.push(item.replace(process.cwd() + '/', ''));
    }
  });

  var filesToProcess = [];
  var searchFor = [
    gulpConfig.buildPath + '/**/*.*'
  ];

  filesToProcess = globArray.sync(searchFor);

  filesToProcess = filesToProcess.filter(function(filePath) {
    return processAssetExtensions.indexOf(path.extname(filePath)) !== -1;
  });

  var count = filesToProcess.length;

  //only filter rewrite assets if the files we are rewriting the assets in have not changes
  if(!buildMetaData.hasChangedFile(filesToProcess)) {
    rewriteAssets = buildMetaData.getChangedFiles(rewriteAssets);
  }

  if(count > 0 && rewriteAssets.length > 0) {
    gulp.src(filesToProcess, {
      base: gulpConfig.buildPath
    })
    .pipe(through.obj(function(file, encoding, cb) {
      if(!file.contents instanceof Buffer) {
        return cb(new Error('assets rewrite can only work on buffers'), file);
      } else {
        var fileContents = String(file.contents);
        var regex = new RegExp("[\"']((http[s]?:)?//[a-zA-Z0-9-_.]*\\.[a-zA-Z0-9-_]*\\.[a-zA-Z0-9-_]{2,6})?/?(((static/[0-9a-zA-Z]*/)+)?((" + config.assetPaths.join('|') + ")/[a-zA-Z0-9-_./]+\\.(" + config.fileTypesToRewrite.join('|') + ")))(#)?([0-9a-zA-Z-_]*)?[\"']", 'g');
        var noMatches = false;
        var match;
        var assetMatches = [];

        do {
          match = regex.exec(fileContents);

          if(match === null) {
            noMatches = true;
          } else {
            var matchObject = {};
            matchObject[match[6]] = match[6];
            assetMatches.push(matchObject);
          }
        } while(noMatches === false);

        if(assetMatches.length > 0) {
          gutil.log(gutil.colors.magenta('rewriting assets in ' + gulpConfig.buildPath + '/' + file.relative + ':'));
          assetMatches.forEach(function(matchObject) {
            var toReplace = Object.keys(matchObject)[0];
            var assetPath = matchObject[Object.keys(matchObject)[0]];
            var rewrittenPath = getRewriteAssetsPath(assetPath, process.cwd() + '/' + gulpConfig.webPath + '/' + assetPath);

            if(config.domains.length > 0) {
              rewrittenPath = config.domains[currentDomainKey] + '/' + rewrittenPath;

              if(currentDomainKey >= config.domains.length - 1) {
                currentDomainKey = 0;
              } else {
                currentDomainKey += 1;
              }
            }

            gutil.log(gutil.colors.cyan(toReplace + ' => ' + rewrittenPath));

            fileContents = fileContents.replace(toReplace, rewrittenPath);
          });
        } else {
          gutil.log(gutil.colors.green('no assets to rewrite in ' + gulpConfig.buildPath + '/' + file.relative));
        }

        file.contents = new Buffer(fileContents);
      }

      return cb(null, file);
    }))
    .pipe(through.obj(function(file, encoding, cb) {
      count -= 1;

      if(count == 0) {
        //add a delay here to make sure the build meta data incorperates the assets rewrite when hashing the files
        setTimeout(function() {
          buildMetaData.addBuildMetaDataFiles(rewriteAssets);
          buildMetaData.addBuildMetaDataFiles(filesToProcess);

          if(buildMetaData.writeFile()) {
            gutil.log(gutil.colors.cyan('writing build meta data file: ' + buildMetaData.filePath));
          }
        }, 500);

        done();
      }

      cb(null, file);
    }))
    .pipe(gulp.dest(gulpConfig.buildPath));
  } else {
    done();
  }
});
