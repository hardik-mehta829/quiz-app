let selectedvalue = '';
let checkboxes = [];
const submitButton = document.querySelector('.answer');
const nextButton = document.querySelector('.next');
const evaluatedDiv = document.querySelector('.evaluated');
const startbtn = document.querySelector('.start');
const quiz = document.querySelector('.quiz');
const allOptions = document.querySelector('.options');
const Myscore = document.querySelector('.score');
const questionHeading = document.querySelector('.question h3');
let questionNumber = 1;
let score = 0;
let data;
let selectedValue;
let result,
  submitted = false;
startbtn.addEventListener('click', async () => {
  startbtn.classList.add('hidden');

  score = 0;
  questionNumber = 1;
  selectedValue = null;
  submitted = false;
  const scorecard = document.querySelector('.scorecard');
  if (scorecard) {
    document.body.removeChild(scorecard);
  }
  const res = await fetch(`/api/v1/quiz/question/${questionNumber}`);
  data = await res.json();
  console.log(data);

  Myscore.textContent = `${score}`;
  questionHeading.textContent = `Q.${questionNumber} ] ${data.question}?`;
  data.options.forEach((x) => {
    const ind = document.createElement('span');
    ind.textContent = x.option;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = x.option; // Use a unique identifier for the checkbox
    checkbox.value = x.option; // Set checkbox value

    // Create label for the checkbox
    const label = document.createElement('label');
    label.htmlFor = x.option; // Associate label with checkbox
    label.textContent = x.text; // Set label text

    // Create line break element for spacing
    const br = document.createElement('br');

    // Append checkbox, label, and line break to the .question div
    allOptions.appendChild(ind);
    allOptions.appendChild(checkbox);
    allOptions.appendChild(label);
    allOptions.appendChild(br);
  });
  quiz.classList.remove('hidden');
  checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // Uncheck all other checkboxes when one is selected
      checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    });
  });
});

submitButton.addEventListener('click', async () => {
  if (submitted) {
    alert('The answer can be submitted only once move to next question');
    return;
  }
  const selectedCheckbox = document.querySelector(
    'input[type="checkbox"]:checked'
  );
  if (!selectedCheckbox) {
    alert('Select one option');
    return;
  }
  selectedValue = selectedCheckbox.value;
  submitted = true;
  console.log('Selected value:', selectedValue);
  const res = await fetch(`/api/v1/quiz/answer/${questionNumber}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ myanswer: selectedValue }),
  });
  console.log(res);
  result = await res.json();
  console.log(result);
  if (result.result === 'Correct Answer') {
    score++;
    Myscore.textContent = `${score}`;
  }
  console.log(score);
  // Display the selected answer (you can update your UI as needed)
  const htmlContent = `
        <h4>${result.result}</h4>
        <span>Your Answer : ${selectedValue}</span><br />
        <span>Correct Answer :${data.correctanswer} </span>
      `;

  // Update the content of the evaluatedDiv with the constructed HTML
  evaluatedDiv.innerHTML = htmlContent;
});
nextButton.addEventListener('click', async () => {
  if (!submitted) {
    alert('Cick on submit first');
    return;
  }
  if (!selectedValue) {
    alert('You cannot leave the question');
    return;
  }
  evaluatedDiv.innerHTML = '';
  console.log(checkboxes);
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  questionNumber++;
  if (questionNumber === 16) {
    quiz.classList.add('hidden');
    const scorecard = document.createElement('div');
    scorecard.className = 'scorecard';
    const totalQuestions = document.createElement('h1');
    totalQuestions.textContent = 'Total Questions : 15';
    const correctQuestions = document.createElement('h1');
    correctQuestions.textContent = `Correct Answers : ${score}`;
    const incorrectQuestions = document.createElement('h1');
    incorrectQuestions.textContent = `Incorret Answers : ${15 - score}`;
    scorecard.appendChild(totalQuestions);
    scorecard.appendChild(correctQuestions);
    scorecard.appendChild(incorrectQuestions);

    allOptions.innerHTML = '';

    document.body.appendChild(scorecard);
    startbtn.classList.remove('hidden');
    startbtn.textContent = 'restart';
    selectedValue = null;
    submitted = false;
    return;
  }
  allOptions.innerHTML = '';
  selectedValue = null;
  submitted = false;
  const res = await fetch(`/api/v1/quiz/question/${questionNumber}`);
  data = await res.json();
  console.log(data);

  questionHeading.textContent = `Q.${questionNumber} ] ${data.question}?`;
  data.options.forEach((x) => {
    const ind = document.createElement('span');
    ind.textContent = x.option;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = x.option; // Use a unique identifier for the checkbox
    checkbox.value = x.option; // Set checkbox value

    // Create label for the checkbox
    const label = document.createElement('label');
    label.htmlFor = x.option; // Associate label with checkbox
    label.textContent = x.text; // Set label text

    // Create line break element for spacing
    const br = document.createElement('br');

    // Append checkbox, label, and line break to the .question div
    allOptions.appendChild(ind);
    allOptions.appendChild(checkbox);
    allOptions.appendChild(label);
    allOptions.appendChild(br);
  });
  checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      // Uncheck all other checkboxes when one is selected
      checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    });
  });
});
