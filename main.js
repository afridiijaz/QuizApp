/* ============================================
   QuizMaster — Main Logic
   ============================================ */

// ─── Quiz Data with correct answers ───
const quizData = [
    {
        question: "UET Peshawar is located in?",
        a: "Peshawar",
        b: "Quetta",
        c: "Mardan",
        d: "Kohat",
        correct: "a"
    },
    {
        question: "Current version of JavaScript is?",
        a: "ECMA5",
        b: "ECMA4",
        c: "ECMA6",
        d: "ECMA1",
        correct: "c"
    },
    {
        question: "The constant PI value is?",
        a: "3.14",
        b: "3.56",
        c: "4.99",
        d: "2.56",
        correct: "a"
    },
    {
        question: "Father of C++ is?",
        a: "Denis Ritchie",
        b: "Bjarne Stroustrup",
        c: "Donald Trump",
        d: "Bill Gates",
        correct: "b"
    },
    {
        question: "There are _____ days in a year?",
        a: "356",
        b: "310",
        c: "365",
        d: "320",
        correct: "c"
    },
    {
        question: "4 × 4 + 3 − 1 = ?",
        a: "28",
        b: "24",
        c: "21",
        d: "18",
        correct: "d"
    },
    {
        question: "There are _____ agencies in FATA?",
        a: "8",
        b: "5",
        c: "7",
        d: "6",
        correct: "c"
    },
    {
        question: "Most popular programming language is?",
        a: "Visual Basic",
        b: "JavaScript",
        c: "Python",
        d: "C++",
        correct: "b"
    },
    {
        question: "There are _____ players in a Cricket team?",
        a: "10",
        b: "9",
        c: "11",
        d: "12",
        correct: "c"
    },
    {
        question: "Bootstrap is a framework for?",
        a: "CSS",
        b: "JavaScript",
        c: "Python",
        d: "C++",
        correct: "a"
    },
    {
        question: "Hazrat Muhammad (P.B.U.H) was the _____ Prophet?",
        a: "First",
        b: "Last",
        c: "Both of the above",
        d: "Middle",
        correct: "b"
    },
    {
        question: "Pakistan Independence Day is celebrated on?",
        a: "14 August 1947",
        b: "18 May 1947",
        c: "12 August 1947",
        d: "14 July 1947",
        correct: "a"
    }
];

// ─── State Variables ───
let currentIndex = 0;
let userAnswers = new Array(quizData.length).fill(null); // stores user's selected answer per question
let skippedQuestions = [];      // indices of skipped questions
let skippedIndex = 0;           // current index within skippedQuestions array
let skippedAnswers = {};        // answers given during skipped review
let timerInterval = null;
let totalSeconds = 5 * 60;     // 5 minutes
let quizStartTime = null;
let quizFinished = false;

// ─── DOM Elements ───
const screens = {
    start: document.getElementById('startScreen'),
    quiz: document.getElementById('quizScreen'),
    skipped: document.getElementById('skippedScreen'),
    result: document.getElementById('resultScreen')
};

// Quiz screen elements
const el = {
    timerText: document.getElementById('timerText'),
    timer: document.getElementById('timer'),
    currentQ: document.getElementById('currentQ'),
    totalQ: document.getElementById('totalQ'),
    progressBar: document.getElementById('progressBar'),
    questionText: document.getElementById('questionText'),
    textA: document.getElementById('textA'),
    textB: document.getElementById('textB'),
    textC: document.getElementById('textC'),
    textD: document.getElementById('textD'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    btnSkip: document.getElementById('btnSkip'),
    skipCounter: document.getElementById('skipCounter'),
    radios: document.querySelectorAll('input[name="answer"]')
};

// Skipped screen elements
const sk = {
    timerText: document.getElementById('timerTextSkipped'),
    timer: document.getElementById('timerSkipped'),
    progressBar: document.getElementById('progressBarSkipped'),
    questionText: document.getElementById('skippedQuestionText'),
    textA: document.getElementById('skippedTextA'),
    textB: document.getElementById('skippedTextB'),
    textC: document.getElementById('skippedTextC'),
    textD: document.getElementById('skippedTextD'),
    btnPrev: document.getElementById('btnSkippedPrev'),
    btnNext: document.getElementById('btnSkippedNext'),
    btnSkip: document.getElementById('btnSkipAgain'),
    info: document.getElementById('skippedInfo'),
    radios: document.querySelectorAll('input[name="skippedAnswer"]')
};

// ─── Screen Navigation ───
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

// ─── Timer ───
function startTimer() {
    quizStartTime = Date.now();
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay();

        if (totalSeconds <= 60) {
            el.timer.classList.add('warning');
            if (screens.skipped.classList.contains('active')) {
                sk.timer.classList.add('warning');
            }
        }

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    el.timerText.textContent = display;
    sk.timerText.textContent = display;
}

function getTimeTaken() {
    if (!quizStartTime) return '0:00';
    const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// ─── Render Quiz Question ───
function renderQuestion() {
    const q = quizData[currentIndex];
    el.currentQ.textContent = currentIndex + 1;
    el.totalQ.textContent = quizData.length;
    el.progressBar.style.width = `${((currentIndex + 1) / quizData.length) * 100}%`;
    el.questionText.textContent = q.question;
    el.textA.textContent = q.a;
    el.textB.textContent = q.b;
    el.textC.textContent = q.c;
    el.textD.textContent = q.d;

    // Restore previously selected answer
    el.radios.forEach(r => r.checked = false);
    if (userAnswers[currentIndex]) {
        const radio = document.querySelector(`input[name="answer"][value="${userAnswers[currentIndex]}"]`);
        if (radio) radio.checked = true;
    }

    // Button states
    el.btnPrev.disabled = currentIndex === 0;

    // Change "Next" to "Submit" on last question
    if (currentIndex === quizData.length - 1) {
        el.btnNext.textContent = 'Submit ✓';
    } else {
        el.btnNext.textContent = 'Next →';
    }

    // Update skip counter
    updateSkipCounter();
}

function updateSkipCounter() {
    const skippedCount = userAnswers.filter((a, i) => a === null && i <= currentIndex).length + 
                         skippedQuestions.filter(i => i > currentIndex).length;
    // Show total skipped so far
    const totalSkipped = skippedQuestions.length;
    if (totalSkipped > 0) {
        el.skipCounter.textContent = `${totalSkipped} question${totalSkipped > 1 ? 's' : ''} skipped`;
    } else {
        el.skipCounter.textContent = '';
    }
}

// ─── Save Current Answer ───
function saveCurrentAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        userAnswers[currentIndex] = selected.value;
    }
}

// ─── Quiz Event Handlers ───

// Start Button
document.getElementById('btnStart').addEventListener('click', () => {
    showScreen('quiz');
    renderQuestion();
    startTimer();
});

// Next Button
el.btnNext.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected && !skippedQuestions.includes(currentIndex)) {
        // No answer selected and not previously skipped — warn user
        shakeButton(el.btnNext);
        el.skipCounter.textContent = '⚠ Please select an answer or click Skip';
        el.skipCounter.style.color = '#e74c3c';
        setTimeout(() => {
            el.skipCounter.style.color = '#999';
            updateSkipCounter();
        }, 2000);
        return;
    }

    saveCurrentAnswer();

    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        // Last question — check for skipped questions
        handleQuizEnd();
    }
});

// Previous Button
el.btnPrev.addEventListener('click', () => {
    saveCurrentAnswer();
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
});

// Skip Button
el.btnSkip.addEventListener('click', () => {
    // Mark as skipped (don't save any answer)
    userAnswers[currentIndex] = null;
    if (!skippedQuestions.includes(currentIndex)) {
        skippedQuestions.push(currentIndex);
    }

    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        handleQuizEnd();
    }
});

// ─── Handle Quiz End (check for skipped) ───
function handleQuizEnd() {
    // Find all unanswered questions
    const unanswered = [];
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === null) {
            unanswered.push(i);
        }
    }

    if (unanswered.length > 0) {
        // Show skipped questions screen
        skippedQuestions = unanswered;
        skippedIndex = 0;
        skippedAnswers = {};
        showScreen('skipped');
        renderSkippedQuestion();
    } else {
        finishQuiz();
    }
}

// ─── Skipped Questions Screen ───
function renderSkippedQuestion() {
    const qIdx = skippedQuestions[skippedIndex];
    const q = quizData[qIdx];

    sk.progressBar.style.width = `${((skippedIndex + 1) / skippedQuestions.length) * 100}%`;
    sk.questionText.textContent = q.question;
    sk.textA.textContent = q.a;
    sk.textB.textContent = q.b;
    sk.textC.textContent = q.c;
    sk.textD.textContent = q.d;

    // Clear selection
    sk.radios.forEach(r => r.checked = false);

    // Restore if already answered in this round
    if (skippedAnswers[qIdx]) {
        const radio = document.querySelector(`input[name="skippedAnswer"][value="${skippedAnswers[qIdx]}"]`);
        if (radio) radio.checked = true;
    }

    sk.btnPrev.disabled = skippedIndex === 0;

    if (skippedIndex === skippedQuestions.length - 1) {
        sk.btnNext.textContent = 'Finish ✓';
    } else {
        sk.btnNext.textContent = 'Next →';
    }

    sk.info.textContent = `Skipped question ${skippedIndex + 1} of ${skippedQuestions.length} (Question #${qIdx + 1})`;
}

// Skipped Next
sk.btnNext.addEventListener('click', () => {
    const selected = document.querySelector('input[name="skippedAnswer"]:checked');
    const qIdx = skippedQuestions[skippedIndex];

    if (selected) {
        skippedAnswers[qIdx] = selected.value;
    }

    if (skippedIndex < skippedQuestions.length - 1) {
        skippedIndex++;
        renderSkippedQuestion();
    } else {
        // Merge skipped answers back
        for (const [idx, ans] of Object.entries(skippedAnswers)) {
            userAnswers[parseInt(idx)] = ans;
        }
        finishQuiz();
    }
});

// Skipped Prev
sk.btnPrev.addEventListener('click', () => {
    const selected = document.querySelector('input[name="skippedAnswer"]:checked');
    const qIdx = skippedQuestions[skippedIndex];
    if (selected) {
        skippedAnswers[qIdx] = selected.value;
    }

    if (skippedIndex > 0) {
        skippedIndex--;
        renderSkippedQuestion();
    }
});

// Skipped Skip (skip again — leave unanswered)
sk.btnSkip.addEventListener('click', () => {
    if (skippedIndex < skippedQuestions.length - 1) {
        skippedIndex++;
        renderSkippedQuestion();
    } else {
        // Merge whatever was answered
        for (const [idx, ans] of Object.entries(skippedAnswers)) {
            userAnswers[parseInt(idx)] = ans;
        }
        finishQuiz();
    }
});

// ─── Finish Quiz & Show Results ───
function finishQuiz() {
    if (quizFinished) return;
    quizFinished = true;
    clearInterval(timerInterval);

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === null) {
            unansweredCount++;
        } else if (userAnswers[i] === quizData[i].correct) {
            correctCount++;
        } else {
            wrongCount++;
        }
    }

    const totalMarks = correctCount * 2;
    const maxMarks = quizData.length * 2;
    const percentage = Math.round((totalMarks / maxMarks) * 100);
    const timeTaken = getTimeTaken();

    // Populate result screen
    document.getElementById('scoreNumber').textContent = totalMarks;
    document.getElementById('scoreTotal').textContent = `/ ${maxMarks}`;
    document.getElementById('statCorrect').textContent = correctCount;
    document.getElementById('statWrong').textContent = wrongCount;
    document.getElementById('statSkipped').textContent = unansweredCount;
    document.getElementById('statTime').textContent = timeTaken;

    // Dynamic result messages
    let icon, title, subtitle, message;
    if (percentage >= 80) {
        icon = '🏆';
        title = 'Excellent!';
        subtitle = 'You\'re a genius!';
        message = `Outstanding performance! You scored ${totalMarks} out of ${maxMarks} marks (${percentage}%). You really know your stuff! 🎉`;
    } else if (percentage >= 60) {
        icon = '🌟';
        title = 'Great Job!';
        subtitle = 'Well done!';
        message = `Good performance! You scored ${totalMarks} out of ${maxMarks} marks (${percentage}%). Keep learning and you'll be at the top! 💪`;
    } else if (percentage >= 40) {
        icon = '📚';
        title = 'Not Bad!';
        subtitle = 'Room for improvement';
        message = `You scored ${totalMarks} out of ${maxMarks} marks (${percentage}%). A little more study and you'll nail it next time! 📖`;
    } else {
        icon = '💡';
        title = 'Keep Trying!';
        subtitle = 'Practice makes perfect';
        message = `You scored ${totalMarks} out of ${maxMarks} marks (${percentage}%). Don't give up — review the topics and try again! 🔥`;
    }

    document.getElementById('resultIcon').textContent = icon;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultSubtitle').textContent = subtitle;
    document.getElementById('resultMessage').textContent = message;

    // Color the score circle based on performance
    const circle = document.getElementById('scoreCircle');
    if (percentage >= 80) {
        circle.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
    } else if (percentage >= 60) {
        circle.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    } else if (percentage >= 40) {
        circle.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
    } else {
        circle.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
    }

    showScreen('result');
}

// ─── Restart ───
document.getElementById('btnRestart').addEventListener('click', () => {
    // Reset everything
    currentIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    skippedQuestions = [];
    skippedIndex = 0;
    skippedAnswers = {};
    totalSeconds = 5 * 60;
    quizFinished = false;
    quizStartTime = null;
    el.timer.classList.remove('warning');
    sk.timer.classList.remove('warning');

    showScreen('start');
});

// ─── Utility: Shake animation for button ───
function shakeButton(btn) {
    btn.style.animation = 'shake 0.4s ease';
    setTimeout(() => { btn.style.animation = ''; }, 400);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }
`;
document.head.appendChild(shakeStyle);
