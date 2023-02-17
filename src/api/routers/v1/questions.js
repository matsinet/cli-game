const express = require("express");
const router = express.Router();
const whereQuery = require("../handlers/whereQuery.handler");
const Question = require("../../models/Question");

router.post("/", (request, response) => {
  const newRecord = new Question(request.body);

  newRecord.save((error, data) => {
    if (error?.name === 'ValidationError') return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);

    response.json(data);
  },
  error => {
    console.log(error);
  });
});

router.get("/", (request, response) => {
  let model = Question.find({});

  model = whereQuery(model, request);

  model.exec((error, data) => {
    if (error) return response.status(500).json(error.errors);
    response.json(data);
  });
});

router.get("/:id", (request, response) => {
  let model = Question.findById(request.params.id);

  model = whereQuery(model, request);

  model.exec((error, data) => {
    if (error) return response.status(500).json(error.errors);
    response.json(data);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;

  Question.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: body.name,
        quiz: body.quiz,
        type: body.type,
        message: body.message,
        choices: body.choices,
        answer: body.answer
      }
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    },
    (error, data) => {
      if (error?.name === 'ValidationError') return response.status(400).json(error.errors);
      if (error) return response.status(500).json(error.errors);
      response.json(data);
    }
  );
});

router.delete("/:id", (request, response) => {
  Question.findByIdAndRemove(request.params.id, (error, data) => {
    if (error) return response.status(500).json(error.errors);

    response.json(data);
  });
});

module.exports = router;