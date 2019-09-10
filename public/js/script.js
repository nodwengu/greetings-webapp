let data = [
  {
    name: 'Create a landing page',
    description: 'landing page should show...',
    status: 'Todo',
    time: '12:00',
    date: '21-05-2015',
    id: 1
  }
]


let addBtnElem = document.querySelector('#addBtn');
let startTaskElem = document.querySelector('.todo-tasks');
let finishTaskElem = document.querySelector('.doing-tasks');

// if(localStorage.getItem('todoTasks')) {
//    var todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
//    let todoList = { todoTasks }
//    createHTML(todoList)
// } else {
//    todoTasks = []
// }

// if(localStorage.getItem('doingTasks')) {
//    var doingTasks = JSON.parse(localStorage.getItem('doingTasks'));
//    let doingList = { doingTasks }
//    createDoingHTML(doingList)
// } else {
//    doingTasks = []
// }
//console.log(doingTasks)
const createTaskInstance = createTask(data);

if (data) {
  createHTML({data})
}

function storeTask() {
  let name = document.querySelector('#name').value;
  let description = document.querySelector('#description').value;
  let status = document.querySelector('#status').value;
  let time = document.querySelector('#time').value;
  let date = document.querySelector('#date').value;

  createTaskInstance.setTask(name, description, status, time, date);

  let data = createTaskInstance.getTodoList();

  createHTML({data})
}

function startTask(evt) {
  let doingTasks = createTaskInstance.getDoingList();
  if (evt.target.id) {
    data.forEach(item => {
      if (item.id == evt.target.id) {
        if(doingTasks.length <= 0) {
          item.status = "Doing";

          let index = data.findIndex( obj => {
            return obj.id === evt.target.id;
          })
          data.splice(index, 1);
          createHTML({data})
        }

        createTaskInstance.setDoingList(item);

        createDoingHTML({doingTasks})
      }
    });
    
  }
  //console.log(data);
}

 function finishTask(evt) {
  let doneTasks = createTaskInstance.getDoneList()

  if (evt.target.id) {
    let doingTasks = createTaskInstance.getDoingList()
  
    doingTasks.forEach(item => {
      if (item.id == evt.target.id) {
        item.status = "Done";
      
        createTaskInstance.setDoneList(item);
       
        createDoneHTML({doneTasks})

        let index = doingTasks.findIndex(function(obj){
          return obj.id === evt.target.id;
        })
        doingTasks.splice(index, 1);
        createDoingHTML({doneTasks})
      }
    });
  }

  console.log(createTaskInstance.getDoneList());
 }

function createHTML(tasks) {

  let rawTemplate = document.querySelector('.taskTemplate').innerHTML;
  let compiledTemplate = Handlebars.compile(rawTemplate);
  let ourGeneratedHTML = compiledTemplate(tasks);

  let cartItemsElem = document.querySelector('.todo-tasks');
  cartItemsElem.innerHTML = ourGeneratedHTML;
}

function createDoingHTML(tasks) {
  let rawTemplate = document.querySelector('.doingTaskTemplate').innerHTML;
  let compiledTemplate = Handlebars.compile(rawTemplate);
  let ourGeneratedHTML = compiledTemplate(tasks);

  let cartItemsElem = document.querySelector('.doing-tasks');
  cartItemsElem.innerHTML = ourGeneratedHTML;
}

function createDoneHTML(tasks) {
  let rawTemplate = document.querySelector('.doneTaskTemplate').innerHTML;
  let compiledTemplate = Handlebars.compile(rawTemplate);
  let ourGeneratedHTML = compiledTemplate(tasks);

  let cartItemsElem = document.querySelector('.done-tasks');
  cartItemsElem.innerHTML = ourGeneratedHTML;
}


addBtnElem.addEventListener('click', storeTask);

startTaskElem.addEventListener('click', startTask);

finishTaskElem.addEventListener('click', finishTask);

finishTask
