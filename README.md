# ReactJS Seed

An opinionated seed project for ReactJS based application.

## Setup ##

- Download
- run `npm install`
- run `gulp build-quick`

You can not serve the `web/build` directory through any server you wish (like running `python -m SimpleHTTPServer 8000` on Mac OS X).

For some of the gulp tasks to run properly.

## Browser Support

This setup is designed to support IE 10+ and the latest version of Safari, FireFox, and Chrome.  It should also work in modern mobile browsers.

## What Does It Have

These are the opinions that this setup makes

### ReactJS

[ReactJS](http://facebook.github.io/react/) is setup as the view layer for the front-end UI.  Nothing really special here besides including it.

### Routing

This setup uses the [react-router](https://github.com/rackt/react-router) library for routing.

### Data Flow

This setup uses a very basic implementation of data flow lossly inspired by Flux.  All data flows through objects (like stores) which can listen to and emit events and can have methods to do things (like actions).

### Schema Inspector

On the front-end side of things, I don't think there is a huge need for a full ORM type solution.  You should be able to just use POJO that are passed to an returned from teh data flow objects.  There is however a need to be able to do data validation on these POJO and for this, [Schema Inspector](https://github.com/Atinux/schema-inspector) is included.  It provide validation and sanitization functionality that can be applied to POJO.

### Mocking

This setup assumes nothing about the backend but you should still be able to develop front-end application without actually having backend.  In order to support this, this setup includes the [Backend](https://github.com/callmehiphop/backend) library.  This library allows you to easily mocked API requests.

### Moment

The [Moment](http://momentjs.com/) library is included to easily work with dates/times.

### Testing

This setup includes [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [Sinon](http://sinonjs.org/), and [JSDom](https://github.com/tmpvar/jsdom) in order to do unit level testing.  It also contains a number of helpers to make test ReactJS and React Router components easier.

### Internationalization

This setup include the [MessageFormat](https://github.com/SlexAxton/messageformat.js) to generate i18n files to help with internationalization.

### ESLint

This setup include ESLint to help with code standarization.

### SuperAgent

This setup includes the [SuperAgent](https://github.com/visionmedia/superagent) in order to make AJAX requests.

### Browserify

All javascript is processed through [Browserify](http://browserify.org/).

### Gulp

[GulpJS](http://gulpjs.com/) is used for the build system.  It include tasks:

- assets-rewrite
- browserify (production and non-production mode)
- build (a combination of all the tasks with quick and non-quick modes)
- clean-build
- complexity
- copy-static-assets
- eslint
- html-minify
- i18n
- mocha
- sass

It also uses a system in most tasks to cache when files are processed to make the build process as fast as possible.

## License ##

MIT
