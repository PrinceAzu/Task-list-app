// UI Variables
let myTasks = [];
const form = document.querySelector("#task-form");
const inputEl = document.querySelector("#input-el")
const addBtn = document.querySelector("#add-btn");
const ulEl = document.querySelector("#ul-el")
const clearBtn = document.querySelector("#clear-btn");
const deleteBtn = document.querySelector(".delete-item")
const li = document.querySelector("#todo-item")


// ---------------------------------------------------------------

const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.getElementById("gradient");

//Tasks from local storage
let tasksFromLs = JSON.parse(localStorage.getItem("myTasks"));

if (tasksFromLs) {
    myTasks = tasksFromLs;
    render(myTasks);
}

// Render UI
function render(tasks) {
    let tasksItems = "";
    for (let i = 0; i < tasks.length; i++) {

        // create li element
        tasksItems += `
        <li class="todo-item" id="todo-item">
            ${tasks[i]}<i class="fas fa-window-close delete-item"></i>
        </li>
    `
    }
    ulEl.innerHTML = tasksItems;
}

// Clear All
function clearAll() {
    localStorage.clear();
    myTasks = [];
    render(myTasks);
}
clearBtn.addEventListener("click", clearAll)

// Add task
function addTask() {
    if (inputEl.value === "") {
        alert("Add a task");
    }
    myTasks.push(inputEl.value);
    inputEl.value = "";
    //Local storage
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    render(myTasks)
}
addBtn.addEventListener("click", addTask);

// Delete task
function deleteTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        remove(li)
    }
}
deleteBtn.addEventListener("click", deleteTask)

// Set background
const setGradient = () => {
    body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
    css.textContent = body.style.background + ";"
}
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);





// "Go to the bank", "See the doctor by 12 noon", "Go to the market and purchase a new fan"



