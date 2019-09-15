//IMPORTS
//local
const db = require('../../data/dbConfig')

//loops through req.body and checks if any keys match the unique fields
//if there's a match, it checks to see if it's value already exists in the db
filter = async (table, obj) => {
  if(await db(table).where(obj).first()) return true
  return false
}

unique = async (table, body, unqiue_fields) => {
  const get = async (obj) => await Promise.resolve(db(table).where(obj).first())
  let in_use = (await Promise.all(unqiue_fields.map(async item => {
    const obj = {[item]: body[item]}
    if(await get(obj) !== undefined) return obj
  }))).filter(item => item)
  return in_use
}

module.exports = {
  unique,
}