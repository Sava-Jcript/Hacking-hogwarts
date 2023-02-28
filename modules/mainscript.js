"use strict"

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("Start!");

  sayHello("peter");
}

function sayHello( name ) {
  console.log(`Hello ${capitalize(name)}`);
}