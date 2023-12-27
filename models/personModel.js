const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
})

PersonSchema.plugin(uniqueValidator)

PersonSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', PersonSchema)