const inputCategory = document.getElementById('category');
const inputDifficulty = document.getElementById('difficulty');
const pressBtn = document.getElementById('Begin');
const formContainer = document.getElementById('form-container');
const loadingSpinner = document.getElementById('loading-spinner');
const buttonContinue = document.getElementById('submit-answer')
const mes_container = document.getElementById('mes_score')
const score = document.getElementById('score')
let score_num = 0;
let incorrect_answers = 0;
let correct_answers = 0;


// Fetching the list of categories from the Open Trivia DB API
fetch('https://opentdb.com/api_category.php')
    .then((response) => response.json())
    .then((data) => {
        // get the list of categories
        let allCategories = data.trivia_categories;
        // loop through each category
        for (let i = 0; i < allCategories.length; i++) {
            let option = document.createElement('option');
            option.value = allCategories[i].id;
            option.text = allCategories[i].name;
            inputCategory.add(option);
        }
    });

// Function to remove the form and show the loading spinner
function showLoadingSpinner() {
    formContainer.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
}


function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}


let currentQuestion = 0
// Function to hide the loading spinner and build the quiz
function buildQuiz(questions) {
    loadingSpinner.classList.add('hidden');
    let question = questions.results
    console.log(question)
    // loop through each question and set the options as answers
    let answers = question[currentQuestion].incorrect_answers;
    answers.push(question[currentQuestion].correct_answer);
    answers.sort(() => Math.random() - 0.5); // shuffle the answers
    // get the radio inputs
    let q_uestion = document.getElementById('q_uestion')

    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');
    let option4 = document.getElementById('option4');

    // set the text of the radio inputs to the answers
    let thy_question = question[currentQuestion].question
    let ques = decodeHTMLEntities(thy_question)
    q_uestion.textContent = `${currentQuestion + 1 + ")"}${ques}`

    option1.value = decodeHTMLEntities(answers[0]);
    option1.nextSibling.textContent = decodeHTMLEntities(answers[0]);

    option2.value = decodeHTMLEntities(answers[1]);
    option2.nextSibling.textContent = decodeHTMLEntities(answers[1]);

    option3.value = decodeHTMLEntities(answers[2]);
    option3.nextSibling.textContent = decodeHTMLEntities(answers[2]);

    option4.value = decodeHTMLEntities(answers[3]);
    option4.nextSibling.textContent = decodeHTMLEntities(answers[3]);
}

// when the begin button is clicked, fetch the questions
const questionsHere = document.getElementById('Questions_here');
pressBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showLoadingSpinner();
    questionsHere.classList.remove('hidden');
    //get the selected category and difficulty and fetch the questions
    let questionsAnswered = 0

    fetch(`https://opentdb.com/api.php?amount=10&category=${inputCategory.value}&difficulty=${inputDifficulty.value}&type=multiple`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            buildQuiz(data)
            buttonContinue.addEventListener('click', (e) => {
                e.preventDefault()
                let all_in = document.querySelectorAll('input')

                for (let i = 0; all_in.length > i; i++) {
                    if (all_in[i].checked) {
                        if (all_in[i].value == data.results[currentQuestion].correct_answer) {
                            mes_container.innerHTML = `<h1>Correct</h1><h1>Score: ${score_num}</h1>`
                            score_num += 150
                            questionsAnswered += 1
                            
                            console.log(questionsAnswered)
                            correct_answers += 1
                            if (questionsAnswered == 10){
                                localStorage.setItem("answercorrect", correct_answers);
                                localStorage.setItem("totalscore", score_num);
                                lastpage()
                                
                            }
                        } else {
                            mes_container.innerHTML = `<h1>Incorrect.</h1> <h1>Answer:${decodeHTMLEntities(data.results[currentQuestion].correct_answer)}</h1><h1>Score: ${score_num}</h1>`
                            score_num -= 50
                            questionsAnswered += 1
                            console.log(questionsAnswered)
                            
                            if (questionsAnswered == 10){
                                localStorage.setItem("answercorrect", correct_answers);
                                localStorage.setItem("totalscore", score_num);
                                lastpage()
                                
                            }
                        }
                        
                    }
                }

                currentQuestion++
                buildQuiz(data)
            })
        })
});

function lastpage(){
    
    document.location.href = "finished.html";
    
    

}