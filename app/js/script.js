document.addEventListener("DOMContentLoaded", () => {

    // Select the Elements
    const clear = document.querySelector('.clear'),
          dateElement = document.querySelector('.date'),
          list = document.querySelector('.list'),
          input = document.querySelector('.add-item__input'),
          add =  document.querySelector('.add-item__circle');

    // Classes names
    const ACTIVE = 'active';

    // Variables
    let LIST, id;

    /* ----------------------------------------------- */

    function checkData() {
        // from localStorage
        let data = localStorage.getItem('TODO');  

        // check localStorage
        if(data) {
            LIST = JSON.parse(data);
            id = LIST.length;
            loadList(LIST);
        } else {
            LIST = [];
            id = 0;
        }
    }

    function cleadData () {
        localStorage.clear();
        location.reload();
    }

    // load items from localStorage
    function loadList(array) {
        array.forEach((item) => {
            addToDo(item.name, item.id, item.done, item.trash);
        });
    }

    function showTime(box) {
        const options = {weekday : "long", month:"short", day:"numeric"};
        const today = new Date();
             
        box.innerText = today.toLocaleDateString('en-US', options);
    }

    function addItem() {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // to localStorage
            localStorage.setItem('TODO', JSON.stringify(LIST));
            id++;
        }
        input.value = ''; 
    }


    function addToDo(toDo, id, done, trash) { 
        if(trash){ return; }

        const DONE = done ? ACTIVE : '';
        const listItem =   `<li class="list-item ${DONE}">
                                <div class="list-item__circle" job="complete" id="${id}"></div>
                                <p class="list-item__task">${toDo}</p>
                                <img src="img/content/delete.svg" class="list-item__delete" job="delete" id="${id}">
                            </li>`;
        const position = 'beforeend';

        list.insertAdjacentHTML(position, listItem);
    }

    function completeToDo (element) {
        element.parentNode.classList.toggle(ACTIVE);

        LIST[element.id].done = LIST[element.id].done ? false : true;
    }

    function removeToDo (element) {
        element.parentNode.parentNode.removeChild(element.parentNode);

        LIST[element.id].trash = true; 
    }

    function checkCkick(element) {
        if (element.attributes.job) {
            const elementJob = element.attributes.job.value;

            if (elementJob == 'complete') {
                completeToDo(element);
            } else if (elementJob == 'delete') {
                removeToDo(element);
            }
            // to localStorage
            localStorage.setItem('TODO', JSON.stringify(LIST));
        }
    }

    /* ----------------------------------------------- */

    showTime(dateElement);

    checkData();

    clear.addEventListener('click', () => cleadData() );

    add.addEventListener('click', () => addItem() );

    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            addItem();
        }
    });

    list.addEventListener('click', (e) => {
        let element = e.target;

        checkCkick(element);
    });
});