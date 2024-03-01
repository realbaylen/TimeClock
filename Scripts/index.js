// Initialize variables
let CurrentStatus = -1; // Current status of the project (-1: Not working, 0: Working, 1: On break)
let projectName = ''; // Name of the project
let projectData = []; // Array to store the duration of each session

// Function to start a new project
const startProject = () => {
    projectName = prompt('Please enter a project name');
    if (projectName) {
        console.log(`Starting project: ${projectName}`);
        projectData = []; // Clear the project data
        updateTitle(); // Update the project title
    } else {
        alert('Please enter a project name.');
    }
};

// Function to load a project from a CSV file
const loadProject = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const csvData = event.target.result;
        const lines = csvData.split('\n');

        projectName = lines[0]; // Set the project name from the first line of the CSV file
        projectData = lines.slice(1).map(Number); // Set the project data from the remaining lines of the CSV file

        console.log(`Loaded project: ${projectName}`);
        updateTitle(); // Update the project title
    };

    reader.readAsText(file);
};

// Function to save the project data as a CSV file
const saveProject = () => {
    if (projectName && projectData.length > 0) {
        const csvData = [projectName, ...projectData].join('\n'); // Combine the project name and data into a CSV string
        const blob = new Blob([csvData], { type: 'text/csv' }); // Create a Blob object from the CSV data
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        let fileName;
        do {
            fileName = prompt('Enter a valid file name:');
        } while (!fileName || fileName.trim() === '');

        link.download = `${fileName.replace(/ /g, '_')}.csv`; // Set the download filename with spaces replaced by underscores
        link.click(); // Trigger the download
    } else {
        alert('No active project to download.');
    }
};

// Function to toggle the session status (start or end session)
const toggleSession = () => {
    if (projectName) {
        if (CurrentStatus === -1) {
            CurrentStatus = 0; // Set the current status to working
            seconds = 0; // Reset the timer
            updateTimer(); // Update the timer display
            startTimer(); // Start the timer
            document.querySelector('.current-status').innerText = "Current Status: Working";
            document.querySelector('.start-button').innerText = "End Session";
            updateTitle(); // Update the project title
            updateTotalTime(); // Update the total time worked
        } else if (CurrentStatus === 0) {
            CurrentStatus = -1; // Set the current status to not working
            stopTimer(); // Stop the timer
            document.querySelector('.current-status').innerText = "Current Status: Not Working";
            document.querySelector('.start-button').innerText = "Start Session";
            projectData.push(seconds); // Add the session duration to the project data
            updateTitle(); // Update the project title
            updateTotalTime(); // Update the total time worked
        }
    } else {
        alert('No valid project. Please start a project first.');
    }
}

// Function to toggle the break status (start or end break)
const toggleBreak = () => {
    if (projectName) {
        if (CurrentStatus === 0) {
            CurrentStatus = 1; // Set the current status to on break
            stopTimer(); // Stop the timer
            document.querySelector('.current-status').innerText = "Current Status: On Break";
            document.querySelector('.break-button').innerText = "End Break";
            updateTotalTime(); // Update the total time worked
        } else if (CurrentStatus === 1) {
            CurrentStatus = 0; // Set the current status to working
            startTimer(); // Start the timer
            document.querySelector('.current-status').innerText = "Current Status: Working";
            document.querySelector('.break-button').innerText = "Start Break";
            updateTotalTime(); // Update the total time worked
        }
        updateTitle(); // Update the project title
    } else {
        alert('No valid project. Please start a project first.');
    }
}

// Function to update the project title
const updateTitle = () => {
    document.querySelector('.project-status').innerText = (`${projectName} | Session ${projectData.length + 1}`);
    updateTotalTime(); // Update the total time worked
};

const updateTotalTime = () => {
    const totalTime = projectData.reduce((a, b) => a + b, 0);
    document.querySelector('.total-time').innerText = `Total Time Worked: ${formatTime(totalTime)}`;
}

window.UpdateTotalTime = updateTotalTime;