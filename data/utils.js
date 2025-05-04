
document.addEventListener('DOMContentLoaded', () => {
//THE ENTIRE SETTINGS SCRIPT

//LOADING USER PREFERENCE
//This is a big one, sit tight
function loadPreference() {
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
                    console.log("Change quote...must")
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
                        document.getElementById('greeting-container').style.display = 'flex'
                        document.getElementById('link-container').style.display = 'flex'
                    }
                    else {
                        document.getElementById('greeting-container').style.display = 'none'
                        document.getElementById('link-container').style.display = 'none'
                    }
                    break
            }
            
        }
    }
    else {
        console.log("You've got no settings.")
    }
}

//Opening Settings container
document.getElementById('settings-button').addEventListener('click', () => {

    //POP-UPS
    document.getElementById('settings-container').style.display = 'flex'
    document.getElementById('cover').style.display = 'flex'

    //LOADING SETTINGS
    const settingsString = localStorage.getItem('settings')

    //checking for errors
    if (settingsString) {
        const SETTINGS = JSON.parse(settingsString);

        for (const [key, value] of Object.entries(SETTINGS)) {
            
            //Settings are stored in the format
            /*const settings = [
            ['light-mode-toggle', false],
            ['monochrome-toggle', false],
            ['hide-clock-toggle', false],
            ['toggle-todo-toggle', false],
            ['quote-switch-toggle', false],
            ['greetings-toggle-toggle', false],
            ['focus-mode-toggle', false]
            ];*/

            document.getElementById(key).checked = value
        }
    }
    else {
        console.log("You've got no settings.")
    }

    //CHROME STORAGE FOR LOADING SETTINGS
    /*
    // LOADING SETTINGS
    chrome.storage.local.get('settings', function(result) {

        // Checking for errors
        if (result.settings) {
            const SETTINGS = JSON.parse(result.settings);

            for (const [key, value] of Object.entries(SETTINGS)) {
                const checkbox = document.getElementById(key);
                if (checkbox) {
                    checkbox.checked = value;
                }
            }
        } 
        else {
            console.log("You've got no settings.");
        }
    });

    */

    //loading name
    document.getElementById('change-name-input').value = localStorage.getItem('name')

    //Chrome storage
    /*
    chrome.storage.local.get('name', function(result) {
        document.getElementById('change-name-input').value = result.name || '';
    });
    */

    //CANCELLING CASE
    document.getElementById('cancel-settings').addEventListener('click',() => {
        document.getElementById('settings-container').style.display = 'none'
        document.getElementById('cover').style.display = 'none'
    })

    //SAVING CASE
    document.getElementById('save-settings').addEventListener('click', () => {
        const Settings = [
            ['light-mode-toggle', document.getElementById('light-mode-toggle').checked],
            ['monochrome-toggle', document.getElementById('monochrome-toggle').checked],
            ['hide-clock-toggle', document.getElementById('hide-clock-toggle').checked],
            ['toggle-todo-toggle', document.getElementById('toggle-todo-toggle').checked],
            ['quote-switch-toggle', document.getElementById('quote-switch-toggle').checked],
            ['greetings-toggle-toggle', document.getElementById('greetings-toggle-toggle').checked],
            ['focus-mode-toggle', document.getElementById('focus-mode-toggle').checked]
            ];

        //Converstion to object
        const settingsOBJ = Object.fromEntries(Settings);

        //Saving to localStorage
        localStorage.setItem('settings', JSON.stringify(settingsOBJ));

        //Saving to chrome storage
        //chrome.storage.local.set({ settings: settingsOBJ });

        //Calling the big function
        loadPreference()
    })
})

});