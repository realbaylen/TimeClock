// Global variables
let timer = null;
let seconds = 0;

// Function to start the timer
const startTimer = () => {
    // Check if the timer is already running
    if (!timer) {
        // Start the timer and update it every second
        timer = setInterval(updateTimer, 1000);
    }
};

// Function to update the timer
const updateTimer = () => {
    // Increment the seconds
    seconds++;

    // Update the timer display
    const timerClock = document.querySelector('.timer-clock');
    if (timerClock) {
        timerClock.innerText = formatTime(seconds);
        updateTotalTime();
    }
};

// Function to stop the timer
const stopTimer = () => {
    // Check if the timer is running
    if (timer) {
        // Stop the timer
        clearInterval(timer);
        timer = null;
    }
};

// Function to format the time in HH:MM:SS format
const formatTime = (seconds) => {
    // Helper function to pad single digits with leading zeros
    const pad = (time) => (time < 10 ? `0${time}` : time);

    // Calculate hours, minutes, and remaining seconds
    const hours = pad(Math.floor(seconds / 3600));
    const minutes = pad(Math.floor((seconds % 3600) / 60));
    const remainingSeconds = pad(seconds % 60);

    // Return the formatted time
    return `${hours}:${minutes}:${remainingSeconds}`;
};

// Attach the startTimer and stopTimer functions to the window object
window.startTimer = startTimer;
window.stopTimer = stopTimer;