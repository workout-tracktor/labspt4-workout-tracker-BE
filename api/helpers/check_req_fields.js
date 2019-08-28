//checks if body has specific keys
//returns true if all required fields are there || false
module.exports = (reqbody, ...keys) => 
  !!keys.reduce((prevkey, key) => prevkey * (key in reqbody), 1)