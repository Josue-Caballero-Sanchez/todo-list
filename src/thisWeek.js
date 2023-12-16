import { itemsArray, loadInbox } from "./inbox";
import { printTask } from "./inbox";

function isDateFromThisWeek(dateString) {
    // Convert the date string to a Date object
    const date = new Date(dateString);
  
    // Get the current date
    const today = new Date();
  
    // Calculate the difference in days
    const diffDays = Math.floor((today - date) / (24 * 60 * 60 * 1000));
  
    // Check if the date is within the same week
    return diffDays < 7 && date.getDay() <= today.getDay();
  }

export function loadThisWeek(){
    const container = document.querySelector(".center-container");

    const title = document.createElement("h2");
    title.innerHTML = "This Week";
    container.appendChild(title);

    for(let i = 0; i < itemsArray.length; i++){
        if(isDateFromThisWeek(itemsArray[i].date)){
            printTask(i, itemsArray[i]);
        }
    }
}
