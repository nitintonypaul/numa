// Variables
const addButton = document.getElementById('add-todo');
var todocounter = 1;
const prompt = document.getElementById('todo-prompt');
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');
const listsContainer = document.getElementById('lists-container');

// Update state to show or hide the empty container based on list items
function updateState() {
    const elements = document.querySelectorAll('.list');
    const emptyContainer = document.getElementById('empty-container');

    if (elements.length === 0) {
        emptyContainer.style.display = 'flex';
        emptyContainer.style.opacity = 1;
    } else {
        emptyContainer.style.display = 'none';
        emptyContainer.style.opacity = 0;
    }
}

// Add a new ToDo item
addButton.addEventListener('click', () => {
    prompt.style.display = "flex";
    document.getElementById('cover').style.display = 'flex';
});

// Handle save button click to create a new item
saveButton.addEventListener('click', () => {
    const val = document.getElementById('todo-input').value.trim();

    // Check for empty input
    if (val === "") {
        document.getElementById('todo-input').value = "";
        prompt.style.display = "none";
        document.getElementById('cover').style.display = 'none';
        return true;
    }

    const newItem = document.createElement("div");
    newItem.classList.add("list");
    newItem.id = `todo-${Date.now()}`;

    // Save to Local Storage
    localStorage.setItem(newItem.id, val);

    //Save to chrome storage
    //chrome.storage.local.set({ [newItem.id]: val }, function() { console.log('Value is set.'); });

    const rn = Date.now();
    newItem.innerHTML = `
        <input type="checkbox" id="todo${rn}" name="todo${rn}">
        <label for="todo${rn}">${val}</label>
    `;

    document.getElementById('todo-input').value = "";
    prompt.style.display = "none";
    document.getElementById('cover').style.display = 'none';
    document.getElementById('lists-container').appendChild(newItem);

    updateState();
});

// Cancel action and hide prompt
cancelButton.addEventListener('click', () => {
    document.getElementById('todo-input').value = "";
    prompt.style.display = "none";
    document.getElementById('cover').style.display = 'none';
});

// Removing ToDo item on checkbox check
listsContainer.addEventListener("change", function (e) {
    if (e.target && e.target.type === "checkbox" && e.target.checked) {
        const todoItem = e.target.closest(".list");

        if (todoItem) {
            todoItem.style.transition = "opacity 1.5s ease";
            todoItem.style.opacity = 0;

            setTimeout(() => {
                todoItem.remove();

                //Removing from localStorage
                localStorage.removeItem(todoItem.id);

                //Removing from chrome storage
                //chrome.storage.local.remove(todoItem.id);

                updateState();
            }, 1500);
        }
    }
});
