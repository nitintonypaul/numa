//TODO LIST JS
//Variables
const addButton = document.getElementById('add-todo')
const list = document.getElementById('lists-container')
var todocounter = 1
const prompt = document.getElementById('todo-prompt')

//Adding an element
addButton.addEventListener('click',  () => {


    prompt.style.display = "flex"

    document.getElementById('save').addEventListener('click', () => {
        var val = document.getElementById('todo-input').value

        if (val.trim() == "") {
            document.getElementById('todo-input').value = ""
            document.getElementById('todo-prompt').style.display = "none"
            return true
        }
        const newItem = document.createElement("div")
        newItem.classList.add("list")
        todocounter++

        newItem.innerHTML = `
        <input type="checkbox" id="todo${todocounter}" name="todo${todocounter}" value="todo${todocounter}">
        <label for="todo${todocounter}">${val}</label><br>
    `
    
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

    if (e.target && e.target.type === "checkbox" && e.target.checked) {
      const todoItem = e.target.closest(".list")
      if (todoItem) {
        todoItem.style.transition = "opacity 1.5s ease"
        todoItem.style.opacity = 0
        setTimeout(() => {
            todoItem.remove()
        }, 1500);
        todocounter--
      }
    }
})
  