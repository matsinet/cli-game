const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

const questions = require("./routers/v1/questions");
const quizzes = require("./routers/v1/quizzes");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(
    `${process.env.DB_CONNECT}`,
    {
        // Configuration options to remove deprecation warnings, just include them to remove clutter error
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;

let db_status = 'Database connection not successful';

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    db_status = 'Successful opened connection to database!';
    console.log(db_status);
});

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.json({ 'message': 'No routes found at root URL, please refer to the documentation for additional information.' });
});

app.get('/status', (request, response) => {
    const data = { server: 'ok', database: db_status };
    response.json(data);
});

app.use("/v1/questions", questions);
app.use("/v1/quizzes", quizzes);

app.listen(port, (error) => {
    if (error) console.log("Error starting server", JSON.stringify(error));
    console.log(`Listening of port ${port}`);
});
