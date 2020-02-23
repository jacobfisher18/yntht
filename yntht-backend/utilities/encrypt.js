const crypto = require('crypto');

const encryptPassword = (password) => {
  const secret = 'abc123';
  const mykey = crypto.createCipher('aes-128-cbc', secret);
  let mystr = mykey.update(password, 'utf8', 'hex');
  mystr += mykey.final('hex');

  return mystr;
};

module.exports = { encryptPassword };
