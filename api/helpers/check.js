// __   __  _______  ___      _______  _______  ______    _______         _______  __   __  _______  _______  ___   _ 
//|  | |  ||       ||   |    |       ||       ||    _ |  |       |       |       ||  | |  ||       ||       ||   | | |
//|  |_|  ||    ___||   |    |    _  ||    ___||   | ||  |  _____| ____  |       ||  |_|  ||    ___||       ||   |_| |
//|       ||   |___ |   |    |   |_| ||   |___ |   |_||_ | |_____ |____| |       ||       ||   |___ |       ||      _|
//|       ||    ___||   |___ |    ___||    ___||    __  ||_____  |       |      _||       ||    ___||      _||     |_ 
//|   _   ||   |___ |       ||   |    |   |___ |   |  | | _____| |       |     |_ |   _   ||   |___ |     |_ |    _  |
//|__| |__||_______||_______||___|    |_______||___|  |_||_______|       |_______||__| |__||_______||_______||___| |_| 

//IMPORTS
//local
const db = require('../../data/dbConfig')

//HELPERS

//:filters out any unused unique fields
//:maps through remaining fields to check if they're already in the db
//:returns array of unremarkable key value pairs
unique = async (table, body, unqiue_fields) => {
  // console.log(table, body, unqiue_fields)
  let fields_to_check = unqiue_fields.filter(field => body.hasOwnProperty(field))
  const get = async (obj) => await Promise.resolve(db(table).where(obj).first())
  const in_use = (await Promise.all(fields_to_check.map(async item => {
    if(await get({[item]: body[item]}) !== undefined) return {[item]: body[item]}
  }))).filter(item => item)
  return in_use
}

module.exports = {
  unique,
}