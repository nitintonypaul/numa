//SCRIPT TO CONTROL TO-DO LIST. ADDS/REMOVES ITEMS FROM TO-DO LIST

//Caching a few DOM elements for easier use
const addButton = document.getElementById('add-todo');
var todocounter = 1;
const prompt = document.getElementById('todo-prompt');
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');
const listsContainer = document.getElementById('lists-container');

//Update state to show or hide the "empty" message  based on list items
function updateState() {

    //Obtaining list element classes and the empty message container
    const elements = document.querySelectorAll('.list');
    const emptyContainer = document.getElementById('empty-container');

    //If no list elements are present in the TO-DO
    if (elements.length === 0) {
        emptyContainer.style.display = 'flex';
        emptyContainer.style.opacity = 1;
    }
    //If elements are present
    else {
        emptyContainer.style.display = 'none';
        emptyContainer.style.opacity = 0;
    }
}

//Displaying deck for adding a new TO-DO item
addButton.addEventListener('click', () => {
    prompt.style.display = "flex";
    document.getElementById('cover').style.display = 'flex';
});

//Handling SAVE button
saveButton.addEventListener('click', () => {

    //Obtaining trimmed todo value
    const val = document.getElementById('todo-input').value.trim();

    //Checking for empty input
    if (val === "") {

        //Setting values to empty string by default
        document.getElementById('todo-input').value = "";
        prompt.style.display = "none";
        document.getElementById('cover').style.display = 'none';

        //Exiting the function
        return true;
    }

    //Adding TO-DO item with a random ID
    //RANDOM ID IS DEPENDENT ON DATE. IF THE TODO IS ADDED EXTREMELY FAST, THEN THIS VALUE WILL BE SAME WHICH RESULTS IN CONFLICINT IDs. CHANGE WHEN POSSIBLE.
    //For my dear reader, don't worry it's not that series. Only problem when it is automated. Ok?    ;)
    const newItem = document.createElement("div");
    newItem.classList.add("list");
    newItem.id = `todo-${Date.now()}`;

    //Saving item to Local Storage
    localStorage.setItem(newItem.id, val);


    //BELOW PROGRAMS ARE A DUPLICATE. THE SAME ID IS FETCHED AGAIN SINCE THE PROGRAM RUNS ALMOST SIMULTANEOUSLY SO NOTHING TOO MUCH TO WORRY HERE.
    //BUT FUTURE NITIN, PLEASE TAKE A LOOK FOR TESTING.
    //Obtaining the date
    const rn = Date.now();

    //Updating in the website
    newItem.innerHTML = `
        <input type="checkbox" id="todo${rn}" name="todo${rn}">
        <label for="todo${rn}">${val}</label>
    `;

    //Closing deck after setting the input values to empty string
    document.getElementById('todo-input').value = "";
    prompt.style.display = "none";
    document.getElementById('cover').style.display = 'none';

    //Appending TO-DO item to the TO-DO container
    document.getElementById('lists-container').appendChild(newItem);

    //Updating state (checking if the empty message should be shown)
    updateState();
});

//Handling CANCEL button
cancelButton.addEventListener('click', () => {

    //Setting deck input to empty string and closing
    document.getElementById('todo-input').value = "";
    prompt.style.display = "none";
    document.getElementById('cover').style.display = 'none';
});

//Removing TO-DO item on checkbox check
listsContainer.addEventListener("change", function (e) {

    //Checking whether the TO DO item is checked and if it is a checkbox
    if (e.target && e.target.type === "checkbox" && e.target.checked) {

        //Finding the closest class of list, which is the item itself
        const todoItem = e.target.closest(".list");

        //Slowly fading out the TO-DO item for a smoother effect
        //QOL VISUAL EFFECT IS TO SHRINK THE TO DO ITEM SO THAT THE LIST DOESNT SNAP TO THEIR NEW POSITION IMMEDIATELY.
        if (todoItem) {

            //Fading
            todoItem.style.transition = "opacity 1.5s ease";
            todoItem.style.opacity = 0;

            //Removing Item after fade effect
            setTimeout(() => {

                //Removing from the website
                todoItem.remove();

                //Removing from localStorage
                localStorage.removeItem(todoItem.id);

                //Updating state. Checking whether empty message should be shown
                updateState();
            }, 1500);
        }
    }
});
