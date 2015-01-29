/*global describe, it, before, beforeEach*/
/*
 * source-mapper.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var assert     = require('assert');
var browserify = require('browserify');
var exec       = require('child_process').exec;
var path       = require('path');
var mapper     = require('../lib/source-mapper');

function spy(obj, prop) {
  var fn = obj[prop];
  function s() {
    s.calls.push(Array.prototype.slice.call(arguments));
    return fn.apply(this, arguments);
  }
  s.calls = [];
  obj[prop] = s;
  return s;
}


describe('source-mapper', function () {
  var js;
  var x;
  var c;

  before(function (done) {
    var b = browserify({ debug : true });
    b.add('./test/fixture/thrower.js');
    b.bundle(function (err, script) {
      js = script.toString();
      x = mapper.extract(js);
      c = mapper.consumer(x.map);
      done(err);
    });
  });

  it('removes sourceMappingURL from js', function () {
    var xjs = x.js.trim();

    assert.equal(js.substring(0, xjs.length).trim(), xjs);
    assert.equal(x.js.indexOf('//# sourceMappingURL='), -1);
  });

  it('maps node stdin stack', function (done) {
    var node = exec('node', function (err) {
      if (!err) {
        assert.fail('Error expected');
      }
      var s = mapper.stream(x.map);
      var d = '';
      s.on('data', function (data) {
        d += data;
      });
      s.on('end', function () {
        var base = 'test/fixture/thrower.js';
        var arr  = d.split('\n');

        assert.equal(arr[1], '    ' + base + ':4');
        assert.equal(arr[5], '    at ' + base + ':4:9');
        assert.equal(arr[6], '    at Object.<anonymous> (' + base + ':5:2)');
        done();
      });
      s.write(err.toString());
      s.end();
    });
    node.stdin.write(x.js);
    node.stdin.end();
  });

  it('maps about:blank line', function () {
    var mapped = mapper.line(c, 'about:blank:5');

    assert.equal(mapped, '    test/fixture/thrower.js:4');
  });

  it('maps http://localhost line', function () {
    var mapped = mapper.line(c, 'http://localhost/test:5');

    assert.equal(mapped, '    test/fixture/thrower.js:4');
  });

  it('maps http://l0cal.ho-s_t.com line', function () {
    var mapped = mapper.line(c, 'http://l0cal.ho-s_t.com/test:5');

    assert.equal(mapped, '    test/fixture/thrower.js:4');
  });

  it('maps http://localhost line with port', function () {
    var mapped = mapper.line(c, 'http://localhost:1234/test:5');

    assert.equal(mapped, '    test/fixture/thrower.js:4');
  });

  it('maps http://localhost line with column', function () {
    var mapped = mapper.line(c, 'http://localhost/test:5:0');

    assert.equal(mapped, '    test/fixture/thrower.js:4:0');
  });

  it('maps http://localhost line with port and column', function () {
    var mapped = mapper.line(c, 'http://localhost:1234/test:5:0');

    assert.equal(mapped, '    test/fixture/thrower.js:4:0');
  });

  it('maps file:// line', function () {
    var mapped = mapper.line(c, 'file://that/file/test:5');

    assert.equal(mapped, '    test/fixture/thrower.js:4');
  });

  it('maps file:// line with column', function () {
    var mapped = mapper.line(c, 'file://that/file/test:5:0');

    assert.equal(mapped, '    test/fixture/thrower.js:4:0');
  });

  it('maps IE 10 stack line', function () {
    var mapped = mapper.line(c,
        'at Anonymous function (Unknown script code:5:1)');

    assert.equal(mapped,
        '    at Anonymous function (test/fixture/thrower.js:4:1)');
  });

  it('maps anonymous line', function () {
    var mapped = mapper.line(c, 'at Object.fail (<anonymous>:5:1)');

    assert.equal(mapped, '    at Object.fail (test/fixture/thrower.js:4:1)');
  });

  it('maps Safari line', function () {
    var mapped = mapper.line(c, 'equal@file:///some/path:5:1');

    assert.equal(mapped, '    equal test/fixture/thrower.js:4:1');
  });

  it('does not map "abc http://localhost:5"', function () {
    var line = 'abc http://localhost:5';

    assert.equal(mapper.line(c, line), line);
  });

  it('does not map "http://localhost:5/"', function () {
    var line = 'http://localhost:5/';

    assert.equal(mapper.line(c, line), line);
  });

  it('does not map "http://local.somehost:5/"', function () {
    var line = 'http://local.somehost:5/';

    assert.equal(mapper.line(c, line), line);
  });

  it('passes line number minus offset to consumer (line)', function () {
    var s = spy(c, 'originalPositionFor');

    mapper.line(c, 'about:blank:12', 7);

    assert.equal(s.calls.length, 1);
    assert.equal(s.calls[0][0].line, 5);
  });

  it('passes line number minus offset to consumer (stream)', function () {
    var s = spy(c, 'originalPositionFor');

    var stream = mapper.stream(c, 7);
    stream.write('about:blank:12\n');

    assert.equal(s.calls.length, 1);
    assert.equal(s.calls[0][0].line, 5);
  });

  it('returns original line if line number is 0', function () {
    var line = 'http://localhost:0';

    assert.equal(mapper.line(c, line), line);
  });

  it('returns original line if line number minus offset is 0', function () {
    var line = 'http://localhost:7';

    assert.equal(mapper.line(c, line, 7), line);
  });

});
