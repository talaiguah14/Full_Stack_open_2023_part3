const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 8 },
  author: { type: String, required: true },
  url: {type: String, required: true },
  likes: {type: Number, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})

module.exports = mongoose.model('Blog', blogSchema)