var fs = require('fs');
var jshint = require('jshint').JSHINT;
var jshintcli = require('jshint/src/cli');
var ReactTools = require('react-tools');
var globArray = require('glob-array');
var _ = require('lodash');

var errors = {};
var filesToLint = [
    process.cwd() + '/web/app/**/*.js',
    process.cwd() + '/web/app/**/*.jsx',
    '!' + process.cwd() + '/web/app/mocked-api.js'
];
var config = jshintcli.loadConfig('.jshintrc');

//not a valid option, not sure where it is coming from
delete config.dirname;

//move globals to there own object
var globals = config.globals;
delete config.globals;

var collectErrors = function(filePath) {
  if(jshint.errors.length > 0) {
    errors[filePath] = jshint.errors.map(function(errorObject) {
      return {
        line: errorObject.line,
        column: errorObject.character,
        error: errorObject.reason
      };
    });
  }
};

var displayErrors = function() {
  if(Object.keys(errors).length > 0) {
    _.forEach(errors, function(errors, filePath) {
      console.log();
      console.log(filePath);

      errors.forEach(function(error) {
        console.log('line: ' + error.line + ' | column: ' + error.column + ': ' + error.error);
      });
    });

    console.log();
  }
};

globArray.sync(filesToLint).forEach(function(filePath) {
  var transformedCode = ReactTools.transform(fs.readFileSync(filePath, 'utf8'));

  if(jshint(transformedCode, config, globals) === false) {
    collectErrors(fs.realpathSync(filePath))
  }
});

displayErrors();
