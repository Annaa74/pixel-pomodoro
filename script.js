const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');
const repetitionsDisplay = document.getElementById('repetitions');
const backgroundSelector = document.getElementById('backgroundSelector');
const alarmSound = document.getElementById('alarmSound');
const musicSelector = document.getElementById('musicSelector');
const musicPlayer = document.getElementById('musicPlayer');
const focusModeButton = document.getElementById('focusModeButton');
const appreciationDisplay = document.getElementById('appreciation');

const WORK_MIN = 25;
const SHORT_BREAK_MIN = 5;
const LONG_BREAK_MIN = 15;
const REPS = 4;
let reps = 0;
let isWorking = true;
let timerInterval;
let seconds = 0;
let minutes = WORK_MIN;
let isPaused = false;
let currentTask = 'Work';
let timeSinceLastAppreciation = 0;

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    statusDisplay.textContent = currentTask;
}

function updateTimerAndAppreciation() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        switchSession();
    } else if (seconds > 0) {
        seconds--;
    } else {
        minutes--;
        seconds = 59;
    }
    updateDisplay();
    timeSinceLastAppreciation += 1;

    if (timeSinceLastAppreciation % 300 === 0 && timeSinceLastAppreciation > 0) {
        displayAppreciation();
    }
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerAndAppreciation, 1000);
}

function pauseTimer() {
    if (isPaused) {
        startTimer();
        pauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        pauseButton.textContent = 'Resume';
    }
    isPaused = !isPaused;
}

function resetTimer() {
    clearInterval(timerInterval);
    reps = 0;
    isWorking = true;
    minutes = WORK_MIN;
    seconds = 0;
    currentTask = 'Work';
    updateDisplay();
    isPaused = false;
    pauseButton.textContent = 'Pause';
    timeSinceLastAppreciation = 0;
}

function switchSession() {
    if (isWorking) {
        reps++;
        alarmSound.play();
        statusDisplay.textContent = "Rest time is about to start";

        setTimeout(() => {
            if (reps % REPS === 0) {
                minutes = LONG_BREAK_MIN;
                currentTask = 'Long Break';
            } else {
                minutes = SHORT_BREAK_MIN;
                currentTask = 'Short Break';
            }

            seconds = 0;
            isWorking = !isWorking;
            startTimer();

            // Update the repetitionsDisplay after the timer has switched:
            let tickMarks = '';
            for (let i = 0; i < Math.floor(reps / 2); i++) {
                tickMarks += '<img src="tick.png" alt="Pixel Tick" class="pixel-tick">';
            }
            repetitionsDisplay.innerHTML = tickMarks;

        }, 5000);
    } else {
        minutes = WORK_MIN;
        currentTask = 'Work';
        seconds = 0;
        isWorking = !isWorking;
        startTimer();

        // Update the repetitionsDisplay after the timer has switched:
        let tickMarks = '';
        for (let i = 0; i < Math.floor(reps / 2); i++) {
            tickMarks += '<img src="tick.png" alt="Pixel Tick" class="pixel-tick">';
        }
        repetitionsDisplay.innerHTML = tickMarks;
    }
    timeSinceLastAppreciation = 0;
}

function buttonClickFeedback(button) {
    button.style.backgroundColor = '#aaa';
    setTimeout(() => {
        button.style.backgroundColor = '';
    }, 200);
}

startButton.addEventListener('click', () => {
    startTimer();
    buttonClickFeedback(startButton);
});
pauseButton.addEventListener('click', () => {
    pauseTimer();
    buttonClickFeedback(pauseButton);
});
resetButton.addEventListener('click', () => {
    resetTimer();
    buttonClickFeedback(resetButton);
});

backgroundSelector.addEventListener('change', (event) => {
    document.body.style.backgroundImage = `url('${event.target.value}')`;
});

musicSelector.addEventListener('change', (event) => {
    if (event.target.value) {
        musicPlayer.src = event.target.value;
        musicPlayer.play();
    } else {
        musicPlayer.pause();
        musicPlayer.src = '';
    }
});

focusModeButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        focusModeButton.textContent = 'Focus Mode';
    } else {
        document.documentElement.requestFullscreen();
        focusModeButton.textContent = 'Exit Focus Mode';
    }
});

function displayAppreciation() {
    const appreciations = [
        "Great job!😊",
        "You're doing fantastic!😏",
        "Keep up the good work!😎",
        "You're on fire!🔥",
        "Excellent progress!👨‍💻",
        "You're a star!⭐",
        "You're rocking it!👾",
        "Superb effort!😉",
        "You're making strides!🙌",
        "Bravo!🏆"
    ];

    const randomIndex = Math.floor(Math.random() * appreciations.length);
    appreciationDisplay.textContent = appreciations[randomIndex];
    appreciationDisplay.style.opacity = 1;

    setTimeout(() => {
        appreciationDisplay.style.opacity = 0;
    }, 120000);
}


const startAppreciations = [
    "You're capable of amazing things. Let's start studying!",
    "Believe in yourself! Your hard work is valuable.",
    "Your dedication will bring you closer to your goals!",
    "Fuel your curiosity! Let's get started.",
    "Study time! You can do it!",
    "Maximize your focus! Your efforts will pay off.",
    "Unlock your potential! Your study session starts now."
];

function displayStartAppreciation() {
    const randomIndex = Math.floor(Math.random() * startAppreciations.length);
    appreciationDisplay.textContent = startAppreciations[randomIndex];
    appreciationDisplay.style.opacity = 1;

    setTimeout(() => {
        appreciationDisplay.style.opacity = 0;
    }, 10000); // Adjust display duration as needed
}

startButton.addEventListener('click', () => {
    startTimer();
    buttonClickFeedback(startButton);
    displayStartAppreciation(); // Call the new function
});
// --- GIF Preloading and Default Background ---

// List of all GIFs from your dropdown
const gifList = [
  "animated.gif","animated20.gif","animated1.gif","animated2.gif","animated3.gif",
  "animated4.gif","animated5.gif","animated6.gif","animated7.gif","animated8.gif",
  "animated9.gif","animated10.gif","animated11.gif","animated12.gif","animated13.gif",
  "animated14.gif","animated15.gif","animated16.gif","animated17.gif","animated18.gif",
  "animated19.gif"
];

// Preload all GIFs into browser cache
gifList.forEach(src => {
  const img = new Image();
  img.src = src; // adjust path if GIFs are inside /assets/
});

// Set a default background when page loads
window.addEventListener("DOMContentLoaded", () => {
  document.body.style.backgroundImage = `url('${gifList[0]}')`; // default GIF
});
