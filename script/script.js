const tasks_div = document.getElementById("tasks");

// Placeholder array for task objects
let tasks = [];

// Makes unique id from date. It makes it easy to avoid reps
function today() {
  const now = new Date();

  return (
    now.getFullYear() +
    "" +
    now.getMonth() +
    "" +
    now.getDay() +
    "" +
    now.getHours() +
    "" +
    now.getMinutes() +
    "" +
    now.getSeconds()
  );
}

// Reloads the content of tasks div with objects from tasks array
function reload() {
  let temp_html = "";
  tasks.map((x) => {
    temp_html += `
      <div class="task" id="${x["id"]}">
      <span
      id="${x["id"]}-textarea"
      class="textarea"
      role="textbox"
      contenteditable
      >${x["text"]}</span
      ><br />
      <button onClick="save(${x["id"]})" id="${x["id"]}-button-save" class="btn btn-warning my-button">Save</button>
      <button onClick="del(${x["id"]})" id="${x["id"]}-button-del" class="btn btn-danger my-button">Delete</button>
      </div>`;
  });
  tasks_div.innerHTML = temp_html;
}

// Onload that loads saved tasks from cookies.
// Tasks are saved in tasks cookie as json and reconverted here to array of objects
function starter() {
  const tasksCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("tasks="))
    .split("=")[1];
  const tasksCookieValue = JSON.parse(tasksCookie);
  console.log(tasksCookieValue);
  tasks = tasksCookieValue;
  reload();
}

// Saves state of tasks (tasks array) as json in cookie called tasks
function save_cookies() {
  console.log(tasks);
  document.cookie = `tasks=${JSON.stringify(tasks)}`;
  console.log(document.cookie);
}

// OnClick for Add button.
// Creates new task object with unique id and push it into tasks array. Then reloads tasks div content.
function add() {
  const temp_id = today();

  let task = {};
  task = {
    id: temp_id,
    text: "",
  };
  tasks.push(task);

  reload();
}

// OnClick for Delete button.
// Takes id of the task it should delete.
// Finds this task in tasks array, deletes it and removes this task from tasks div content.
// At the end, saves cookies
function del(id) {
  tasks.map((x, index) => {
    if (x.id == id) tasks.splice(index, 1);
  });
  const node = document.getElementById(id);
  node.remove();
  save_cookies();
}

// OnClick for Save button.
// Takes id of the task it should save.
// Finds this task in tasks array and saves textarea content as object property.
// At the end, saves cookies
function save(id) {
  const textare_node = document.getElementById(`${id}-textarea`);
  tasks.forEach((x, index) => {
    if (x.id == id) tasks[index].text = textare_node.textContent;
  });
  save_cookies();
}
