//This program is used to fetch the day's quote from zenQuotes API

//Allorigins used - Change when possible
fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/today")
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
      console.error("Error fetching quote:", error);
});
