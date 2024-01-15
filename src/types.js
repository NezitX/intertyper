const typeOf = require('kind-of');

function typeOfEqual(firstValue, secondValue) {
  return typeOf(firstValue) === typeOf(secondValue);
};

module.exports = {
  typeOf,
  typeOfEqual
};