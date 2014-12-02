# ReactJS Seed

This is a seed for a ReactJS based application.  It does also include KoaJS if you are inclined however it should be relatively easy to remove it and replace with whatever backend server you wish to use.

## Setup ##

Download the repository and it includes everything you need.  It includes the NPM packages as this is designed as a base repository for an application and not a library and I feel it is better to store packages for applications (just incase npm in down for whatever reason, you still download the codebase and work with it).

## What Does It Have

### ReactJS

[ReactJS](http://facebook.github.io/react/) is setup as the view layer for the front-end UI.  Nothing really special here besides including it.

### Routing

It has a built front-end router the utilizes [router.js](https://github.com/aaronblohowiak/routes.js) to do route matching and then uses a modifyied version of [page.js](http://visionmedia.github.io/page.js/)'s onclick and onpopstate events to trigger route changes.

This solution includes the ability to define functions that must be resolved in order for the route to change.

### Fluxe

It using a thin wrapper on top of [Facebook's flux dispatcher](http://facebook.github.io/flux/) call [fluxe](https://github.com/ryanzec/fluxe).

### KoaJS

[KoaJS](http://koajs.com/) is setup as the server for the application.  It also has a very lightweight mocks solution setup to be able to easily mock api requests.

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
