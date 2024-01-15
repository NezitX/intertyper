const { typeOf, typeOfEqual } = require('./types.js');
const { objectUtils: u } = require('./utils.js');

const interError = (msg) => { throw new Error(msg) };

function check(inter, obj) {
  // check if interface-object has 'interface' property
  if (!u._has(inter, 'Interface'))
    return interError(`'Interface' property must be 'true' value and at '0' position of interface-object`);
  // check if 'interface' property value === true
  if (!inter['Interface'])
    return interError(`'Interface' property must be 'true' value and at '0' position of interface-object`);
  // check if 'interface' at '0' position of interface-object
  if (!(u._keys(inter)[0] === 'Interface'))
    return interError(`'Interface' property must be 'true' value and at '0' position of interface-object`);

  // cut 'interface' property from interface-object
  const InterfaceValue = u._cut(inter, 'Interface');

  const interEntries = u._entries(inter);
  const objEntries = u._entries(obj);

  for (let i = 0; i < interEntries.length; i++) {
    const [interKey, interValue] = interEntries[i] ?? [];
    const [objKey, objValue] = objEntries[i] ?? [];

    // check key
    const keyCheck = keyFintilize({ interKey, objKey, obj });
    if (keyCheck.err)
      return interError(`'${keyCheck.key}' property is required in object`);

    // check value
    const valueCheck = valueFintilize({ interValue, objValue });
    if (valueCheck.err)
      return interError(`'${interKey}' type must be '${valueCheck.type}' in object`);

    return true; // if everything is ok
  };
};

function keyFintilize({ interKey, objKey, obj }) {
  function fintilizeKeySymbols(keyOptions, key) {
    const keySymbols = [
      {
        to: 'isRequired',
        code: '?'
        },
      {
        to: 'isWriteable',
        code: '!'
        }
      ];

    if (key.includes('[') && key.includes(']')) {
      const leftBracketsIndex = key.indexOf('[');
      const Symbols = key.slice(leftBracketsIndex, -1).split('');
      for (let symbol of Symbols) {
        const isSymbol = keySymbols.find(({ code }) => code === symbol);
        if (!isSymbol) continue;
        u._toggle(keyOptions, isSymbol.to);
      };
      key = key.slice(0, leftBracketsIndex);
    };
    return true;
  };
  const keyOptions = {
    isRequired: true,
    isRriteable: true,
    value: ''
  };

  fintilizeKeySymbols(keyOptions, interKey);
  if (keyOptions.isRequired && !(interKey === objKey))
    return { key: interKey, err: true };
  if (!keyOptions.isWriteable) {
    Object.defineProperty(obj, interKey, {
      writable: false
    });
  };
  return true;
};

function valueFintilize({ interValue, objValue }) {
  const interValueType = typeof interValue;
  if (interValueType === 'string') {
    return handleNormal({ interValue, objValue });
  } else if (interValueType === 'object') {
    if (Array.isArray(interValue)) return handleArray({ interValue, objValue });
    return handleObject({ interValue, objValue });
  };

  function handleNormal({ interValue, objValue }) {
    if (
      interValue === objValue ||
      interValue === typeOf(objValue)
    ) {
      return true;
    } else {
      return { err: true, type: interValue };
    };
  };

  function handleArray({ interValue, objValue }) {
    return; // idk how to do it. ( lazy )
  };

  function handleObject({ interValue, objValue }) {
    if (interValue.isFunc) {
      const funcReslut = interValue.func(objValue);
      return funcReslut ? true : { err: true, type: interValue.type };
    } else {
      return interfaceCheck({ Interface: true, ...interValue },
        objValue
      );
    };
  };
};

module.exports = {
  check,
  keyFintilize, // idk why people need it
  valueFintilize // also why
};