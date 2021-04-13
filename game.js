const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'What is the value of a[5] in the expression\na[8]={34,24,35,67,89,00,44,78}?',
        choice1: '00',
        choice2: '34',
        choice3: '89',
        choice4: '78',
        answer: 1,
    },
    {
        question:'What will be the output of 37//4 in C language.',
        choice1: "9.25",
        choice2: "9.3",
        choice3: "9",
        choice4: "10",
        answer: 3,
    },
    {
        question:'Convert the binary number (01011.1011) into decimal.',
        choice1: "(11.6875)",
        choice2: "(11.5874)",
        choice3: "(10.9876)",
        choice4: "(10.7893)",
        answer: 1,
    },
    {
        question:'Why is thumb instructions better than arm instructions if the target has slow memory?',
        choice1: "Thumb instructions are 16 bits wide and can potentially be faster",
        choice2: "Thumb instructions are 32 bits wide and can potentially be faster",
        choice3: "Thumb instructions are 32 bits wide and can potentially be slower",
        choice4: "Thumb instructions are 16 bits wide and can potentially be slower",
        answer: 1,
    },
    {
        question: "How many registers are there in ARM7?",
        choice1: "35 register( 28 GPR and 7 SPR)",
        choice2: "37 registers(28 GPR and 9 SPR)",
        choice3: "37 registers(31 GPR and 6 SPR)",
        choice4: "35 register(30 GPR and 5 SPR)",
        answer: 3,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 5 

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('\end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()