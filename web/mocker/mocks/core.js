module.exports = function(mocker) {
  mocker.addMock({
    method: 'GET',
    path: '/test'
  }, {
    body: {
      test: 'test2'
    }
  });

  mocker.addMock({
    method: 'PATCH',
    path: '/test',
    contentType: 'application/json',
    body: {
      test: 'patch'
    }
  }, {
    body: {
      test: 'patched'
    }
  }, {
    delay: 2000
  });
};
