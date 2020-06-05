const plus = document.querySelector('h1, i');
const addBtn = document.querySelector('.add-todo');
const listItem = document.querySelector('ul');
const textInput = document.querySelector('input[type="text"]');
const toDos = JSON.parse(localStorage.getItem('toDos')) || [];

function addToDo(e){
  // prevent page from refreshing
  e.preventDefault();
  // get value from text input
  const text = textInput.value;
  // create object from input
  const todo = {
    text: text,
    done: false
  }
  // push into toDos array
  toDos.push(todo);
  // populate to-do-list
  populateToDos();
  // save list to local localStorage
  localStorage.setItem('toDos', JSON.stringify(toDos));
  // reset input box
  this.reset();
}

function populateToDos(){
  // check if done (strikethrough) then create element
  listItem.innerHTML = toDos.map(function (todo) {
    if(!todo.done){
      return `<li><span><i class="fa fa-trash fa-lg"></i></span>${todo.text}</li>`;
    } else {
      return `<li class="complete"><span><i class="fa fa-trash fa-lg"></i></span>${todo.text}</li>`;
    }
  }).join('');
}

function deleteToDo(e){
  // CSS fadeout deleted todo
  const fade = e.target.parentNode.parentElement.classList.add('deleted');
  // get textContent of todo
  const deleted = e.target.parentNode.parentElement.textContent;
  // find index of deleted todo
  let index = toDos.findIndex(todo => todo.text === deleted);
  // use index to splice array
  toDos.splice(index, 1);
  // save to localStorage
  localStorage.setItem('toDos', JSON.stringify(toDos));
  // timeout repopulating ToDo list for the above fadeout feature to take effect
  setTimeout(function(){
      populateToDos();
  }, 200)
}

function complete(e){
  // get textContent
  const strike = e.target.textContent;
  // index of item clicked
  let index = toDos.findIndex(todo => todo.text === strike);
  // check done or !done, toggle done, save to localStorage
  if(toDos[index].done === false){
    toDos[index].done = true;
    localStorage.setItem('toDos', JSON.stringify(toDos));
  } else {
    toDos[index].done = false;
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }
  populateToDos();
}

function dropDown(){
  // toggle class visually hidden
  textInput.classList.toggle('visuallyhidden');
  // set time to appear fading away
  setTimeout(function(){
    textInput.classList.toggle('hidden');
  },100);
}

// hit enter add toDo
addBtn.addEventListener('submit', addToDo);

// check if + was clicked
plus.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains("fa-plus")){
    dropDown();
  } else {
    return;
  }
  });

// check if trash can or item was clicked
listItem.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains("fa-trash")){
    deleteToDo(e);
  }
  if(e.target && e.target.nodeName == "LI"){
    complete(e);
  }
  else { return;}
});

// populate list from localStorage or start new
populateToDos();
