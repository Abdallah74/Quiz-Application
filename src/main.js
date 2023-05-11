// Select Elements
const countSpan = document.querySelector(".count span"),
  bultsSpanContainer = document.querySelector(".bullets .spans"),
  quizArea = document.querySelector(".quiz-area"),
  answersArea = document.querySelector(".answers-area"),
  submit = document.querySelector(".submit"),
  bultsElement = document.querySelector(".bullets"),
  resultsContainer = document.querySelector(".results"),
  countDownSpan = document.querySelector(".countDown"),
  htmlBtn = document.getElementById("html"),
  cssBtn = document.getElementById("css"),
  jsBtn = document.getElementById("js"),
  quizInfo = document.querySelector(".quiz-app .quiz-info .category");

// Set Options
let currentIndex = 0,
  rightAns = 0,
  countDownInterval;

function getQ() {
  const htmlRequest = new XMLHttpRequest();
  const cssRequest = new XMLHttpRequest();
  const jsRequest = new XMLHttpRequest();

  htmlRequest.onreadystatechange = function () {
    reloadPage();
    htmlBtn.onclick = () => {
      htmlBtn.style.cssText =
        "pointer-events: none;background-color:#0075ff;color:#fff;";
      cssBtn.remove();
      jsBtn.remove();
      if (this.readyState === 4 && this.status === 200) {
        const htmlQ = JSON.parse(this.responseText);
        const qcount = htmlQ.length;
        // Create Bullets + Set Question Count
        createBullts(qcount);
        // Add Question Data
        addQuestionData(htmlQ[currentIndex], qcount);
        // Count Down
        countDown(20, qcount);
        // Click On Submit
        submit.addEventListener("click", () => {
          // Get Right Answer
          const ans = htmlQ[currentIndex].answer;
          // Increase Index
          currentIndex++;
          // Check The Answer
          checkAnswer(ans, qcount);
          // Remove Previous Queston
          quizArea.innerHTML = "";
          answersArea.innerHTML = "";
          // Add Question Data
          addQuestionData(htmlQ[currentIndex], qcount);
          // Hndel Active Bults Class
          handelBults();
          // Start CountDown
          clearInterval(countDownInterval);
          countDown(20, qcount);
          // Show Results
          showResults(qcount);
        });
      }
    };
  };

  cssRequest.onreadystatechange = function () {
    cssBtn.onclick = () => {
      cssBtn.style.cssText =
        "pointer-events: none;background-color:#0075ff;color:#fff;";
      htmlBtn.remove();
      jsBtn.remove();
      if (this.readyState === 4 && this.status === 200) {
        const cssQ = JSON.parse(this.responseText);
        const qcount = cssQ.length;
        // Create Bullets + Set Question Count
        createBullts(qcount);
        // Add Question Data
        addQuestionData(cssQ[currentIndex], qcount);
        // Count Down
        countDown(20, qcount);
        // Click On Submit
        submit.addEventListener("click", () => {
          // Get Right Answer
          const ans = cssQ[currentIndex].answer;
          // Increase Index
          currentIndex++;
          // Check The Answer
          checkAnswer(ans, qcount);
          // Remove Previous Queston
          quizArea.innerHTML = "";
          answersArea.innerHTML = "";
          // Add Question Data
          addQuestionData(cssQ[currentIndex], qcount);
          // Hndel Active Bults Class
          handelBults();
          // Start CountDown
          clearInterval(countDownInterval);
          countDown(20, qcount);
          // Show Results
          showResults(qcount);
        });
      }
    };
  };

  jsRequest.onreadystatechange = function () {
    jsBtn.onclick = () => {
      jsBtn.style.cssText =
        "pointer-events: none;background-color:#0075ff;color:#fff;";
      htmlBtn.remove();
      cssBtn.remove();
      if (this.readyState === 4 && this.status === 200) {
        const jsQ = JSON.parse(this.responseText);
        const qcount = jsQ.length;
        // Create Bullets + Set Question Count
        createBullts(qcount);
        // Add Question Data
        addQuestionData(jsQ[currentIndex], qcount);
        // Count Down
        countDown(20, qcount);
        // Click On Submit
        submit.addEventListener("click", () => {
          // Get Right Answer
          const ans = jsQ[currentIndex].answer;
          // Increase Index
          currentIndex++;
          // Check The Answer
          checkAnswer(ans, qcount);
          // Remove Previous Queston
          quizArea.innerHTML = "";
          answersArea.innerHTML = "";
          // Add Question Data
          addQuestionData(jsQ[currentIndex], qcount);
          // Hndel Active Bults Class
          handelBults();
          // Start CountDown
          clearInterval(countDownInterval);
          countDown(20, qcount);
          // Show Results
          showResults(qcount);
        });
      }
    };
  };

  htmlRequest.open("GET", "./src/html_Questions.json", true);
  cssRequest.open("GET", "./src/css_Questions.json", true);
  jsRequest.open("GET", "./src/js_Questions.json", true);
  htmlRequest.send();
  cssRequest.send();
  jsRequest.send();

  function reloadPage() {
    const reload = document.getElementById("reloadBtn");
    reload.onclick = () => {
      location.reload();
    };
  }
}

getQ();

function createBullts(num) {
  countSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    const span = document.createElement("span");
    if (i === 0) {
      span.className = "on";
    }
    bultsSpanContainer.appendChild(span);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // create H2 Question Title
    const titles = document.createElement("h2");
    // Create Question Txt
    const qTxt = document.createTextNode(obj["question"]);
    // Append Txt To H2
    titles.appendChild(qTxt);
    // Append Title To Quiz Area
    quizArea.appendChild(titles);
    // Create The Answers
    for (let i = 0; i <= 3; i++) {
      // Create Main Answer Div
      const mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      // Create Radio Input
      const input = document.createElement("input");
      // Get Answers From Array
      const object = new Array(obj.options[i]);
      for (let j = 0; j < object.length; j++) {
        // Add Type + Name + Id + Data-Attribute
        input.name = "question";
        input.type = "radio";
        input.id = `answer_${i}`;
        input.dataset.answer = object[j];
        // Make 1st Input Checked
        // if (i === 0) {
        //   input.checked = true;
        // }
        // Create Label
        const label = document.createElement("label");
        // Add Attribute
        label.htmlFor = `answer_${i}`;
        // Create Label Txt
        const labelTxt = document.createTextNode(object[j]);
        // Append Label Txt To The Label
        label.appendChild(labelTxt);
        // Append Input + Label To Main Div
        mainDiv.appendChild(input);
        mainDiv.appendChild(label);
        // Append All Divs To Answers Area
        answersArea.appendChild(mainDiv);
      }
    }
  }
}

function checkAnswer(rAnswer, _count) {
  const answers = document.getElementsByName("question");
  let chosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === chosenAnswer) {
    rightAns++;
  }
}

function handelBults() {
  const bulletsSpans = document.querySelectorAll(".bullets .spans span");
  const bulletsArr = Array.from(bulletsSpans);
  bulletsArr.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let results;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submit.remove();
    bultsElement.remove();
    if (rightAns > count / 2 && rightAns < count) {
      results = `<span class="perfect"><i class="fa-solid fa-circle-check"></i> Perfect</span>, All Answers Is Complete`;
    } else if (rightAns === count) {
      results = `<span class="good">good</span>, ${rightAns} From ${count}`;
    } else {
      results = `<span class="bad"><i class="fa-solid fa-circle-xmark"></i> Bad</span>, ${rightAns} From ${count}`;
    }
    resultsContainer.innerHTML = results;
  }
}

function countDown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countDownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countDownSpan.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        submit.click();
      }
    }, 1000);
  }
}
