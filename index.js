let overlay_exit = document.querySelector('.overlay_exit_btn');
let overlay = document.querySelector('.overlay')


let add_note_btn = document.querySelector('.add_note_btn');
let notes_row = document.querySelector('.notes_row');
let note_form = document.querySelector('.note_form');
let note_submit_btn = document.querySelector('.note_submit_btn');

let note_edit_form = document.querySelector('.note_edit_form')
let note_edit_overlay = document.querySelector('.note_edit_overlay');
let note_changes_submit = document.querySelector('.note_changes_submit');
// loading animation
let loading_animation = document.querySelector('.loading_animation');


// Getting Notes from local Storage.
var saved_notes = localStorage.getItem('allNotes');
if(saved_notes){
  notes_row.innerHTML = saved_notes;
}

setTimeout(function(){
  loading_animation.style.display = 'none';
},2000)

// Get current date ()
let get_date =()=>{
  var date = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Edit Note and Delete Note
let edit_note_ref = null;
notes_row.addEventListener('click', (e)=>{
  console.log("Clicked note edit ")
  if(e.target.classList.contains('fa-edit')){
    console.log("Edit Clicked!!!")
    edit_note_ref = (e.target.parentElement.parentElement.parentElement.parentElement);
    let description = e.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerText;
    let title = e.target.parentElement.parentElement.firstElementChild.innerText;
    note_edit_form.note_title.value = title;
    note_edit_form.note_description.value = description;
    note_edit_overlay.style.display='block'
  }
  if(e.target.classList.contains('fa-trash-alt')){
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    let notes_row = document.querySelector('.notes_row');
    localStorage.setItem("allNotes",notes_row.innerHTML);
  }
})

// Submitting Note Changes 
note_changes_submit.addEventListener('click',(e)=>{
  e.preventDefault();
  let note_title = note_edit_form.note_title.value;
  let note_description = note_edit_form.note_description.value;
  edit_note_ref.innerHTML = `<div class="card-header">
  <div class="card-header_title">
    <h3>${note_title}</h3>
    <div class="card-header_icons note_icon">
       <i class="far fa-edit note_icon"></i>
       <i class="fas fa-trash-alt"></i>
    </div>
  </div>
</div>
<div class="card-body">
  <blockquote class="blockquote mb-0">
    <p style="white-space: pre-line">${note_description}</p>
    <footer class="blockquote-footer mt-2">15 March</footer>
  </blockquote>
</div>`
  note_edit_overlay.style.display='none';
  let notes_row = document.querySelector('.notes_row');
  console.log(notes_row);
  localStorage.clear();
  localStorage.setItem("allNotes",notes_row.innerHTML);
})


// Overlay Open & Close
overlay_exit.addEventListener('click',()=>{
    console.log("Exit Button Clicked")
    overlay.style.display = 'none';
})
add_note_btn.addEventListener('click',()=>{
  console.log("Plus Clicked")
  overlay.style.display='block'    
})
let note_edit_exit_btn  = document.querySelector('.note_edit_exit_btn')
note_edit_exit_btn.addEventListener('click',()=>{
  note_edit_overlay.style.display='none'
})

// New Note Form Submit
note_submit_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("Submitting Form")
    let note_title = note_form.note_title.value;
    let note_description = note_form.note_description.value;
    console.log(note_title, note_description)
    let cur_date = get_date();
    let new_note = `<div class="col-12 col-sm-6 col-md-4 mb-4">
    <div class="card">
        <div class="card-header">
          <div class="card-header_title">
            <h3>${note_title}</h3>
            <div class="card-header_icons note_icon">
               <i class="far fa-edit note_icon"></i>
               <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p style="white-space: pre-line">${note_description}</p>
            <footer class="blockquote-footer mt-2">${cur_date}</footer>
          </blockquote>
        </div>
      </div>
    </div>`
    notes_row.insertAdjacentHTML("afterbegin", new_note);
    localStorage.setItem("allNotes",notes_row.innerHTML);
    overlay.style.display = 'none';
    note_form.reset();
})



