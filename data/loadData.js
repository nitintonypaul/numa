//File to load all data in localStorage/chrome.storage.local

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

/* for chrome.storage.local
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