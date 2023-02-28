"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

function start( ) {
    // console.log("ready");

    loadJSON();
}


const Students = {
    first:"",
    last:"",
    middle: "", 
    nickName:"",
    House:"",
    image:""
}; 


function loadJSON() {
    fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then( response => response.json() )
    .then( jsonData => {
        // when loaded, prepare objects
        prepareObjects( jsonData );
        // console.log(jsonData);
    });

}



function prepareObjects( jsonData ) {
    jsonData.forEach( jsonObject => {
        const Student = Object.create(Students);
        // let text = jsonObject.fullname;
        let fullName = jsonObject.fullname; 

       let firstnameResult = "";

 let fullnameTrim = fullName.trim();

 let first= "";

 console.log(fullnameTrim);

    firstnameResult = fullnameTrim.substring(0, fullnameTrim.indexOf(" "));
    

    firstnameResult=firstnameResult.charAt(0).toUpperCase() + firstnameResult.slice(1).toLowerCase(); 

    Student.first=firstnameResult; 

    console.log(first);
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
    let lastnameHyphen = lastName.split("-");
    // * console.log(lastnameHyphen);
    lastName = lastnameTrim;
  } else {
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  }

//   console.log(lastName);
Student.last=lastName; 

let nickName=""; 

let nick=fullName.substring(fullName.indexOf(`"`), fullName.lastIndexOf(`"`)+1); 



nick=nick.replace(/"/g, ''); 
nick=nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase(); 


Student.nickName=nick; 
// console.log(nick);


let House=""; 
let house = jsonObject.house;
    let houseName = "";
    let houseTrim = house.trim();
    //* console.log(houseTrim);

    houseName = houseTrim.substring();
    
    houseName=houseName.charAt(0).toUpperCase() + houseName.slice(1).toLowerCase(); 
    Student.House=houseName; 
    // console.log(houseName); 





    
    // // This is the concatenation for the house data
    // Student.house = houseResult.charAt(0).toUpperCase() + houseResult.slice(1).toLowerCase();
let image="";
    let imageSrc = new Image(100, 100);

    // Defines the student image as imageSrc
    Student.image=imageSrc ;
    // Makes the last name lower case
    let lastnameL = lastName.toLowerCase();
    // Takes the first letter of the firstname and makes it lower case
    let firstnameL = firstnameResult.charAt(0).toLowerCase();
    // Defines the image src
    imageSrc.src = "images/" + lastnameL + "_" + firstnameL + ".png" ;
console.log(imageSrc); 
    


Student.image=imageSrc; 
    // Pushes the objects into the array










allStudents.push(Student);
          



        // TODO: Create new object with cleaned data - and store that in the allStudents array
        
        // TODO: MISSING CODE HERE !!!
    });

    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allStudents.forEach( displayStudent );
}

function displayStudent(allStudents) {
    // create clone
    const clone = document.querySelector("template#Studentz").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=firstname]").textContent = allStudents.first;
    clone.querySelector("[data-field=secondname]").textContent = allStudents.last;
    clone.querySelector("[data-field=nick]").textContent = allStudents.nickName;
    clone.querySelector("[data-field=middle]").textContent = allStudents.middle;
    clone.querySelector("[data-field=house]").textContent = allStudents.House;
  
    // clone.querySelector("[data-field=Image]").src= allStudents.image.src;


    clone.querySelector("#studentImage").src = allStudents.image.src;





    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
    
}




