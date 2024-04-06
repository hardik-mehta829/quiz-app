const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
  },
  question: {
    type: String,
  },
  options: [
    {
      option: { type: String },
      text: { type: String },
    },
  ],
  correctanswer: {
    type: String,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
