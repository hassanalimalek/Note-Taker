// Overlay
let overlay_exit = document.querySelector('.overlay_exit_btn');
let overlay = document.querySelector('.overlay')

// Add and Edit Form
let add_note_btn = document.querySelector('.add_note_btn');
let notes_row = document.querySelector('.notes_row');
let note_form = document.querySelector('.note_form');
let note_submit_btn = document.querySelector('.note_submit_btn');
let note_edit_form = document.querySelector('.note_edit_form')
let note_edit_overlay = document.querySelector('.note_edit_overlay');
let note_changes_submit = document.querySelector('.note_changes_submit');
let loading_animation = document.querySelector('.loading_animation');


// Get current date ()
let get_date =()=>{
  var date = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Show latest notes func.
let showNotes = ()=>{
  let cur_date = get_date();
  saved_notes_arr = localStorage.getItem("allnotes");
  notes_row.innerHTML = '';
  JSON.parse(saved_notes_arr).map((note_obj)=>{
    let new_note = `<div class="col-12 col-sm-6 col-md-4 mb-4">
  <div class="card">
      <div class="card-header">
        <div class="card-header_title">
          <h3>${note_obj.title}</h3>
          <div class="card-header_icons">
          <i id = ${note_obj.id} class="far fa-edit edit_icon note_icon"></i>
          <i id = ${note_obj.id} class="fas fa-trash-alt note_icon delete_icon"></i>
        </div>
        </div>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p style="white-space: pre-line">${note_obj.description}</p>
          <footer class="blockquote-footer mt-2">${cur_date}</footer>
        </blockquote>
      </div>
    </div>
  </div>`
    notes_row.insertAdjacentHTML("afterbegin", new_note);
  })
  
}


// Getting Notes from local Storage.
var saved_notes_arr = JSON.parse(localStorage.getItem('allNotes'));
if(saved_notes_arr){
  showNotes();
}
else{
  let obj = {
    id:'test',
    title:'Test Note',
    description:`
    Welcome to Note Taker
    Your go-to app for taking notes.
    1) Click on plus icon to add a new note.
    2) Click on edit icon to edit a note.
    3) Trash Icon to delete a note`
  }
  let arr = [obj];
  localStorage.setItem("allnotes",JSON.stringify(arr));
  showNotes();
  
}

// Animation Close timeout
setTimeout(function(){
  loading_animation.style.display = 'none';
},2000)


// Edit Note and Delete Note
let edit_note_id = null;
notes_row.addEventListener('click', (e)=>{
  saved_notes_arr = JSON.parse(localStorage.getItem("allnotes"));
  edit_note_id = (e.target.id);
  if(e.target.classList.contains('fa-edit')){
    let found_note = saved_notes_arr.find((note_obj)=>{
      return note_obj.id === edit_note_id;
    })
    note_edit_form.note_title.value = found_note.title;
    note_edit_form.note_description.value = found_note.description;
    note_edit_overlay.style.display='block'
  }
  if(e.target.classList.contains('fa-trash-alt')){
    
    // Finding Index of object to make changes
    let objIndex = saved_notes_arr.findIndex((obj)=>obj.id == edit_note_id);
    // Making Changes
    saved_notes_arr.splice(objIndex, 1);
    localStorage.setItem("allnotes",JSON.stringify(saved_notes_arr));
    showNotes();
  }
})

// Note Changes Submission
note_changes_submit.addEventListener('click',(e)=>{
  e.preventDefault();
  // User Inputs
  let note_title = note_edit_form.note_title.value;
  let note_description = note_edit_form.note_description.value;
  // Array of objects in local storage
  saved_notes_arr = JSON.parse(localStorage.getItem("allnotes"));
  // Finding Index of object to make changes
  let objIndex = saved_notes_arr.findIndex((obj)=>obj.id == edit_note_id);
  // Making Changes
  saved_notes_arr[objIndex].title =note_title;
  saved_notes_arr[objIndex].description =note_description;
  localStorage.setItem("allnotes",JSON.stringify(saved_notes_arr));
  showNotes();
  note_edit_overlay.style.display='none';
})


// Overlay Open & Close
overlay_exit.addEventListener('click',()=>{
    overlay.style.display = 'none';
})
add_note_btn.addEventListener('click',()=>{
  overlay.style.display='block'    
})
let note_edit_exit_btn  = document.querySelector('.note_edit_exit_btn')
note_edit_exit_btn.addEventListener('click',()=>{
  note_edit_overlay.style.display='none'
})


// New Note Form Submission
note_submit_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    let note_title = note_form.note_title.value;
    let note_description = note_form.note_description.value;
    let randNumber = Math.round(Math.random() * 999);
    let id = note_title + randNumber;
    let obj = {
      id: id,
      title: note_title,
      description: note_description
    }
    saved_notes_arr = JSON.parse(localStorage.getItem("allnotes"));
    let arr = (saved_notes_arr);
    arr.push(obj);
    localStorage.setItem("allnotes",JSON.stringify(arr));
    showNotes();
    overlay.style.display = 'none';
    note_form.reset();
})



