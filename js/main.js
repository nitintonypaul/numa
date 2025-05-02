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