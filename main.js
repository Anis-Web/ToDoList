let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// Empty Array To Store The Tasks
let arrayOfTasks = [];
// Check If there is Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// trigger Get Data From Local Storage Function
getDataFromLocalStorage();
// Add Tasks 
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task to Array Of Tasks
        input.value = ""; // Empty Input Field
    }
}

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove ELement From Page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed Of The Tasks
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggel Done Class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("Div");
        div.className = "task";
        // Check If Tasks is Done
        if (task.completed === true) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Div
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}