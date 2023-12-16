import { clearPage } from ".";
import { Item } from "./items";
import { selectedMenu } from ".";

function deleteButtonClicked(e){
    const splitStrings = e.target.className.split(" ");
    const target = document.querySelector(".container" + splitStrings[1].charAt(splitStrings[1].length -1));

    while(target.firstChild){
        target.removeChild(target.firstChild);
    }

    target.remove();
    itemsArray.splice(splitStrings[1].charAt(splitStrings[1].length -1), 1);
}

function circleClicked(e){
    const splitStrings = e.target.className.split(" ");
    
    if(e.target.className === "checkmark" || itemsArray[splitStrings[1].charAt(splitStrings[1].length -1)].checked === true){
        return;
    }
    
    const circle = document.querySelector("." + splitStrings[1]);
    circle.classList.toggle("checked-circle");
    const checkmark = document.createElement("div");
    checkmark.innerHTML = "&#10004;";
    checkmark.classList.toggle("checkmark");

    circle.appendChild(checkmark);

    itemsArray[splitStrings[1].charAt(splitStrings[1].length -1)].checked = true;
}

export function printTask(int, task){
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

export function loadInbox(){
    const container = document.querySelector(".center-container");

    const title = document.createElement("h2");
    title.innerHTML = "Inbox";
    container.appendChild(title);

    if(itemsArray.length != 0){
        itemsArray = sortByDate(itemsArray);

        for(let i = 0; i < itemsArray.length; i++){
            printTask(i, itemsArray[i])
        }
    }

    const addTaskButton = document.createElement("button");
    addTaskButton.classList.toggle("main-button");
    addTaskButton.textContent = "+ Add Task";
    addTaskButton.addEventListener("click", addTaskButtonClicked);
    container.appendChild(addTaskButton);
}

function cancelButtonClicked(){
    clearPage();
    loadInbox();
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

    let date = document.querySelector(".date-box").value.split("-");
    let stringDate = date[1] + "/" + date[2] + "/" + date[0];
    const item = new Item(document.querySelector(".title-box").value, stringDate);
    itemsArray.push(item)
    
    clearPage();
    loadInbox();
}

export function addTaskButtonClicked(){
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

export let itemsArray = [];

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
