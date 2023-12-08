const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    choice1: {
        type: String,
        required: true,
    },
    choice2: {
        type: String,
        required: true,
    },
    choice3: {
        type: String,
        required: true,
    },
    choice4: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const Question = mongoose.model('Question', questionSchema, 'Questions');
module.exports = Question;