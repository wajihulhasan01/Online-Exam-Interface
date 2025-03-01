const questions = [
    { text: "Which of the following is not an advantage of computers?", options: ["Efficiency", "Reliability", "Safety", "Fast results"], answer: 2 },
    { text: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unit"], answer: 1 },
    { text: "Which part of the computer performs calculations?", options: ["CPU", "Monitor", "Keyboard", "Mouse"], answer: 0 },
    { text: "What is the brain of the computer?", options: ["RAM", "Hard Drive", "CPU", "Motherboard"], answer: 2 },
    { text: "Which device is used for input?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: 2 },
    { text: "Which of the following is an output device?", options: ["Mouse", "Scanner", "Monitor", "Keyboard"], answer: 2 },
    { text: "Which memory is volatile?", options: ["ROM", "RAM", "Hard Drive", "CD-ROM"], answer: 1 },
    { text: "What type of software is an operating system?", options: ["Application Software", "System Software", "Utility Software", "Development Software"], answer: 1 },
    { text: "Which is an example of system software?", options: ["MS Word", "Windows", "Google Chrome", "Adobe Photoshop"], answer: 1 },
    { text: "What is the full form of HTTP?", options: ["Hypertext Transfer Protocol", "Hyperlink Text Process", "Hyper Text Programming", "Hyperlink Transfer Process"], answer: 0 },
    { text: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Read And Modify", "Run Access Memory"], answer: 1 },
    { text: "Which of these is a search engine?", options: ["Facebook", "Google", "Instagram", "WhatsApp"], answer: 1 },
    { text: "Which is not an operating system?", options: ["Windows", "Linux", "MacOS", "Google"], answer: 3 },
    { text: "What does BIOS stand for?", options: ["Basic Input Output System", "Binary Integrated Operating System", "Basic Integrated Output System", "Basic Internal Operating Setup"], answer: 0 },
    { text: "Which of the following is used to store data permanently?", options: ["RAM", "ROM", "Cache", "Register"], answer: 1 },
    { text: "Which of these is an example of an application software?", options: ["Windows", "Linux", "MS Word", "BIOS"], answer: 2 },
    { text: "Which type of network covers a large geographical area?", options: ["LAN", "WAN", "MAN", "PAN"], answer: 1 },
    { text: "Which key is used to refresh a webpage?", options: ["F1", "F5", "F10", "F12"], answer: 1 },
    { text: "Which company developed Windows OS?", options: ["Apple", "IBM", "Microsoft", "Google"], answer: 2 },
    { text: "Which of these is a programming language?", options: ["HTML", "HTTP", "FTP", "URL"], answer: 0 },
    { text: "Which storage device has the largest capacity?", options: ["CD", "DVD", "Hard Disk", "Floppy Disk"], answer: 2 },
    { text: "Which of these is an example of a database management system?", options: ["MySQL", "Google Chrome", "Windows", "Python"], answer: 0 },
    { text: "Which key combination is used to copy?", options: ["Ctrl + P", "Ctrl + C", "Ctrl + V", "Ctrl + X"], answer: 1 },
    { text: "What is the purpose of an IP address?", options: ["Identify devices on a network", "Store data", "Secure a computer", "Access the internet"], answer: 0 },
    { text: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Resource Link", "Unique Reference Location", "Uniform Retrieval Language"], answer: 0 }

        ];

        let currentQuestion = 0;
        let attempted = 0;
        let flagged = 0;
        let timeLeft = 1500;
        let timerInterval;

        function loadQuestion(index) {
            const container = document.getElementById("question-container");
            const question = questions[index];
            container.innerHTML = `
                <h3 class="text-lg font-semibold">Question No: ${index + 1} of ${questions.length}</h3>
                <p class="mt-2">${question.text}</p>
                
                <div class="mt-4 space-y-2">
                    <h3 class="text-lg font-semibold">Answer</h3>
                    ${question.options.map((opt, i) => `
                        <label class='block bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-gray-300'>
                            <input type='radio' name='answer' value='${i}' class='mr-2'> ${opt}
                        </label>
                    `).join('')}
                </div>
            `;
        }

        function updateAttempted() {
            attempted++;
            document.getElementById("attempted").textContent = `${(attempted / questions.length) * 100}%`;
        }

        function startExam() {
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");
    
    // Show question, summary, and navigation sections
    document.getElementById("question-container").classList.remove("hidden");
    // document.getElementById("question-nav").classList.remove("hidden");
    document.getElementById("summary-section").classList.remove("hidden");
    document.getElementById("timer").classList.remove("hidden");

    document.querySelector(".border-t").classList.remove("hidden");

    loadQuestion(currentQuestion);
    startTimer();
}


        function startTimer() {
            const timerElement = document.getElementById("timer");
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    timerElement.textContent = timeLeft;
                } else {
                    clearInterval(timerInterval);
                    alert("Time's up!");
                }
            }, 1000);
        }

        function saveAnswer() {
            alert("Answer saved!");
        }

        function finishExam() {
            clearInterval(timerInterval);
            alert("Exam finished!\nAttempted: " + attempted + "\nFlagged: " + flagged);
        }

        document.getElementById("start-btn").addEventListener("click", startExam);
        document.getElementById("finish-btn").addEventListener("click", finishExam);
        document.getElementById("save-btn").addEventListener("click", saveAnswer);
        function updateLoginTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("login-time").textContent = `Login Time ${formattedTime} | GUEST`;
}
setInterval(updateLoginTime, 1000);
updateLoginTime();
document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profile-pic");
    const fileInput = document.getElementById("upload-profile");

    // Load saved profile picture from localStorage
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
        profilePic.src = savedImage;
    }

    // Handle profile picture click
    profilePic.addEventListener("click", function () {
        if (profilePic.src.includes("placeholder.com")) {
            fileInput.click();
        } else {
            alert("Profile Picture already uploaded!");
        }
    });

    // Handle image upload
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
                localStorage.setItem("profilePic", e.target.result); // Save to localStorage
            };
            reader.readAsDataURL(file);
        }
    });
});

document.getElementById("next-btn").addEventListener("click", function () {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
});

document.getElementById("prev-btn").addEventListener("click", function () {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
});

document.getElementById("first-btn").addEventListener("click", function () {
    currentQuestion = 0;
    loadQuestion(currentQuestion);
});

document.getElementById("last-btn").addEventListener("click", function () {
    currentQuestion = questions.length - 1;
    loadQuestion(currentQuestion);
});


function saveAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption) {
        attempted++;
        document.getElementById("attempted").textContent = `${Math.round((attempted / questions.length) * 100)}%`;
        alert("Answer saved!");
    } else {
        alert("Please select an answer before saving.");
    }
}


let userAnswers = new Array(questions.length).fill(null); // Store user responses

function loadQuestion(index) {
    const container = document.getElementById("question-container");
    const question = questions[index];

    container.innerHTML = `
        <h3 class="text-lg font-semibold">Question No: ${index + 1} of ${questions.length}</h3>
        <p class="mt-2">${question.text}</p>
        <div class="mt-4 space-y-2">
            ${question.options.map((opt, i) => `
                <label class='block bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-gray-300'>
                    <input type='radio' name='answer' value='${i}' class='mr-2' ${userAnswers[index] === i ? "checked" : ""}> ${opt}
                </label>
            `).join('')}
        </div>
    `;

    // Detect answer selection
    document.querySelectorAll("input[name='answer']").forEach(input => {
        input.addEventListener("change", () => {
            userAnswers[index] = parseInt(input.value);
        });
    });
}

function finishExam() {
    clearInterval(timerInterval); // Stop the timer

    // Calculate correct and incorrect answers
    let correct = 0;
    let incorrect = 0;
    attempted = 0;

    userAnswers.forEach((answer, i) => {
        if (answer !== null) {
            attempted++;
            if (answer === questions[i].answer) {
                correct++;
            } else {
                incorrect++;
            }
        }
    });

    // Hide exam interface
    document.querySelector(".max-w-5xl").classList.add("hidden");

    // Create result section
    const resultContainer = document.createElement("div");
    resultContainer.classList = "max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg text-center mt-10";
    resultContainer.innerHTML = `
        <h2 class="text-2xl font-semibold text-gray-800">Exam Finished!</h2>
        <p class="text-lg text-gray-600 mt-4">Your Result:</p>
        <div class="mt-6">
            <p class="text-xl"><b>Attempted Questions:</b> ${attempted} / ${questions.length}</p>
            <p class="text-xl text-green-500"><b>Correct Answers:</b> ${correct}</p>
            <p class="text-xl text-red-500"><b>Incorrect Answers:</b> ${incorrect}</p>
            <p class="text-xl text-yellow-500"><b>Flagged Questions:</b> ${flagged}</p>
        </div>
    `;

    // Append result section to body
    document.body.appendChild(resultContainer);

    // Disable all buttons
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}



function saveAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption) {
        const questionBtn = document.getElementById(`q-${currentQuestion}`);
        if (!questionBtn.classList.contains("bg-blue-300")) {
            attempted++;
            questionBtn.classList.add("bg-blue-300");
        }
        document.getElementById("attempted").textContent = `${Math.min((attempted / questions.length) * 100, 100)}%`;
        alert("Answer saved!");
    } else {
        alert("Please select an answer before saving.");
    }
}

document.getElementById("flag-btn").addEventListener("click", function () {
    const questionBtn = document.getElementById(`q-${currentQuestion}`);

    if (!questionBtn) return; // Ensure the button exists

    if (questionBtn.classList.contains("bg-yellow-300")) {
        flagged = Math.max(0, flagged - 1); // Prevent negative count
        questionBtn.classList.remove("bg-yellow-300");
    } else {
        flagged++;
        questionBtn.classList.add("bg-yellow-300");
    }

    document.getElementById("flagged").textContent = flagged;
});



function generateSummary() {
    const summaryContainer = document.getElementById("question-nav");
    summaryContainer.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        const questionBtn = document.createElement("button");
        questionBtn.textContent = i + 1;
        questionBtn.id = `q-${i}`;
        questionBtn.classList = "px-2 py-1 bg-gray-200 rounded cursor-pointer";
        questionBtn.onclick = function () {
            if (!document.getElementById("finish-btn").disabled) { // Prevent navigation after finishing
                currentQuestion = i;
                loadQuestion(i);
            }
        };
        summaryContainer.appendChild(questionBtn);
    }
}
generateSummary();
