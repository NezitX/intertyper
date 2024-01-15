const objectUtils = { // object utils
  _has: (obj, pro) => obj.hasOwnProperty(pro), // check if object has property
  _keys: (obj) => Object.keys(obj), // return all keys in object
  _entries: (obj) => Object.entries(obj), // return object as [[key, value], ...]
  _cut: (obj, pro) => { // cut property from object and return it as object
    const value = { [pro]: obj[pro] };
    delete obj[pro];
    return value;
  },
  _toggle: (obj, pro) => obj[pro] = !obj[pro] // toggle boolean value
};

const interfaceUtils = { // interface utils
  or: (...v) => { // check if value type equal one of these values
    return {
      isFunc: true,
      func: (t) => v.includes(t),
      type: v.join(', ')
    };
  }
};

module.exports = {
  objectUtils,
  interfaceUtils
};