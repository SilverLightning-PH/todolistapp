document.addEventListener("DOMContentLoaded", () => {
  const storedTask = JSON.parse(localStorage.getItem("task"));

  if(storedTask) {
    storedTask.forEach((task) => task.push(task))
    updateTaskList();
    updateStats();
  }
})

let task = [];

const saveTask = () => {
  localStorage.setItem(task, JSON.stringify(task)) 
}

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    task.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTask();
  }
};

const toggleTaskComplete = (index) => {
  task[index].completed = !task[index].completed;
  updateTaskList();
  updateStats();
  saveTask();
};

const deleteTask = (index) => {
  task.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = task[index].text;

  task.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
}

const updateStats = () => {
  const completedTask = task.filter(task => task.completed).length;
  const totalTask = task.length;
  const progress = (completedTask / totalTask ) * 100;
  const progressBar = document.getElementById("progress")

  progressBar.style.width = `${progress}%`
  document.getElementById("numbers").innerText = `${completedTask} / ${totalTask}`;

  if (task.length && completedTask === totalTask) {
    blastConfetti ();
  }
}


const updateTaskList = () => {
  const taskList = document.getElementById("task-list")
  taskList.innerHTML = "";

  task.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div class="taskItem">
        <div class="task ${task.completed ? "completed": ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : "" }/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./image/pencil-square.png" onClick="editTask(${index})">
          <img src="./image/trash.png" onClick="deleteTask(${index})">
        </div>
    </div> 
    `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);

  });

};

document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();

    addTask ();
})

// ***Confettie Decoration*** //

const blastConfetti = () => {
  const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["circle", "square"],
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}