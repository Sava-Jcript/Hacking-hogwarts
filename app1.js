"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
console.log(allStudents);



const Students = {
    first:"",
    last:"",
    middle: "", 
    nickName:"",
    house:"",
    image:"",
    type: "",
    star: false,
    winner: false
}; 
const settings = {
    filterBy: "*",
    sortBy: "first",
    sortDir: "asc"
}

function start( ) {
    console.log("ready");

    loadJSON();
    triggerButtons();
}



// ---------------------- CONTROLLER -----------------

function triggerButtons(){
    document.querySelectorAll(".filter").forEach((each) =>{each.addEventListener("click", selectFilter)})

  ;
    
    document.querySelectorAll("[data-action=sort]").forEach((each) =>{each.addEventListener("click", sortClick)});
}


// --- Filtering ----
function selectFilter(event){
    const filter1 = event.target.dataset.filter;
   
   setFilter(filter1);

}

function setFilter(filter1){
    settings.filterBy = filter1;
    buildList();
 

}

// let house = jsonObject.house;
//     let houseName = "";
//     let houseTrim = house.trim();
//     //* console.log(houseTrim);

//     houseName = houseTrim.substring();
    
//     houseName=houseName.charAt(0).toUpperCase() + houseName.slice(1).toLowerCase(); 
//     Student.house=houseName; 



function filterList(filteredList) {

    if (settings.filterBy !== "*") {
      filteredList = allStudents.filter(function (student) {
        return student.house === settings.filterBy;

      });
    } else {
      filteredList = allStudents;
    }
    return filteredList;

  }






// function filterList(){
//     let filteredList=allStudents.filter(isRaven); 
// displayList(filteredList);
// }

// function isRaven (student){

//     return student.house === "Slytherin"; 
// }



// function filterList(filteredList){

//     if (settings.filterBy !== "*") {
//         filteredList = allStudents.filter(function houseOfCards(Student){ //its a differnet way with closure
            
//             if (Student.House === settings.filterBy ){
//                 return true;
//             }else{
//                 return false;
//             }

//         })
//     }
//     else {
//         filteredList = allStudents;
//     }
//     return filteredList;

// }


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
     
      function sortByInput(StudentA, StudentB){
        // console.log(`sorted by ${settings.sortBy}`)
        if(StudentA[settings.sortBy]   < StudentB[settings.sortBy]){
            return -1 * direction;
        }else{
            return 1 * direction;
        }
    }
     return sortedList;
    
    
}


//  ------------------- MODEL ---------------------


async function loadJSON() {
    const response = await fetch("https://petlatkea.dk/2021/hogwarts/students.json");
    const jsonData = await response.json();
    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

// function prepareObjects( inputData ) {
//     allStudents = inputData.map(preapareObject);
//     buildList();
// }


    



function prepareObjects( jsonObject ) {
    jsonObject.forEach( jsonObject => {
        const Student = Object.create(Students);
        // let text = jsonObject.fullname;
        let fullName = jsonObject.fullname; 

       let firstnameResult = "";

 let fullnameTrim = fullName.trim();

 let first= "";

 if (fullnameTrim.includes(" ")=== true){
   
    firstnameResult = fullnameTrim.substring(0, fullnameTrim.indexOf(" "));
    

    firstnameResult=firstnameResult.charAt(0).toUpperCase() + firstnameResult.slice(1).toLowerCase(); 


}else {firstnameResult=fullName.charAt(0).toUpperCase() + fullName.slice(1).toLowerCase();
}

  
    Student.first=firstnameResult; 


    // console.log(firstnameResult);
let middle=""; 
    let middlename = "";
    let middlenameTrim = "";


    middlenameTrim = fullName.trim();


    middlename= middlenameTrim.substring(middlenameTrim.indexOf(" "), middlenameTrim.lastIndexOf(" ")).trim();


if (fullName.includes(`\"`) === true) {
    middlename = "";
  } else {
    middlename = middlename.charAt(0).toUpperCase() + middlename.slice(1).toLowerCase();
  }
  Student.middle=middlename; 
//   console.log(middlename);



let last=""; 
  let lastName=""; 
  let lastnameTrim=""; 

//   lastname= lastnameTrim.substring(lastnameTrim.lastIndexOf(" "), (fullnameTrim-lastnameTrim.length));


lastnameTrim=fullName.trim();


 lastName = lastnameTrim.substring(lastnameTrim.lastIndexOf(" ") + 1).trim();




if (lastName.includes("-")) {
    // let lastnameHyphen = lastName.split("-");
    lastName=lastName.replace('-', ' '); 

    // * console.log(lastnameHyphen);

  } else {
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  }

  if (lastnameTrim.includes(" ")=== false){
    lastName=""; }

//   console.log(lastName);
Student.last=lastName; 

let nickName=""; 

let nick=fullName.substring(fullName.indexOf(`"`), fullName.lastIndexOf(`"`)+1); 



nick=nick.replace(/"/g, ''); 
nick=nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase(); 


Student.nickName=nick; 
// console.log(nick);



let house = jsonObject.house;
    let houseName = "";
    let houseTrim = house.trim();
    //* console.log(houseTrim);

    houseName = houseTrim.substring();
    
    houseName=houseName.charAt(0).toUpperCase() + houseName.slice(1).toLowerCase(); 
    Student.house=houseName; 
    // console.log(houseName); 



let image="";
    let imageSrc = new Image(100, 100);


    Student.image=imageSrc ;
    // Makes the last name lower case
   
   
    let lastnameL = lastName.toLowerCase();
    // Takes the first letter of the firstname and makes it lower case
    
if (lastName.includes(" ")) {
    
    const words = lastName.split(" "); 
const secondName = words[1]; 
    let firstnameCap = firstnameResult.charAt(0).toLowerCase();
    





    imageSrc.src = "images/" + secondName + "_" + firstnameCap + ".png" ;
}

else if (lastName.includes("Patil")) {
    
   
    

    let firstnameL = firstnameResult.toLowerCase();
    imageSrc.src = "images/" + lastnameL + "_" + firstnameL + ".png" ;
}
else{

    let firstnameL = firstnameResult.charAt(0).toLowerCase();
    // Defines the image src
    imageSrc.src = "images/" + lastnameL + "_" + firstnameL + ".png" ;

}


Student.image=imageSrc; 
    // Pushes the objects into the array










allStudents.push(Student);
          


 
  // TODO: Create new object with cleaned data - and store that in the allStudents array
        
        // TODO: MISSING CODE HERE !!!
    });

   
    
    buildList();
   
}




// -------------------- VIEW --------------------

function buildList() {
    const currentList = filterList(allStudents);
    let sortedList = sortList(currentList);

    displayList(sortedList);
}


function displayList(aStudent) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    aStudent.forEach(displayStudent);
}

function displayStudent(student) {
    // create clone
    const clone = document.querySelector("template#Studentz").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=firstname]").textContent = student.first;
    clone.querySelector("[data-field=secondname]").textContent = student.last;
    clone.querySelector("[data-field=nick]").textContent = student.nickName;
    clone.querySelector("[data-field=middle]").textContent = student.middle;
    clone.querySelector("[data-field=house]").textContent = student.house;
  
    // clone.querySelector("[data-field=Image]").src= student.image.src;


    clone.querySelector("#studentImage").src = student.image.src;





    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
    
}













function tryToMakeAWinner(selectedStudent){
    const winners = allStudents.filter(student => student.winner)
    const numberOfWinners = winners.length;
    const other = winners.filter(student => student.type === selectedStudent.type ).shift();
    // if there is another of the same type
    if (other !== undefined){
        console.log("there can only be one winner of each type!");
        removeOther(other);
    } else if (numberOfWinners >= 2){
        console.log("there can only be two winners");
        removeAorB(winners[0], winners[1]);
    } else {
        makeWinner(selectedStudent);
    }

    makeWinner(selectedStudent);

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
    makeWinner(selectedStudent);
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
        makeWinner(selectedStudent);
        buildList();
        closeDialog();
    }

    function clickRemoveB(){
    // else - if removeB
    removeWinner(winnerB);
    makeWinner(selectedStudent);
    buildList();
    closeDialog();
    }
     
}

function removeWinner(winnerStudent){
    console.log("remove winner");
    winnerStudent.winner = false;
}

function makeWinner(student){
    student.winner = true;
}
}