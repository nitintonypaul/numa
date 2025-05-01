//Welcome message - Console
console.log("Welcome to Numa.")

//Clock function
function updateTime() {
    let now = new Date()
    const clock = document.getElementById("clock")

    let hours = now.getHours()
    let minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
    
    //Conversion
    hours = hours % 12
    hours = hours ? hours : 12

    clock.innerHTML = `${hours}:${minutes}`
}

setInterval(updateTime, 1000)
updateTime()

