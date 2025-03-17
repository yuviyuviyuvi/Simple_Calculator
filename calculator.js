const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clear')) {
            clear();
            return;
        }

        if (button.textContent === '±') {
            toggleSign();
            return;
        }

        if (button.textContent === '%') {
            percentage();
            return;
        }

        if (button.classList.contains('operator') && button.textContent !== '±' && button.textContent !== '%') {
            handleOperator(button.textContent);
            return;
        }

        if (button.classList.contains('equals')) {
            evaluate();
            return;
        }

        inputNumber(button.textContent);
    });
});

function clear() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function inputNumber(number) {
    if (shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        display.textContent = display.textContent === '0' ? number : display.textContent + number;
    }
}

function handleOperator(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = display.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    secondOperand = display.textContent;
    display.textContent = operate(currentOperation, firstOperand, secondOperand);
    currentOperation = null;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return roundResult(a + b);
        case '-':
            return roundResult(a - b);
        case '×':
            return roundResult(a * b);
        case '÷':
            return b === 0 ? 'Error' : roundResult(a / b);
        default:
            return null;
    }
}

function toggleSign() {
    display.textContent = (-parseFloat(display.textContent)).toString();
}

function percentage() {
    display.textContent = (parseFloat(display.textContent) / 100).toString();
}

function roundResult(number) {
    return Math.round(number * 1000000) / 1000000;
}