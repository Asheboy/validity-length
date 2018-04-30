var validity = require('validity')

module.exports = function createValidator(min, max) {
  min = min || Number.NEGATIVE_INFINITY
  max = max || Number.POSITIVE_INFINITY

  if (max < 1) {
    throw new RangeError('max must be >= 1')
  }

  function lengthValidator (key, keyDisplayName, object, cb) {
    // Convert null and undefined to empty string so they can be length checked.
    var value = object[key]
    switch (value) {
      case undefined:
      case null:
        value = ''
    }

    if (value.length >= min && value.length <= max) return cb(null)
    var message = keyDisplayName + ' must be '
    if (min === max) {
      message += max + ' in length'
    } else if (min === Number.NEGATIVE_INFINITY) {
      message += 'no more than ' + max + ' in length'
    } else if (max === Number.POSITIVE_INFINITY) {
      message += 'longer than ' + min + ' in length'
    } else {
      message += 'between ' + min + ' and ' + max + ' in length'
    }
    cb(null, message)
  }

  return lengthValidator
}
