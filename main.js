const ERR_MSG = 'Malformed expression';

let displayStr = '0'
let isResult = false;

const updateDisplay = (key, display) => {
    //let keyVal = key.dataset.key;
    let keyVal = key.getAttribute('data-key');
    
    if(keyVal !== undefined) {
        if(keyVal === 'clear') {
            displayStr = '0';
        }
        else if(isResult) {
            displayStr = keyVal;
            isResult = false;
        }
        else if(['0', ERR_MSG].includes(displayStr) && !isNaN(keyVal)) {
            displayStr = keyVal;
        }
        else if(keyVal === '.' && displayStr.endsWith('.')) {
            // do nothing
        }
        else if(keyVal == 'Enter') {
            if( ! displayStr.match(/[^0-9*\/\-\+\.]/)) {
                try {
                    displayStr = eval(displayStr);
                } catch {
                    displayStr = ERR_MSG;
                } finally {
                    isResult = true;
                }
            }
        }
        else {
            displayStr = displayStr + keyVal;
        }
        
        display.innerText = displayStr;
    }
}

const getKeyByDataAttr = keyboardKey => {
    keys = document.querySelectorAll('.key');
    for(key of keys) {
        if(key.dataset.key == keyboardKey) {
            return key;
        }
    }
    return false;
        
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
        
        key = getKeyByDataAttr(event.key);
        if(key) {
            key.click();
        }
    });
}


document.addEventListener('DOMContentLoaded', main)