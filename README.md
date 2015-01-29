# ReactJS Seed

This is a seed for a ReactJS based application.

## Setup ##

Download the repository and it includes everything you need.  It includes the NPM packages however you will need to run:

```
npm rebuild
```

For some of the gulp tasks to run properly.

## What Does It Have

### ReactJS

[ReactJS](http://facebook.github.io/react/) is setup as the view layer for the front-end UI.  Nothing really special here besides including it.

### Routing

This seed project using the [react-router](https://github.com/rackt/react-router) project for routing.

### Fluxe

It using a thin wrapper on top of [Facebook's flux dispatcher](http://facebook.github.io/flux/) call [fluxe](https://github.com/ryanzec/fluxe).

### Gulp

[GulpJS](http://gulpjs.com/) is used for the build system.  It include tasks for:

- bower
- browserify (production and non-production mode)
- complexity
- html minification
- jshint
- sass
- static re-write
- build, a combination of the above task (quick and non-quick mode)

It also uses a system in most tasks to cache when files are processed to make the build process as fast as possible.

### Testing

The code is setup to be tested through [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [jsdom](https://github.com/tmpvar/jsdom), and [Sinon](http://sinonjs.org/).

## License ##

MIT
