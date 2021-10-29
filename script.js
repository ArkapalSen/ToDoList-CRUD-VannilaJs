//declaration
let addBtn = document.getElementById("addBtn");
let addTxt = document.getElementById("addTxt");
let editTxt = document.getElementById("editTxt");
let editBtn = document.getElementById("editBtn");
let txtIndex = document.getElementById("txtIndex");
let searchBar = document.getElementById("searchBar");
let noteCard = document.getElementsByClassName("noteCard");
let nav = document.getElementById("navbar");
let deleteAll = document.getElementById("deleteAll");
let deleteBar = document.getElementById("deleteBar");

console.log(noteCard);

let notesObj = [];

//showing notes
function showNotes() {
  addBtn.style.display = "block";
  editBtn.style.display = "none";
  let notes = localStorage.getItem("localNotes");
  if (notes == null) {
    //empty local storage
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //pu1sh value in notesObj array
  }
  if (notesObj == 0) {
    nav.style.display = "none";
    deleteBar.style.display = "none";
  } else {
    nav.style.display = "block";
    deleteBar.style.display = "block";
  }

  let html = "";

  notesObj.forEach((cur, i) => {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                  <div class="card-body">
                      <h5 class="card-title" style="display : none;">Id: ${i}</h5>
                      <p class="card-text">${cur}</p>
                      <button id='${i}' onclick='editNotes(this.id)' class="btn btn-outline-primary mx-2 editBtn">Edit</button>
                      <button id='${i}' onclick='deleteNotes(this.id)' class="btn  btn-outline-danger mx-2 deleteBtn">Delete</button>
                  </div>
              </div>`;
  });
  let notesId = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesId.innerHTML = html;
  } else {
    notesId.innerHTML = `The Todo is empty!! Insert a Task to start!`;
  }
}

showNotes(); //for first time showing after reload

addBtn.addEventListener("click", function (e) {
  let notes = localStorage.getItem("localNotes");
  if (addTxt.value.trim() != 0) {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value); //push value in notesObj array
    localStorage.setItem("localNotes", JSON.stringify(notesObj)); //update the local storage
  }
  addTxt.value = "";
  showNotes();
});

//deleting notes
function deleteNotes(index) {
  let notes = localStorage.getItem("localNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); //desired task to be deleted
  localStorage.setItem("localNotes", JSON.stringify(notesObj)); //need to update the local storage
  showNotes(); //for updation in ui
}

//edit Notes
function editNotes(index) {
  addBtn.style.display = "none";
  editBtn.style.display = "block";
  let notes = localStorage.getItem("localNotes");
  notesObj = JSON.parse(notes);
  addTxt.value = notesObj[index];
  txtIndex.value = index;
}

//edit button
editBtn.addEventListener("click", function () {
  let notes = localStorage.getItem("localNotes");
  notesObj = JSON.parse(notes);

  let index = document.getElementById("txtIndex").value;
  notesObj[index] = addTxt.value;

  localStorage.setItem("localNotes", JSON.stringify(notesObj)); //need to update the local storage
  addTxt.value = "";
  showNotes(); //for updation in ui
});

//search
searchBar.addEventListener("input", function () {
  let inputSearch = searchBar.value;
  // if([...noteCard] == 0){
  //   alert('No ToDo task Present! Please Search after having some task!!..');
  //   searchBar.value='';
  // }
  // else{
  [...noteCard].forEach((elem) => {
    let cardData = elem.getElementsByClassName("card-text")[0].innerText;
    if (cardData.includes(inputSearch)) {
      elem.style.display = "block";
    } else {
      elem.style.display = "none";
    }
  });
  // }
});

//deleteAll
deleteAll.addEventListener("click", function () {
  // let notes = localStorage.getItem("localNotes");
  // notesObj = JSON.parse(notes);
  // if(notesObj == 0){
  //   alert('Nothing To Delete! Add ');
  // }
  // else{
  let confirm = prompt(
    'Do u want to Delete Everything? Press "yes" to delete all, Else "no" to go back'
  );
  if (confirm == "yes") {
    let notes = localStorage.getItem("localNotes");
    notesObj = JSON.parse(notes);
    notesObj = []; //clearing array
    localStorage.setItem("localNotes", JSON.stringify(notesObj)); //setting cleared array in local storage
    showNotes(); //updating ui
  }
  // }
});
