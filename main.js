const ERR_MSG = 'Malformed expression';

let displayStr = '0'


const updateDisplay = (key, display) => {
    let keyVal = key.innerText;
    if(keyVal !== undefined) {
        if(keyVal === 'clear') {
            displayStr = '0';
        }
        else if(['0', ERR_MSG].includes(displayStr) && !isNaN(keyVal)) {
            displayStr = keyVal;
        }
        else if(keyVal === '=') {
            if( ! displayStr.match(/[^0-9*\/\-\+]/)) {
                try {
                    displayStr = eval(displayStr) 
                } catch {
                    displayStr = ERR_MSG;
                }
            }
            
        }
        else {
            displayStr = displayStr + keyVal;
        }
        
        display.innerText = displayStr;
    }
}

const getKeyByInnerText = keyboardKey => {
    document.querySelectorAll('.key').forEach(key => {
        //console.log(`${key.innerText} ${keyboardKey}`)
        if(key.innerText == keyboardKey) {
            alert("x");
            return key;
        }
        return false;
    });
}

const main = () => {
    const display = document.querySelector('#display');
    
    document.querySelectorAll('.key').forEach(key => {
        key.onclick = () => {
            updateDisplay(key, display);
        }
    });

    document.addEventListener("keydown", function (event) {
        //event.preventDefault();
        
        key = getKeyByInnerText(event.key);
        if(key) {
            key.click();
        }
    });
}


document.addEventListener('DOMContentLoaded', main)