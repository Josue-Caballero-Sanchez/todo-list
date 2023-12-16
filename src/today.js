import { itemsArray, loadInbox } from "./inbox";
import { printTask } from "./inbox";

export function loadToday(){
    const container = document.querySelector(".center-container");

    const title = document.createElement("h2");
    title.innerHTML = "Today";
    container.appendChild(title);

    let today = new Date().toLocaleDateString();
    for(let i = 0; i < itemsArray.length; i++){
        

        if(itemsArray[i].date === today){
            printTask(i, itemsArray[i]);
        }
    }
}


