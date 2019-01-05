function createElement(tag, props, ...children) {
    const element = document.createElement(tag);
    
    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if(typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }

    return element;
}

function createTodoItem(num, option) {    
    if (option == 'spending') {
        optionText = 'Рассход - ';
    } else {
        optionText = 'Доход - ';
    }

    const label = createElement('label', { className: 'option' }, optionText);
    const number = createElement('label', { className: 'title ' + option }, num);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });
    const editButton = createElement('button', { className: 'edit' }, 'Изменить');
    const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
    const listItem = createElement('li', { className: 'todo-item' }, label, number, editInput, editButton, deleteButton);


    bindEvents(listItem);

    return listItem;
}

function calcSumm() {
    let Summ = 0;
    
    document.querySelectorAll('.income').forEach(function(item) {
        Summ += Number(item.innerHTML);
      });

    document.querySelectorAll('.spending').forEach(function(item) {
        Summ -= Number(item.innerHTML);
      });

    document.getElementById('NumSumm').innerHTML = Summ; 
}

function bindEvents(todoItem) {
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();
    
    if (addInput.value === '') return alert('Необходимо ввести значение');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "database.php?addInput=" + addInput.value + "&addOption=" + addOption.value, true);
    xmlhttp.send();

    const todoItem = createTodoItem(addInput.value, addOption.value);
    todoList.appendChild(todoItem);
    addInput.value = '';

    calcSumm();
}

function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Изменить';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Сохранить';
    }

    listItem.classList.toggle('editing');
    calcSumm();
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
    calcSumm();
    
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const addOption = document.getElementById('add-option');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));

    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            const arrJson = JSON.parse( this.responseText );
            arrJson.forEach(function(obj) {
                const todoItem = createTodoItem(obj.amount, obj.type);
                todoList.appendChild(todoItem);
            });

            calcSumm();
        }
    };
    xmlhttp.open("GET", "database.php", true);
    xmlhttp.send();
}

main();