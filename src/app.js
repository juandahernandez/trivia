//https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple

let triviaFormulario = document.getElementById("trivia");
let container = document.getElementById("container_preguntas");
var form = document.getElementById("form");
var answ = document.getElementById("cont-answer");


var position = 0;
var score = 0;
var dataQuestion = [];



const fetchDatosAPI = () => {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let difficulty = document.getElementById("difficulty").value;
  let type = document.getElementById("type").value;
  fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
  )
    .then((res) => res.json())
    .then((data) => {
      dataQuestion = data;
      if (type === "boolean") {
        container.innerHTML = printQuestionBoolean(dataQuestion.results);
      } else {
        container.innerHTML = printQuestion(dataQuestion.results);
      }
      console.log(dataQuestion.results);
    });
};



const nextQuestion = () => {
  let type = document.getElementById("type").value;
  getInputsValue();
  position += 1;
  if (position > dataQuestion.results.length - 1) {
    return (container.innerHTML = `<div class="score">
                                      <h1 class="score-title">you score = ${score}</h1>
                                      <button><a href="./index.html">Play again<a></button>
                                    </div>`);
  }
  if (type === "boolean") {
    container.innerHTML = printQuestionBoolean(dataQuestion.results);
  } else {
    container.innerHTML = printQuestion(dataQuestion.results);
  }
};

const desorderArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};



const printQuestion = (question) => {
  form.style.display = "none";
  answ.style.display = "flex";
  const array = question[position].incorrect_answers;
  array.push(question[position].correct_answer);
  const newArray = desorderArray(array);

  return `<form class="form-answer" onsubmit="nextQuestion()">
              <h3>${question[position].question}</h3>
              <label>
                <input type="radio" name="answer" value=${newArray[0]} required >${newArray[0]}
               </label>
              <label>
                <input type="radio" name="answer" value=${newArray[1]} >${newArray[1]} 
              </label>
              <label>
                <input type="radio" name="answer" value=${newArray[2]}>${newArray[2]} 
              </label>
              <label>
                <input type="radio" name="answer" value=${newArray[3]}>${newArray[3]} 
              </label>
              <button type="submit">NEXT</button>           
          </form>`;
};



const printQuestionBoolean = (question) => {
  form.style.display = "none";
  answ.style.display = "flex";
  const array = question[position].incorrect_answers;
  array.push(question[position].correct_answer);
  const newArray = array;

  return `<form class="form-answer" onsubmit="nextQuestion()">
              <h3>${question[position].question}</h3>
              <label>
                <input type="radio" name="answer" value=${newArray[0]} required >${newArray[0]}
               </label>
              <label>
                <input type="radio" name="answer" value=${newArray[1]} >${newArray[1]} 
              </label>
              <button type="submit">NEXT</button>           
          </form>`;
};



function getInputsValue() {
  let answerInput = document.getElementsByTagName("input");
  answerInput = Array.from(answerInput);
  answerInput.map((element) => {
    if (element.checked) {
      if (element.value === dataQuestion.results[position].correct_answer) {
        score = score + 10;
      }
    }
  });
}
