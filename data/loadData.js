//File to load all data in localStorage/chrome.storage

//LOADING PREFERENCE
function loadPreference() {
    //FUNCTIONS FOR ZenQuotes and Useless Facts
    function zenQ() {
        fetch("https://zenquotes.io/api/today")
        .then(res => res.json())
        .then(data => {
          const quote = data[0].q
          const author = data[0].a

          document.getElementById("quote").innerText = `“${quote}”`
          document.getElementById("author").innerText = `— ${author}`
        })

        //Error
        .catch(error => {
          document.getElementById("quote").innerText = "Failed to load quote."
          document.getElementById("author").innerText = ""
          console.error("Error fetching quote:", error)
        })
    }

    function uselessFact() {
        fetch("https://api.viewbits.com/v1/uselessfacts?mode=today")
        .then(res => res.text())
        .then(raw => {
          console.log("Raw response:", raw)
          const data = JSON.parse(raw)
          console.log("Parsed fact:", data.text)
          document.getElementById("author").innerText = data.text;
          document.getElementById("quote").innerText = ""
        })
        .catch(error => {
          document.getElementById("author").innerText = "Failed to load funny fact.";
          document.getElementById("quote").innerText = ""
          console.error("Error fetching funny fact:", error);
        });
    }

    //CHROME STORAGE VARIANT BELOW THIS
    const stringSettings = localStorage.getItem('settings')

    //checking for errors
    if (stringSettings) {
        const SETTINGS = JSON.parse(stringSettings);

        for (const [key, value] of Object.entries(SETTINGS)) {

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
            }

        }
    }
    else {
        console.log("You've got no settings.")
    }
            /*chrome.storage version
        chrome.storage.local.get('settings', function(result) {
            if (result.settings) {
                const SETTINGS = result.settings;

                for (const [key, value] of Object.entries(SETTINGS)) {

                switch(key) {

                    // Light Mode
                    case 'light-mode-toggle':
                        if (!value) {
                            document.documentElement.style.setProperty('--bg-color', '#1f1f1f')
                            document.documentElement.style.setProperty('--bg-gradient', '#000')
                            document.documentElement.style.setProperty('--color', '#e0e0e0')
                            document.documentElement.style.setProperty('--prompt-color', '#111')
                        } else {
                            document.documentElement.style.setProperty('--bg-color', '#E0E0E0')
                            document.documentElement.style.setProperty('--bg-gradient', '#FFF')
                            document.documentElement.style.setProperty('--color', '#1F1F1F')
                            document.documentElement.style.setProperty('--prompt-color', '#eeeeee')
                        }
                        break

                    // Monochrome icons
                    case 'monochrome-toggle':
                        document.getElementById('link-container').style.filter = value ? 'grayscale(100%)' : 'grayscale(0%)'
                        break

                    // Hiding Clock
                    case 'hide-clock-toggle':
                        document.getElementById('clock-calendar-container').style.display = value ? 'none' : 'flex'
                        break

                    // TODO toggle
                    case 'toggle-todo-toggle':
                        document.getElementById('todo-container').style.display = value ? 'none' : 'block'
                        break

                    // Change Quote to Fun Fact
                    case 'quote-switch-toggle':
                        value ? uselessFact() : zenQ()
                        break

                    // Greetings Toggle
                    case 'greetings-toggle-toggle':
                        document.getElementById('greeting-container').style.display = value ? 'none' : 'flex'
                        break

                    // Focus Mode
                    case 'focus-mode-toggle':
                        document.getElementById('quote-container').style.display = value ? 'none' : 'flex'
                        break
                    }
                }
            } else {
                console.log("You've got no settings.")
            }
        });

        */
}

loadPreference()

//TO DO LIST data
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

/*For Chrome Storage (TO DO LIST)
chrome.storage.local.get(null, function(items) {
  for (const [key, value] of Object.entries(items)) {

    if (key.includes('todo)) {
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
  }
});
*/

updateState()


//LINK data
//Same checkForButton function in main.js
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

const LINKS = [JSON.parse(localStorage.getItem('link-1') || 'null'), JSON.parse(localStorage.getItem('link-2') || 'null'), JSON.parse(localStorage.getItem('link-3') || 'null'), JSON.parse(localStorage.getItem('link-4') || 'null')]

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
checkForButton()

/* for chrome.storage
for (let i = 0; i < LINKS.length; i++) {
    chrome.storage.local.get(`link-${i+1}`, function (result) {
        console.log(result.myKey); // ['hello', 'world', 'extension']
        var LINK = result[`link-${i+1}`]

        if (LINK === null) {
            //document.getElementById(`link-${i+1}`).style.display = 'none'
            return true
        }
        const DOMAIN = LINK[0]
        const urlv = LINK[1]
        const ttl = LINK[2]

        document.getElementById(`link-image-div-${i+1}`).innerHTML = `<img class="url-image" src="https://icons.duckduckgo.com/ip3/${DOMAIN}.ico">`
        document.getElementById(`link-name-${i+1}`).innerHTML = ttl
        document.getElementById(`link-${i+1}`).href = urlv
    });
}
*/

//LOADING NAME data
const NAME = localStorage.getItem('name')
if (NAME === null) {
    console.log('onboarding')
}
else {
    document.getElementById('name').innerHTML = NAME
}

/* chrome.storage
chrome.storage.local.get('name', function(result) {
    const NAME = result.name;
    
    if (NAME === undefined || NAME === null) {
        console.log('onboarding');
    } else {
        document.getElementById('name').innerHTML = NAME;
    }
});
*/