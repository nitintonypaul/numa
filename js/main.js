//Welcome message - Console
console.log("Welcome to Numa.")

//Global ID variable since I was facing some issues
let ID = null

//Clock & Calendar function
function update() {
    let now = new Date()

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //Getting Day, Date and Month
    let date = now.getDate()
    let month = now.getMonth()
    let day = now.getDay()

    //Conversion Number -> Relevant String
    month = months[month]
    day = days[day]

    const calendar = document.getElementById("calendar")
    const clock = document.getElementById("clock")

    let hours = now.getHours()
    let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()

    //Checking for Morning, Afternoon, Evening before Conversion
    const greeting = document.getElementById('greeting')

    if (hours > 0 && hours < 12) {
        greeting.innerHTML = "Good Morning,"
    }
    else if (hours >= 12 && hours < 18) {
        greeting.innerHTML = "Good Afternoon,"
    }
    else {
        greeting.innerHTML = "Good Evening,"
    }
    
    //Conversion
    hours = hours % 12
    hours = hours ? hours : 12

    //Updation
    clock.innerHTML = `${hours}:${minutes}`
    calendar.innerHTML = `${day}, ${month} ${date}`
}

setInterval(update, 1000)
update()


// Changing Theme
//const root = document.documentElement;
//root.style.setProperty('--bg-color', '#ff007f');


//LINK SYSTEM
//Yes I had to do all this since for some DAMN reason querySelector decided not to work
const linkBtn1 = document.getElementById('1')
const linkBtn2 = document.getElementById('2')
const linkBtn3 = document.getElementById('3')
const linkBtn4 = document.getElementById('4')

function addLink(e) {

    //Preventing Bubbling
    e.stopPropagation()
    e.preventDefault()

    ID = e.currentTarget.id
    console.log(ID)
    const linkPrompt = document.getElementById('link-prompt')
    const url = document.getElementById('url-input')
    const title = document.getElementById('title-input')
    linkPrompt.style.display = 'flex'
    document.getElementById('cover').style.display = 'flex'

    //Obtaining Previous Link elements from the localStorage/chrome.storage.local
    //For localStorage
    const tempLink = JSON.parse(localStorage.getItem(`link-${ID}`) || 'null')
    if (tempLink !== null) {
        url.value = tempLink[1]
        title.value = tempLink[2]
    }

    /* For chrome.storage.local
    chrome.storage.local.get(`link-${ID}`, function (result) {
        const tempLink = result[`link-${ID}`]
        if (tempLink !== null) {
            url.value = tempLink[1]
            title.value = tempLink[2]
        }
    });*/

    //Cancelling Process
    const linkCancel = document.getElementById('link-cancel')
    linkCancel.addEventListener('click', () => {

        url.value = ""
        title.value = ""
        linkPrompt.style.display = 'none'
        document.getElementById('cover').style.display = 'none'
    })
}

//   :(
linkBtn1.addEventListener('click', addLink)
linkBtn2.addEventListener('click', addLink)
linkBtn3.addEventListener('click', addLink)
linkBtn4.addEventListener('click', addLink)


//Saving Process done
const linkSave = document.getElementById('link-save')
linkSave.addEventListener('click', () => {
    const URLV = document.getElementById('url-input').value
    const TITLE = document.getElementById('title-input').value

    //If no URL is given
    if (URLV.trim() == "") {
        document.getElementById('url-input').value = ""
        document.getElementById('title-input').value = ""
        linkPrompt.style.display = 'none'
        document.getElementById('cover').style.display = 'none'
        return true
    }

    //Else case, and obviously cuz I was lazy
    //Getting URL
    const domain = new URL(URLV).hostname

    console.log(ID)

    //Changing image, title and href
    document.getElementById(`link-image-div-${ID}`).innerHTML = `<img class="url-image" src="https://icons.duckduckgo.com/ip3/${domain}.ico">`
    document.getElementById(`link-name-${ID}`).innerHTML = TITLE
    document.getElementById(`link-${ID}`).href = URLV

    //Setting in localStorage
    const linkElement = [domain, URLV, TITLE]
    localStorage.setItem(`link-${ID}`,JSON.stringify(linkElement))

    //chrome.storage.local
    /*
    const Element = [domain, URLV, TITLE];
    chrome.storage.local.set({ [`link-${ID}`]: myStrings }, function () {
      console.log('Link Saved.');
    });*/

    //Wrapping Up
    const linkPrompt = document.getElementById('link-prompt')

    document.getElementById('url-input').value = ""
    document.getElementById('title-input').value = ""
    linkPrompt.style.display = 'none'
    document.getElementById('cover').style.display = 'none'
})