const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.calculator-display');
const displayArray = [];
let operator = '';

function getButtonValue(value) {
    display.innerHTML += `${value}`;
    displayArray.push(value);

}

function getOperation(operationValue) {    //index of is validating if the operator is not the first "number" of the operation like "-25-25"
    
    if(displayArray.includes(operator) && displayArray.indexOf(operator) > 0){ 
        makeOperation()
        display.innerHTML += `${operationValue}`
        operator = operationValue;
        displayArray.push(operator);

    } else if (displayArray.length == 0 && operationValue === '-'){
        display.innerHTML += `${operationValue}`;      
        displayArray.push(operationValue);

    } else if (!operator || displayArray.length > 0){
        display.innerHTML += `${operationValue}`;
        operator = operationValue;
        displayArray.push(operator);

    }

}

function erase() {
    displayArray.pop()
    display.innerHTML = `${displayArray.join('')}`
    
}

function deleteAll() {
    display.innerHTML = "";
    displayArray.length = 0
}


for (let i = 0; i < buttons.length; i++) {
   
    let buttonCounter = buttons[i];
    buttonCounter.addEventListener('click', () => {

        if (buttonCounter.id == 'button-result') {
            makeOperation()

        } else if (buttonCounter.id == 'button-C') {
            deleteAll()


        } else if (buttonCounter.id == 'button-erase') {
            erase()

        } else {

            let buttonConvert = buttonCounter.textContent;
            
            switch (buttonCounter.id) {
                case 'button-+':
                    getOperation('+')
                    break;
                case 'button--':
                    getOperation('-')
                    break;
                case 'button-*':
                    getOperation('*')
                    break;
                case 'button-/':
                    getOperation('÷')
                    break;

                default: getButtonValue(Number(buttonConvert))

            }

        }
    }
    )

}

function makeOperation() {

    let index = displayArray.indexOf(operator);

    if (displayArray[0] === '-' && index === 0) {
        index = displayArray.indexOf(operator, 1); // Start the search after the first character
    } 
    
    
    if (index <= 0) return;
    
    const a = parseFloat(displayArray.slice(0, index).join(''))
    const b = parseFloat(displayArray.slice(index + 1, displayArray.length + 1).join(''))
    
    let result
    

    switch (operator) {
        case '+':
            result = a + b;

            break;

        case '-':
            result = a - b;

            break;

        case '*':
            result = a * b;

            break;

        case '÷':
            result = a / b;

            break;

        default: 'Invalid operation'
        return;
    }

    display.innerHTML = result;
    clearOldValues(result)
    

}

function clearOldValues(result) {
 
    displayArray.length = 0;
    displayArray.push(result);
    operator = ' ';
}

