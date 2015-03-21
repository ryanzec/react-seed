var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var WithResolves = require('../../../../web/app/components/desktop/with-resolves.component.jsx');
var testHelper = require('../../../test-helper');
var userStore = require('../../../../web/app/stores/user.store');
var sinon = require('sinon');
var bluebird = require('bluebird');

describe('with resolves component', function(done) {
  before(function() {
    sinon.stub(userStore, 'getUser', function(userId) {
      var defer = bluebird.defer();

      if (userId === 124) {
        defer.resolve(testHelper.mockedData.users['124']);
      }

      return defer.promise;
    });
  });

  after(function() {
    userStore.getUser.restore();
  });

  beforeEach(function() {
    testHelper.resetStoresCachedData('Menu');
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
      expect(userUsername.props.children).to.equal('test2.user2');
      expect(userFirstName.props.children).to.equal('Test2');
      expect(userLastName.props.children).to.equal('User2');
      done();
    }.bind(this));
  });
});
