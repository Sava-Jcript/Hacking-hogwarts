"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
// const sortedList = allAnimals.sort(compareByName);

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0,
    star: false,
    winner: false
};

const settings = {
    filterBy: "*",
    sortBy: "name",
    sortDir: "asc"
}

function start( ) {
    console.log("ready");
    loadJSON();
    triggerButtons();
}

// ---------------------- CONTROLLER -----------------

function triggerButtons(){
    document.querySelectorAll(".filter").forEach((each) =>{each.addEventListener("click", selectFilter)});
    
    document.querySelectorAll("[data-action=sort]").forEach((each) =>{each.addEventListener("click", sortClick)});
}


// // --- Filtering ----
function selectFilter(event){
    const filter = event.target.dataset.filter;
   //filterList(filter);
   setFilter(filter);
}

function setFilter(filter){
    settings.filterBy = filter;
    buildList();
}

function filterList(filteredList){
    if (settings.filterBy !== "*") {
        filteredList = allAnimals.filter(function whichAnimal(animal){ //its a differnet way with closure
            if (animal.type === settings.filterBy ){
                return true;

            }else{
                return false;
            }
        })
    }
    else {
        filteredList = allAnimals;
    }
    return filteredList;

}
  
// ---------------------SORTING---------------------------

function sortClick(event){
    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    // find "old" sortby element, end remove .sortby

    const oldElement = document.querySelector(`[data-sort=${settings.sortBy}]`);
    oldElement.classList.remove("sortby");

    // indicate active sort
    event.target.classList.add("sortby");

    //toggle the direction
    if(sortDir === "asc"){
        event.target.dataset.sortDirection = "desc";
    }else{
        event.target.dataset.sortDirection = "asc";
    }
    // console.log(`user selected ${sortBy} - ${sortDir}`)
    setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir){
    settings.sortBy = sortBy;
    settings.sortDir = sortDir;
    buildList();
}



function sortList(sortedList){
    
     let direction = 1;
     if(settings.sortDir === "desc"){
        direction = -1;
     } else {
        direction = 1;
     }
    
     sortedList = sortedList.sort(sortByInput);
     
      function sortByInput(animalA, animalB){
        // console.log(`sorted by ${settings.sortBy}`)
        if(animalA[settings.sortBy]   < animalB[settings.sortBy]){
            return -1 * direction;
        }else{
            return 1 * direction;
        }
    }
     return sortedList;
    
    
}


//  ------------------- MODEL ---------------------
async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects( inputData ) {
    allAnimals = inputData.map(preapareObject);
    buildList();
}

function preapareObject(jsonObject) {
    const animal = Object.create(Animal);
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;
    return animal;
}

// -------------------- VIEW --------------------
function buildList() {
    const currentList = filterList(allAnimals);
    let sortedList = sortList(currentList);

    displayList(sortedList);
}

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";
    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);
    if(animal.star){
        clone.querySelector("[data-field=star]").textContent = "⭐";
    } else {
        clone.querySelector("[data-field=star]").textContent = "☆";
    }
    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;
    clone.querySelector("[data-field=star]").addEventListener(
        `click`, clickStar);
    // change star status
    function clickStar(){
        animal.star = !animal.star;
        buildList();
    };
    // change winner status (same logic as star)
    clone.querySelector("[data-field=winner]").dataset.winner = animal.winner;
    clone.querySelector("[data-field=winner]").addEventListener(`click`, clickWinner);
    function clickWinner(){
        // untoggle an animal is always possible, but not toggle it (2 winners for each category)
        if(animal.winner === true){
            animal.winner = false;
        } else {
            tryToMakeAWinner(animal);
        }
        buildList();
    }
    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}

function tryToMakeAWinner(selectedAnimal){
    const winners = allAnimals.filter(animal => animal.winner)
    const numberOfWinners = winners.length;
    const other = winners.filter(animal => animal.type === selectedAnimal.type ).shift();
    // if there is another of the same type
    if (other !== undefined){
        console.log("there can only be one winner of each type!");
        removeOther(other);
    } else if (numberOfWinners >= 2){
        console.log("there can only be two winners");
        removeAorB(winners[0], winners[1]);
    } else {
        makeWinner(selectedAnimal);
    }

    makeWinner(selectedAnimal);

    function removeOther(other){
    // show name on button
    document.querySelector("#onlyonekind p button span").textContent =`${other.name}, the ${other.type}`;

    // ask the user to ignore or remove the other
    document.querySelector("#onlyonekind").classList.remove("hide");
    document.querySelector("#onlyonekind .closebutton").addEventListener("click", closeDialog);
    document.querySelector("#onlyonekind p button").addEventListener("click", clickRemoveOther);
    // if ignore, do nothing (remove the event listeneras good practice)
    function closeDialog(){
    document.querySelector("#onlyonekind").classList.add("hide");
    document.querySelector("#onlyonekind .closebutton").removeEventListener("click", closeDialog);
    document.querySelector("#onlyonekind p button").removeEventListener("click", clickRemoveOther);
    }

    function clickRemoveOther(){
    removeWinner(other);
    makeWinner(selectedAnimal);
    buildList();
    closeDialog();
    }
    }
    
    function removeAorB(winnerA, winnerB){
    // show names on buttons
    document.querySelector("#onlytwowinners [data-action=remove1] span").textContent =`${winnerA.name}, the ${winnerA.type}`;
    document.querySelector("#onlytwowinners [data-action=remove2] span").textContent = `${winnerB.name}, the ${winnerB.type}`;

    // ask the user to ignore or remove 'A or B
    document.querySelector("#onlytwowinners").classList.remove("hide");
    document.querySelector("#onlytwowinners .closebutton").addEventListener("click", closeDialog);
    document.querySelector("#onlytwowinners [data-action=remove1]").addEventListener("click", clickRemoveA);
    document.querySelector("#onlytwowinners [data-action=remove2]").addEventListener("click", clickRemoveB);

    // if ignore, do nothing
    function closeDialog(){
        document.querySelector("#onlytwowinners").classList.add("hide");
    document.querySelector("#onlytwowinners .closebutton").removeEventListener("click", closeDialog);
    document.querySelector("#onlytwowinners [data-action=remove1]").removeEventListener("click", clickRemoveA);
    document.querySelector("#onlytwowinners [data-action=remove2]").removeEventListener("click", clickRemoveB);
    }

    function clickRemoveA(){
        removeWinner(winnerA);
        makeWinner(selectedAnimal);
        buildList();
        closeDialog();
    }

    function clickRemoveB(){
    // else - if removeB
    removeWinner(winnerB);
    makeWinner(selectedAnimal);
    buildList();
    closeDialog();
    }
     
}

function removeWinner(winnerAnimal){
    console.log("remove winner");
    winnerAnimal.winner = false;
}

function makeWinner(animal){
    animal.winner = true;
}
}