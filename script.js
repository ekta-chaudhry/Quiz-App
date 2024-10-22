import quizData from './data.js';

let questionId = 0;
let result = 0;

document.getElementById('ready-button').addEventListener('click', displayQuestion);

function displayQuestion() {
    if(questionId >= quizData.length) {
        displayResult();
        return;
    }
    const mainDiv = document.getElementById('main-div');
    mainDiv.innerHTML = '';

    const questionHeading = document.createElement('h2');
    questionHeading.innerText = quizData[questionId]["question"];
    questionHeading.setAttribute('class', 'heading');
    mainDiv.appendChild(questionHeading);

    let chars = ['a', 'b', 'c', 'd'];
    for(let i = 0; i < 4; i++) {
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.setAttribute('class', 'radio-button');
        radioButton.setAttribute('name', 'selectRadio');
        radioButton.setAttribute('value', quizData[questionId][chars[i]]);
        radioButton.setAttribute('id', `rb${i}`);

        const label = document.createElement('label');
        label.setAttribute('for', `rb${i}`);
        label.setAttribute('class', 'option-label');
        label.innerHTML = quizData[questionId][chars[i]] + "<br>";
        mainDiv.appendChild(radioButton);
        mainDiv.appendChild(label);
    }

    const submitDiv = document.createElement('div');
    submitDiv.setAttribute('class', 'ready-div');
    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Submit';
    submitBtn.setAttribute('class', 'submit-button');
    submitBtn.addEventListener('click', checkAnswer);
    submitDiv.appendChild(submitBtn);
    mainDiv.appendChild(submitDiv);
}

function checkAnswer() {
    const radioButtons = document.querySelectorAll('input[name="selectRadio"]');
    let selectedValue = '';
    for(const radioButton of radioButtons) {
        if(radioButton.checked) {
            selectedValue = radioButton.value;
            break;
        }
    }

    if(selectedValue == '') {
        alert('Please select one option!');
        return;
    }

    let correctValue = quizData[questionId][quizData[questionId]["correct"]];
    if(selectedValue == correctValue) {
        result++;
    }
    questionId++;
    displayQuestion();
}
function displayResult() {
    questionId = 0;
    const mainDiv = document.getElementById('main-div');
    mainDiv.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.innerText = `You got ${result}/${quizData.length} correct!`;
    h2.setAttribute('class', 'heading');
    result = 0;
    mainDiv.appendChild(h2);

    const submitDiv = document.createElement('div');
    submitDiv.setAttribute('class', 'ready-div');
    const reloadBtn = document.createElement('button');
    reloadBtn.innerText = "Reload?";
    reloadBtn.setAttribute('class', 'submit-button');
    reloadBtn.addEventListener('click', displayQuestion);
    submitDiv.appendChild(reloadBtn);
    mainDiv.appendChild(submitDiv);
}