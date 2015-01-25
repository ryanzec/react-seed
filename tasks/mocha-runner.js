//NOTE: Coverage reports for .jsx files will work on the compiled version of the code
var options = {
  filesForCoverageReportsGlobs: [
    process.cwd() + '/web/app/**/*.js',
    process.cwd() + '/web/app/**/*.jsx'
  ],
  htmlDirectory: process.cwd() + '/coverage',
  testFileGlobs: [
    process.cwd() + '/test/**/*.spec.*'
  ]
};

require('../test/test-setup.js');

var runCoverageReports = process.argv.indexOf('--coverage') !== -1;
var Mocha = require('mocha');
var module = require('module');
var fs = require('fs');
var ReactTools = require('react-tools');
var globArray = require('glob-array');

if(runCoverageReports) {
  var istanbul = require('istanbul');
  var instrumenter = new istanbul.Instrumenter({});
  var sourceStore = istanbul.Store.create('memory');
  global['__coverage__'] = {};
  sourceStore.dispose();

  var filesForCoverageReports = globArray.sync(options.filesForCoverageReportsGlobs);
}

if(runCoverageReports) {
  require.extensions['.js'] = function(module, filePath) {
    var src = fs.readFileSync(filePath, {encoding: 'utf8'});

    if(filesForCoverageReports.indexOf(filePath) !== -1) {
      sourceStore.set(filePath, src);
      src = instrumenter.instrumentSync(src, filePath);
    }

    module._compile(src, filePath);
  }
}

require.extensions['.jsx'] = function(module, filePath) {
  var src = fs.readFileSync(filePath, 'utf8');
  var compiled = ReactTools.transform(src, {harmony: true});

  if(runCoverageReports) {
    if(filesForCoverageReports.indexOf(filePath) !== -1) {
      sourceStore.set(filePath, compiled);
      compiled = instrumenter.instrumentSync(compiled, filePath);
    }
  }

  return module._compile(compiled, filePath);
};

if(runCoverageReports) {
  var collector = new istanbul.Collector();
}
var mocha = new Mocha({});

globArray.sync(options.testFileGlobs).forEach(function(filePath) {
  mocha.addFile(filePath);
});

var requireUncoveredFiles = function() {
  var coveredFiles = Object.keys(sourceStore.map);

  filesForCoverageReports.forEach(function(filePath) {
    if(coveredFiles.indexOf(filePath) === -1) {
      require(filePath);
    }
  });
};

mocha.run(function(failures){
    process.on('exit', function () {
      if(runCoverageReports) {
        requireUncoveredFiles();

        collector.add(global['__coverage__']);

        istanbul.Report.create('text').writeReport(collector, true);
        istanbul.Report.create('html', {
            sourceStore: sourceStore,
            dir: options.htmlDirectory
        }).writeReport(collector, true);
      }
      process.exit(failures);
    });
});
