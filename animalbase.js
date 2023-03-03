"use strict";

// document.querySelectorAll(".filter").addEventListener("click", klick); 



window.addEventListener("DOMContentLoaded", start);







let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

// document.querySelectorAll(".filter").forEach((evt) => { evt.addEventListener("click", klickbait);
// });

// function klickbait(evt) {
//     // 'evt' is declared but its value is never read.ts(6133)

// }


function start() {


    // Add event-listeners to filter buttons
    document.querySelectorAll(".filter").forEach((filter) => {
        filter.addEventListener("click", function() {
            let animalType = this.dataset.filter;
            let filteredAnimals = filterAnimals(animalType, allAnimals);
 
            displayList(filteredAnimals);
            
        });
        
    });

    loadJSON();
    
}

function filterAnimals(type, animals) {
    if (type === "*") {
        return animals;
 
    } else {
        return animals.filter((animal) => animal.type === type);
    }

}


function filter1Animals() {
    allAnimals.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  
    displayList(allAnimals);
  }





// function start1() {

// document.querySelector('[data-sort="name"]').forEach((zok) => {
//     zok.addEventListener("click", sortAnimals());

// });

// }

// function sortAnimals() {
//     return animalList.sort((a, b) => {
//         if (a.name < b.name) {
//             return -1;
//         }
//         if (a.name > b.name) {
//             return 1;
//         }
//         return 0;
//     });
// }




function start1() {
    document.querySelectorAll('[data-action="sort"]').forEach((zok) => {
      zok.addEventListener("click", function() {



    let animalName = this.dataset.sort;
    let filtered1Animals = filter1Animals(animalName, allAnimals);

    displayList(filtered1Animals);
})
});

}

  
  
  function filter1Animals() {
    allAnimals.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  
    displayList(allAnimals);
  }













async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects(jsonData);

}

function prepareObjects(jsonData) {
    allAnimals = jsonData.map(prepareObject);

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);

}   

function prepareObject(jsonObject) {

    const animal = Object.create(Animal);

    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;

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

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}
