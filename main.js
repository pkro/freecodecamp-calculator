const ERR_MSG = 'Malformed expression';

let displayStr = '0'
let isResult = false;

const isOperator = keyVal => keyVal.match(/[\+\-\*\/]/);
const getCurrentNumber = displayStr => displayStr.match(/[\d\.]+?$/)[0];
const removeMultiOperators = displayStr => {
    while(displayStr.match(/([\+\/\*\-])([\+\/\*])/)) {
        displayStr = displayStr.replace(/([\+\/\*\-])([\+\/\*])/, '$2');
    }
    return displayStr;
    
}

const updateDisplay = (key, display) => {
    let keyVal = key.getAttribute('data-key');
    
    if(keyVal !== undefined) {
        if(keyVal === 'clear') {
            displayStr = '0';
            isResult = false;
        }
        else if(isResult) {
            if(isOperator(keyVal)) {
                displayStr = displayStr + keyVal;
            }
            else {
                displayStr = keyVal;
            }
            isResult = false;
        }
        else if(['0', undefined, ERR_MSG].includes(displayStr) && !isNaN(keyVal)) {
            displayStr = keyVal;
        }
        else if(keyVal === '.' && getCurrentNumber(displayStr).includes('.')) {
            // do nothing
        }
        else if(keyVal == 'Enter') {
            console.log(displayStr);
            displayStr = removeMultiOperators(displayStr);
            console.log(displayStr);
            try {
                displayStr = eval(displayStr);
            } catch {
                displayStr = ERR_MSG;
            } finally {
                isResult = true;
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
        key = getKeyByDataAttr(event.key);
        if(key) {
            key.click();
        }
    });
}

document.addEventListener('DOMContentLoaded', main)