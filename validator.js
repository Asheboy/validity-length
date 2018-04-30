var validity = require('validity')

module.exports = function createValidator(min, max) {
  max = max || Number.POSITIVE_INFINITY
  if (min < 0) {
    throw new RangeError('min must be >= 0')
  }

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
    var message = keyDisplayName + ' length must be '
    if (max === Number.POSITIVE_INFINITY) {
      message += 'at least ' + min
    } else {
      message += 'between ' + min + ' and ' + max
    }
    cb(null, message)
  }

  return lengthValidator
}
