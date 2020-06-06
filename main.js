let button = document.querySelector('.btn');
let form = document.getElementById('form');
let task = document.getElementById('task');
let colorpicker = document.getElementById('favcolor');
let title = document.getElementById('title');
let test = document.getElementById('test');
let row = document.getElementById('row');
let error_msg = document.getElementById('error-msg');
let alert = document.getElementById('alert');

let todoItems = [];

function addNote(title, text, color) {
    const todo = {
        title,
        text,
        id: Date.now(),
        color
    };
    todoItems.push(todo);
    Store.addNotes(todo);
    renderTodo(todo);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let taskValue = task.value;
    let colorValue = colorpicker.value;
    let titleValue = title.value;
    if (taskValue == '') {
        error_msg.innerText = 'This field is required!';
        error_msg.style.color = 'red';
        task.style.border = '2px solid red';
    } else {
        addNote(titleValue, taskValue, colorValue);
        $('#exampleModal').modal('hide');
    }
    task.value = '';
    title.value = '';
})

function renderTodo(todo) {
    row.insertAdjacentHTML('beforeend', `
     <div id='note' data-key="${todo.id}" style="background: ${todo.color};"><i class="fa fa-times-circle-o delete" style="font-size: 25px"></i><br><h2>Title: #${todo.title}</h2><p>${todo.text}</p></div>
    `);
}


row.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

function deleteTodo(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
    localStorage.setItem('notes', JSON.stringify(todoItems));
}


class Store {
    static getNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.map(data => {
            renderTodo(data)
        })
        return notes;
    }
    static addNotes(note) {
        const notes = Store.getNotes();
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

document.addEventListener('DOMContentLoaded', Store.getNotes());

