var exec = require('child_process').exec;

module.exports = {
  childProcess: function(command, arguments, cb) {
    console.log('running command: ' + command + ' ' + arguments.join(' '));
    exec(command + ' ' + arguments.join(' '), cb);
  }
};
