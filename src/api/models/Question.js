const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    quiz: {
        type: [String],
        default: []
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['input', 'number', 'confirm', 'list', 'rawlist', 'expand', 'checkbox', 'password', 'editor']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    answer: {
        type: mongoose.Mixed,
        required: [true, 'Answer is required']
    },
    choices: {
        type: mongoose.Mixed,
        default: []
    }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;