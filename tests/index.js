const { 
  Interface: inter, 
  Type: type, 
  interfaceUtils 
} = require('../src');

const ProfileInterface = {
  Interface: true,
  
  name: 'string',
  age: 'number',
  gender: interfaceUtils.or('male', 'female'),
  'job[?]': 'string'
};

const myProfile = {
  name: 'nezitX',
  age: 99,
  gender: 'male'
  // job not required
};

const checkProfile = inter.check(ProfileInterface, myProfile);
console.log(checkProfile);