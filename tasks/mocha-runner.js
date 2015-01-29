//NOTE: Coverage reports for .jsx files will work on the compiled version of the code
var options = {
  filesForCoverageReportsGlobs: [
    process.cwd() + '/web/app/**/*.js',
    process.cwd() + '/web/app/**/*.jsx'
  ],
  excludeFileForCoverageReportsGlobs: [],
  htmlDirectory: process.cwd() + '/coverage',
  testFileGlobs: [
    process.cwd() + '/test/**/*.spec.*'
  ]
};

require('../test/test-setup.js');

var commandArguments = process.argv.slice(2);
var runCoverageReports = commandArguments.indexOf('--coverage') !== -1;
var mochaReporter = 'spec';

if(commandArguments.indexOf('-R') !== -1) {
   mochaReporter = commandArguments[commandArguments.indexOf('-R') + 1];
}

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

  var filesForCoverageReports = globArray.sync(options.filesForCoverageReportsGlobs.concat(options.excludeFileForCoverageReportsGlobs.map(function(glob) {
    return '!' + glob;
  })));
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
var mocha = new Mocha({
  reporter: mochaReporter
});

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

        if(options.excludeFileForCoverageReportsGlobs.length > 0) {
            console.log('Skipped the following files because they are either 3rd party files or are not testable:');
            console.log(globArray.sync(options.excludeFileForCoverageReportsGlobs).join('\n').replace(new RegExp('!' + process.cwd() + '/', 'g'), ''));
        }
      }
      process.exit(failures);
    });
});
