const chalk = require("chalk");
const inquirer = require("inquirer");
const gradient = require("gradient-string");
const figlet = require("figlet");
const { createSpinner } = require("nanospinner");
const axios = require("axios");

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  figlet(`Learn Git/Bash CMD Game!\n`, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });

  await sleep();
  // rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a a live running process currently on your computer! ${chalk.bgGreen(
      "   😀   "
    )} 
    If you get any question wrong I will be ${chalk.bgRed(
      " 💀💀💀 KILLED 💀💀💀 "
    )}
    So get all the questions right or start over...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${quiz.name}! That answer is correct!!!!`,
    });
  } else {
    spinner.error({
      text: `💀💀💀 Game over! Try again ${quiz.name}.... You got this!`,
    });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  return answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${quiz.name} !\n`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Remember ${quiz.name}, Programming isn't about what you know; it's about making the command line look cool... Just Kidding it does in fact take some knowledge and commitment.`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "input",
    message: "Whats the command to change directory? ",
    choices: [],
  });

  return handleAnswer(answers.question_1 === "cd");
}

async function getQuestions(quizName = '') {
  // Get all questions
  const url = 'http://localhost:3000/v1/questions';
  // Limit questions to specific quiz(es)
  if (quizName.length) {
    url += `?where=in:quiz:${quizName}`;
  }

  return axios.get(url).then(response => {
    return response.data;

    // console.log(quiz.questions);
  })
  .catch(error => {
    console.log('error', error);
  })
}

async function presentQuestions(questions) {
  const responses = [];
  // await questions.forEach(async question => {
  //   const answer = await inquirer.prompt({
  //     name: question._id,
  //     type: question.type,
  //     message: question.message,
  //     choices: question.choices
  //   });

  //   responses.push({
  //     _id: question._id,
  //     question: question.message,
  //     response: answer,
  //     correct: answer[question._id] === question.answer
  //   })
  // });

  const prompts = questions.map(question => {
    return {
      name: question._id,
      type: question.type,
      message: question.message,
      choices: question.choices
    }
  });
  
  return await inquirer.prompt(prompts)
    .then(answers => answers)
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })

  // return responses;
}

// Run it with top-level await
async function main() {
  let quiz = {
    name: "Anonymous",
    questions: [],
    responses: []
  }

  console.clear();
  await welcome();
  quiz.name = await askName();
  quiz.questions = await getQuestions();
  quiz.responses = await presentQuestions(quiz.questions);
  // await winner();

  // TODO: Store the quiz with the API
  await console.log(quiz);
}

main();
