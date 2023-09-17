// script.js
const questionContainer = document.querySelector('.question-container');
const questionElement = document.querySelector('.question');
const trueButton = document.getElementById('true-btn');
const falseButton = document.getElementById('false-btn');
const resultElement = document.querySelector('.result');
const continueButton = document.getElementById('continue-btn');
const healthDisplay = document.getElementById('Health');
const ScoreDisplay = document.getElementById('Score');
let correctAnswer = ''; // Store the correct answer
let HP = 5;
let Scoree = 0;
// Function to fetch a true/false question from the API
  trueButton.disabled = false;
    falseButton.disabled = false;


async function fetchTrueFalseQuestion() {
   

    const response = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean');
    const data = await response.json();
    console.log(data);
    const question = data.results[0];
    const decodedQuestion = decodeHtmlEntities(question.question);
    console.log("Data incoming: ");
    console.log(data.results[0]);
    correctAnswer = question.correct_answer; // Store the correct answer
    questionElement.innerHTML = decodedQuestion;


}



function decodeHtmlEntities(text) { // I use this function to decode countless html decoded symbols like &eacute...
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent;
}

   trueButton.addEventListener('click', () => checkAnswer('True'));
    falseButton.addEventListener('click', () => checkAnswer('False'));
// Function to check the user's answer
function checkAnswer(selectedAnswer) {
     trueButton.disabled = true;
    falseButton.disabled = true;
console.log("running this function");


    trueButton.disabled = true;
    falseButton.disabled = true;

    if (selectedAnswer === correctAnswer) {
        Scoree = Scoree + 1;
        Score.textContent = `Score: ${Scoree}`;
        resultElement.textContent = 'Correct!';
        continueButton.style.display = 'block';
        continueButton.textContent = 'Continue';
        continueButton.addEventListener('click', () => {
            fetchTrueFalseQuestion();
            continueGame();
            
        });
    } else {
        if(HP === 0 || HP === 1){
           
        resultElement.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
        continueButton.style.display = 'block';
        healthDisplay.textContent = "DEAD";
        continueButton.textContent = 'Continue';
       
        // resultElement.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
        continueButton.style.display = 'block';
        continueButton.textContent = 'Restart';
        continueButton.addEventListener('click', () => {
            fetchTrueFalseQuestion();
            resetGame();
        });
           }else if(HP>0){
        HP = HP - 1;
        console.log(HP);
        resultElement.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
        continueButton.style.display = 'block';
        healthDisplay.textContent = `Health: ${HP}`;
        continueButton.textContent = 'Continue';
       
        continueButton.style.display = 'block';
        continueButton.textContent = 'Continue';
        continueButton.addEventListener('click', () => {
            fetchTrueFalseQuestion();
            continueGame();
           });
       }
    }
}
function continueGame() {
    trueButton.disabled = false;
    falseButton.disabled = false;
    resultElement.textContent = '';
    continueButton.style.display = 'none';
    trueButton.disabled = false;
    falseButton.disabled = false;
}

// Function to reset the game
function resetGame() {
    HP = 5;
    healthDisplay.textContent = "Health: 5"
            Scoree = 0;
        Score.textContent = "Score: 0";
    resultElement.textContent = '';
    continueButton.style.display = 'none';
    trueButton.disabled = false;
    falseButton.disabled = false;
}

// Initial call to fetch the first question
fetchTrueFalseQuestion();
