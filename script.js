//list constructor:
const categoryDropdown = document.getElementById('category');

async function populateCategories() {
    
    
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();

        if (data && data.trivia_categories) {
            const categories = data.trivia_categories;

            // Populate the category dropdown with options
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categoryDropdown.appendChild(option);
            });
        } else {
            console.error('Unable to fetch trivia categories.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Call the function to populate categories when the page loads
window.addEventListener('load', populateCategories);

// script.js
const questionContainer = document.querySelector('.question-container');
const questionElement = document.querySelector('.question');
const trueButton = document.getElementById('true-btn');
const falseButton = document.getElementById('false-btn');
const choiceAButton = document.getElementById('choice-a-btn');
const choiceBButton = document.getElementById('choice-b-btn');
const choiceCButton = document.getElementById('choice-c-btn');
const choiceDButton = document.getElementById('choice-d-btn');
const resultElement = document.querySelector('.result');
const continueButton = document.getElementById('continue-btn');
const healthDisplay = document.getElementById('Health');
const ScoreDisplay = document.getElementById('Score');
const resetButton = document.getElementById('reset-btn')
const startGameButton = document.getElementById('start-game-btn'); // Add this button in your HTML




categoryDropdown.addEventListener('change', () => {
    // Check if a category has been selected (value is not empty)
    if (categoryDropdown.value !== '') {
        // If a category is selected, show the "Start Game" button
        startGameButton.style.display = 'block';
    } else {
        // If no category is selected, hide the "Start Game" button
        startGameButton.style.display = 'none';
    }
});





let correctAnswer = ''; // Store the correct answer
let setOfAnswers = [];


function randomizeSetOfAnswers(loA){
    let shuffledArr = loA.sort(() => Math.random() - 0.5);
    console.log(shuffledArr);
    return shuffledArr;
}


let HP = 5;
let Scoree = 0;
// Function to fetch a true/false question from the API
  trueButton.disabled = false;
    falseButton.disabled = false;
       choiceAButton.disabled = false;
    choiceBButton.disabled = false;
    choiceCButton.disabled = false;
    choiceDButton.disabled = false;

let currentQuestionIndex = 0;

// Fetch a batch of questions and store them in an array
let questionsBatch = [];
let secelectedType;
// let ListLength = 10;
// // Function to generate the API URL

// //let category = 9;
// let difficulty = "medium";
// //let category = 9; // General Knowledge category


function generateTriviaApiUrl(difficulty, category, type) {
  const baseUrl = "https://opentdb.com/api.php";
  const params = new URLSearchParams({
    amount: 10, // Change the amount to the desired number of questions
    category,
    difficulty,
    type,
    
  });
  return `${baseUrl}?${params.toString()}`;
}

// Function to fetch questions and store them in the batch
async function fetchQuestions(difficulty, category, type) {
        let selectedDifficulty = document.getElementById('difficulty').value;
        
  let categoryNum = parseInt(document.getElementById('category').value);
  let selectedCategory = categoryNum;
  secelectedType = document.getElementById('type').value;
  const apiUrl = generateTriviaApiUrl(selectedDifficulty, selectedCategory, secelectedType);
  console.log(apiUrl);
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  questionsBatch = data.results;
  currentQuestionIndex = 0; // Reset the current question index
}


//button to start game
startGameButton.addEventListener('click', async () => {
    // Hide the difficulty and category dropdowns
    document.getElementById('difficulty').style.display = 'none';
    document.getElementById('category').style.display = 'none';
   document.getElementById('type').style.display = 'none';
    
    // Hide the labels for "category" and "difficulty"
    document.querySelector('label[for="difficulty"]').style.display = 'none';
    document.querySelector('label[for="category"]').style.display = 'none';
    document.querySelector('label[for="type"]').style.display = 'none';
    
    // Hide the "Start Game" button itself
    startGameButton.style.display = 'none';
    
    // Make the "True" and "False" buttons visible

     //resetGame();
   

    await fetchQuestions(); // Initial fetch when starting the game
    // Reset and fetch questions
    if(secelectedType === 'boolean'){
    document.getElementById('true-btn').style.display = 'block';
    document.getElementById('false-btn').style.display = 'block';
}else if(secelectedType === 'multiple'){

    document.getElementById('choice-a-btn').style.display = 'block';
    document.getElementById('choice-b-btn').style.display = 'block'; 
    document.getElementById('choice-c-btn').style.display = 'block'; 
    document.getElementById('choice-d-btn').style.display = 'block'; 

  
    
}

    fetchTrueFalseQuestion();
});

//fetchQuestions(difficulty, category);


function fetchTrueFalseQuestion() {
    let Question = questionsBatch[currentQuestionIndex].question;
    let decodedQuestion = decodeHtmlEntities(Question);
   
    correctAnswer = questionsBatch[currentQuestionIndex].correct_answer; // Store the correct answer
    console.log(correctAnswer);
    let initiallist =  [questionsBatch[currentQuestionIndex].correct_answer, questionsBatch[currentQuestionIndex].incorrect_answers[0], questionsBatch[currentQuestionIndex].incorrect_answers[1], questionsBatch[currentQuestionIndex].incorrect_answers[2]]
    setOfAnswers = randomizeSetOfAnswers(initiallist);
    questionElement.innerHTML = decodedQuestion;
    choiceAButton.innerHTML = setOfAnswers[0];
    choiceBButton.innerHTML = setOfAnswers[1];
    choiceCButton.innerHTML = setOfAnswers[2];
    choiceDButton.innerHTML = setOfAnswers[3];
}



function decodeHtmlEntities(text) { // I use this function to decode countless html decoded symbols like &eacute...
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent;
}

   trueButton.addEventListener('click', () => checkAnswer('True'));
    falseButton.addEventListener('click', () => checkAnswer('False'));
    choiceAButton.addEventListener('click', () => checkAnswer(setOfAnswers[0]));
    choiceBButton.addEventListener('click', () => checkAnswer(setOfAnswers[1]));
    choiceCButton.addEventListener('click', () => checkAnswer(setOfAnswers[2]));
    choiceDButton.addEventListener('click', () => checkAnswer(setOfAnswers[3]));

// Function to check the user's answer
function checkAnswer(selectedAnswer) {
     trueButton.disabled = true;
    falseButton.disabled = true;
    choiceAButton.disabled = true;
    choiceBButton.disabled = true;
    choiceCButton.disabled = true;
    choiceDButton.disabled = true;

    
console.log("running this function");


    trueButton.disabled = true;//Delete later
    falseButton.disabled = true;

    if (selectedAnswer === correctAnswer) {
        // if(isItTheLastQuestion(ListLength) == true){
        //     console.log("You win! And now the program will break!!!");//delete later
        // }else{
         currentQuestionIndex = addindex(currentQuestionIndex);

        Scoree = Scoree + 1;
        Score.textContent = `Score: ${Scoree}`;
        resultElement.textContent = 'Correct!';
        continueButton.style.display = 'block';
        continueButton.textContent = 'Continue';
        continueButton.addEventListener('click', () => {
            continueGame();
            fetchTrueFalseQuestion();
           
            
        });
 
    } else {

        if(HP === 0 || HP === 1){
       currentQuestionIndex = addindex(currentQuestionIndex);
        resultElement.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
        
        healthDisplay.textContent = "DEAD";
        
       
        
        resetButton.style.display = 'block';
        resetButton.textContent = 'Restart';
        resetButton.addEventListener('click', () => {
            resetGame();
            fetchTrueFalseQuestion();
            
        });
           }else if(HP>0){
       
        HP = HP - 1;
        console.log(HP);
         currentQuestionIndex = addindex(currentQuestionIndex);
         let newCorectAnswer = decodeHtmlEntities(correctAnswer);
        resultElement.textContent = `Incorrect! The correct answer is ${newCorectAnswer}.`;
        continueButton.style.display = 'block';
        healthDisplay.textContent = `Health: ${HP}`;
        continueButton.textContent = 'Continue';
       
        continueButton.style.display = 'block';
        continueButton.textContent = 'Continue';
        continueButton.addEventListener('click', () => {
            continueGame();
            fetchTrueFalseQuestion();
            
           });
       }
    }
}
function continueGame() {

    console.log("here is the current index: "+currentQuestionIndex);
    console.log("here is the current HP: "+HP);
    trueButton.disabled = false;
    falseButton.disabled = false;
    choiceAButton.disabled = false;
    choiceBButton.disabled = false;
    choiceCButton.disabled = false;
    choiceDButton.disabled = false;
    resultElement.textContent = '';
    continueButton.style.display = 'none';
    trueButton.disabled = false;
    falseButton.disabled = false;
}

// Function to reset the game
function resetGame() {
    // console.log("reset incoming!!!");
    // currentQuestionIndex = 0;
    // HP = 5;
    // healthDisplay.textContent = "Health: 5"
    //         Scoree = 0;
    //     Score.textContent = "Score: 0";
    // resultElement.textContent = '';
    // resetButton.style.display = 'none';
    // trueButton.disabled = false;
    // falseButton.disabled = false;
    window.location.assign("index.html");
}

function isItTheLastQuestion(L){
    if(currentQuestionIndex==(L-1)){
        return true;
    }else{
        return false;
    }
}
function addindex(currentQuestionIndex){
    console.log('running addindexFunction!!! ');
    if (currentQuestionIndex == 9){
        console.log("you win you win!!!")
        window.location.assign("WinPage.html");
        return currentQuestionIndex;
    }else{

        currentQuestionIndex = currentQuestionIndex + 1
        return currentQuestionIndex;    }

}

// Initial call to fetch the first question
//setTimeout(() => {fetchTrueFalseQuestion();}, 2000);
