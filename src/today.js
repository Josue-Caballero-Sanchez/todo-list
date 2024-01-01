import { itemsArray, loadInbox } from "./inbox";
import { printTask } from "./inbox";

export function loadToday(){
    const container = document.querySelector(".center-container");

    const title = document.createElement("h2");
    title.innerHTML = "Today";
    container.appendChild(title);

    let today = new Date().toLocaleDateString();
    let splitToday = today.split("/");
    if(splitToday[0].length === 1){
        splitToday[0] = "0" + splitToday[0];
    }
    if(splitToday[1].length === 1){
        splitToday[1] = "0" + splitToday[1];
    }

    today = splitToday[0] + "/" + splitToday[1] + "/" + splitToday[2];

    for(let i = 0; i < itemsArray.length; i++){

        if(itemsArray[i].date === today){
            printTask(i, itemsArray[i]);
        }
    }
}


