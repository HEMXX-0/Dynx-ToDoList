let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${task.text}</span>
            <div class="action-buttons">
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return alert("Enter a task");

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();

    input.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function filterTasks(type) {
    renderTasks(type);
}

// Load tasks on page start
renderTasks();
