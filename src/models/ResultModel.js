const mongoose = require('mongoose')

const ResultSchema = mongoose.Schema({
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
}, { timestamps: true });



module.exports = mongoose.model('Result', ResultSchema)
