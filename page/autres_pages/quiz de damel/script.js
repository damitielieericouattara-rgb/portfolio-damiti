/* ============================================================
   QUIZ DE DAMITI — script.js
   ============================================================ */

const startBtn      = document.querySelector('.start-btn');
const popupInfo     = document.querySelector('.popup-info');
const exitBtn       = document.querySelector('.exit-btn');
const main          = document.querySelector('.main');
const continueBtn   = document.querySelector('.continue-btn');
const quizSection   = document.querySelector('.quiz-section');
const quizBox       = document.querySelector('.quiz-box');
const resultBox     = document.querySelector('.result-box');
const tryAgainBtn   = document.querySelector('.tryAgain-btn');
const goHomeBtn     = document.querySelector('.goHome-btn');
const nextBtn       = document.querySelector('.next-btn');
const optionList    = document.querySelector('.option-list');
const container     = document.querySelector('.container');
const homeSection   = document.querySelector('.home');

// ── Variables d'état ──────────────────────────────────────
let questionCount = 0;
let questionNumb  = 1;
let userScore     = 0;
let shuffledQuestions = [];

// ── Détection mobile ─────────────────────────────────────
function isMobile() {
    return window.innerWidth <= 768;
}

// ── Mélange des questions ────────────────────────────────
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ── Afficher la section quiz (mobile ou desktop) ─────────
function showQuizSection() {
    if (isMobile()) {
        // Sur mobile : cacher la home, montrer la section quiz
        homeSection.style.display = 'none';
        quizSection.style.display = 'flex';
        quizSection.style.left = '0';
        container.style.overflow = 'hidden';
    } else {
        quizSection.classList.add('active');
    }
}

// ── Revenir à l'accueil (mobile ou desktop) ──────────────
function showHomeSection() {
    if (isMobile()) {
        quizSection.style.display = 'none';
        homeSection.style.display = 'flex';
        quizSection.style.left = '';
    } else {
        quizSection.classList.remove('active');
    }
}

// ── Bouton Commencer ─────────────────────────────────────
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

// ── Bouton Quitter popup ─────────────────────────────────
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

// ── Bouton Continuer / Commencer ─────────────────────────
continueBtn.onclick = (e) => {
    e.preventDefault();
    startQuiz();
};

function startQuiz() {
    shuffledQuestions = shuffle(questions);

    questionCount = 0;
    questionNumb  = 1;
    userScore     = 0;

    popupInfo.classList.remove('active');
    main.classList.remove('active');

    showQuizSection();

    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    // Sur mobile, scroll en haut à chaque nouvelle question
    if (isMobile()) quizSection.scrollTop = 0;

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

// ── Recommencer ──────────────────────────────────────────
tryAgainBtn.onclick = () => {
    startQuiz();
};

// ── Retour à l'accueil ───────────────────────────────────
goHomeBtn.onclick = () => {
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb  = 1;
    userScore     = 0;

    showHomeSection();

    shuffledQuestions = shuffle(questions);
    showQuestions(0);
    questionCounter(1);
    headerScore();
};

// ── Bouton Suivant ───────────────────────────────────────
nextBtn.onclick = () => {
    if (questionCount < shuffledQuestions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
        // Scroll en haut sur mobile
        if (isMobile()) quizSection.scrollTop = 0;
    } else {
        showResultBox();
    }
};

// ── Navigation clavier ───────────────────────────────────
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && nextBtn.classList.contains('active')) {
        nextBtn.click();
    }
    if (['1','2','3','4'].includes(e.key)) {
        const opts = optionList.querySelectorAll('.option:not(.disabled)');
        const idx = parseInt(e.key) - 1;
        if (opts[idx]) opts[idx].click();
    }
});

// ── Afficher une question ────────────────────────────────
function showQuestions(index) {
    const q = shuffledQuestions[index];
    if (!q) return;

    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questionNumb}. ${q.question}`;

    let optionTag = '';
    q.options.forEach((opt) => {
        optionTag += `<div class="option"><span>${opt}</span></div>`;
    });
    optionList.innerHTML = optionTag;

    optionList.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', () => optionSelected(opt));
    });
}

// ── Sélection d'une réponse ──────────────────────────────
function optionSelected(answer) {
    const userAnswer    = answer.textContent.trim();
    const correctAnswer = shuffledQuestions[questionCount].answer.trim();
    const allOptions    = optionList.children;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        Array.from(allOptions).forEach(opt => {
            if (opt.textContent.trim() === correctAnswer) {
                opt.classList.add('correct');
            }
        });
    }

    Array.from(allOptions).forEach(opt => opt.classList.add('disabled'));
    nextBtn.classList.add('active');
}

// ── Compteur de question ─────────────────────────────────
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} sur ${shuffledQuestions.length} questions`;
}

// ── Score dans le header ─────────────────────────────────
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    const total = shuffledQuestions.length || questions.length;
    headerScoreText.textContent = `Score : ${userScore} / ${total}`;
}

// ── Mention selon le score ───────────────────────────────
function getMention(score, total) {
    const pct = (score / total) * 100;
    if (pct === 100) return { text: 'Score parfait !',              color: '#ffd700' };
    if (pct >= 80)  return { text: 'Excellent résultat !',         color: '#8fbc5a' };
    if (pct >= 60)  return { text: 'Bon travail !',                color: '#a8d878' };
    if (pct >= 40)  return { text: 'Peut mieux faire…',            color: '#c8a84b' };
    return              { text: 'Continue à t\'entraîner !',       color: '#c0572a' };
}

// ── Afficher la boîte de résultat ────────────────────────
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    if (isMobile()) quizSection.scrollTop = 0;

    const total = shuffledQuestions.length;

    const scoreText = document.querySelector('.Score-text');
    scoreText.textContent = `Ton score est de ${userScore} sur ${total}`;

    const mention = getMention(userScore, total);
    const resultMention = document.querySelector('.result-mention');
    if (resultMention) {
        resultMention.textContent = mention.text;
        resultMention.style.color = mention.color;
    }

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue    = document.querySelector('.progress-value');

    let progressStartValue = 0;
    const progressEndValue = Math.round((userScore / total) * 100);
    const speed = 20;

    progressValue.textContent = '0%';
    circularProgress.style.background = `conic-gradient(var(--main-color) 0deg, rgba(143,188,90,.1) 0deg)`;

    const progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(var(--main-color) ${progressStartValue * 3.6}deg, rgba(143,188,90,.1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}

// ── Recalcul au redimensionnement ────────────────────────
window.addEventListener('resize', () => {
    // Si on passe desktop → mobile ou inverse en cours de quiz, on remet tout droit
    if (!isMobile()) {
        homeSection.style.display = '';
        quizSection.style.display = '';
        quizSection.style.left = '';
    }
});