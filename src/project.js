import { selectedMenu } from ".";
import { clearPage } from ".";
import { Item } from "./items";

export function addProjectButtonClicked(){
    const addProjectButton = document.querySelector(".add-project-button");
    addProjectButton.remove();

    const container = document.querySelector(".sidebar-container");

    const addProjectInputBox = document.createElement("input");
    addProjectInputBox.type = "text";
    addProjectInputBox.classList.add("project-input-box");
    container.appendChild(addProjectInputBox);

    const projectButtonContainer = document.createElement("div");
    projectButtonContainer.classList.add("project-option-button-container");
    container.appendChild(projectButtonContainer);

    const projectAddButton = document.createElement("button");
    projectAddButton.classList.add("project-option-button");
    projectAddButton.innerHTML = "Add";
    projectAddButton.addEventListener("click", addButtonClicked);
    projectButtonContainer.appendChild(projectAddButton);

    const projectCancelButton = document.createElement("button");
    projectCancelButton.innerHTML = "Cancel";
    projectCancelButton.classList.add("project-option-button");
    projectCancelButton.classList.add("project-cancel-button");
    projectCancelButton.addEventListener("click", projectCancelButtonClicked);
    projectButtonContainer.appendChild(projectCancelButton);
}

function projectCancelButtonClicked(){
    deleteProjectAddInterface();

    const container = document.querySelector(".sidebar-container");

    const addProjectButton = document.createElement("h3");
    addProjectButton.classList.add("sidebar-button");
    addProjectButton.classList.add("add-project-button");
    addProjectButton.innerHTML = "+ Add Project";
    addProjectButton.addEventListener("click", addProjectButtonClicked);
    container.appendChild(addProjectButton);

}

function deleteProjectAddInterface(){
    const projectInputBox = document.querySelector(".project-input-box");
    const projectButtonContainer = document.querySelector(".project-option-button-container");

    projectInputBox.remove();

    while(projectButtonContainer.firstChild){
        projectButtonContainer.removeChild(projectButtonContainer.firstChild);
    }

    projectButtonContainer.remove();
}

function addButtonClicked(){
    if(document.querySelector(".project-input-box").value === ""){
        alert("Project name can't be empty");
        return;
    }

    let name = document.querySelector(".project-input-box").value

    for(let i = 0; i < projectsArray.length; i++){
        if(name === projectsArray[i].name){
            alert("Project names must be different");
            return;
        }
    }

    count++;
    const project = new Project(document.querySelector(".project-input-box").value, count);
    projectsArray.push(project);

    deleteProjectAddInterface();

    const container = document.querySelector(".sidebar-container");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.classList.add("project-container" + count);
    projectContainer.addEventListener("click", projectClicked);
    container.appendChild(projectContainer);

    const projectName = document.createElement("div");
    projectName.innerHTML = projectsArray[projectsArray.length -1].name;
    projectName.classList.add("project-name");
    projectName.classList.add("project-name" + count);
    projectContainer.appendChild(projectName);

    const projectDeleteButton = document.createElement("div");
    projectDeleteButton.innerHTML = "x";
    projectDeleteButton.classList.add("project-delete-button");
    projectDeleteButton.classList.add("project-delete-button" + count);
    projectDeleteButton.addEventListener("click", projectDeleteButtonClicked);
    projectContainer.appendChild(projectDeleteButton);

    addProjectAddInterface();
}

function addProjectAddInterface(){
    const container = document.querySelector(".sidebar-container");

    const addProjectButton = document.createElement("h3");
    addProjectButton.classList.add("sidebar-button");
    addProjectButton.classList.add("add-project-button");
    addProjectButton.innerHTML = "+ Add Project";
    addProjectButton.addEventListener("click", addProjectButtonClicked);
    container.appendChild(addProjectButton);
}

function projectDeleteButtonClicked(e){
    const splitStrings = e.target.className.split(" ");
    const match = splitStrings[1].match(/\d+$/);

    const name = document.querySelector(".project-name" + match[0]).innerHTML; 
    let index = 0;

    const projectContainer = document.querySelector(".project-container" + match[0]);
    while(projectContainer.firstChild){
        projectContainer.removeChild(projectContainer.firstChild);
    }
    projectContainer.remove();

    for(let i = 0; i < projectsArray.length; i++){
        if(name === projectsArray[i].name){
            break;
        }
        index++;
    }

    if(name === selected){
        clearPage();
    }

    projectsArray.splice(index, 1);
}

function projectClicked(e){
    const splitStrings = e.target.className.split(" ");
    const match = splitStrings[1].match(/\d+$/);

    if(splitStrings[0] === "project-delete-button"){
        return;
    }

    const name = document.querySelector(".project-name" + match[0]).innerHTML;
    let index = 0;

    if(projectsArray.length != 0){
        const projectContainers = document.querySelectorAll(".project-container");
        for(let i = 0; i < projectContainers.length; i++){
            projectContainers[i].classList.remove("selected");
        }
    }

    for(let i = 0; i < projectsArray.length; i++){
        if(name === projectsArray[i].name){
            break;
        }
        index++;
    }
    
    const selectedProject = projectsArray[index];
    
    const project = document.querySelector(".project-container" + match[0]);
    project.classList.add("selected");



    const inboxButton = document.querySelector("#inbox-button");
    const todayButton = document.querySelector("#today-button");
    const thisWeekButton = document.querySelector("#this-week-button");
    inboxButton.classList.remove("selected");
    todayButton.classList.remove("selected");
    thisWeekButton.classList.remove("selected");

    selectedMenu = 0;
    selected = selectedProject.name

    clearPage();
    loadProjectInbox(selectedProject.name);

}

export let projectsArray = [];
let count = 1;
let selected = "";

class Project{
    constructor(name, projectNumber){
        this.name = name;
        this.projectNumber = projectNumber;
    }

    items = [];
}

function loadProjectInbox(name){
    const container = document.querySelector(".center-container");

    const title = document.createElement("h2");
    title.innerHTML = name;
    container.appendChild(title);

    let index = 0;
    for(let i = 0; i < projectsArray.length; i++){
        if(selected === projectsArray[i].name){
            break;
        }
        index++;
    }

    if(projectsArray[index].items.length != 0){
        projectsArray[index].items = sortByDate(projectsArray[index].items);

        for(let i = 0; i < projectsArray[index].items.length; i++){
            printTask(i, projectsArray[index].items[i])
        }
    }

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.toggle("main-button");
    addTaskButton.textContent = "+ Add Task";
    addTaskButton.addEventListener("click", addTaskButtonClicked);
    container.appendChild(addTaskButton);
}

function sortByDate(items) {
    if (!Array.isArray(items) || items.length === 0) {
      return;
    }
  
    items.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  
    return items;
  }

  function addTaskButtonClicked(){
    const container = document.querySelector(".center-container");

    const addTaskButton = document.querySelector(".main-button");
    addTaskButton.remove();

    const inputContainer = document.createElement("div");
    inputContainer.classList.toggle("input-container");
    container.appendChild(inputContainer);

    const titleLabel = document.createElement("div");
    titleLabel.innerHTML = "Name:";
    titleLabel.classList.toggle("title-label");
    inputContainer.appendChild(titleLabel);

    const inputBox = document.createElement("input");
    inputBox.classList.toggle("input-box");
    inputBox.classList.toggle("title-box");
    inputBox.type = "text";
    inputContainer.appendChild(inputBox);

    const inputContainer2 = document.createElement("div");
    inputContainer2.classList.toggle("input-container");
    container.appendChild(inputContainer2);

    const dateLabel = document.createElement("div");
    dateLabel.innerHTML = "Date:";
    dateLabel.classList.toggle("date-label");
    inputContainer2.appendChild(dateLabel);

    const dateBox = document.createElement("input");
    dateBox.classList.toggle("input-box");
    dateBox.classList.toggle("date-box");
    dateBox.type = "date";
    inputContainer2.appendChild(dateBox);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.toggle("option-button-container");
    container.appendChild(buttonContainer);
    
    const addButton = document.createElement("button");
    addButton.classList.toggle("option-button");
    addButton.textContent = "Add";
    addButton.addEventListener("click", addButonClicked);
    buttonContainer.appendChild(addButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.toggle("option-button");
    cancelButton.classList.toggle("cancel-button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", cancelButtonClicked);
    buttonContainer.appendChild(cancelButton);
}


function addButonClicked(){
    if(document.querySelector(".title-box").value === ""){
        alert("Task name can't be empty");
        return;
    }

    if(document.querySelector(".date-box").value === ""){
        alert("Task date can't be empty");
        return;
    }

    let name = document.querySelector(".title-box").value

    let index = 0;
    for(let i = 0; i < projectsArray.length; i++){
        if(selected === projectsArray[i].name){
            break;
        }
        index++;
    }

    for(let i = 0; i < projectsArray[index].items.length; i++){
        if(name === projectsArray[index].items[i].name){
            alert("Task names must be different");
            return;
        }
    }

    let date = document.querySelector(".date-box").value.split("-");
    let stringDate = date[1] + "/" + date[2] + "/" + date[0];
    const item = new Item(document.querySelector(".title-box").value, stringDate);

    projectsArray[index].items.push(item)
    
    clearPage();
    loadProjectInbox(projectsArray[index].name);
}

function cancelButtonClicked(){
    let index = 0;
    for(let i = 0; i < projectsArray.length; i++){
        if(selected === projectsArray[i].name){
            break;
        }
        index++;
    }

    clearPage();
    loadProjectInbox(projectsArray[index].name);
}

function printTask(int, task){
    const container = document.querySelector(".center-container");

    const taskContainer = document.createElement("div");
    taskContainer.classList.toggle("task-container");
    taskContainer.classList.toggle("container" + int);
    container.appendChild(taskContainer);

    const circle = document.createElement("div");
    circle.classList.toggle("circle");
    circle.classList.toggle("circle" + int);
    circle.addEventListener("click", circleClicked);
    taskContainer.appendChild(circle);

    if(task.checked === true){
        circle.classList.toggle("checked-circle");
        const checkmark = document.createElement("div");
        checkmark.innerHTML = "&#10004;";
        checkmark.classList.toggle("checkmark");

        circle.appendChild(checkmark);
    }

    const taskName = document.createElement("div");
    taskName.textContent = task.name;
    taskName.classList.toggle("task-name");
    taskName.classList.add("task-name" + int);
    taskContainer.appendChild(taskName);

    const taskDate = document.createElement("div");
    taskDate.textContent = task.date;
    taskDate.classList.toggle("task-date");
    taskContainer.appendChild(taskDate);

    const deleteButton = document.createElement("div");
    deleteButton.textContent = "X";
    deleteButton.classList.toggle("delete-button");
    deleteButton.classList.toggle("button" + int);
    deleteButton.addEventListener("click", deleteButtonClicked);
    taskContainer.appendChild(deleteButton);
}

function circleClicked(e){
    if(e.target.className === "checkmark"){
        return;
    }

    const splitStrings = e.target.className.split(" ");
    const match = splitStrings[1].match(/\d+$/);
    const name = document.querySelector(".task-name" + match[0]).innerHTML;
    let index = 0;

    let index2 = 0;
    for(let i = 0; i < projectsArray.length; i++){
        if(selected === projectsArray[i].name){
            break;
        }
        index2++;
    }
    
    for(let i = 0; i < projectsArray[index2].items.length; i++){
        if(name === projectsArray[index2].items[i].name){
            break;
        }
        index++;
    }

    if(projectsArray[index2].items[index].checked === true){
        return;
    }
    
    const circle = document.querySelector("." + splitStrings[1]);
    circle.classList.toggle("checked-circle");
    const checkmark = document.createElement("div");
    checkmark.innerHTML = "&#10004;";
    checkmark.classList.toggle("checkmark");

    circle.appendChild(checkmark);

    projectsArray[index2].items[index].checked = true;
}

function deleteButtonClicked(e){
    const splitStrings = e.target.className.split(" ");
    const match = splitStrings[1].match(/\d+$/);
    let index = 0;

    const target = document.querySelector(".container" + match[0]);
    const name = document.querySelector(".task-name" + match[0]).innerHTML;

    let index2 = 0;
    for(let i = 0; i < projectsArray.length; i++){
        if(selected === projectsArray[i].name){
            break;
        }
        index2++;
    }

    while(target.firstChild){
        target.removeChild(target.firstChild);
    }

    for(let i = 0; i < projectsArray[index2].items.length; i++){
        if(name === projectsArray[index2].items[i].name){
            break;
        }
        index++;
    }
    target.remove();
    projectsArray[index2].items.splice(index, 1);
}
