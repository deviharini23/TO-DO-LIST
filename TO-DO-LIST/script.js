let taskList = [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");

    const content = document.createElement("div");
    content.className = `task-content ${task.completed ? 'completed' : ''}`;
    content.innerHTML = `<strong>${task.title}</strong><br><small>${task.datetime}</small>`;

    const controls = document.createElement("div");
    controls.className = "task-controls";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    controls.appendChild(completeBtn);
    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);

    li.appendChild(content);
    li.appendChild(controls);
    list.appendChild(li);
  });
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const datetime = document.getElementById("taskDateTime").value;

  if (!title || !datetime) {
    alert("Please enter both task and date/time!");
    return;
  }

  taskList.push({ title, datetime, completed: false });
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDateTime").value = "";

  renderTasks();
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  renderTasks();
}

function editTask(index) {
  const newTitle = prompt("Edit Task Title", taskList[index].title);
  const newDateTime = prompt("Edit Task Date & Time", taskList[index].datetime);

  if (newTitle && newDateTime) {
    taskList[index].title = newTitle;
    taskList[index].datetime = newDateTime;
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskList.splice(index, 1);
    renderTasks();
  }
}

// Initial render
renderTasks();
