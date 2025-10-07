refreshCompletedTasks();
refreshPendingTasks();

function addTask() {
  const inputElement = document.getElementById("newTaskName");

  if (inputElement.value.length > 0) {
    const pendingTasks = getPendingTasks();

    pendingTasks.unshift(inputElement.value);

    setPendingTasks(pendingTasks);
    refreshPendingTasks();

    inputElement.value = "";
  }
}

function getCompletedTasks() {
  const completedTasksString = localStorage.getItem("completedTasks");
  return typeof completedTasksString === "string"
    ? JSON.parse(completedTasksString)
    : [];
}

function setCompletedTasks(newCompletedTasks) {
  if (Array.isArray(newCompletedTasks)) {
    const completedTasksString = JSON.stringify(newCompletedTasks);
    localStorage.setItem("completedTasks", completedTasksString);
  }
}

function getPendingTasks() {
  const pendingTasksString = localStorage.getItem("pendingTasks");
  return typeof pendingTasksString === "string"
    ? JSON.parse(pendingTasksString)
    : [];
}

function setPendingTasks(newPendingTasks) {
  if (Array.isArray(newPendingTasks)) {
    const pendingTasksString = JSON.stringify(newPendingTasks);
    localStorage.setItem("pendingTasks", pendingTasksString);
  }
}

function cancelTask(taskName) {
  if (typeof taskName === "string") {
    const newPendingTasks = getPendingTasks().filter((t) => t !== taskName);
    setPendingTasks(newPendingTasks);
    refreshPendingTasks();
  }
}

function completeTask(taskName) {
  if (typeof taskName === "string") {
    cancelTask(taskName);
    const newCompletedTasks = getCompletedTasks();

    newCompletedTasks.unshift(taskName);

    setCompletedTasks(newCompletedTasks);
    refreshCompletedTasks();
  }
}

function deleteCompleted() {
  setCompletedTasks([]);
  refreshCompletedTasks();
}

function refreshCompletedTasks() {
  const pendingTasks = getCompletedTasks();
  const completedSection = document
    .getElementById("completed")
    .getElementsByClassName("task-list")[0];

  const newChildren = pendingTasks.map((t) => {
    const articleElement = document.createElement("article");
    const pElement = document.createElement("p");

    pElement.textContent = t;

    articleElement.appendChild(pElement);

    return articleElement;
  });

  completedSection.replaceChildren(...newChildren);
}

function refreshPendingTasks() {
  const pendingTasks = getPendingTasks();
  const toDoSection = document
    .getElementById("to-do")
    .getElementsByClassName("task-list")[0];

  const newChildren = pendingTasks.map((taskName) => {
    const articleElement = document.createElement("article");
    const pElement = document.createElement("p");
    const completeButtonElement = document.createElement("button");
    const deleteButtonElement = document.createElement("button");

    pElement.textContent = taskName;
    completeButtonElement.textContent = "Completar";
    deleteButtonElement.textContent = "Cancelar";

    completeButtonElement.addEventListener("click", () =>
      completeTask(taskName)
    );
    deleteButtonElement.addEventListener("click", () => cancelTask(taskName));

    articleElement.appendChild(pElement);
    articleElement.appendChild(completeButtonElement);
    articleElement.appendChild(deleteButtonElement);

    return articleElement;
  });

  toDoSection.replaceChildren(...newChildren);
}
