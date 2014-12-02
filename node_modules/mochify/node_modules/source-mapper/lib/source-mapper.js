/*
 * source-mapper.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var through   = require('through2');
var convert   = require('convert-source-map');
var sourceMap = require('source-map');

var stackRE = new RegExp('^\\s*(.*)?'
  + '(\\[stdin\\]|about:blank|http:\\/\\/[a-z0-9\\-_\\.]+(:[0-9]+)?\\/.*|'
  + 'file:\\/\\/.+|Unknown script code|<anonymous>)[:\\d]+\\)?$', 'gm');


exports.extract = function (js) {
  var map = convert.fromSource(js);
  if (map) {
    map = map.toObject();
    delete map.sourcesContent;
    js = convert.removeComments(js);
  }
  return {
    js  : js,
    map : map
  };
};


exports.consumer = function (map) {
  return new sourceMap.SourceMapConsumer(map);
};


exports.line = function (consumer, line, offset) {
  return line.replace(stackRE, function (_, pre) {
    /*jslint unparam: true*/
    var m = _.match(/:(\d+)(:\d+)?(\D*)$/);
    var n = Number(m[1]) - (offset || 0);
    if (n < 1) {
      return _;
    }
    var mapped = consumer.originalPositionFor({
      line   : n,
      column : 0
    });
    pre = '    ' + (pre || '').replace('@', ' ');
    return pre + mapped.source + ':' + mapped.line + (m[2] || '') + m[3];
  });
};


exports.stream = function (consumer, offset) {
  if (!(consumer instanceof sourceMap.SourceMapConsumer)) {
    consumer = new sourceMap.SourceMapConsumer(consumer);
  }
  var buf = '';
  return through(function (chunk, enc, next) {
    /*jslint unparam: true*/
    buf += chunk.toString();
    var p = buf.lastIndexOf('\n');
    if (p !== -1) {
      this.push(exports.line(consumer, buf.substring(0, p + 1), offset));
      buf = buf.substring(p + 1);
    }
    if (buf.length > 3 && !/^\s+at /.test(buf)) {
      this.push(buf);
      buf = '';
    }
    next();
  }, function (next) {
    if (buf) {
      this.push(buf);
    }
    next();
  });
};
