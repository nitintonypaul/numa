//Welcome message - Console
console.log("Welcome to Numa.")
  
//Clock function
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

    const ID = e.currentTarget.id
    const linkPrompt = document.getElementById('link-prompt')
    const url = document.getElementById('url-input')
    const title = document.getElementById('title-input')
    linkPrompt.style.display = 'flex'

    //Cancelling Process
    const linkCancel = document.getElementById('link-cancel')
    linkCancel.addEventListener('click', () => {

        url.value = ""
        title.value = ""
        linkPrompt.style.display = 'none'
    })

    //Saving Process
    const linkSave = document.getElementById('link-save')
    linkSave.addEventListener('click', () => {
        const URLV = url.value
        const TITLE = title.value

        //If no URL is given
        if (URLV.trim() == "") {
            url.value = ""
            title.value = ""
            linkPrompt.style.display = 'none'
            return true
        }

        //Else case, and obviously cuz I was lazy
        //Getting URL
        const domain = new URL(URLV).hostname

        //Changing image, title and href
        document.getElementById(`link-image-div-${ID}`).innerHTML = `<img class="url-image" src="https://icons.duckduckgo.com/ip3/${domain}.ico">`
        document.getElementById(`link-name-${ID}`).innerHTML = TITLE
        document.getElementById(`link-${ID}`).href = URLV

        //Wrapping Up
        url.value = ""
        title.value = ""
        linkPrompt.style.display = 'none'
    })


}

//   :(
linkBtn1.addEventListener('click', addLink)
linkBtn2.addEventListener('click', addLink)
linkBtn3.addEventListener('click', addLink)
linkBtn4.addEventListener('click', addLink)