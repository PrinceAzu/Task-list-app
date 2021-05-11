// UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".list-group");
const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");

const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const body = document.getElementById("gradient");

// FUNCTIONS & EVENTS

//get tasks
const getTasks = () => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
    // create li element
    const li = document.createElement("li");

    // Add class
    li.classList.add("list-group-item", "d-flex", "justify-content-between");

    // Create text Node and append to li
    li.appendChild(document.createTextNode(task));


    // Creae new link Element
    const link = document.createElement("a");

    // Add class
    link.className = "delete-item";

    // Add icon
    link.innerHTML = "<i class='fas fa-window-close'></i>";

    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    })

}

// add task
const addTask = (e) => {
    if (taskInput.value === "") {
        alert("Add a task");
    }

    // create li element
    const li = document.createElement("li");

    // Add class
    li.classList.add("list-group-item", "d-flex", "justify-content-between");

    // Create text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));


    // Creae new link Element
    const link = document.createElement("a");

    // Add class
    link.className = "delete-item";

    // Add icon
    link.innerHTML = "<i class='fas fa-window-close'></i>";

    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //store in LS
    storeTaskInLs(taskInput.value);

    //Clear input
    taskInput.value = "";

    e.preventDefault();
}

// store task
const storeTaskInLs = (task) => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
const removeTask = (e) => {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove();

            //remove from LS
            removeTaskFromLS(e.target.parentElement.parentElement);

        }
    }   
}

// remove from LS
const removeTaskFromLS = (taskItem) => {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
const clearTasks = () => {
    taskList.innerHTML = "";

    //clear from LS
    clearTasksFromLS();
}

const clearTasksFromLS = () => {
    localStorage.clear();
}

//filter tasks
const filterTasks = (e) => {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".list-group-item").forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display ="none";
        }
    });
}

// set background
const setGradient = () => {
    body.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";
    css.textContent = body.style.background + ";"
}

// event listeners
const loadEventListeners = () => {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);

    color1.addEventListener("input", setGradient);
    color2.addEventListener("input", setGradient);
}



// LOAD ALL EVENT LISTENERS
loadEventListeners();

