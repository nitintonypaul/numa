document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
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

    // Fetch and display a quote
    function zenQ() {
        fetch("https://zenquotes.io/api/today")
            .then(res => res.json())
            .then(data => {
                let quote = data[0].q;
                let author = data[0].a;
                if (author.includes('zenquotes')) {
                    quote = localStorage.getItem('quote');
                    author = localStorage.getItem('author');
                } else {
                    localStorage.setItem('quote', quote);
                    localStorage.setItem('author', author);
                }
                quoteElement.innerText = `“${quote}”`;
                authorElement.innerText = `— ${author}`;
            })
            .catch(error => {
                quoteElement.innerText = `“The ones who are crazy enough to think they can change the world are the ones who do.”`;
                authorElement.innerText = `— Steve Jobs`;
                console.error("Error fetching quote:", error);
            });
    }

    // Fetch and display a useless fact
    function uselessFact() {
        //Fetching without allorigins
        fetch("https://api.viewbits.com/v1/uselessfacts?mode=today")
        .then(res => res.text())
        .then(raw => {
            //Parsing raw data
            const data = JSON.parse(raw)
            //Displaying data in website
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

    // Apply saved preferences
    function loadPreference() {
        const stringSettings = localStorage.getItem('settings');
        if (!stringSettings) {
            console.log("You've got no settings.");
            return;
        }
        const SETTINGS = JSON.parse(stringSettings);
        Object.entries(SETTINGS).forEach(([key, value]) => {
            switch (key) {
                case 'light-mode-toggle':
                    document.documentElement.style.setProperty('--bg-color', value ? '#E0E0E0' : '#1f1f1f');
                    document.documentElement.style.setProperty('--bg-gradient', value ? '#FFF' : '#000');
                    document.documentElement.style.setProperty('--color', value ? '#1F1F1F' : '#e0e0e0');
                    document.documentElement.style.setProperty('--prompt-color', value ? '#eeeeee' : '#111');
                    break;
                case 'monochrome-toggle':
                    linkContainer.style.filter = value ? 'grayscale(100%)' : 'grayscale(0%)';
                    break;
                case 'hide-clock-toggle':
                    clockCalendarContainer.style.display = value ? 'none' : 'flex';
                    break;
                case 'toggle-todo-toggle':
                    todoContainer.style.display = value ? 'none' : 'block';
                    break;
                case 'quote-switch-toggle':
                    value ? uselessFact() : zenQ();
                    break;
                case 'greetings-toggle-toggle':
                    document.getElementById('greeting-container').style.display = value ? 'none' : 'flex';
                    break;
                case 'focus-mode-toggle':
                    quoteContainer.style.display = value ? 'none' : 'flex';
                    break;
            }
        });
    }

    // Open settings panel
    function openSettings() {
        settingsContainer.style.display = 'flex';
        cover.style.display = 'flex';
        const settingsString = localStorage.getItem('settings');
        if (settingsString) {
            const SETTINGS = JSON.parse(settingsString);
            Object.entries(SETTINGS).forEach(([key, value]) => {
                const checkbox = document.getElementById(key);
                if (checkbox) checkbox.checked = value;
            });
        } else {
            console.log("You've got no settings.");
        }
        changeNameInput.value = localStorage.getItem('name') || '';
    }

    // Close settings panel
    function cancelSettings() {
        settingsContainer.style.display = 'none';
        cover.style.display = 'none';
    }

    // Save preferences and apply
    function saveSettings() {
        const nameVal = changeNameInput.value.trim();
        if (nameVal) {
            localStorage.setItem('name', nameVal);
            nameDisplay.innerHTML = nameVal;
        }
        const Settings = [
            ['light-mode-toggle', document.getElementById('light-mode-toggle').checked],
            ['monochrome-toggle', document.getElementById('monochrome-toggle').checked],
            ['hide-clock-toggle', document.getElementById('hide-clock-toggle').checked],
            ['toggle-todo-toggle', document.getElementById('toggle-todo-toggle').checked],
            ['quote-switch-toggle', document.getElementById('quote-switch-toggle').checked],
            ['greetings-toggle-toggle', document.getElementById('greetings-toggle-toggle').checked],
            ['focus-mode-toggle', document.getElementById('focus-mode-toggle').checked]
        ];
        const settingsOBJ = Object.fromEntries(Settings);
        localStorage.setItem('settings', JSON.stringify(settingsOBJ));
        loadPreference();
        cancelSettings();
    }

    // Clear all data
    function clearData() {
        if (confirm("Are you sure you want to reset all preferences and data? This action cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    }

    // Event listeners
    if (settingsButton) settingsButton.addEventListener('click', openSettings);
    if (cancelSettingsBtn) cancelSettingsBtn.addEventListener('click', cancelSettings);
    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', saveSettings);
    if (clearDataBtn) clearDataBtn.addEventListener('click', clearData);

    // Initial load
    loadPreference();
});
