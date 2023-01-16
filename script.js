const quizBody = document.getElementById('quiz-body');
const resultsBody = document.getElementById('results');
const restartBtn = document.getElementById('restart');
const questionBody = document.getElementById('question');
const category = document.getElementById('category');
const choiceContainer = document.getElementById('choice-container');
const amountCorrect = document.getElementById('amt-correct');
const nextQuestionBtn = document.getElementById('next-question');
let questionNumber = document.getElementById('question-number');
let finalScore = document.getElementById('final-score');

let acceptingAnswers = true;
let score = 0;
let questionCounter = 1;
let currentQuestionIndex;
let availableQuestions;

const allQuestions = [
  {
    question: "What is the name of the biggest technology company in South Korea?",
    category: "Business",
    answers: [
      { text: "Samsung", correct: true },
      { text: "LG Electronics", correct: false },
      { text: "SK Group", correct: false },
      { text: "Hyundai Motor", correct: false },
    ],
  },
  {
    question: "What is the name of the World's largest ocean?",
    category: "Geography",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Artic Ocean", correct: false },
    ],
  },
  {
    question: "Who was the first woman pilot to fly solo across the Atlantic?",
    category: "History",
    answers: [
      { text: "Amelia Earhard", correct: true },
      { text: "Bessie Coleman", correct: false },
      { text: "Harriet Quimby", correct: false },
      { text: "Jerrie Mock", correct: false },
    ]
  },
  {
    question: "What is \"cynophobia\"?",
    category: "Language",
    answers: [
      { text: "Fear of colors", correct: false },
      { text: "Fear of dogs", correct: true },
      { text: "Fear of flying", correct: false },
      { text: "Fear of medicine", correct: false },
    ],
  },
  {
    question: "How long is an Olympic swimming pool (in meters)?",
    category: "Sports",
    answers: [
      { text: "20 meters", correct: false },
      { text: "30 meters", correct: false },
      { text: "50 meters", correct: true },
      { text: "100 meters", correct: false },
    ]
  },
  {
    question: "What geometric shape is generally used for stop signs?",
    category: "Geometry",
    answers: [
    { text: "Hexagon", correct: false },
    { text: "Decagon", correct: false },
    { text: "Pentagon", correct: false },
    { text: "Octagon", correct: true },
    ],
  },
  {
    question: "How many languages are written from right to left?",
    category: "Language",
    answers: [
    { text: "6", correct: false },
    { text: "9", correct: false },
    { text: "12", correct: true },
    { text: "16", correct: false },
    ],
  },
  {
    question: "What was the first toy to be advertised on television?",
    category: "Entertainment",
    answers: [
    { text: "G.I. Joe", correct: false },
    { text: "Pet Rock", correct: false },
    { text: "Mr. Potato Head", correct: true },
    { text: "Legos", correct: false },
    ],
  },
  {
    question: "A group of ravens is known as?",
    category: "Animals",
    answers: [
    { text: "Unkindness", correct: true },
    { text: "Herd", correct: false },
    { text: "Murder", correct: false },
    { text: "Flock", correct: false },
    ],
  },
  {
    question: "What is the nearest planet to the sun?",
    category: "Science",
    answers: [
    { text: "Neptune", correct: false },
    { text: "Earth", correct: false },
    { text: "Venus", correct: false },
    { text: "Mercury", correct: true },
    ],
  },
  {
    question: "How many teeth does an adult human have?",
    category: "Science",
    answers: [
    { text: "28", correct: false },
    { text: "30", correct: false },
    { text: "32", correct: true },
    { text: "34", correct: false },
    ],
  },
  {
    question: "What was the first soft drink in space?",
    category: "Food and Drink",
    answers: [
    { text: "Coca Cola", correct: true },
    { text: "Ginger Ale", correct: false },
    { text: "Dr Pepper", correct: false },
    { text: "Spite", correct: false },
    ],
  },
  {
    question: "Which country invented ice cream?",
    category: "Food and Drink",
    answers: [
      { text: "Spain", correct: false },
      { text: "China", correct: true },
      { text: "United States", correct: false },
      { text: "United Kingdom", correct: false },
    ]
  },
];
const maxQuestions = 10;

function startGame() {
  // RESETS VALUES
  quizBody.classList.remove('hidden');
  resultsBody.classList.add('hidden');
  questionCounter = 1;
  questionNumber.innerHTML = questionCounter;
  currentQuestionIndex = 0;
  score = 0;
  
  availableQuestions = allQuestions.sort(() => Math.random() - .5);
  getNewQuestion();
};

function getNewQuestion() {
  resetState();
  if (currentQuestionIndex + 1 > maxQuestions) {
    showScore();
  } else {
    showQuestion(availableQuestions[currentQuestionIndex]);
  }
};

function resetState() {
  nextQuestionBtn.classList.add('btn-disabled');
  while (choiceContainer.firstChild) {
    choiceContainer.removeChild(choiceContainer.firstChild)
  };
}

function showQuestion(q) {
  questionBody.innerText = q.question;
  category.innerText = q.category;
  // adding answer buttons
  q.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('question-btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    choiceContainer.appendChild(button);
    button.addEventListener('click', selectAnswer);
  });
}

function selectAnswer(event) {
  const selectedButton = event.target;
  // const correct = selectedButton.dataset.correct;

  Array.from(choiceContainer.children).forEach(button => {
    setAnswerStatus(button, button.dataset.correct);
  });

  if (selectedButton.dataset.correct) {
    selectedButton.classList.add('select-right')
    score++;
    amountCorrect.innerHTML = score;
  } else {
    selectedButton.classList.add('select-wrong')
  }
};

function setAnswerStatus(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  };

  nextQuestionBtn.classList.remove('btn-disabled');
  nextQuestionBtn.classList.add('btn-blue');

}

nextQuestionBtn.addEventListener('click', () => {
  if (nextQuestionBtn.classList.contains('btn-disabled')) {
    return;
  } else {
    currentQuestionIndex++;
    getNewQuestion();
  
    questionCounter++;
    questionNumber.innerHTML = questionCounter;
  };
});

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};

function showScore() {
  quizBody.classList.add('hidden');
  resultsBody.classList.remove('hidden');
  finalScore.innerText = score;
}

restartBtn.addEventListener('click', () => {
  console.log("click!");
  startGame();
});

window.onload = startGame();