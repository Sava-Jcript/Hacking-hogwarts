
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
    gender:"",
    image:"",
    prefect:false,
    expel: false,
    inquisitional:false,
    blood:""
}; 
const settings = {
    filterBy: "*",
    sortBy: "first",
    sortDir: "asc"
}

function start( ) {
    console.log("fuck");

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
    CombineList();
 

}




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







// ---------------------SORTING---------------------------

function sortClick(event){
    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;



    const oldElement = document.querySelector(`[data-sort=${settings.sortBy}]`);
    oldElement.classList.remove("sortby");


    event.target.classList.add("sortby");


    if(sortDir === "asc"){
        event.target.dataset.sortDirection = "desc";
    }else{
        event.target.dataset.sortDirection = "asc";
    }

    setSort(sortBy, sortDir);

}

function setSort(sortBy, sortDir){
    settings.sortBy = sortBy;
    settings.sortDir = sortDir;
    CombineList();
    numberOfStudents()  ;
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
    let [response1, response2, response3] = await Promise.all([
        fetch("https://petlatkea.dk/2021/hogwarts/students.json").then(response => response.json()),
     
      
        fetch("https://petlatkea.dk/2021/hogwarts/families.json").then(response => response.json()),  fetch("./ali.json").then(response => response.json())

      ]);
      

      console.log("wtf");


    prepareObjects(response1, response2, response3);
 








}






    



function prepareObjects( jsonObject,jsonObject1, jsonObject2 ) {
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


    houseName = houseTrim.substring();
    
    houseName=houseName.charAt(0).toUpperCase() + houseName.slice(1).toLowerCase(); 
    Student.house=houseName; 
    // console.log(houseName); 



    let gender = jsonObject.gender;
    let genderName = "";
    let genderTrim = gender.trim();
    //* console.log(houseTrim);

    genderName = genderTrim.substring();
    
    genderName=genderName.charAt(0).toUpperCase() + genderName.slice(1).toLowerCase(); 
    Student.gender=genderName; 
    // console.log(houseName); 







let image="";
    let imageSrc = new Image(100, 100);


    Student.image=imageSrc ;
    // Makes the last name lower case
   
   
    let lastnameL = lastName.toLowerCase();

    
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

else if (firstnameResult.includes("Leanne")) {
    
   
    

  
    imageSrc.src = "/fb.jpeg" ;
}

else{

    let firstnameL = firstnameResult.charAt(0).toLowerCase();
    // Defines the image src
    imageSrc.src = "images/" + lastnameL + "_" + firstnameL + ".png" ;

}


Student.image=imageSrc; 
    // Pushes the objects into the array

    console.log(jsonObject1
        );

  

    let bloodType = "";
    if ((jsonObject1.half).includes(lastName)) {
        bloodType = "Half";
      } else {
        bloodType = "Pure";
      }

    Student.blood = bloodType;




  

allStudents.push(Student);
          


 


    });

    
    

    



    



   
      
  

    CombineList();

   
}

    
    
    


   


// -------------------- VIEW --------------------

function CombineList() {
    const currentList = filterList(allStudents);
    let sortedList = sortList(currentList);

    displayList(sortedList);
    numberOfStudents();
    // numberOfStudents1();
    countExpelledStudents();


    
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

        clone.querySelector("[data-field=expel]").textContent = "Expel";
   
    // set clone data
    clone.querySelector("[data-field=firstname]").textContent = "First Name : "+student.first;
    clone.querySelector("[data-field=secondname]").textContent = "Family Name : "+student.last;
    clone.querySelector("[data-field=nick]").textContent = "Nick Name: "+student.nickName;
    clone.querySelector("[data-field=middle]").textContent = student.middle;
    clone.querySelector("[data-field=house]").textContent = "House: " +student.house;

    clone.querySelector("[data-field=gender]").textContent = "Gender: " +student.gender;
  
    


    clone.querySelector("#studentImage").src = student.image.src;


    clone.querySelector("[data-field=blood]").textContent = "Blood Type: " +student.blood;

// console.log(allStudents);

clone.querySelector("[data-field=expel]").addEventListener("click", () => {
    const studentId = allStudents.indexOf(student);
    const closeDialog = () => {
      document.querySelector("#warning").classList.add("hide");
      document.querySelector("#warning .closeBtn").removeEventListener("click", closeDialog);


      document.querySelector("#warning p button").removeEventListener("click", expelClickBtn);
    };




  
    const expelClickBtn = () => {
      allStudents.splice(studentId, 1);
      CombineList();
      // console.log(studentId);

      closeDialog();


    };

 
  
    const closePop = () => {
      document.querySelector("#warning p button span").textContent = `${student.first}`;
      document.querySelector("#warning").classList.remove("hide");
      document.querySelector("#warning .closeBtn").addEventListener("click", closeDialog);




      document.querySelector("#warning p button").addEventListener("click", expelClickBtn);
    };
  
    closePop();
  });
  











  // -------------------new Shiiiiiiiiiiiiiiiiiiit ------------------



// change prefect status (same logic as star)
clone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect;
clone.querySelector("[data-field=prefect]").addEventListener(`click`, clickPrefect);
function clickPrefect(){
  // untoggle an student is always possible, but not toggle it (2 prefects for each category)
  if(student.prefect === true){
      student.prefect = false;
  } else {
      createPrefect(student);
  }
  CombineList();
}




// clone.querySelector("[data-field=inquisitional]").dataset.prefect = student.inquisitional;
// clone.querySelector("[data-field=inquisitional]").addEventListener(`click`, clickInqui);
// function clickInqui(){
//   // untoggle an student is always possible, but not toggle it (2 prefects for each category)
//   if(student.inquisitional === true){
//       student.inquisitional = false;
//   } else {
//       cretaeClickInqui(student);
//   }
//   CombineList();
// }


    document.querySelector("#list tbody").appendChild( clone );
}












const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', (event2) => {
  const searchText = event2.target.value.toLowerCase();

  const filteredStudents = allStudents.filter(student => {
    const fullName2 = `${student.first}  ${student.middle}  ${student.last} ${student.nickName}`.toLowerCase();
    return fullName2.includes(searchText);
  });
displayList(filteredStudents);
});







function numberOfStudents() {

  let sortedStudents = sortList(allStudents.slice());
  

  let length1 = sortedStudents.length;
  

  document.querySelector('#numberOfStudents').textContent = "Number Of Students:" + length1;
}




const countExpelledStudents = () => {

  const originalLength = allStudents.length; // Save the original length


  numberOfStudents();
  
 
    const newLength = allStudents.length; 
    console.log(newLength);// Save the new length
  const expelledCount = originalLength-newLength; // Calculate the difference
  return expelledCount;
 
};
const expelledCount = countExpelledStudents();
document.querySelector("#numberOfExpelledStudents").textContent = 'Expelled Students: '+expelledCount;














function createPrefect(selectedStudent){
  const prefects = allStudents.filter(student => student.prefect)
  console.log(prefects);  
  const numberOfPrefects = prefects.length;
  const studentToRemove = prefects.filter(student => student.house === selectedStudent.house ).shift();

  if (studentToRemove !== undefined){


    removeStudentz(studentToRemove);
  } else if (numberOfPrefects >= 2){

      removeAorB(prefects[0], prefects[1]);
  




    } else {
      createPrefect(selectedStudent);
  }



  function removeStudentz(studentToRemove){
  // show name on button
  document.querySelector("#onlytwoprefectsp button span").textContent =`${studentToRemove.first}`;


  document.querySelector("#onlytwoprefects").classList.remove("hide");
  document.querySelector("#onlytwoprefects .closebutton").addEventListener("click", closeDialog01);
  document.querySelector("#onlytwoprefects p button").addEventListener("click", clickremoveStudentz);

  function closeDialog01(){
  document.querySelector("#onlytwoprefects").classList.add("hide");
  document.querySelector("#onlytwoprefects .closebutton").removeEventListener("click", closeDialog01);
  document.querySelector("#onlytwoprefects p button").removeEventListener("click", clickremoveStudentz);
  }

  function clickremoveStudentz(){
  removePrefect(studentToRemove);
  createPrefect(selectedStudent);
  CombineList();
  closeDialog01();
  }
  }
  
  function removeAorB(prefectA, prefectB){

  document.querySelector("#onlytwoprefects [data-action=remove1] span").textContent =`${prefectA.first}`;
  document.querySelector("#onlytwoprefects [data-action=remove2] span").textContent = `${prefectB.first}`;


  document.querySelector("#onlytwoprefects").classList.remove("hide");
  document.querySelector("#onlytwoprefects .closebutton").addEventListener("click", closeDialog01);
  document.querySelector("#onlytwoprefects [data-action=remove1]").addEventListener("click", clickRemoveA);
  document.querySelector("#onlytwoprefects [data-action=remove2]").addEventListener("click", clickRemoveB);

  // if ignore, do nothing
  function closeDialog01(){
      document.querySelector("#onlytwoprefects").classList.add("hide");
  document.querySelector("#onlytwoprefects .closebutton").removeEventListener("click", closeDialog01);
  document.querySelector("#onlytwoprefects [data-action=remove1]").removeEventListener("click", clickRemoveA);
  document.querySelector("#onlytwoprefects [data-action=remove2]").removeEventListener("click", clickRemoveB);
  }

  function clickRemoveA(){
      removePrefect(prefectA);
      createPrefect(selectedStudent);
      CombineList();
      closeDialog01();
  }

  function clickRemoveB(){
  // else - if removeB
  removePrefect(prefectB);
  createPrefect(selectedStudent);
  CombineList();
  closeDialog01();
  }
   
}

function removePrefect(prefectstudent){

  prefectstudent.prefect = false;
}

function createPrefect(student){
  student.prefect = true;
}
}




