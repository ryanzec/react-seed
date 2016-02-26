# ReactJS Seed

An opinionated seed project for ReactJS based application.  This project tries to incorporate some of the better known and used projects / libraries but will diverge when I feel the need to.

## Basic Setup ##

- Download
- run `npm install`
- run `./build-developer`

## Core Components ##

Ovbiously ReactJS is at the core of this seed project however there are a number of other projects / libraries that are also wrapped together in here.

### WebPack ###

WebPack is being used as the build tool.  While this project is only using some of the more basic feature of WebPack, there are a number of other feature that in the future it might make use of.

### Babel ###

ES6 code is becoming more and more common in library documentation and tutorials and the spec for ES6 is finialized so it make sense to start using it.  Babel is being used to transpile ES6 code to ES5.  This project will only ever make use of features that are near guarantee not to change very much so while it will will make use of all ES6 feature, features that are still in proposal (https://github.com/tc39/ecma262) are unlikely to be used.

### React Router ###

The react-router (https://github.com/reactjs/react-router) project seems to be the defacto standard for routing in ReactJS and is the router that is used here.

### Redux ###

This is a Flux-ish store implementation that seems to be gathering some momentum and is one of the first implementations of Flux that has at least clicked with me on my initial look / try of it.

### ImmutableJS ###

While it is optional, ImmutableJS is included as the immutable library for this project.  Using immutable objects with your Redux store can make it easier to reason about your data and makes certain things like redo / undo possible.

### Bluebird ###

Bluebird is a very feature full and fast Promise implementation that is included for all your promise needs.

### MomentJS ###

MomentJS is pretty much the defacto library for dealing with dates.

### messageformat.js ###

messageformat.js provides functionality for easily doing pluralization and gender with strings and also used for multi-language support.

### suparagent ###

superagent is provide as the library to deal with ajax requests.

### Mocha / Chai / Sinon ###

Mocha and Chai are used as the core libraries for both unit and UI testing.  Sinon is also included for unit testing.

### Unit Testing ###

Unit testing should cover all code with the exception of page components as that generally deals with routing and page transition which is better handled with UI testing.

#### JSDOM ####

JSDOM is used to provide a dom implementation for your unit tests

#### babel-istanbul ####

babel-istanbul is used to provide coverage report with our unit tests.

### UI Testing ###

UI testing should be used as just another layer of testing your code to make sure it work proerly in a browser browser.  This also provide test coverage for your page level components.

#### WebdriverIO ####

WebdriverIO is used as the tool for controling the browser in your UI tests.

#### webdriver-manager ####

While not 100% necessary, it provide the easiest way to manage selenium and chrome driver that can be used to run your tests.

## NOTES ##

- A
- This provides some very basic functionality that is there just to make sure all the libraries work well together, it is not expected that any of this code it going to be used in project (just used more as example to work off of)
- This project only provide a limited number of unit tests and UI tests as none of this code is expected to be used in production,

## CURRENTLY UPGRADING ##

I am currently doing a bit of upgrading to this seed project and will update documentation once the upgrading has stabilized.

## License ##

MIT
