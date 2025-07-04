const readline = require('readline');

let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to ask questions using Promises
function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer.trim().toLowerCase())));
}

async function playGame() {
  const playerChoice = await ask('Enter your choice (rock, paper, scissors): ');

  if (playerChoice === 'spock') {
    console.log('Nice try Sheldon');
    return playGame(); // Restart round
  }

  if (!choices.includes(playerChoice)) {
    console.log('Invalid choice. Please try again.');
    return playGame(); // Restart round
  }

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  console.log(`Computer chose: ${computerChoice}`);

  determineWinner(playerChoice, computerChoice);
  await askToPlayAgain();
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    console.log("It's a tie!");
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    console.log('You win!');
    playerScore++;
  } else {
    console.log('Computer wins!');
    computerScore++;
  }
  console.log(`Score - Player: ${playerScore}, Computer: ${computerScore}`);
}

async function askToPlayAgain() {
  const answer = await ask('Do you want to play again? (yes/no): ');
  if (answer === 'yes' || answer === 'y') {
    await playGame();
  } else if (answer === 'no' || answer === 'n') {
    console.log('Thanks for playing!');
    rl.close();
  } else {
    console.log('Invalid input. Please enter yes or no.');
    await askToPlayAgain();
  }
}

// Start the game
playGame();
