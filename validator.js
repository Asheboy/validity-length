var validity = require('validity')

module.exports = function createValidator(min, max) {
  if (min < 0) {
    throw new RangeError('min must be >= 0')
  }

  if (max < 1) {
    throw new RangeError('max must be >= 1')
  }

  return validity.createValidatorAllowingFailureMessageOverride(
    validity.booleanToCallback(stringLengthValidator), '#{name} is an incorrect length')

  function stringLengthValidator (value) {
      // Convert null and undefined to empty string so they can be length checked.
      switch (value) {
        case undefined:
        case null:
          value = ''
      }

      return (value.length >= min) && (value.length <= max)
  }
}
