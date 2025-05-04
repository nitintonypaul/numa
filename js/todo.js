//TODO LIST JS
//Variables
const addButton = document.getElementById('add-todo')
var todocounter = 1
const prompt = document.getElementById('todo-prompt')

//TODO LIST PROGRAM
//Adding an element

function updateState() {
    const elements = document.querySelectorAll('.list')
    const emptyContainer = document.getElementById('empty-container')

    if (elements.length == 0) {
        emptyContainer.style.display = 'flex'
        emptyContainer.style.opacity = 1
    }
    else {
        emptyContainer.style.display = 'none'
        emptyContainer.style.opacity = 0
    }
}

addButton.addEventListener('click',  () => {

    //Changing appearance of prompt
    prompt.style.display = "flex"
    document.getElementById('cover').style.display = 'flex'

    document.getElementById('save').addEventListener('click', () => {

        //Obtaining Value
        var val = document.getElementById('todo-input').value
        

        //Checking for Null Entry
        if (val.trim() == "") {
            document.getElementById('todo-input').value = ""
            document.getElementById('todo-prompt').style.display = "none"
            document.getElementById('cover').style.display = 'none'
            return true
        }

        //Else case, but I didn't give else cuz I was lazy
        const newItem = document.createElement("div")
        newItem.classList.add("list")
        newItem.id = `todo-${Date.now()}`

        //Updating chrome storage
        /*For Chrome Extension
        chrome.storage.local.set({newItem.id: val}, () => {
            console.log("TO DO has been updated")
        })*/

        //Updating Local Storage
        localStorage.setItem(newItem.id, val)

        //Random ID generator
        var rn = Date.now()

        //Defining the List
        newItem.innerHTML = `
        <input type="checkbox" id="todo${rn}" name="todo${rn}"">
        <label for="todo${rn}">${val}</label><br>
        `

        //Wrapping up and appending List
        document.getElementById('todo-input').value = ""
        document.getElementById('todo-prompt').style.display = "none"
        document.getElementById('cover').style.display = 'none'
        list.appendChild(newItem)

       updateState()
    })
})

//Cancelling Process
document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('todo-input').value = ""
    document.getElementById('todo-prompt').style.display = "none"
    document.getElementById('cover').style.display = 'none'
})

//Removing To Do Item
document.getElementById("lists-container").addEventListener("change", function(e) {

    //Checking for checkbox checked?
    if (e.target && e.target.type === "checkbox" && e.target.checked) {
        
        
        //Locating closest .list
        const todoItem = e.target.closest(".list")

        //Checking availability and removal of item
        if (todoItem) {
            todoItem.style.transition = "opacity 1.5s ease"
            todoItem.style.opacity = 0
            
            //Removing Item after Visual Cue
            setTimeout(() => {
                todoItem.remove()
                localStorage.removeItem(todoItem.id)

                const elements = document.querySelector('list')

                //Chrome Storage
                //chrome.storage.local.remove(todoItem.id);
                
                updateState()

            }, 1500);

        }
    }
})
