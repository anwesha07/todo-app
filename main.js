const generateTaskId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const editHandler = (editEvent) => {
  const editButton = editEvent.target;
  const inputBox = editButton.parentElement.parentElement.querySelector("input");

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

const newTaskForm = document.getElementById("newTaskForm");

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTaskName = document.getElementById("newTaskInput").value;
  if (newTaskName) {
    const taskId = generateTaskId();
    let taskList = document.getElementById("taskList");
    const html =
      `<div class="task" id=${taskId}>
          <div class="content">
            <input type="text" class="taskName" value="${newTaskName}" readonly>
          </div>
          <div class="actions">
            <button class="editTask">EDIT</button>
            <button class="deleteTask">DELETE</button>
          </div>
        </div>`;
    taskList.insertAdjacentHTML('beforeend', html);
    document.getElementById("newTaskInput").value = "";
    
    // Edit Button Implementation
    const editButton = document.getElementById(taskId).children[1].children[0];
    editButton.addEventListener("click", editHandler)

    // Delete Button Implementation
    const deleteButton = document.getElementById(taskId).children[1].children[1];
    deleteButton.addEventListener("click", (deleteEvent) => {
      const child = document.getElementById(taskId);
      taskList.removeChild(child);
    })
    
  
    // let task = document.createElement("div");
    // task.classList.add("task");


    // let content = document.createElement("div");
    // content.className = "content";
    // let taskContentValue = document.createElement("input");
    // taskContentValue.className = "taskName";
    // taskContentValue.value = taskName;
    // taskContentValue.setAttribute("readonly", true);
    // content.appendChild(taskContentValue);

    // let actions = document.createElement("div");
    // actions.className = "actions";
    // let editButton = document.createElement("button");
    // editButton.className = "editTask";
    // editButton.innerHTML = "EDIT";
    // let delButton = document.createElement("button");
    // delButton.innerHTML = "DELETE";
    // delButton.className = "deleteTask";

    // actions.appendChild(editButton);
    // actions.appendChild(delButton);



    // task.appendChild(content);
    // task.appendChild(actions);
    // taskList.appendChild(task);


  }
  else {
    alert("please enter the task!");
  }

});

