window.onload = () => {
  
  console.log("ok");
  
  const generateTaskId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

  const newTaskForm = document.getElementById("newTaskForm");
  newTaskForm.addEventListener("submit", (e)=>{
    
    e.preventDefault();
  
    const newTaskName = document.getElementById("newTaskInput").value;
    if (newTaskName) {
      const taskId = generateTaskId();
      document.getElementById("newTaskInput").value = "";
      addTask(newTaskName, taskId);
    }
    else {
      alert("please enter the task!");
    }
    
  });

  const addTask = (newTaskName, taskId) => {

    let taskList = document.getElementById("taskList");
    const html =
      `<div class="task" id="${taskId}">
          
          <div class="content">
            <input class="check" name="checkbox" type="checkbox" id="taskStatus">
            <input type="text" class="taskName" value="${newTaskName}" readonly>
          </div>
          <div class="actions">
            <button class="editTask" data-event="edit">EDIT</button>
            <button class="deleteTask">DELETE</button>
          </div>
        </div>`;
    taskList.insertAdjacentHTML('beforeend', html);

    const checkbox = document.querySelector(`#${taskId} input[type=checkbox]`);
    checkbox.addEventListener('change', (event) => {
      // console.log(event.target);
      const inputbox = document.querySelector(`#${taskId} input[type=text]`);
      console.log(inputbox.value);
      if (event.target.checked) {
        console.log("Checkbox is checked..");
        inputbox.classList.add("taskCompleted");

      } else {
        console.log("Checkbox is not checked..");
        inputbox.classList.remove("taskCompleted");
      }    
    });

    // Edit Button Implementation
    const editButton = document.querySelector(`#${taskId} button[data-event=edit]`);
    editButton.addEventListener("click", editHandler)

    // Delete Button Implementation
    const deleteButton = document.getElementById(taskId).children[1].children[1];
    deleteButton.addEventListener("click", (deleteEvent) => {
      const child = document.getElementById(taskId);
      taskList.removeChild(child);
    })
  };
  const editHandler = (editEvent) => {
    const editButton = editEvent.target;
    const inputBox = editButton.parentElement.parentElement.querySelector("input[type=text]");

    if (editButton.innerHTML === "EDIT") {
      editButton.innerHTML = "SAVE";
      inputBox.removeAttribute("readonly");
      const end = inputBox.value.length;
      //  Move focus to END of input field
      inputBox.setSelectionRange(end, end);
      inputBox.focus();
      inputBox.addEventListener('keypress', function (keyPressEvent) {
        if (keyPressEvent.key === 'Enter' && editButton.innerHTML == "SAVE") {
          // code for enter
          inputBox.setAttribute("readonly", true);
          editButton.innerHTML = "EDIT";
        }
      });
    }
    else {
      inputBox.setAttribute("readonly", true);
      editButton.innerHTML = "EDIT";
    }
    
  }



  (async function() {
    // const data = (await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json())).slice(0, 5);
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = (await response.json()).slice(0, 5);
  // .then(jsonArray => jsonArray);

    // let data = jsonArray.slice(0,5);
  console.log(data);
  data.forEach(element => {
    element.id = generateTaskId();
    addTask(element.title, element.id);
  });
  
  })();

};

