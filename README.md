<h1>intertyper</h1>
<div align="center">

[![NPM version](https://img.shields.io/npm/v/intertyper.svg?style=flat)](https://www.npmjs.com/package/intertyper) [![NPM total downloads](https://img.shields.io/npm/dt/intertyper.svg?style=flat)](https://npmjs.org/package/intertyper)
  </div>
  A simple package allows you to use interfaces and types in javascript.
  
## tablet of content
1- [install the package](#install).
2- [how to use the package](#usage).
  - [use interface](#interface).
      - [key options](#key-options).
  - [use type](#type).
  
3- [share features and bugs](#features--bugs).
4- [help us to improve the package](#contributing).
  
## install
install with [npm](https://www.npmjs.com):
```sh
npm install intertyper
```

## Usage
you can use interface and type by importing `Interface` and `Type`.
```js
const { Interface, Type } = require('intertyper');
```
### Interface:

```javascript
const { 
  Interface: inter, 
  interfaceUtils 
} = require('intertyper'); // install the package

const ProfileInterface = {
  Interface: true, // required and must be at first
  
  name: 'string',
  age: 'number',
  gender: interfaceUtils.or('male', 'female'), // to use multi types
  'job[?]': 'string' // not required
};

const myProfile = {
  name: 'someone',
  age: 99,
  gender: 'male'
  // job not required
};

const checkProfile = inter.check(ProfileInterface, myProfile);
console.log(checkProfile); // true
```
in this example we create interface called `ProfileInterface` by adding `Interface: true` in the object to make a interface which is required and must be at top or in first of interface-object.
#### key options
you can add options to key like the example above, by adding `[]` at the end of key and add inside it:
- `?` means the key not required, e.g:
```js
const someInterface = {
  'key': 'string', // require
  'anotherKey[?]': '...' // not require
}

const someObject = {
  'key': 'Hello World'
} 
// no errors, 'anotherKey' not required.
```
- `!` means the key cannot be changed, e.g:
```js
{
  'key[!]': 'value'
}

// after use interface-check
someObject['key'] = 'new value';
console.log(someObject['key']); // value
```
also you can use both, e.g:
```js
{
  'key[?!]': 'value'
}
```

<br />

### Type:
```js
const { Type: type } = require('intertyper');

const text = 'Hello World';
const getTextType = type.typeOf(text);
console.log(getTextType); // string
```
```js 
const { Type: type } = require('intertyper');

const text = 'Hello World';
const number = 123;

const isTypeEqual = type.typeOfEqual(text, number);

console.log(isTypeEqual); // false
```
in above example we import `type` at first then use function called `typeOf` to get type of value *which is a package called [`kind-of`](https://www.npmjs.com/package/kind-of/v/3.2.2) for more information*.

in second example we use function called `typeOfEqual` to check if first-value type equal second-value type.

## features & bugs
you can create a [issue](https://github.com/NezitX/intertyper/issues) to share with us features and bugs on GitHub.

## Contributing

1- fork the GitHub [repository](https://github.com/NezitX/intertyper).
2- make your changes.
3- create [pull request](https://github.com/NezitX/interty;per/pulls) on GitHub.
thanks ❤️ for your contributing.