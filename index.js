import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Game to Learn Git BASH! \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}! That answer is correct!!!!`,
    });
  } else {
    spinner.error({
      text: `💀💀💀 Game over! Try again ${playerName}.... You got this!`,
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

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Remember ${playerName}, Programming isn't about what you know; it's about making the command line look cool... Just Kidding it does in fact take some knowledge and commitment.`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "input",
    message: "Whats the commands to change directory?\n",
    choices: [],
  });

  return handleAnswer(answers.question_1 === "cd");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "input",
    message: "What Git command initializes a new local repository?\n",
    choices: [],
  });
  return handleAnswer(answers.question_2 === "git init");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "input",
    message: `What Git command creates a local copy of a remote repository?\n`,
    choices: [],
  });

  return handleAnswer(answers.question_3 === "git clone");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "input",
    message: "What Git command stages a file to be committed?\n",
    choices: [],
  });
  return handleAnswer(answers.question_4 === "git add");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "input",
    message: "Whats the Git command to do a commit?\n",
    choices: [],
  });

  return handleAnswer(answers.question_5 === "git commit -m");
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
