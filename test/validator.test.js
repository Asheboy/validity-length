const assert = require('assert')
const validate = require('../validator')

describe('validity-length', function () {
  it('should allow length in middle of range', function () {
    validate(1, 10)('firstName', 'First Name', { firstName: 'Test' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, null)
    })
  })

  it('should allow length of min', function () {
    validate(1, 10)('firstName', 'First Name', { firstName: 'T' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, null)
    })
  });

  it('should allow length of max', function () {
    validate(1, 10)('firstName', 'First Name', { firstName: 'TestTestTe' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, null)
    })
  });

  it('should not allow length of max + 1', function () {
    validate(1, 10)('firstName', 'First Name', { firstName: 'TestTestTes' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, 'First Name is an incorrect length')
    })
  });

  it('should not allow length of min - 1', function () {
    validate(2, 10)('firstName', 'First Name', { firstName: 'T' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, 'First Name is an incorrect length')
    })
  });

  it('should allow value of empty string when min is zero', function () {
    validate(0, 10)('firstName', 'First Name', { firstName: '' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, null)
    })
  });

  it('should not allow value of empty string when min is not zero', function () {
    validate(1, 10)('firstName', 'First Name', { firstName: '' }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, 'First Name is an incorrect length')
    })
  });

  it('should allow value of undefined when min is zero', function () {
    validate(0, 10)('firstName', 'First Name', {}, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, null)
    })
  });

  it('should allow value of undefined when min is not zero', function () {
    validate(1, 10)('firstName', 'First Name', {}, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, 'First Name is an incorrect length')
    })
  });

  it('should allow value of null when min is zero', function () {
    validate(0, 10)('firstName', 'First Name', { firstName: null }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, null)
    })
  });

  it('should allow value is null when min is not zero', function () {
    validate(1, 10)('firstName', 'First Name', { firstName: null }, function (error, validationError) {
      assert.equal(error, null)
      assert.equal(validationError, 'First Name is an incorrect length')
    })
  });
} )
