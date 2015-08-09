# Change Log

# master

- added mocked requests object to test helper
- removed use of type type for spy test helper methods (#7)
- updated react libraries

# master

- set eslint no-process-env to 0 (#12)
- added class list shim for tests (#9)
- added ua parser (#5)

# 0.9.0

- refactored mocking solution on front-end to be a little more flexible
- added nock for mocking within unit tests that uses the same data as the front-end mocks
- fixed a few with-reolves unit tests
- mocked requests should now properly support request headers
- added ability to find rendered dom component by prop value
- updated mocking library to support request header checking properly
- added jsuri library
- updated gulp clean build task to remove coverage generated files
- better support for testing react router based components
- assets rewrite add `/build/` to path with configurable option to add `/static/[SHA]/`
- added support for copying directory in copy static assets task
- added support for #... in assets rewrite regex
- renamed gulp task `static-rewrite` to `assets-rewrite`
- added ability to use `process.env.NODE_ENV` technique to wrap debug code for application code
- added `process.env.NODE_ENV` to production build to strip dev code from libraries (like react)

## 0.8.0

- removed jscs and jshint in favor of just using eslint

## 0.7.0

- added jscs support
- made jshint work without needing the jshint ignore comments
- added messageformat to devDependencies
- added api mocking solution (#4)
- disabled static rewrite as no longer providing default solution to handle it.

## 0.5.0

- removed koa (should be able to use simple python server for initial testing/demoing)
- now works work node v0.10.x (using fibers to replace generator functionality from v0.11.x)
- general build process code refactoring

## 0.4.0

- updated manual copying of assets to be more flexible
- added better error reporting for libraries browserify process
- added code complexity to build process
- added code coverage to build process
- general build process code refactoring

## 0.3.0

- updated testing system
- added ability to specify specific file for the copy static assets gulp task
- made browserify error easier to work with
- refactored some test code to play nicely with [react-router](https://github.com/rackt/react-router)
- converted to using [react-router](https://github.com/rackt/react-router)
- fixed issue with browserify-production not uglifying code

## 0.1.0

- initial commit
