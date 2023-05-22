const tareaInput = document.querySelector(".tarea-input");
const agregarTarea = document.querySelector(".todo-button");
const tareaList = document.querySelector(".tarea-list");
const filtro = document.querySelector(".filter-todo");
const fecha = document.querySelector("#fecha");

document.addEventListener("DOMContentLoaded", cargarTareas);
agregarTarea.addEventListener("click", addTarea);
tareaList.addEventListener("click", deleteCheck);
filtro.addEventListener("click", filtrarLista);

function addTarea(e) {
  e.preventDefault();
  //Creamos el div de la tarea
  const tareaDiv = document.createElement("div");
  tareaDiv.classList.add("todo");
  //Creamos la lista de la tarea
  const newTarea = document.createElement("li");
  newTarea.innerText = tareaInput.value;
  saveLocalTodos(tareaInput.value);
  newTarea.classList.add("todo-item");
  tareaDiv.appendChild(newTarea);
  tareaInput.value = "";

  //Creamos el boton de check
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  tareaDiv.appendChild(completedButton);
  //Creamos el boton de borrar
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  tareaDiv.appendChild(trashButton);
  //lo pasamos al div que creamos en linea 15
  tareaList.appendChild(tareaDiv);
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const tarea = item.parentElement;
    tarea.classList.add("fall");
    //at the end
    removeLocalTodos(tarea);
    tarea.addEventListener("transitionend", (e) => {
      tarea.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const tarea = item.parentElement;
    tarea.classList.toggle("completed");
    console.log(tarea);
  }
}

function filtrarLista(e) {
  const tareas = tareaList.childNodes;
  tareas.forEach(function (tarea) {
    switch (e.target.value) {
      case "todas":
        tarea.style.display = "flex";
        break;
      case "completadas":
        if (tarea.classList.contains("completed")) {
          tarea.style.display = "flex";
        } else {
          tarea.style.display = "none";
        }
        break;
      case "incompletas":
        if (!tarea.classList.contains("completed")) {
          tarea.style.display = "flex";
        } else {
          tarea.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(tarea) {
  let tareas;
  if (localStorage.getItem("tareas") === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  tareas.push(tarea);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
function removeLocalTodos(tarea) {
  let tareas;
  if (localStorage.getItem("tareas") === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  const todoIndex = tarea.children[0].innerText;
  tareas.splice(tareas.indexOf(todoIndex), 1);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
  let tareas;
  if (localStorage.getItem("tareas") === null) {
    tareas = [];
  } else {
    tareas = JSON.parse(localStorage.getItem("tareas"));
  }
  tareas.forEach(function (tarea) {
    const tareaDiv = document.createElement("div");
    tareaDiv.classList.add("todo");
    const newTarea = document.createElement("li");
    newTarea.innerText = tarea;
    newTarea.classList.add("todo-item");
    tareaDiv.appendChild(newTarea);
    tareaInput.value = "";
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    tareaDiv.appendChild(completedButton);
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    tareaDiv.appendChild(trashButton);

    tareaList.appendChild(tareaDiv);
  });
}
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
});
