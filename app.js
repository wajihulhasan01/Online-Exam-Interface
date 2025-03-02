// Questions Array
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
  
  // Global Variables
  let currentQuestion = 0;
  let attempted = 0;
  let flagged = 0;
  let timeLeft = 1500;
  let timerInterval;
  let userAnswers = new Array(questions.length).fill(null);
  
  // Load question into the DOM
  function loadQuestion(index) {
    currentQuestion = index;
    const container = document.getElementById("question-container");
  
    // Load saved answers from localStorage (if available)
    const savedAnswers = localStorage.getItem("userAnswers");
    if (savedAnswers) {
      userAnswers = JSON.parse(savedAnswers);
    }

    container.innerHTML = `
  <h3 class="text-lg font-semibold bg-[#7E22CE] text-white">
    Question ${index + 1} of ${questions.length}
  </h3>
  <p class="mt-2 p-2 rounded-md inline-block">
    ${questions[index].text}
  </p>
  <div class="mt-4 space-y-2">
  <h3 class="text-lg font-semibold bg-[#7E22CE] text-white">Answer</h3>
    ${questions[index].options
      .map((option, i) => `
        <label class="block bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-gray-300">
          <input type="radio" name="answer" value="${i}" class="mr-2" ${userAnswers[index] === i ? "checked" : ""}>
          ${option}
        </label>
      `)
      .join('')}
  </div>
`;

  
    // Attach event listener to capture answer change
    document.querySelectorAll("input[name='answer']").forEach(input => {
      input.addEventListener("change", () => {
        userAnswers[index] = parseInt(input.value);
      });
    });
  }
  
  // Generate summary navigation buttons
  function generateSummary() {
    const summaryContainer = document.getElementById("question-nav");
    summaryContainer.innerHTML = "";
  
    for (let i = 0; i < questions.length; i++) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.id = `q-${i}`;
      btn.className = "px-2 py-1 rounded cursor-pointer";
      if (userAnswers[i] !== null) btn.classList.add("bg-blue-300");
      btn.onclick = () => {
        if (!document.getElementById("finish-btn").disabled) {
          currentQuestion = i;
          loadQuestion(i);
        }
      };
      summaryContainer.appendChild(btn);
    }
  }
  
  // Save the current answer
  function saveAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption) {
      // Increase attempted count only if answer is saved first time
      if (userAnswers[currentQuestion] === null) {
        attempted++;
      }
    //   userAnswers[currentQuestion] = parseInt(selectedOption.value);
      // Update summary button style
      const qBtn = document.getElementById(`q-${currentQuestion}`);
      if (qBtn && !qBtn.classList.contains("bg-blue-300")) {
        qBtn.classList.add("bg-blue-300");
      }
      document.getElementById("attempted").textContent = `${Math.round((attempted / questions.length) * 100)}%`;
    //   localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      alert("Answer saved successfully!");
    } else {
      alert("Please select an answer before saving.");
    }
  }
  
  // Flag or unflag the current question
  function toggleFlag() {
    const qBtn = document.getElementById(`q-${currentQuestion}`);
    if (!qBtn) return;
    if (qBtn.classList.contains("bg-yellow-300")) {
      flagged = Math.max(0, flagged - 1);
      qBtn.classList.remove("bg-yellow-300");
    } else {
      flagged++;
      qBtn.classList.add("bg-yellow-300");
    }
    document.getElementById("flagged").textContent = flagged;
  }
  
  // Start the exam: setup UI and timer
  function startExam() {
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    document.getElementById("summary-section").classList.remove("hidden");
    document.querySelector(".border-t").classList.remove("hidden");
  
    loadQuestion(currentQuestion);
    generateSummary();
    startTimer();
  }
  
  // Timer functionality
  function startTimer() {
    const timerElement = document.getElementById("timer");
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
      } else {
        clearInterval(timerInterval);
        alert("Time's up!");
        finishExam();
      }
    }, 1000);
  }
  
  // Finish exam, calculate results, and display them
  function finishExam() {
    clearInterval(timerInterval);
    let correct = 0;
    let incorrect = 0;
    attempted = 0;
  
    userAnswers.forEach((ans, i) => {
      if (ans !== null) {
        attempted++;
        if (ans === questions[i].answer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
  
    // Optionally, check for unanswered questions
    const unanswered = questions.length - attempted;
    if (unanswered > 0) {
      const confirmFinish = confirm(`You have ${unanswered} unanswered question(s). Do you still want to finish?`);
      if (!confirmFinish) return;
    }
  
    // Hide exam interface and display results
    document.querySelector(".max-w-5xl").classList.add("hidden");
    const resultContainer = document.createElement("div");
    resultContainer.className = "max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg text-center mt-10";
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
    document.body.appendChild(resultContainer);
    // Disable further actions
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
  }
  
  // Update login time every second
  function updateLoginTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("login-time").textContent = `Login Time ${formattedTime} | GUEST`;
  }
  setInterval(updateLoginTime, 1000);
  updateLoginTime();
  
  // Profile picture upload and saving using localStorage
  document.addEventListener("DOMContentLoaded", () => {
    const profilePic = document.getElementById("profile-pic");
    const fileInput = document.getElementById("upload-profile");
  
    const savedImage = localStorage.getItem("profilePic");
    if (savedImage) {
      profilePic.src = savedImage;
    }
  
    profilePic.addEventListener("click", () => {
      if (profilePic.src.includes("placeholder.com")) {
        fileInput.click();
      } else {
        alert("Profile Picture already uploaded!");
      }
    });
  
    fileInput.addEventListener("change", event => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          profilePic.src = e.target.result;
          localStorage.setItem("profilePic", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  });
  
  // Navigation buttons event listeners
  document.getElementById("start-btn").addEventListener("click", startExam);
  document.getElementById("save-btn").addEventListener("click", saveAnswer);
  document.getElementById("flag-btn").addEventListener("click", toggleFlag);
  document.getElementById("finish-btn").addEventListener("click", finishExam);
  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
      loadQuestion(++currentQuestion);
    }
  });
  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestion > 0) {
      loadQuestion(--currentQuestion);
    }
  });
  document.getElementById("first-btn").addEventListener("click", () => {
    currentQuestion = 0;
    loadQuestion(currentQuestion);
  });
  document.getElementById("last-btn").addEventListener("click", () => {
    currentQuestion = questions.length - 1;
    loadQuestion(currentQuestion);
  });
  
  // On window load, restore saved answers if available
//   window.onload = () => {
//     const savedAnswers = localStorage.getItem("userAnswers");
//     if (savedAnswers) {
//       userAnswers = JSON.parse(savedAnswers);
//     }
//   };
  