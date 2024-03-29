// Function to change background color based on button clicked
function changeBackgroundColor(colorClass) {
    document.body.className = ''; // Clear existing classes
    document.body.classList.add(colorClass); // Add the selected color class
}

// Function to update date and time continuously
function updateDateTime() {
    var dateTimeElement = document.getElementById("dateTime");
    var currentDate = new Date();
    var formattedDateTime = currentDate.toLocaleString(); // Format the date and time
    dateTimeElement.textContent = formattedDateTime; // Update the content of the element
}

// Call the function initially to display the current date and time
updateDateTime();

// Call the function every second (1000 milliseconds) to update the date and time continuously
setInterval(updateDateTime, 1000);


// Function to add a new task
function addTodo() {
    var input = document.getElementById("todoInput");
    var inputValue = input.value.trim();
    if (inputValue === "") {
        alert("Please enter a task.");
        return;
    }

    var ul = document.getElementById("todoList");
    var li = createTaskElement(inputValue); // Create task element
    ul.appendChild(li); // Append task element to the list
    saveTasks(); // Save tasks after addition

    input.value = "";
}


// Function to load tasks from local storage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage
    var ul = document.getElementById("todoList");
    ul.innerHTML = ''; // Clear existing tasks
    tasks.forEach(function(task) {
        var li = createTaskElement(task.text, task.completed); // Create task element
        ul.appendChild(li); // Append task element to the list
    });
}

// Function to create task element
function createTaskElement(taskText, completed) {
    var li = document.createElement("li");
    li.classList.add("todo-item"); // Add todo-item class

    var taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add("task-text"); // Add task-text class
    li.appendChild(taskTextElement);

    var tickIcon = document.createElement("i");
    tickIcon.className = "far fa-check-circle";
    if (completed) {
        li.classList.add("completed"); // Apply completed class if task is completed
    }
    tickIcon.onclick = function() {
        li.classList.toggle("completed");
        saveTasks(); // Save tasks after modification
    };
    li.appendChild(tickIcon);

    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteIcon.onclick = function() {
        li.remove();
        saveTasks(); // Save tasks after modification
    };
    li.appendChild(deleteIcon);

    return li;
}

// Function to save tasks to local storage
function saveTasks() {
    var tasks = [];
    var taskElements = document.querySelectorAll('#todoList .todo-item');
    taskElements.forEach(function(taskElement) {
        tasks.push({
            text: taskElement.querySelector('.task-text').textContent,
            completed: taskElement.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
}

// Load tasks when the page loads
window.onload = loadTasks;
