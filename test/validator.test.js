const assert = require('assert')
const validate = require('../validator')

describe('validity-length', function () {
  describe('Strings', function () {
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
        assert.equal(validationError, 'First Name must be between 1 and 10 in length')
      })
    });

    it('should not allow length of min - 1', function () {
      validate(2, 10)('firstName', 'First Name', { firstName: 'T' }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, 'First Name must be between 2 and 10 in length')
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
        assert.equal(validationError, 'First Name must be between 1 and 10 in length')
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
        assert.equal(validationError, 'First Name must be between 1 and 10 in length')
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
        assert.equal(validationError, 'First Name must be between 1 and 10 in length')
      })
    });
  })

  describe('Arrays', function () {
    it('should pass validation when no minimum and only a maximum and array is empty', function () {
      validate(0, 1)('firstNames', 'First Names', { firstNames: [] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, undefined)
      })
    });

    it('should fail validation when no minimum and only a maximum and array is above maximum', function () {
      validate(0, 1)('firstNames', 'First Names', { firstNames: [ 'Dave', 'Jones' ] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, 'First Names must be no more than 1 in length')
      })
    });

    it('should pass validation when only a minimum and array contains minimum', function () {
      validate(1)('firstNames', 'First Names', { firstNames: [ 'Dave' ] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, undefined)
      })
    });

    it('should pass validation when only a minimum and array contains more than minimum', function () {
      validate(1)('firstNames', 'First Names', { firstNames: [ 'Dave', 'Jones' ] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, undefined)
      })
    });

    it('should fail validation when only a minimum and array contains less than minimum', function () {
      validate(1)('firstNames', 'First Names', { firstNames: [] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, 'First Names must be at least 1 in length')
      })
    });

    it('should fail validation when a minimum of null is provided and array contains more than max', function () {
      validate(null, 1)('firstNames', 'First Names', { firstNames: [ 'Dave', 'Jones' ] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, 'First Names must be no more than 1 in length')
      })
    });

    it('should fail validation when min and max are the same and array does not equal min or max', function () {
      validate(1, 1)('firstNames', 'First Names', { firstNames: [] }, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(validationError, 'First Names must be 1 in length')
      })
    });

    it('should not mutate arrays into strings', function () {
      var data = { firstNames: null}
      validate(1, 1)('firstNames', 'First Names', data, function (error, validationError) {
        assert.equal(error, null)
        assert.equal(data.firstNames, null)
      })
    });
  })

} )
