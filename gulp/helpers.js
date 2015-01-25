var gutil = require('gulp-util');
var exec = require('child_process').exec;

module.exports = {
  childProcess: function(command, arguments, cb) {
    gutil.log(gutil.colors.cyan('running command: '), command + ' ' + arguments.join(' '));
    exec(command + ' ' + arguments.join(' '), cb);
  }
};
