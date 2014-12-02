var send = require('koa-send');
var fs = require('fs');
var path = require('path');
var koa = require('koa');
var app = module.exports = koa();
var mocker = require('./mocker/mocker');
var bodyParser = require('koa-bodyparser');
var sleep = require('co-sleep');

//yield compatible function
function readFile(file) {
  return function(fn){
    fs.readFile(file, 'utf8', fn);
  }
}

function fileExists(file) {
  return function(fn){
    fs.exists(file, function(exists) {
      fn(null, exists);
    });
  }
}

app.use(bodyParser());
app.use(function *() {
  var convertStaticPath = function(resourcePath) {
    return resourcePath.replace(new RegExp('(static/[0-9a-zA-Z]*/)', 'g'), '');
  };
  var isHtmlFileRequest = this.path.substr(-5) === '.html';
  var filePath = this.path.substr(1);
  var rootDirectory = this.path.split('/')[1];
  var buildPath = 'build';
  var validRootDirectories = [
    'app',
    'components',
    'static',
    'source',
    'build'
  ];
  var loadIndex = true;
  var requestData = {
    path: this.path,
    method: this.request.method,
    contentType: this.request.header['content-type'],
    body: this.request.body
  };

  //console.log(this.path);
  //console.log(this.request.body);

  //TODO: need to figure out cache system for static resources
  if(isHtmlFileRequest) {
    //serve the build version of the html which is compressed
    yield send(this, convertStaticPath(buildPath + '/' + filePath), {
      root: __dirname
    });
    loadIndex = false;
  } else if(validRootDirectories.indexOf(rootDirectory) !== -1) {
    //rewrite file path for static based URIs
    if(filePath.substr(0, 6) === 'static') {
      filePath = filePath.split('/').splice(2).join('/')
    };

    if(yield fileExists(__dirname + '/' + convertStaticPath(filePath))) {
      yield send(this, convertStaticPath(filePath), {
        root: __dirname
      });
      loadIndex = false;
    }
  } else if(mocker.isMockerRequest(requestData)) {
    var options = mocker.mock(requestData, this.response);

    //TODO: research: would be great if this could be done in the mocker.mock() method itself
    if(options.delay) {
      yield sleep(options.delay);
    }

    loadIndex = false;
  }

  if(loadIndex === true) {
    this.body = yield readFile(buildPath + '/index.html');
  }
});

if(!module.parent) {
  app.listen(3000);
}
