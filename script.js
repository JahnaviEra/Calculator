let inputField = document.getElementById('input');
let outputField = document.getElementById('output');
let currentInput = '';

function appendValue(value) {
    currentInput += value;
    inputField.value = currentInput;
}

function appendOperator(operator) {
    currentInput += ` ${operator} `;
    inputField.value = currentInput;
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        inputField.value = currentInput;
    }
}
function clearLastDigit() {
    currentInput = currentInput.slice(0, -1);
    inputField.value = currentInput;
}


function clearCalculator() {
    currentInput = '';
    inputField.value = '';
    outputField.value = '';
}
function isInputValid() {
    return /^[\d\s+\-*/%.]+$/.test(currentInput);
}

function calculate() {
    if (!isInputValid()) {
        outputField.value = 'Error: Invalid Input';
        return;
    }

    try {
        let result;
        if (currentInput.includes('%')) {
            result = eval(currentInput.replace(/(\d+)%/g, function(match, p1) {
                return p1 / 100;
            }));
        } else {
            result = eval(currentInput);
        }

        if (!isFinite(result)) {
            outputField.value = 'Error: Division by zero';
        } else {
            outputField.value = result;
        }
    } catch (error) {
        outputField.value = 'Error';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || key === '.') {
        appendValue(key);
    } else if (['+', '-', '*', '/','%'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        inputField.value = currentInput;
    }
});
