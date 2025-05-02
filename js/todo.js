//TODO LIST JS
//Variables
const addButton = document.getElementById('add-todo')
const list = document.getElementById('lists-container')
var todocounter = 1
const prompt = document.getElementById('todo-prompt')

//Loading Contents on Arrival from localStorage 
for (let i = 0; i < localStorage.length; i++) {
    
    //Obtaining key and value
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)

    //Loading Items
    const loadedItem = document.createElement("div")
    loadedItem.classList.add("list")
    loadedItem.id = `${key}`

    //Random ID generator
    var rn = Date.now()

    //Defining List
    loadedItem.innerHTML = `
    <input type="checkbox" id="todo${rn}" name="todo${rn}">
    <label for="todo${rn}">${value}</label><br>
    `
    //Appending 
    list.appendChild(loadedItem)
}

/*For Chrome Storage
chrome.storage.local.get(null, function(items) {
  for (const [key, value] of Object.entries(items)) {

    //Loading Items
    const loadedItem = document.createElement("div")
    loadedItem.classList.add("list")
    loadedItem.id = `${key}`

    //Random ID generator
    var rn = Date.now()

    //Defining List
    loadedItem.innerHTML = `
    <input type="checkbox" id="todo${rn}" name="todo${rn}">
    <label for="todo${rn}">${value}</label><br>
    `
    //Appending 
    list.appendChild(loadedItem)

  }
});
*/

//Adding an element
addButton.addEventListener('click',  () => {

    //Changing appearance of prompt
    prompt.style.display = "flex"

    document.getElementById('save').addEventListener('click', () => {

        //Obtaining Value
        var val = document.getElementById('todo-input').value
        

        //Checking for Null Entry
        if (val.trim() == "") {
            document.getElementById('todo-input').value = ""
            document.getElementById('todo-prompt').style.display = "none"
            return true
        }

        //Else case, but I didn't give else cuz I was lazy
        const newItem = document.createElement("div")
        newItem.classList.add("list")
        newItem.id = `todo-${Date.now()}`

        //Updating chrome storage
        /*For Chrome Extension
        chrome.storage.local.set({newItem.id: val}, () => {
            console.log("TO DO has been updated!")
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
        list.appendChild(newItem)

    })
})

//Cancelling Process
document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('todo-input').value = ""
    document.getElementById('todo-prompt').style.display = "none"
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

                //Chrome Storage
                //chrome.storage.local.remove(todoItem.id);

            }, 1500);

        }
    }
})