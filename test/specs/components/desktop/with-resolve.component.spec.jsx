var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var WithResolves = require('../../../../web/app/components/desktop/with-resolves.component.jsx');
var testHelper = require('../../../test-helper');
var userStore = require('../../../../web/app/components/stores/user.store');
var sinon = require('sinon');
var bluebird = require('bluebird');

var getUserStub;

describe('with resolves component', function(done) {
  before(function() {
    getUserStub = sinon.stub(userStore, 'getUser', function(userId) {
      var defer = bluebird.defer();

      if (userId === 124) {
        defer.resolve({
          id: 124,
          firstName: 'Test',
          lastName: 'User',
          username: 'test.user'
        });
      }

      return defer.promise;
    });
  });

  after(function() {
    userStore.getUser.restore();
  });

  beforeEach(function() {
    testHelper.resetStores('Menu');
  });

  it('should have h1', function(done) {
    testHelper.getRouterComponent(WithResolves, '/with-resolves', this, function() {
      var h1 = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'h1');

      expect(h1).to.be.defined;
      expect(h1.props.children).to.equal('With Resolves');
      done();
    }.bind(this));
  });

  it('should have user data', function(done) {
    testHelper.getRouterComponent(WithResolves, '/with-resolves', this, function() {
      var userId = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-id');
      var userUsername = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-username');
      var userFirstName = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-first-name');
      var userLastName = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-last-name');

      expect(userId.props.children).to.equal(124);
      expect(userUsername.props.children).to.equal('test.user');
      expect(userFirstName.props.children).to.equal('Test');
      expect(userLastName.props.children).to.equal('User');
      done();
    }.bind(this));
  });
});
