const questions = [
    {
        type: "single",
        question: `Перше повідомлення у 2018 році в нашому діалозі - це твоє привітання мене з днем народження.
Воно звучить так:

'Пааадружка, мне пришло письмо, что главные ямочки нашего класса празднует сегодня день рожденьице.Ну чтош. Я тебя поздравляю, бажаю тоби здоробля, щастя, наконец-таки найти себе того самого парня, который будет любить тебя так-же, как ты любишь "..." и пусть твоя жопа будет такой-же гарной всегда.
Чтоб ты никогда не унывала, а то когда расстроенная, то вообще чёто не очень.'

Доповни пропущену фразу правильним варіантом.`,
        options: ["пить рево", "суши", "моделинг", "шавуху из мака", "клея"],
        correctAnswer: "шавуху из мака"

    },
    {
        type: "single",
        question: "З якої причини ти відписався від мого інстаграму в 2020 році?",
        options: ["потом расскажу", "долгая история", "та мы там поспорили..", "случайно вийшло"],
        correctAnswer: "та мы там поспорили.."
    },
    {
        type: "single",
        question: "Моя улюблена пісня в 2018 році?",
        options: ["Мот - Белые ночы", "Скриптонит - Я знаю какая ты", "Ivan Valeev - Novella", "Макс Корж - Оптимист"],
        correctAnswer: "Ivan Valeev - Novella"
    },
    {
        type: "single",
        question: "Куди ми ходили святкувати 1 місяць наших стосунків?",
        options: ["Макдональдс", "КФС", "Львівські круасани", "Замовляли суши"],
        correctAnswer: "Львівські круасани"
    },
    {
        type: "single",
        question: "Спробуй вгадати точну кількість днів, яку ми разом на сьгоднішній день",
        options: ["1389", "1481", "1435", "1475", "1501"],
        correctAnswer: "1481"
    },
    {
        type: "multi",
        question: "З яких причин я тебе кохаю?",
        options: ["Ти прикольний, милий, класний, у тебе гарні очі", "Я почуваюсь в безпеці з тобою", "У тебе dick 30 см", "Ти робиш мені чайок 737392 раз в день", "В тебе найкраще почуття гумору і ти знаєш математику!!", "Ти мене підтримуєш в усіх складних ситуаціях і радієш за мене в радісні моменти, завжди допоможеш впоратись з проблемами", "Все з переліченого вище... крім одного"],
        correctAnswer: "Все з переліченого вище... крім одного"
    },
    {
        question: "Яким був стікер, який я кидала тобі найчастіше в 2020?",
        options: [
            { img: "./images/ph1.jpg", value: "Cat" },
            { img: "./images/ph2.jpg", value: "Dog" },
            { img: "./images/ph3.jpg", value: "Rabbit" },
            { img: "./images/ph4.jpg", value: "Horse" }
        ],
        correctAnswer: "Cat"
    },
    {
        question: "Хто з нас має в 1000 раз смішніше і круче почуття гумору?",
        options: ["Мілєна", "Гєна"],
        correctAnswer: "Мілєна"
    },
    {
        question: "Із цих 4 слів одне - явно домінує за використовуванністю в нашому діалозі. Вгадай яке",
        options: ["люблю", "очманіть", "секс", "песик"],
        correctAnswer: "очманіть"
    },
    {
        question: "І останнє питання.... Чи ти мене кохаєш і чи цікавим був цей квіз???",
        options: ["Так", "Неймовірно", "Дуже!", "Звісно"],
        correctAnswer: "Дуже!"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
const secretKeyword = "Пирятин";

const startPage = document.getElementById('start-page');
const questionPage = document.getElementById('question-page');

const resultPage = document.getElementById('result-page');
const keywordInput = document.getElementById('keyword-input');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultText = document.getElementById('result-text');
const correctCount = document.getElementById('correct-count');
const emojiContainer = document.getElementById('emoji-container');
const errorMessage = document.getElementById('error-message');

function showStartPage() {
    startPage.style.display = 'block';
    questionPage.style.display = 'none';
    resultPage.style.display = 'none';
}

function showQuestionPage() {
    startPage.style.display = 'none';
    questionPage.style.display = 'block';
    resultPage.style.display = 'none';

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;

    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');

        if (typeof option === 'object' && option.img) {
            // Відображення кнопки з картинкою
            const img = document.createElement('img');
            img.src = option.img;
            img.alt = option.value;
            img.width = 100;
            img.height = 100;

            button.appendChild(img);
            button.addEventListener('click', () => checkAnswer(option.value));
        } else {
            // Відображення текстової кнопки
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
        }

        optionsContainer.appendChild(button);
    });
}


function checkAnswer(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll('.option-btn');

    buttons.forEach(button => {
        if (button.textContent === question.correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedAnswer) {
            button.classList.add('wrong');
        }
    });

    if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestionPage();
        } else {
            showResultPage();
        }
    }, 1000);
}

function showResultPage() {
    questionPage.style.display = 'none';
    resultPage.style.display = 'block';

    correctCount.textContent = correctAnswers;

    if (correctAnswers >= 8) {
        resultText.textContent = "Yes, you will! Love you 💕";
        const heartShape =document.getElementById('heart-shape');
        const img = document.createElement('img');
        img.src = './images/ph5.jpg';
        img.alt = 'Heart Image';
        img.style.width = '50%';
        img.style.height = '50%';

        heartShape.appendChild(img);

        emojiContainer.innerHTML = '';

        const audio = new Audio('./music/song3.mp3');
        audio.play();

    } else {
        resultText.textContent = "Sorry, but no. You know me too bad 😢";
        showSadEmojis();
    }
}


function showSadEmojis() {
    for (let i = 0; i < 5; i++) {
        const emoji = document.createElement('span');
        emoji.classList.add('emoji');
        emoji.textContent = '😢';
        emojiContainer.appendChild(emoji);
    }
}

startBtn.addEventListener('click', () => {
    const keyword = keywordInput.value.trim().toLowerCase();
    if (keyword === secretKeyword.toLowerCase()) {
        showQuestionPage();
    } else {
        errorMessage.textContent = "Wrong! You are not my Valentine!";
    }
});

restartBtn.addEventListener('click', () => {
    correctAnswers = 0;
    currentQuestionIndex = 0;
    showStartPage();
});

document.getElementById("hint-button").addEventListener("click", function () {
    this.style.display = "none";
    document.getElementById("hint-text").style.display = "block";
});




showStartPage();
