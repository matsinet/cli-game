const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    quiz: {
        type: [String],
        default: []
    },
    responses: {
        type: [Object]
    },
    taken: {
        type: Date,
        required: true,
        immutable: true,
        default: () => Date.now()
    }
});

const Question = mongoose.model("Quiz", quizSchema);

module.exports = Question;