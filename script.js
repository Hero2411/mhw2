/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function onClick(event) {

  const choice = event.currentTarget;
  const questionId = choice.dataset.questionId;

  for (let risposta of selezione) {
    if (risposta.dataset.questionId === questionId) {
      selezione.pop(risposta);
      risposta.classList.add('not-chosen');
      risposta.classList.remove('chosen');
      risposta.querySelectorAll('img')[1].src = "images/unchecked.png";
      break
    }
  }

  if (choice.classList.contains('not-chosen')) {
    selezione.push(choice);
    choice.classList.remove('not-chosen');
    choice.classList.add('chosen');
    choice.querySelectorAll('img')[1].src = "images/checked.png";
  }
  if (selezione.length === 3) {
    for (let risposta of risposte) {
      risposta.removeEventListener('click', onClick);
    }
    let points = {}
    for(let sel of selezione) {
      let data = sel.dataset.choiceId
      if (data in points) {
        points[data]+=1
      } 
      else {
        points[data] = 1
      }
    }
    if (Object.keys(points).length === 3) {
      var data = RESULTS_MAP[Object.keys(points)[0]]
    }
    else {
      for(var key in points) {
        if (points[key] >= 2) {
          var data = RESULTS_MAP[key]
          break
        }
      }
    }
    ris.querySelector("h1").innerHTML = data.title
    ris.querySelector("p").innerHTML = data.contents
    ris.classList.remove('hidden');
  }
}

function init() {
  for (let risposta of risposte) {
    risposta.addEventListener('click', onClick);
    risposta.classList.add('not-chosen');
    risposta.classList.remove('chosen');
    risposta.querySelectorAll('img')[1].src = "images/unchecked.png";
  }
  selezione = []
  ris.classList.add('hidden');
}

const ris = document.querySelector('#result');
const risposte = document.querySelectorAll('.choice-grid div');
var selezione = [];
init()