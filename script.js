const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Austria", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];
const questionElement = document.querySelector("#question");
const nextButton = document.querySelector("#nextBtn");
let answerButton = document.querySelector("#answer-buttons");

let score = 0;
let currentQuestionIndex = 0;
let i = 0;

function startQuiz(){
    score = 0;
    currentQuestionIndex = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function resetState(){
    nextButton.style.display = "none";
    answerButton.innerHTML = "";
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.text;
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    if(selectedBtn.dataset.correct){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    nextButton.innerText = "Play again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    
    if(currentQuestionIndex < questions.length){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }else{
        startQuiz();
    }
});

startQuiz();