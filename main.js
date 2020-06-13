let button = document.querySelector('.btn');
let form = document.getElementById('form');
let task = document.getElementById('task');
let colorpicker = document.getElementById('favcolor');
let test = document.getElementById('test');
let row = document.getElementById('row');
let error_msg = document.getElementById('error-msg');
let alert = document.getElementById('alert');

let todoItems = [];

function addNote(text, color) {
    const todo = {
        text,
        id: Date.now(),
        color
    };
    todoItems.push(todo);
    Store.addNotes(todo);
    displayToDo(todo);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskValue = task.value;
    let colorValue = colorpicker.value;
    if (taskValue == '') {
        error_msg.innerText = 'This field is required!';
        error_msg.style.color = 'red';
        task.style.border = '2px solid red';
    } else {
        addNote(taskValue, colorValue);
        $('#exampleModal').modal('hide');
    }
    task.value = '';
})

function displayToDo(todo) {
    row.insertAdjacentHTML('beforeend', `
     <div id='note' data-key="${todo.id}" style="background: ${todo.color};"><i class="fa fa-times-circle-o delete" style="font-size: 20px"></i><i class="fa fa-edit edit" style='font-size: 20px'></i><p id='to-do' style='text-align:center; margin-top: 4rem'>${todo.text}</p></div>
    `);
}

// Edit
row.addEventListener('click', event => {
    if (event.target.classList.contains('edit')) {
        $('#exampleModal').modal('show');
        const itemKey = event.target.parentElement.dataset.key;
        // editNote(itemKey);
        let toDo = document.getElementById('to-do');
        let note = document.getElementById('note');
        task.value = toDo.innerHTML;
        var theCSSprop = window.getComputedStyle(note, null).getPropertyValue("background");
        colorpicker.innerHTML = theCSSprop;

    }
});

function editNote(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
}
// End of Edit

row.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
        Store.removeBook(itemKey);
    }
});

function deleteTodo(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
}


class Store {
    static getNotes() {
        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }
        return notes;
    }

    static addNotes(note) {
        const notes = Store.getNotes();
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    static removeBook(id) {
        let notes = Store.getNotes();
        notes.map((note, index) => {
            if (note.id == id) {
                notes.splice(index, 1)
            }
        })

        localStorage.setItem('notes', JSON.stringify(notes));
    }

}

function getNotesUI() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.map(data => {
        displayToDo(data)
    })
}

document.addEventListener('DOMContentLoaded', getNotesUI());

