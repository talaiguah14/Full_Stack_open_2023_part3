require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI_TWO = process.env.MONGODB_URI_TWO
const MONGODB_URI_THREE = process.env.MONGODB_URI_THREE

module.exports = {
  MONGODB_URI,
  PORT,
  MONGODB_URI_TWO,
  MONGODB_URI_THREE
}