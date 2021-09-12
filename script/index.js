function getNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        localStorage.setItem('notes', JSON.stringify([]))
        return [];
    }
    return JSON.parse(notes);
}

function addNote(title, description){
    let notes = getNotes()
    notes.push([title, description])
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
}

function deleteNote(index){
    let notes = getNotes()
    notes.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    updateList()
}

function updateList(){
    let notes = getNotes();
    let container = document.getElementById('notesContainer')
    if(notes.length === 0) {
        container.innerHTML = '<h1 class="note-title" style="color: grey;">No notes here. (yet)</h1>'
        return;
    }
    container.innerHTML = ''

    notes.forEach((element, index) => {
        container.innerHTML += `
        <div class="note">
            <h1 class="note-title">${element[0]}</h1>
            <hr>
            <p class="note-overview">${element[1]}</p>
            <div class="note-actions">
                <button class="qn-btn qn-btn-primary">View Note</button>
                <button class="qn-btn qn-btn-danger" onclick="deleteNote(${index})">Delete Note</button>
            </div>
        </div>
        `    
    })
}

let submitter = document.getElementById('noteAddSubmit');
submitter.addEventListener('click', () => {
    title = document.getElementById('noteTitle')
    description = document.getElementById('noteDescription')
    addNote(title.value, description.value)
})

updateList()

document.addEventListener('keydown', (ev) => {
    if(ev.key === '+'){
        btn = document.getElementById('noteAddBtn')
        btn.click()
    }
})