//SCRIPT TO LOAD ALL DATA FROM LOCALSTORAGE

//LOADING USER PREFERENCE
function loadPreference() {
    
    //Function to fetch quote
    function zenQ() {
        fetch("https://zenquotes.io/api/today")
        .then(res => res.json())
        .then(data => {
            let quote = data[0].q
            let author = data[0].a
            
            //Checking if the quote is a API call message and obtaining quote from localStorage if it exists
            if (author.includes('zenquotes')) {
                quote = localStorage.getItem('quote')
                author = localStorage.getItem('author')
            }
            //Else storing caching quote and author in localStorage
            else {
                localStorage.setItem('quote', quote)
                localStorage.setItem('author', author)
            }

            //Changing the quote on the dashboard
            document.getElementById("quote").innerText = `“${quote}”`
            document.getElementById("author").innerText = `— ${author}`
        })

        //Error fallback for quote
        .catch(error => {
            document.getElementById("quote").innerText = `“The ones who are crazy enough to think they can change the world are the ones who do.”`
            document.getElementById("author").innerText = `— Steve Jobs`
            console.error("Error fetching quote: ", error)
        })
    }

    //Function to fetch useless fact
    function uselessFact() {
        fetch("https://api.viewbits.com/v1/uselessfacts?mode=today")
        .then(res => res.text())
        .then(raw => {
                
                //Parsing raw data
                const data = JSON.parse(raw)

                //Displaying data in website
                document.getElementById("author").innerText = data.text;
                document.getElementById("quote").innerText = ""

                //Storing fact in localStorage
                localStorage.setItem('fact', data.text)

        })
        .catch(error => {

            //Loading cached fact, if it exists
            if (localStorage.getItem('fact') !== null) {
                document.getElementById("author").innerText = `${localStorage.getItem('fact')}`;
                document.getElementById("quote").innerText = ""
            }
            else {

                //Else fallback shown
                document.getElementById("author").innerText = "Bananas are berries, but strawberries aren't.";
                document.getElementById("quote").innerText = ""
            }

            //Error message is sent anyway
            console.error("Error fetching funny fact:", error);
        });
    }

    //Obtaining settings from localStorage
    const stringSettings = localStorage.getItem('settings')

    //checking for errors
    if (stringSettings) {

        //Obtaining settings object
        const SETTINGS = JSON.parse(stringSettings);

        //Iterating through settings object for each key and value
        for (const [key, value] of Object.entries(SETTINGS)) {

            //Switching key
            switch(key) {

                //Light Mode
                case 'light-mode-toggle':
                    if (!value) {
                        document.documentElement.style.setProperty('--bg-color', '#1f1f1f')
                        document.documentElement.style.setProperty('--bg-gradient', '#000')
                        document.documentElement.style.setProperty('--color', '#e0e0e0')
                        document.documentElement.style.setProperty('--prompt-color', '#111')
                    }
                    else {
                        document.documentElement.style.setProperty('--bg-color', '#E0E0E0')
                        document.documentElement.style.setProperty('--bg-gradient', '#FFF')
                        document.documentElement.style.setProperty('--color', '#1F1F1F')
                        document.documentElement.style.setProperty('--prompt-color', '#eeeeee')
                    }
                    break
                
                //Monochrome icons
                case 'monochrome-toggle':
                    if (!value) {
                        document.getElementById('link-container').style.filter = 'grayscale(0%)'
                    }
                    else {
                        document.getElementById('link-container').style.filter = 'grayscale(100%)'
                    }
                    break
                
                //Hiding Clock
                case 'hide-clock-toggle':
                    if (!value) {
                        document.getElementById('clock-calendar-container').style.display = 'flex'
                    }
                    else {
                        document.getElementById('clock-calendar-container').style.display = 'none'
                    }
                    break
                
                //TODO toggle
                case 'toggle-todo-toggle':
                    if (!value) {
                        document.getElementById('todo-container').style.display = 'block'
                    }
                    else {
                        document.getElementById('todo-container').style.display = 'none'
                    }
                    break

                //Change Quote to Fun Fact
                case 'quote-switch-toggle':
                    if (!value) {
                        zenQ()
                    }
                    else {
                        uselessFact()
                    }
                    break
                
                //Greetings Toggle
                case 'greetings-toggle-toggle':
                    if (!value) {
                        document.getElementById('greeting-container').style.display = 'flex'
                    }
                    else {
                        document.getElementById('greeting-container').style.display = 'none'
                    }
                    break
                
                //Focus Mode
                case 'focus-mode-toggle':
                    if (!value) {
                        document.getElementById('quote-container').style.display = 'flex'
                    }
                    else {
                        document.getElementById('quote-container').style.display = 'none'
                    }
                    break
                case 'hour-clock-toggle':
                    window.hourCheck = Boolean(value);
                    break;
            }

        }
    }
    
    //Logging "no settings"
    else {
        console.log("You've got no settings.")
    }
}

//Calling the loading function on start
loadPreference()

//TO DO LIST DATA
//Checking if the todo list is empty and displaying the required message
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

//Loading TO DO LISTS
const list = document.getElementById('lists-container')

//Loading Contents on Arrival from localStorage 
for (let i = 0; i < localStorage.length; i++) {

    //Obtaining key and value
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)

    //Checking if it is a todo item
    if (key.includes('todo')) {
        
        //Loading Items
        const loadedItem = document.createElement("div")
        loadedItem.classList.add("list")
        loadedItem.id = `${key}`
        
        //Random ID generator
        var rn = Date.now() + i
        
        //Defining List
        loadedItem.innerHTML = `
        <input type="checkbox" id="todo${rn}" name="todo${rn}">
        <label for="todo${rn}">${value}</label><br>
        `
        //Appending 
        list.appendChild(loadedItem)
    }
}

//Calling Function to check if the todo list is empty
updateState()


//LINKS DATA
//Checking it the 'add new link' button should be shown
function checkForButton () {

    //Getting how many link elements are present
    const linkElements = document.querySelectorAll('.link-a')
    var count = 0
    for (let i = 0; i < linkElements.length; i++) {
        if (linkElements[i].style.display != 'none') {
            count++
        }
    }

    if (count < 4) {
        document.getElementById('empty-link-container').style.display = 'flex'
    }
    else if (count == 4) {
        document.getElementById('empty-link-container').style.display = 'none'
    }
    else {
        console.log("Something very bad is happening")
    }
}

//Obtaining LINKS array
const LINKS = [JSON.parse(localStorage.getItem('link-1') || 'null'), JSON.parse(localStorage.getItem('link-2') || 'null'), JSON.parse(localStorage.getItem('link-3') || 'null'), JSON.parse(localStorage.getItem('link-4') || 'null')]

//Iterating through to display links
for (let i=0; i< LINKS.length; i++) {
    if (LINKS[i] === null) {
        document.getElementById(`link-${i+1}`).style.display = 'none'
        continue
    }
    
    const DOMAIN = LINKS[i][0]
    const urlv = LINKS[i][1]
    const ttl = LINKS[i][2]

    document.getElementById(`link-image-div-${i+1}`).innerHTML = `<img class="url-image" src="https://icons.duckduckgo.com/ip3/${DOMAIN}.ico">`
    document.getElementById(`link-name-${i+1}`).innerHTML = ttl
    document.getElementById(`link-${i+1}`).href = urlv

}

//Calling checkForButton()
checkForButton()

//LOADING NAME DATA
//Obtaining name from localStorage
const NAME = localStorage.getItem('name')

//Logging onboarding if name is null (Assumed to be visiting the extension for the first time)
if (NAME === null) {
    console.log('onboarding')
}
//Else updating the name in the extension
else {
    document.getElementById('name').innerHTML = NAME
}
