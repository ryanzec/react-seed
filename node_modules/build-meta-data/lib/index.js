var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var _ = require('lodash');
var globArray = require('glob-array');
var mkdirp = require('mkdirp');

module.exports = {
  create: function(buildMetaDataFilePath) {
    if(!buildMetaDataFilePath) {
      throw new Error("You must provide a build file to store the meta data");
    }

    if(!fs.existsSync(path.dirname(buildMetaDataFilePath))) {
      mkdirp.sync(path.dirname(buildMetaDataFilePath));
    }

    //we need to keep tracking of some meta data about the build files to be able to deteremine if we need to generate them
    //var buildMetaDataFilePath = process.cwd() + '/build-meta-data.json';
    var currentBuildMetaData = {};
    var lastBuildMetaData = {};
    var changedFilesKeys = [];

    var buildMetaDataObject = {
      /**
       * Load the meta data from the configured file
       */
      updateFromFile: function() {
        changedFilesKeys = [];

        if(fs.existsSync(buildMetaDataFilePath)) {
          lastBuildMetaData = JSON.parse(fs.readFileSync(buildMetaDataFilePath, 'ascii'));
        }

        if(!lastBuildMetaData['workingFiles']) {
          lastBuildMetaData['workingFiles'] = {};
        }

        if(!currentBuildMetaData['workingFiles']) {
          currentBuildMetaData['workingFiles'] = lastBuildMetaData['workingFiles'];
        }

        if(!lastBuildMetaData['buildFiles']) {
          lastBuildMetaData['buildFiles'] = {};
        }

        if(!currentBuildMetaData['buildFiles']) {
          currentBuildMetaData['buildFiles'] = lastBuildMetaData['buildFiles'];
        }

        //lets cache all the files that have changed upfront
        for(var resourcePath in currentBuildMetaData['workingFiles']) {
          if(
          currentBuildMetaData['workingFiles'][resourcePath]
          && buildMetaDataObject.getFileHash(resourcePath) !== currentBuildMetaData['workingFiles'][resourcePath].fileHash
          ) {
            changedFilesKeys.push(resourcePath);
          }
        }
      },

      /**
       * Remove meta data for a perticular file
       */
      invalidateBuildFile: function(file) {
        delete currentBuildMetaData['buildFiles'][file];
      },

      /**
       * Tells whether or not the any of the files in the list has a changed one
       *
       * @param files
       * @returns {boolean}
       */
      hasChangedFile: function(files) {
        for(var file in files) {
          if(changedFilesKeys.indexOf(path.relative(process.cwd(), files[file])) !== -1) {
            return true;
          } else if(!currentBuildMetaData['workingFiles'][path.relative(process.cwd(), files[file])]) {
            return true;
          }
        }

        return false;
      },

      /**
       * Determine is a perticular file has changed
       * @param {string} Full path for file
       */
      hasFileChanged: function(file) {
        return !currentBuildMetaData['workingFiles'][path.relative(process.cwd(), file)] || changedFilesKeys.indexOf(path.relative(process.cwd(), file)) !== -1;
      },

      getChangedFiles: function(files) {
        if(!_.isArray(files)) {
          files = [files];
        }
        files = globArray.sync(files);

        files = files.filter(function(file) {
          return !currentBuildMetaData['workingFiles'][file] || changedFilesKeys.indexOf(path.relative(process.cwd(), file)) !== -1;
        });

        return files;
      },

      /**
       * Determines if the passed in files list is the same list of files used the last time the compiled files was generated
       *
       * @param originalFileName
       * @param files
       * @returns {boolean}
       */
      hasSameFiles: function(originalFileName, files) {
        var hasSameFiles;

        //if we don't have the file list, it does not have the same files
        if(!lastBuildMetaData['buildFiles'] || !lastBuildMetaData['buildFiles'][originalFileName]) {
          hasSameFiles = false;
        }

        //make sure all the files are currently being included
        for(var file in files) {
          if(
            !lastBuildMetaData['buildFiles'][originalFileName] ||
            lastBuildMetaData['buildFiles'][originalFileName].indexOf(files[file]) === -1
          ) {
            hasSameFiles = false;
          }
        }

        //this will check to see if there are new files or removed files
        if(hasSameFiles !== false) {
          hasSameFiles = files.length === lastBuildMetaData['buildFiles'][originalFileName].length;
        }

        //if it is not the same, remove the stored files since it will be rebuilt anyways
        if(hasSameFiles === false) {
          lastBuildMetaData['buildFiles'][originalFileName] = [];
        }

        return hasSameFiles;
      },

      /**
       * Returns all the compiled files that used the files of files during the last build
       *
       * @param files
       * @returns {Array}
       */
      getCompiledFiles: function(files) {
        var filePaths = [];

        for(file in files) {
          _.forEach(currentBuildMetaData['buildFiles'], function(fileSet, buildFile) {
            if(_.indexOf(fileSet, files[file].replace(process.cwd() + '/', '')) !== -1 && _.indexOf(filePaths, buildFile) === -1) {
              filePaths.push(buildFile);
            }
          });
        }

        return filePaths;
      },

      /**
       * Generates a sha1 hash of the contents of a files
       *
       * @param filePath
       * @returns {*}
       */
      getFileHash: function(filePath) {
        var shasum = crypto.createHash('sha1');

        if(fs.existsSync(filePath)) {
          return shasum.update(fs.readFileSync(filePath, 'ascii')).digest('hex');
        } else {
          return false;
        }
      },

      /**
       *
       */
      resetCompiledFileList: function(compiledFilePath) {
        currentBuildMetaData['buildFiles'][compiledFilePath] = [];
      },

      addBuildMetaDataFiles: function(files, compiledFilePath) {
        if(compiledFilePath) {
          this.invalidateBuildFile(compiledFilePath);
        }

        var fileMatches = globArray.sync(files);

        fileMatches.forEach(function(file) {
          this.addBuildMetaDataFile(file, compiledFilePath);
        }.bind(this));
      },

      /**
       * Adds meta data information for the build
       *
       * @param filePath
       * @param compiledFilePath
       * @param originalFileName
       */
      addBuildMetaDataFile: function(filePath, compiledFilePath) {
        compiledFilePath = compiledFilePath ? path.relative(process.cwd(), compiledFilePath) : path.relative(process.cwd(), filePath);
        var oldFileHash = currentBuildMetaData['workingFiles'][filePath] ? currentBuildMetaData['workingFiles'][filePath].fileHash : null;
        currentBuildMetaData['workingFiles'][filePath] = {
          //a hash of the file is probably a more accurate way of determine if the file has changed than last modified datetime
          fileHash: this.getFileHash(filePath)
        };

        //need to make sure the file that are changed during a task are marked as changed for later tasks when running multiple tasks at the same time
        if(oldFileHash !== currentBuildMetaData['workingFiles'][filePath].fileHash) {
          var toAdd = [];

          if(filePath) {
            toAdd.push(filePath);
          }

          if(compiledFilePath) {
            toAdd.push(compiledFilePath);
          }

          changedFilesKeys = changedFilesKeys.concat(toAdd);

          //remove any duplicates
          changedFilesKeys = changedFilesKeys.filter(function(elem, pos) {
            return changedFilesKeys.indexOf(elem) == pos;
          });
        }

        if(compiledFilePath !== path.relative(process.cwd(), filePath)) {
          if(!currentBuildMetaData['buildFiles']) {
            currentBuildMetaData['buildFiles'] = {};
          }

          if(!currentBuildMetaData['buildFiles'][compiledFilePath]) {
            currentBuildMetaData['buildFiles'][compiledFilePath] = [];

            if(lastBuildMetaData['buildFiles']) {
              lastBuildMetaData['buildFiles'][compiledFilePath] = [];
            }
          }

          if(_.indexOf(currentBuildMetaData['buildFiles'][compiledFilePath], filePath) === -1) {
            currentBuildMetaData['buildFiles'][compiledFilePath].push(filePath);
          }
        }
      },

      /**
       * Writes out the build meta data json file.
       */
      writeFile: function() {
        fs.writeFileSync(buildMetaDataFilePath, JSON.stringify(currentBuildMetaData, null, 2), 'ascii');
        return true;
      }
    };

    Object.defineProperties(buildMetaDataObject, {
      filePath: {
        get: function() {
          return buildMetaDataFilePath;
        }
      }
    });

    buildMetaDataObject.updateFromFile();

    return buildMetaDataObject;
  }
};
