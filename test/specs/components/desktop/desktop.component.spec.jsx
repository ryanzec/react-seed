var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Desktop = require('../../../../web/app/components/desktop/desktop.component.jsx');
var testHelper = require('../../../test-helper');
var fibers = require('fibers');
var userStore = require('../../../../web/app/stores/user.store');
var bluebird = require('bluebird');
var sinon = require('sinon');

var getUserStub;

describe('desktop component', function() {
  before(function() {
    getUserStub = sinon.stub(userStore, 'getUser', function(userId) {
      var defer = bluebird.defer();

      if (userId === 123) {
        defer.resolve(testHelper.mockedData.users['123']);
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
    testHelper.getRouterComponent(Desktop, '/desktop', this, function() {
      var h1 = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'h1');

      expect(h1).to.be.defined;
      expect(h1.props.id).to.equal('test');
      expect(h1.props.className).to.equal('test');
      expect(h1.props.children).to.equal('Desktop');
      done();
    }.bind(this));
  });

  it('should load user data when clicking button', function(done) {
    fibers(function() {
      testHelper.getRouterComponent(Desktop, '/desktop', this, function() {
        var button = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'load-user-data');

        reactTestUtils.Simulate.click(button);

        testHelper.sleep(5);

        var userId = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-id');
        var userUsername = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-username');
        var userFirstName = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-first-name');
        var userLastName = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'user-last-name');

        expect(userId.props.children).to.equal(123);
        expect(userUsername.props.children).to.equal('test.user');
        expect(userFirstName.props.children).to.equal('Test');
        expect(userLastName.props.children).to.equal('User');

        done();
      }.bind(this));
    }.bind(this)).run();
  });
});
