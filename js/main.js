//Global ID variable since I was facing some issues
let ID = null

//Global constants
//A few constants
const linkPrompt = document.getElementById('link-prompt')
const url = document.getElementById('url-input')
const title = document.getElementById('title-input')

//Clock & Calendar function
function update() {

    //Declaring date
    let now = new Date()

    //Arrays for days and months
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //Getting Day, Date and Month
    let date = now.getDate()
    let month = now.getMonth()
    let day = now.getDay()

    //Conversion Number -> Relevant String
    month = months[month]
    day = days[day]

    //constants
    const calendar = document.getElementById("calendar")
    const clock = document.getElementById("clock")

    //Obtaining hours and minutes in a specific format
    let hours = now.getHours()
    let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()

    //Checking for Morning, Afternoon, Evening before Conversion
    const greeting = document.getElementById('greeting')

    //Time-based greeting
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

//Updating the function per 1000 milliseconds
setInterval(update, 1000)
update()


//LINK SYSTEM
//Yes I had to do all this since for some DAMN reason querySelector decided not to work
const linkBtn1 = document.getElementById('1')
const linkBtn2 = document.getElementById('2')
const linkBtn3 = document.getElementById('3')
const linkBtn4 = document.getElementById('4')

//Updating the link
function updateLink(e) {

    //Preventing Bubbling
    e.stopPropagation()
    e.preventDefault()

    //Declaring ID
    ID = e.currentTarget.id

    //Usual procedure
    linkPrompt.style.display = 'flex'
    document.getElementById('cover').style.display = 'flex'

    //Obtaining Previous Link elements from the localStorage
    //For localStorage
    const tempLink = JSON.parse(localStorage.getItem(`link-${ID}`) || 'null')
    if (tempLink !== null) {
        url.value = tempLink[1]
        title.value = tempLink[2]
    }

    //EVENT LISTENER FOR DELETE LINK button
    document.getElementById('link-delete').addEventListener('click',() => {
        //Resetting Values
        document.getElementById('url-input').value = ""
        document.getElementById('title-input').value = ""

        //Removing from localStorage
        localStorage.removeItem(`link-${ID}`)


        document.getElementById(`link-${ID}`).style.display = 'none'

        //Usual process of resetting prompts
        linkPrompt.style.display = 'none'
        document.getElementById('cover').style.display = 'none'
        checkForButton()
        ID = null
        return true  
    }, {once: true})
}

//Cancelling Process
const linkCancel = document.getElementById('link-cancel')
linkCancel.addEventListener('click', () => {

    //Resetting values and usual procedure
    url.value = ""
    title.value = ""
    linkPrompt.style.display = 'none'
    document.getElementById('cover').style.display = 'none'

    //Setting the delete link button to be visible again
    document.getElementById('link-delete').style.display = 'block'
    document.getElementById('link-save').style.marginLeft = '10px'

    //ID to null
    ID = null
})

//Event listener for empty link button
//Removes the 'delete' button from the link prompt when click "Add new link" button
document.getElementById('empty-link-button').addEventListener('click', () => {
    
    document.getElementById('link-delete').style.display = 'none'
    document.getElementById('link-save').style.marginLeft = 'auto'
})

//   :(
linkBtn1.addEventListener('click', updateLink)
linkBtn2.addEventListener('click', updateLink)
linkBtn3.addEventListener('click', updateLink)
linkBtn4.addEventListener('click', updateLink)


//Saving Process done
const linkSave = document.getElementById('link-save')
linkSave.addEventListener('click', () => {

    //Constants
    const URLV = document.getElementById('url-input').value
    const TITLE = document.getElementById('title-input').value

    //If the save button is clicked from emptyLink button and not the edit link button
    //This is a tricky formula. I don't know how I came up with this myself
    if (ID === null) { //Yep this is it. This is the star of the show

        //Initializing Key Array and a reference Array
        let keyArr = []
        const reference = ["1","2","3","4"]

        //Looping through local storage
        for (let i = 0; i < localStorage.length; i++) {
            const KEY = localStorage.key(i)

            //Appending key to the array if its the necessary key, i.e link key
            if (KEY.includes('link')) {
                keyArr.push(KEY)
            }
        }

        //So we're doing a couple operations here, 
        //1. is changing the array we have of the format ["link-1","link-3"]... to ["1","3"] or the equivalent using map()
        //2. is comparing with the reference array and extracting the array which is missing in the reference array.. i.e the available divs for our links
        const extracted = keyArr.map(item => item.replace("link-",""))
        const available = reference.filter(x => !extracted.includes(x))

        //We obtain the first div possible from the array
        ID = available[0]

        //Declaring domain
        let domain = ""

        //try and catch done to ensure correct URL input
        try {
           domain = new URL(URLV).hostname
        }
        catch (error) {
           alert("No 'https://', no entry. Toss it in and try again.");
           ID = null
           return true
        }

        //Changing image, title and href
        document.getElementById(`link-${ID}`).style.display = 'flex'
        document.getElementById(`link-image-div-${ID}`).innerHTML = `<img class="url-image" src="https://icons.duckduckgo.com/ip3/${domain}.ico">`
        document.getElementById(`link-name-${ID}`).innerHTML = TITLE
        document.getElementById(`link-${ID}`).href = URLV
    
        //Setting in localStorage
        const linkElement = [domain, URLV, TITLE]
        localStorage.setItem(`link-${ID}`,JSON.stringify(linkElement))
    
        //Wrapping up with usual procedure
        document.getElementById('url-input').value = ""
        document.getElementById('title-input').value = ""
        checkForButton()
        linkPrompt.style.display = 'none'
        document.getElementById('cover').style.display = 'none'

        //Setting the delete link button to be visible again
        document.getElementById('link-delete').style.display = 'block'
        document.getElementById('link-save').style.marginLeft = '10px'

        ID = null
        return true
    }

    //If no URL and Title is given [Deleting Element]
    if (URLV.trim() == "" && TITLE.trim() == "") {

        //Resetting Values
        document.getElementById('url-input').value = ""
        document.getElementById('title-input').value = ""

        //Removing from localStorage
        localStorage.removeItem(`link-${ID}`)

        document.getElementById(`link-${ID}`).style.display = 'none'

        //Usual process of resetting prompts
        linkPrompt.style.display = 'none'
        document.getElementById('cover').style.display = 'none'
        checkForButton()
        ID = null
        //Setting the delete link button to be visible again
        document.getElementById('link-delete').style.display = 'block'
        document.getElementById('link-save').style.marginLeft = '10px'
        return true
    }

    //If no URL is given
    else if (URLV.trim() == "") {

        //Resetting values
        document.getElementById('url-input').value = ""
        document.getElementById('title-input').value = ""

        //Usual process of resetting prompts
        linkPrompt.style.display = 'none'
        document.getElementById('cover').style.display = 'none'
        
        //Setting the delete link button to be visible again
        document.getElementById('link-delete').style.display = 'block'
        document.getElementById('link-save').style.marginLeft = '10px'
        ID = null
        return true
    }

    //Else case, and obviously cuz I was lazy
    //Getting URL
    let domain = ""

    //try and catch done to ensure correct URL input
    try {
        domain = new URL(URLV).hostname
    }
    catch (error) {
        alert("No 'https://', no entry. Toss it in and try again.");
        return true
    }

    //Changing image, title and href
    document.getElementById(`link-image-div-${ID}`).innerHTML = `<img class="url-image" src="https://icons.duckduckgo.com/ip3/${domain}.ico">`
    document.getElementById(`link-name-${ID}`).innerHTML = TITLE
    document.getElementById(`link-${ID}`).href = URLV

    //Setting in localStorage
    const linkElement = [domain, URLV, TITLE]
    localStorage.setItem(`link-${ID}`,JSON.stringify(linkElement))


    //Wrapping up with usual procedure
    document.getElementById('url-input').value = ""
    document.getElementById('title-input').value = ""
    checkForButton()

    linkPrompt.style.display = 'none'
    document.getElementById('cover').style.display = 'none'

    //Setting the delete link button to be visible again
    document.getElementById('link-delete').style.display = 'block'
    document.getElementById('link-save').style.marginLeft = '10px'
    ID = null
})

//Adding link & emptyLink button updates
//checkForButton - a function to check if the emptyLink button is to be displayed or not
function checkForButton() {

    //Getting how many link elements are present
    const linkElements = document.querySelectorAll('.link-a')
    var count = 0
    for (let i = 0; i < linkElements.length; i++) {
        if (linkElements[i].style.display != 'none') {
            count++
        }
    }

    //Controlling the button's display status
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

//addLink Function 
function addLink() {

    //Displaying prompt
    linkPrompt.style.display = 'flex'
    document.getElementById('cover').style.display = 'flex'
}


document.getElementById('empty-link-container').addEventListener('click', addLink)


//Onboarding function
function onboarding() {

    //Displaying onboarding element
    document.getElementById('onboarding').style.display = 'flex'

    //A few constants
    const continueBtn = document.getElementById('onboarding-continue');
    const input = document.getElementById('onboarding-input');

    //Event listener to disable button while input is ""
    input.addEventListener('input', () => {
        continueBtn.disabled = !input.value.trim()
    });

    //Continue case when the user has inputted their name
    continueBtn.addEventListener('click', () => {

        //ASSIGNING DEFAULT SETTINGS
        //obtaining user name
        const userName = input.value

        //Setting Default Settings
        const settings = [
            ['light-mode-toggle', false],
            ['monochrome-toggle', false],
            ['hide-clock-toggle', false],
            ['toggle-todo-toggle', false],
            ['quote-switch-toggle', false],
            ['greetings-toggle-toggle', false],
            ['focus-mode-toggle', false]
        ];

        //Converstion to object
        const settingsObj = Object.fromEntries(settings);

        //Saving to localStorage
        localStorage.setItem('settings', JSON.stringify(settingsObj));

        //Setting in localStorage
        localStorage.setItem('name',userName)

        //Updating in the web-page
        document.getElementById('name').innerHTML = userName

        //LOADING QUOTE BY DEFAULT
        fetch("https://zenquotes.io/api/today")
        .then(res => res.json())
        .then(data => {
            const quote = data[0].q
            const author = data[0].a

            //Displaying quote on the website
            document.getElementById("quote").innerText = `“${quote}”`
            document.getElementById("author").innerText = `— ${author}`

            //Saving quote to localStorage
            localStorage.setItem('quote', quote)
            localStorage.setItem('author',author)
        })

        //Error
        .catch(error => {
            document.getElementById("quote").innerText = `“The ones who are crazy enough to think they can change the world are the ones who do.”`
            document.getElementById("author").innerText = `— Steve Jobs`
            console.error("Error fetching quote: ", error)
        })

        //Wrapping Up
        document.getElementById('onboarding').style.opacity = 0
        setTimeout(() => {
            document.getElementById('onboarding').style.display = 'none';
        }, 1000);
    }, {once: true})
}

//Adding an event listener after DOM is loaded as I experiened funny issues
window.addEventListener('DOMContentLoaded', () => {
    
    //Obtaining settings
    const visited = localStorage.getItem('settings');

    //Checking if the user has visited using settings
    if (visited === null) {

        //Calling the onboarding function
        onboarding()
    } 
    else {
        console.log("Welcome back.")
    }
})