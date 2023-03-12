

function cretaeClickInqui(selectedStudent1){
  const prefects1 = allStudents.filter(student => student.prefect)
  console.log(prefects1);  
  const numberOfPrefects1 = prefects1.length;
  const studentToRemove1 = prefects1.filter(student => student.house === selectedStudent1.house ).shift();

  if (studentToRemove1 !== undefined){


    removeStudentz1(studentToRemove1);
  } else if (numberOfPrefects1 >= 4){

      removeAorB(prefects1[0], prefects1[1]);
  




  }


  createPrefect1(selectedStudent1);
  function removeStudentz1(studentToRemove1){
  // show name on button
  document.querySelector("#only-pure-blood p button span").textContent =`${studentToRemove1.first}`;


  document.querySelector("#only-pure-blood").classList.remove("hide1");
  document.querySelector("#only-pure-blood.closebutton").addEventListener("click", closeDialog01);
  document.querySelector("#only-pure-blood p button").addEventListener("click", clickremoveStudentz1);

  function closeDialog01(){
  document.querySelector("#only-pure-blood").classList.add("hide1");
  document.querySelector("#only-pure-blood.closebutton").removeEventListener("click", closeDialog01);
  document.querySelector("#only-pure-blood p button").removeEventListener("click", clickremoveStudentz1);
  }

  function clickremoveStudentz1(){
  removePrefect(studentToRemove1);
  createPrefect1(selectedStudent1);
  CombineList();
  closeDialog01();
  }
  }
  
  function removeAorB(prefectA, prefectB){

  document.querySelector("#only-pure-blood[data-action=remove1] span").textContent =`${prefectA.first}`;
  document.querySelector("#only-pure-blood[data-action=remove2] span").textContent = `${prefectB.first}`;


  document.querySelector("#only-pure-blood").classList.remove("hide1");
  document.querySelector("#only-pure-blood.closebutton").addEventListener("click", closeDialog01);
  document.querySelector("#only-pure-blood[data-action=remove1]").addEventListener("click", clickRemoveA);
  document.querySelector("#only-pure-blood[data-action=remove2]").addEventListener("click", clickRemoveB);

  // if ignore, do nothing
  function closeDialog01(){
      document.querySelector("#only-pure-blood").classList.add("hide1");
  document.querySelector("#only-pure-blood.closebutton").removeEventListener("click", closeDialog01);
  document.querySelector("#only-pure-blood[data-action=remove1]").removeEventListener("click", clickRemoveA);
  document.querySelector("#only-pure-blood[data-action=remove2]").removeEventListener("click", clickRemoveB);
  }

  function clickRemoveA(){
      removePrefect(prefectA);
      createPrefect1(selectedStudent1);
      CombineList();
      closeDialog01();
  }

  function clickRemoveB(){
  // else - if removeB
  removePrefect(prefectB);
  createPrefect1(selectedStudent1);
  CombineList();
  closeDialog01();
  }
   
}

function removePrefect(prefectstudent1){

  prefectstudent1.prefect = false;
}

function createPrefect1(student){
  student.prefect = true;
}
}













// chatgp

function removePrefect(prefectStudent) {
  prefectStudent.prefect = false;
}

function setPrefect(prefectStudent) {
  prefectStudent.prefect = true;
}

function removeStudentDialog(studentToRemove, dialogId) {
  document.querySelector(`#${dialogId} p button span`).textContent = `${studentToRemove.first}`;
  document.querySelector(`#${dialogId}`).classList.remove("hide");
  document.querySelector(`#${dialogId} .closebutton`).addEventListener("click", closeDialog);
  document.querySelector(`#${dialogId} p button`).addEventListener("click", clickRemoveStudent);

  function closeDialog() {
    document.querySelector(`#${dialogId}`).classList.add("hide");
    document.querySelector(`#${dialogId} .closebutton`).removeEventListener("click", closeDialog);
    document.querySelector(`#${dialogId} p button`).removeEventListener("click", clickRemoveStudent);
  }

  function clickRemoveStudent() {
    removePrefect(studentToRemove);
    setPrefect(selectedStudent);
    CombineList();
    closeDialog();
  }
}

function removeAorBDialog(prefectA, prefectB, dialogId) {
  document.querySelector(`#${dialogId} [data-action=remove1] span`).textContent = `${prefectA.first}`;
  document.querySelector(`#${dialogId} [data-action=remove2] span`).textContent = `${prefectB.first}`;
  document.querySelector(`#${dialogId}`).classList.remove("hide");
  document.querySelector(`#${dialogId} .closebutton`).addEventListener("click", closeDialog);
  document.querySelector(`#${dialogId} [data-action=remove1]`).addEventListener("click", clickRemoveA);
  document.querySelector(`#${dialogId} [data-action=remove2]`).addEventListener("click", clickRemoveB);

  function closeDialog() {
    document.querySelector(`#${dialogId}`).classList.add("hide");
    document.querySelector(`#${dialogId} .closebutton`).removeEventListener("click", closeDialog);
    document.querySelector(`#${dialogId} [data-action=remove1]`).removeEventListener("click", clickRemoveA);
    document.querySelector(`#${dialogId} [data-action=remove2]`).removeEventListener("click", clickRemoveB);
  }

  function clickRemoveA() {
    removePrefect(prefectA);
    setPrefect(selectedStudent);
    CombineList();
    closeDialog();
  }

  function clickRemoveB() {
    removePrefect(prefectB);
    setPrefect(selectedStudent);
    CombineList();
    closeDialog();
  }
}

function createPrefect(selectedStudent) {
  const prefects = allStudents.filter(student => student.prefect);
  console.log(prefects);
  const prefectsInHouse = prefects.filter(student => student.house === selectedStudent.house);
  const numberOfPrefects = prefects.length;
  const numberOfPrefectsInHouse = prefectsInHouse.length;

  if (numberOfPrefectsInHouse > 1) {
    removeStudentDialog(prefectsInHouse[0], "onlytwoprefects");
  } else if (numberOfPrefects >= 2) {
    removeAorBDialog(prefects[0], prefects[1],
