import { loadToday } from "./today";
import { loadThisWeek } from "./thisWeek";
import { loadInbox } from "./inbox";
import { addTaskButtonClicked } from "./inbox";
import { addProjectButtonClicked } from "./project";
import { projectsArray } from "./project";

export function clearPage(){
    let container = document.querySelector(".center-container");
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}


    function inboxButtonClicked(){

        if(selectedMenu != 0){
            if(selectedMenu === 1){
                return
            }
            else if(selectedMenu === 2){
                todayButton.classList.toggle("selected");
            }
            else{
                thisWeekButton.classList.toggle("selected");
            }
        }

        if(projectsArray.length != 0){
            const projectContainers = document.querySelectorAll(".project-container");
            for(let i = 0; i < projectContainers.length; i++){
                projectContainers[i].classList.remove("selected");
            }
        }


        selectedMenu = 1;
        inboxButton.classList.toggle("selected");
        clearPage();
        loadInbox();
    }

    function todayButtonClicked(){

        if(selectedMenu != 0){
            if(selectedMenu === 2){
                return
            }
            else if(selectedMenu === 1){
                inboxButton.classList.toggle("selected");
            }
            else{
                thisWeekButton.classList.toggle("selected");
            }
        }

        if(projectsArray.length != 0){
            const projectContainers = document.querySelectorAll(".project-container");
            for(let i = 0; i < projectContainers.length; i++){
                projectContainers[i].classList.remove("selected");
            }
        }
        

        selectedMenu = 2;
        todayButton.classList.toggle("selected");
        clearPage();
        loadToday();
    }

    function thisWeekButtonClicked(){
        if(selectedMenu != 0){
            if(selectedMenu === 3){
                return
            }
            else if(selectedMenu === 1){
                inboxButton.classList.toggle("selected");
            }
            else{
                todayButton.classList.toggle("selected");
            }
        }
        
        if(projectsArray.length != 0){
            const projectContainers = document.querySelectorAll(".project-container");
            for(let i = 0; i < projectContainers.length; i++){
                projectContainers[i].classList.remove("selected");
            }
        }
        

        selectedMenu = 3;
        thisWeekButton.classList.toggle("selected");
        clearPage();
        loadThisWeek();
    }




    export let selectedMenu = 1;
    const inboxButton = document.querySelector("#inbox-button");
    const todayButton = document.querySelector("#today-button");
    const thisWeekButton = document.querySelector("#this-week-button");
    const addTaskButton = document.querySelector(".main-button");
    const addProjectButton = document.querySelector(".add-project-button");

    
    inboxButton.addEventListener("click", inboxButtonClicked);
    todayButton.addEventListener("click", todayButtonClicked);
    thisWeekButton.addEventListener("click", thisWeekButtonClicked);
    addTaskButton.addEventListener("click", addTaskButtonClicked);
    addProjectButton.addEventListener("click", addProjectButtonClicked);


