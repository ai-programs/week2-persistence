// ================================================
// TypeRacer — Game Logic
// ================================================
// This file controls everything about how the game works:
// - Picking a random sentence
// - Tracking what the player types
// - Highlighting correct/incorrect characters
// - Calculating speed (WPM) and accuracy
// - Keeping a list of recent scores
// ================================================

// ================================================
// SENTENCES — The challenges players have to type
// ================================================
// Each sentence is a string the player must type exactly.
// Feel free to add, remove, or change these!
const sentences = [
    "The quick brown fox jumps over the lazy dog near the river bank.",
    "Every morning she would sit by the window and watch the rain fall gently.",
    "He packed his bags and left without saying a single word to anyone.",
    "The old bookshop on the corner had more stories than its shelves could hold.",
    "Learning to code is like learning a new language for talking to machines.",
    "The sunset painted the sky in shades of orange, pink, and deep purple.",
    "She typed faster than anyone in the room but always made zero mistakes.",
    "A good playlist can turn a boring afternoon into the best day of the week.",
    "The robot looked at the flowers and wondered what it meant to feel alive.",
    "Sometimes the hardest part of a project is just getting started on it."
];

// ================================================
// DOM ELEMENTS — Grabbing references to the HTML
// ================================================
// document.getElementById finds an element by its id attribute.
// We store these in variables so we can use them later
// without searching the page every time.
const sentenceDisplay = document.getElementById('sentence-display');
const typingInput = document.getElementById('typing-input');
const startButton = document.getElementById('start-btn');
const liveStats = document.getElementById('live-stats');
const liveTimer = document.getElementById('live-timer');
const liveProgress = document.getElementById('live-progress');
const liveTotal = document.getElementById('live-total');
const resultsPanel = document.getElementById('results-panel');
const resultWpm = document.getElementById('result-wpm');
const resultAccuracy = document.getElementById('result-accuracy');
const resultTime = document.getElementById('result-time');
const scoresSection = document.getElementById('scores-section');
const scoresList = document.getElementById('scores-list');

// ================================================
// GAME STATE — Variables that change as the game runs
// ================================================
// "let" means these values will change during the game.
// "null" means "no value yet" — they get set when the game starts.
let currentSentence = null;
let startTime = null;
let timerInterval = null;
let isPlaying = false;
let mistakes = 0;

// ================================================
// SCORES — Keeping track of past results
// ================================================
// This array holds all the scores from this session.
// Right now, scores disappear when you close the browser.
// That's the problem Week 2 will solve with Firebase!
let scores = [];

// ================================================
// START GAME — Runs when the player clicks "Start"
// ================================================
// This function sets everything up for a new round:
// 1. Pick a random sentence
// 2. Display it with character-by-character spans
// 3. Start the timer
// 4. Focus the input so the player can type immediately
function startGame() {
    // Pick a random sentence from the array
    // Math.random() gives a number between 0 and 1
    // We multiply by the array length to get a valid index
    const randomIndex = Math.floor(Math.random() * sentences.length);
    currentSentence = sentences[randomIndex];

    // Reset game state
    mistakes = 0;
    isPlaying = true;
    typingInput.value = '';
    typingInput.disabled = false;
    resultsPanel.classList.add('hidden');

    // Remove flex centering (only needed for the initial "Press Start" message)
    // Flexbox collapses whitespace between inline elements, which hides spaces
    // We also enable pre-wrap so space characters inside <span>s stay visible
    sentenceDisplay.classList.remove('flex', 'items-center', 'justify-center');
    sentenceDisplay.style.whiteSpace = 'pre-wrap';
    sentenceDisplay.style.overflowWrap = 'break-word';

    // Build the sentence display — each character becomes its own <span>
    // This lets us color each character individually as the player types
    sentenceDisplay.innerHTML = currentSentence
        .split('')
        .map((char, index) => {
            // The first character starts as "current" (highlighted)
            // All others start as "untyped" (gray)
            const className = index === 0 ? 'current' : 'untyped';
            return `<span class="char ${className}">${char}</span>`;
        })
        .join('');

    // Show the live stats bar and set the total character count
    liveStats.classList.remove('hidden');
    liveProgress.textContent = '0';
    liveTotal.textContent = currentSentence.length;
    liveTimer.textContent = '0.0';

    // Start the timer — updates every 100ms (10 times per second)
    // Date.now() gives the current time in milliseconds
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 100);

    // Change button text and focus the input
    startButton.textContent = 'Restart';
    typingInput.focus();
}

// ================================================
// UPDATE TIMER — Runs every 100ms while playing
// ================================================
// Calculates how many seconds have passed since the game started
// and updates the display. toFixed(1) rounds to 1 decimal place.
function updateTimer() {
    const elapsed = (Date.now() - startTime) / 1000;
    liveTimer.textContent = elapsed.toFixed(1);
}

// ================================================
// HANDLE INPUT — Runs every time the player types a character
// ================================================
// This is the core game loop. It compares what the player
// has typed so far against the original sentence, character
// by character, and updates the display colors.
function handleInput() {
    const typed = typingInput.value;
    const chars = sentenceDisplay.querySelectorAll('.char');

    // Reset mistake count for this check
    // (we recount from scratch each time to stay accurate)
    mistakes = 0;

    // Go through each character in the sentence
    chars.forEach((charSpan, index) => {
        const typedChar = typed[index];

        // Remove all state classes so we can set the right one
        charSpan.classList.remove('correct', 'incorrect', 'current', 'untyped');

        if (typedChar == null) {
            // Player hasn't reached this character yet
            // Mark the first untyped character as "current" (the cursor)
            if (index === typed.length) {
                charSpan.classList.add('current');
            } else {
                charSpan.classList.add('untyped');
            }
        } else if (typedChar === currentSentence[index]) {
            // Player typed this character correctly — green!
            charSpan.classList.add('correct');
        } else {
            // Player typed the wrong character — red!
            charSpan.classList.add('incorrect');
            mistakes++;
        }
    });

    // Update the live progress counter
    liveProgress.textContent = typed.length;

    // Check if the player has typed the entire sentence
    if (typed.length === currentSentence.length) {
        finishGame();
    }
}

// ================================================
// FINISH GAME — Calculate and display results
// ================================================
// Runs when the player types the last character.
// Calculates WPM (words per minute) and accuracy percentage.
function finishGame() {
    // Stop the timer
    clearInterval(timerInterval);
    isPlaying = false;

    // Calculate time in seconds
    const endTime = Date.now();
    const timeInSeconds = (endTime - startTime) / 1000;

    // Calculate WPM (words per minute)
    // Standard: 1 "word" = 5 characters (this is how typing tests work)
    // Formula: (characters / 5) / (seconds / 60)
    const totalChars = currentSentence.length;
    const wpm = Math.round((totalChars / 5) / (timeInSeconds / 60));

    // Calculate accuracy — what percentage of characters were correct
    const correctChars = totalChars - mistakes;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    // Display the results
    resultWpm.textContent = wpm;
    resultAccuracy.textContent = accuracy + '%';
    resultTime.textContent = timeInSeconds.toFixed(1) + 's';
    resultsPanel.classList.remove('hidden');

    // Disable the input and update the button
    typingInput.disabled = true;
    startButton.textContent = 'Play Again';

    // Hide live stats since the game is over
    liveStats.classList.add('hidden');

    // Save the score to our in-memory array
    const score = {
        wpm: wpm,
        accuracy: accuracy,
        time: parseFloat(timeInSeconds.toFixed(1)),
        date: new Date().toLocaleTimeString()
    };
    scores.unshift(score);
    renderScores();
}

// ================================================
// RENDER SCORES — Display the scores list
// ================================================
// Takes the scores array and creates HTML elements
// for each score. Right now scores only live in memory —
// refresh the page and they're gone!
function renderScores() {
    if (scores.length === 0) return;

    scoresSection.classList.remove('hidden');

    // Build HTML for each score entry
    scoresList.innerHTML = scores
        .slice(0, 5)  // Show only the 5 most recent scores
        .map((score, index) => `
            <div class="score-entry flex items-center justify-between bg-gray-900 rounded-xl px-4 py-3 border border-gray-800">
                <div class="flex items-center gap-3">
                    <span class="text-gray-500 text-sm w-6">#${index + 1}</span>
                    <span class="font-bold text-indigo-400">${score.wpm} WPM</span>
                </div>
                <div class="flex items-center gap-4 text-sm text-gray-400">
                    <span>${score.accuracy}% acc</span>
                    <span>${score.time}s</span>
                    <span>${score.date}</span>
                </div>
            </div>
        `)
        .join('');
}

// ================================================
// EVENT LISTENERS — Connecting everything together
// ================================================
// addEventListener tells the browser: "when THIS happens,
// run THAT function." It's how we make the page interactive.

// When the Start button is clicked, run startGame
startButton.addEventListener('click', startGame);

// Every time the player types a character, run handleInput
typingInput.addEventListener('input', handleInput);

// Let the player press Enter to start/restart without clicking
typingInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !isPlaying) {
        startGame();
    }
});
