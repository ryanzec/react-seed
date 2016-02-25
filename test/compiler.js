var babel = require('babel-core/register');
var noop = function(){return null;};

//assets the webpack parsers that node can't
require.extensions['.html'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.png'] = noop;
