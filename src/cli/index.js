import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

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
    message: "Whats the command to change directory?\n",
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
    message:
      "What Git command stages ALL files in your project to be committed?\n",
    choices: [],
  });
  return handleAnswer(answers.question_4 === "git add .");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "input",
    message: "Whats the Git command to do a commit and add message?\n",
    choices: [],
  });

  return handleAnswer(answers.question_5 === "git commit -m");
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "input",
    message: "What Git command pushes local changes to the remote repository\n",
    choices: [],
  });

  return handleAnswer(answers.question_6 === "git push");
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "input",
    message:
      "What Git command pulls updates local repository with changes from the remote repository?\n",
    choices: [],
  });

  return handleAnswer(answers.question_7 === "git pull");
}

async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "input",
    message: "What Git command creates a new branch in the repository?\n",
    choices: [],
  });

  return handleAnswer(answers.question_8 === "git checkout -b");
}

async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "input",
    message:
      "What is the Git command to checkout a different branch in the repository?\n",
    choices: [],
  });

  return handleAnswer(answers.question_9 === "git checkout");
}

async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "input",
    message:
      "What Git command displays the current status of the repository and any uncommitted changes\n",
    choices: [],
  });

  return handleAnswer(answers.question_10 === "git status");
}

async function question11() {
  const answers = await inquirer.prompt({
    name: "question_11",
    type: "input",
    message: "What command is use to list files/directories?\n",
    choices: [],
  });

  return handleAnswer(answers.question_11 === "ls");
}

async function question12() {
  const answers = await inquirer.prompt({
    name: "question_12",
    type: "input",
    message: "What command to list ALL visible and hidden files/directories?\n",
    choices: [],
  });

  return handleAnswer(answers.question_12 === "ls -a");
}

async function question13() {
  const answers = await inquirer.prompt({
    name: "question_13",
    type: "input",
    message: "What command is used to make a directory?\n",
    choices: [],
  });

  return handleAnswer(answers.question_13 === "mkdir");
}

async function question14() {
  const answers = await inquirer.prompt({
    name: "question_14",
    type: "input",
    message: "What is command to make a file?\n",
    choices: [],
  });

  return handleAnswer(answers.question_14 === "touch");
}

async function question15() {
  const answers = await inquirer.prompt({
    name: "question_15",
    type: "list",
    message: "Did you learn anything from this quiz?\n",
    choices: ["Yes", "No"],
  });

  return handleAnswer(answers.question_15 === "Yes");
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
await question6();
await question7();
await question8();
await question9();
await question10();
await question11();
await question12();
await question13();
await question14();
await question15();
winner();
