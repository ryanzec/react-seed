var options = {
  fileGlobs: [
    process.cwd() + '/web/app/**/*.js',
    process.cwd() + '/web/app/**/*.jsx'
  ],
  excludeFileGlobs: [],
  maintainabilityWarningThreshold: 50,
  maintainabilityDangerThreshold: 20
};

require('colors');

var escomplex = require('escomplex-js');
var ReactTools = require('react-tools');
var globArray = require('glob-array');
var fs = require('fs');
var Table = require('cli-table');
var table = new Table({
  head: [
    'filename'.cyan,
    'maintainability'.cyan,
    'cyclomatic'.cyan,
    'lloc'.cyan
  ],
  style: {
    'padding-right': 1,
    'padding-left': 1,
    'color': 'blue'
  },
  chars: {
    'top': '-',//'═',
    'top-mid': '-',//'╤',
    'top-left': '-',//'╔',
    'top-right': '-',//'╗',
    'bottom': '-',//'═',
    'bottom-mid': '-',//'╧',
    'bottom-left': '-',//'╚',
    'bottom-right': '-',//'╝',
    'left': '|',//'║',
    'left-mid': '|',//'╟',
    'mid': '-',//'─',
    'mid-mid': '-',//'┼',
    'right': '|',//'║',
    'right-mid': '|',//'╢',
    'middle': '│'
  }
});
var getNormalizedReportData = function(filename, reportData) {
  return {
    filename: filename,
    logicalLines: reportData.aggregate.sloc.logical,
    physicalLines: reportData.aggregate.sloc.physical,
    maintainability: reportData.maintainability,
    cyclomatic: reportData.aggregate.cyclomatic,
    effort: reportData.effort,
    functionCount: reportData.functions.length,
    dependencyCount: reportData.dependencies.length
  }
};

var files = globArray.sync(options.fileGlobs.concat(options.excludeFileGlobs.map(function(glob) {
    return '!' + glob;
})));

files.forEach(function(filePath) {
  var src = fs.readFileSync(filePath, 'utf8');

  if (filePath.indexOf('.jsx') !== -1) {
    src = ReactTools.transform(src, {harmony: true});
  }

  var report = escomplex.analyse(src, {});

  var normalizedReportData = getNormalizedReportData(filePath.replace(process.cwd() + '/', ''), report);
  var color;

  if(normalizedReportData.maintainability >= options.maintainabilityWarningThreshold) {
    color = 'green';
  } else if(normalizedReportData.maintainability >= options.maintainabilityErrorThreshold) {
    color = 'yellow';
  } else {
    color = 'red';
  }

  table.push([
    normalizedReportData.filename[color],
    normalizedReportData.maintainability.toFixed(2, 10).toString()[color],
    normalizedReportData.cyclomatic.toFixed(2, 10).toString(),
    normalizedReportData.logicalLines
  ]);
});

console.log(table.toString());

if(options.excludeFileGlobs.length > 0) {
    console.log('Skipped the following files, generally because they are 3rd party:');
    console.log(globArray.sync(options.excludeFileGlobs).join('\n').replace(new RegExp('!' + process.cwd() + '/', 'g'), ''));
}
