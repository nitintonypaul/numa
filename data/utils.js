//SCRIPT FOR SETTINGS CONTROL. LOADS DATA INTO SETTINGS AND APPLIES USER PREFERENCES.

//Waiting until DOMContent is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    //Caching DOM elements for easier use and better efficiency
    const settingsButton = document.getElementById('settings-button');
    const settingsContainer = document.getElementById('settings-container');
    const cover = document.getElementById('cover');
    const cancelSettingsBtn = document.getElementById('cancel-settings');
    const saveSettingsBtn = document.getElementById('save-settings');
    const clearDataBtn = document.getElementById('clear-data-button');
    const changeNameInput = document.getElementById('change-name-input');
    const nameDisplay = document.getElementById('name');
    const linkContainer = document.getElementById('link-container');
    const clockCalendarContainer = document.getElementById('clock-calendar-container');
    const todoContainer = document.getElementById('todo-container');
    const quoteContainer = document.getElementById('quote-container');
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    //Fetching and displaying quote
    function zenQ() {
        fetch("https://zenquotes.io/api/today")
        .then(res => res.json())
        .then(data => {
            let quote = data[0].q;
            let author = data[0].a;

            //Checking if the quote is a API call message and obtaining quote from localStorageif it exists
            if (author.includes('zenquotes')) {
                quote = localStorage.getItem('quote');
                author = localStorage.getItem('author');
            }
            //Otherwise setting quote in localStorage
            else {
                localStorage.setItem('quote', quote);
                localStorage.setItem('author', author);
            }

            //Updating quote and author in the website
            quoteElement.innerText = `“${quote}”`;
            authorElement.innerText = `— ${author}`;
        })

        //Fallback quote for errors
        .catch(error => {
            quoteElement.innerText = `“The ones who are crazy enough to think they can change the world are the ones who do.”`;
            authorElement.innerText = `— Steve Jobs`;
            console.error("Error fetching quote:", error);
        });
    }

    //Fetching and displaying useless fact
    function uselessFact() {
        fetch("https://api.viewbits.com/v1/uselessfacts?mode=today")
        .then(res => res.text())
        .then(raw => {

            //Parsing raw data
            const data = JSON.parse(raw)

            //Updating uselessfact in the website
            document.getElementById("author").innerText = data.text;
            document.getElementById("quote").innerText = ""

            //Storing fact in localStorage
            localStorage.setItem('fact', data.text)
        })
        .catch(error => {
            
            //Checking if 'fact' exists in localStorage. If it does, it is loaded, temporarily
            if (localStorage.getItem('fact') !== null) {
                document.getElementById("author").innerText = `${localStorage.getItem('fact')}`;
                document.getElementById("quote").innerText = ""
            }
            else {

                //Else a fallback is shown
                document.getElementById("author").innerText = "Bananas are berries, but strawberries aren't.";
                document.getElementById("quote").innerText = ""
            }

            //Error message is sent anyway
            console.error("Error fetching funny fact:", error);
        });
    }

    //Applying saved preferences
    function loadPreference() {
        const stringSettings = localStorage.getItem('settings');

        //If no settings are found. Assumed to be onboarding
        if (!stringSettings) {
            console.log("You've got no settings.");
            return;
        }

        //Obtaining settings object
        const SETTINGS = JSON.parse(stringSettings);

        //Looping through the settings object for key and value
        Object.entries(SETTINGS).forEach(([key, value]) => {
            
            //Switching key
            switch (key) {

                //Light mode toggling
                case 'light-mode-toggle':
                    document.documentElement.style.setProperty('--bg-color', value ? '#E0E0E0' : '#1f1f1f');
                    document.documentElement.style.setProperty('--bg-gradient', value ? '#FFF' : '#000');
                    document.documentElement.style.setProperty('--color', value ? '#1F1F1F' : '#e0e0e0');
                    document.documentElement.style.setProperty('--prompt-color', value ? '#eeeeee' : '#111');
                    break;

                //Monochrome Icons
                case 'monochrome-toggle':
                    linkContainer.style.filter = value ? 'grayscale(100%)' : 'grayscale(0%)';
                    break;

                //Hiding clock
                case 'hide-clock-toggle':
                    clockCalendarContainer.style.display = value ? 'none' : 'flex';
                    break;

                //Hiding TO DO
                case 'toggle-todo-toggle':
                    todoContainer.style.display = value ? 'none' : 'block';
                    break;

                //Toggle between quote and useless fact
                case 'quote-switch-toggle':
                    value ? uselessFact() : zenQ();
                    break;
                
                //Hiding greeting message
                case 'greetings-toggle-toggle':
                    document.getElementById('greeting-container').style.display = value ? 'none' : 'flex';
                    break;
                
                //Focus mode is basically hiding the quote
                case 'focus-mode-toggle':
                    quoteContainer.style.display = value ? 'none' : 'flex';
                    break;
                //Toggle 24 hour clock
                case 'hour-clock-toggle':
                    window.hourCheck = Boolean(value);
                    break;
            }
        });
    }

    //Opening the settings panel
    function openSettings() {

        //Making elements visible
        settingsContainer.style.display = 'flex';
        cover.style.display = 'flex';

        //Obtaining settings string to obtain preferences
        const settingsString = localStorage.getItem('settings');

        //If settings strings exist
        if (settingsString) {

            //Obtaining settings object
            const SETTINGS = JSON.parse(settingsString);

            //Looping through settings for key and value
            Object.entries(SETTINGS).forEach(([key, value]) => {

                //Assigning checked values for to checkboxes on opening
                //Basically loading preferences into checkbox on open
                const checkbox = document.getElementById(key);
                if (checkbox) checkbox.checked = value;
            });
        }
        //Not really necessary, but logging no-settings anyway
        else {
            console.log("You've got no settings.");
        }

        //Obtaining name
        changeNameInput.value = localStorage.getItem('name') || '';
    }

    //Closing settings panel
    function cancelSettings() {
        settingsContainer.style.display = 'none';
        cover.style.display = 'none';
    }

    //Saving preferences and applying changes
    function saveSettings() {

        //Obtaining Name value
        const nameVal = changeNameInput.value.trim();

        //Setting name separately
        if (nameVal) {
            localStorage.setItem('name', nameVal);
            nameDisplay.innerHTML = nameVal;
        }

        //Creating an array of arrays of settings. Modular and changeable
        const Settings = [
            ['light-mode-toggle', document.getElementById('light-mode-toggle').checked],
            ['monochrome-toggle', document.getElementById('monochrome-toggle').checked],
            ['hide-clock-toggle', document.getElementById('hide-clock-toggle').checked],
            ['toggle-todo-toggle', document.getElementById('toggle-todo-toggle').checked],
            ['quote-switch-toggle', document.getElementById('quote-switch-toggle').checked],
            ['greetings-toggle-toggle', document.getElementById('greetings-toggle-toggle').checked],
            ['focus-mode-toggle', document.getElementById('focus-mode-toggle').checked],
            ['hour-clock-toggle', document.getElementById('hour-clock-toggle').checked]
        ];

        //Conversion to settings object and storing in localStorage
        const settingsOBJ = Object.fromEntries(Settings);
        localStorage.setItem('settings', JSON.stringify(settingsOBJ));

        //Loading preferences AND cancelling settings container after settings have been stored
        loadPreference();
        cancelSettings();
    }

    //Clearing all data
    function clearData() {

        //If user confirms, all the data in localStorage is cleared
        if (confirm("Are you sure you want to reset all preferences and data? This action cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    }

    //Event listeners
    if (settingsButton) settingsButton.addEventListener('click', openSettings);
    if (cancelSettingsBtn) cancelSettingsBtn.addEventListener('click', cancelSettings);
    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
    if (clearDataBtn) clearDataBtn.addEventListener('click', clearData);

    //Loading user preferences initially
    loadPreference();
});
