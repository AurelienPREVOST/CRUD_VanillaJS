//SEED D'INITIALISATION
const TODOLIST = [
    {
        id: 1,
        content: "content_1",
        date: Date.now(),
        done: false,
    },
    {
        id: 2,
        content: "content_2",
        date: Date.now(),
        done: true,
    },
    {
        id: 3,
        content: "content_3",
        date: Date.now(),
        done: false,
    },
];

//QUERYSELECTOR
const bodyChildren = document.body.children;
const todoContainer = document.getElementById("todoContainer");
const formulaire = document.getElementById("formulaire");
const submitButton = document.getElementById("submit")
const editSubmit = document.getElementById("editSubmit")
const formContent = document.getElementById("content")
const closeButton = document.getElementById("close")


// ENSEMBLE DES EVENTLISTENER
submitButton.addEventListener("click", addTodo)
const formButtonDisplay = document.getElementById("displayForm").addEventListener("click", displayForm)
closeButton.addEventListener("click", closeForm)
// Ajout de l'écouteur d'événement submit en haut de la page
formulaire.addEventListener("submit", function(e) {
    e.preventDefault();
    // Mettre à jour le contenu de la tâche dans TODOLIST lorsque le formulaire est soumis
    const index = TODOLIST.findIndex(item => item.id === selectedTodo.id);
    if (index !== -1) {
        TODOLIST[index].content = formContent.value;
        console.log("TODO LIST mise à jour :", TODOLIST);
        clearTodoList();
        displayTodoList();
    } else {
        console.log("Tâche non trouvée dans la liste.");
    }
});
//Condamne la touche entré pour evité un sideEffect non souhaité
formulaire.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêcher la soumission du formulaire
    }
});

//ENSEMBLE DES FONCTIONS NECESSAIRES
function displayTodoList() {
    TODOLIST.forEach(todoItem => {
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let paragraph = document.createElement("p");


        let editButton = document.createElement("button");
        editButton.innerHTML = "EDIT";
        editButton.addEventListener("click", function() {
            editTodo(todoItem)
        });

        
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "SUPPRIMER";
        deleteButton.addEventListener("click", function() {
            deleteTodo(todoItem.id)
        });

        let doneCheckBox = document.createElement("input");
        doneCheckBox.type = "checkbox";
        doneCheckBox.addEventListener("change", function(event) {
            doneUndone(event, todoItem);
        });

        if (todoItem.done) {
            doneCheckBox.checked = true;
        }
        todo.appendChild(doneCheckBox);
        
        paragraph.innerHTML = todoItem.content;
        todo.appendChild(paragraph);
        todo.appendChild(editButton);
        todo.appendChild(deleteButton);
        todoContainer.appendChild(todo);
    });
}

function addTodo(e) {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    console.log("coucou");
    let newTask = {
        id: 5,
        content: formContent.value,
        date: Date.now(),
        done: false,
    };
    clearTodoList();
    TODOLIST.push(newTask);
    displayTodoList();
}

function clearTodoList() {
    todoContainer.innerHTML = "";
}

function displayForm() {
    // Ajouter une classe d'opacité à tous les enfants du body sauf "formulaire"
    for (let i = 0; i < bodyChildren.length; i++) {
        if (bodyChildren[i] !== formulaire) {
            bodyChildren[i].classList.add("opacity");
        }
    }
    submitButton.classList.remove("hidden")
    editSubmit.classList.add("hidden")
    formulaireContainer.classList.remove("hidden");
}

function closeForm() {
    for (let i = 0; i < bodyChildren.length; i++) {
        if (bodyChildren[i] !== formulaire) {
            bodyChildren[i].classList.remove("opacity");
        }
    }
    formulaireContainer.classList.add("hidden");
}

function deleteTodo(todoId) {
    const index = TODOLIST.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        TODOLIST.splice(index, 1);
        clearTodoList()
        displayTodoList()
    }
    if (TODOLIST.length < 1) {
        submitButton.classList.remove("hidden")
        editSubmit.classList.add("hidden")
    }
}

function editTodo(todoItem) {
    displayForm();
    submitButton.classList.add("hidden");
    editSubmit.classList.remove("hidden");
    if (todoItem && todoItem.content) {
        formContent.value = todoItem.content;
        selectedTodo = todoItem;
    }
}

function doneUndone(event, todoItem) {
    // Mettre à jour todoItem.done en fonction de l'état de la case à cocher
    todoItem.done = event.target.checked; // return true ou false en fonction
}

displayTodoList()