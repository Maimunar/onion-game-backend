
const mongoose = require('mongoose')

interface IResult {
    user: String,
    mode: String,
    correct: Boolean
}

const ResultSchemaFields: Record<keyof IResult, any> = {
    user: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    mode: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    correct: {
      type: Boolean,
      required: true,
    },
  }

  
const ResultSchema = mongoose.Schema( ResultSchemaFields, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema)
