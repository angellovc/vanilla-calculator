class Calculator {
    constructor(screenCurrent, screenResult) {
        this.screenCurrent = screenCurrent;
        this.screenResult = screenResult;
        this.clear()
    }

    clear() {
        this.operation = '';
        this.result = '';
        this.remaining = '';
    }
    
    equal() {
        this.remaining = eval(this.operation);
        this.update();
    }


    delete() {
        this.operation = this.operation.slice(0, -1);
        this.update();
    }

    insertNumber(number) {
        if (this.remaining && isNaN(number) === true) {
            this.operation = this.remaining;
            this.remaining = '';
        }
        if (this.remaining && isNaN(number) === false) {
            this.clear()
            this.update()
        }
        if (number === 'x') {
            number = '*';
        } else if (number === '÷') {
            number = '/'
        }
        this.operation = this.operation.toString() + number.toString();
    }

    insertOperator(operator) {
        let operationLen = this.operation.length;
        let lastItem = undefined;
        let penultimate = undefined;
        lastItem = parseInt(this.operation.slice(-1));

        if (this.operation.length > 1) {
            penultimate = parseInt(this.operation.slice(-2));
        }
        if ((operationLen > 0 && isNaN(lastItem) === false)) {
            this.insertNumber(operator);
            this.update();
        } else if (operationLen === 0 && operator === '-') {
            this.insertNumber(operator);
            this.update();
        } else if (isNaN(lastItem) === true && operator === '-' && isNaN(penultimate) === false) {
            if (this.operation[this.operation.length - 1] !== '-') {
                this.insertNumber(operator);
                this.update();
            }
        }
    }

    update() {
        this.screenCurrent.innerText = this.operation
        this.screenResult.innerText = this.remaining
    }
}


const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operations]')
const del = document.querySelector('[data-del]');
const clearAll = document.querySelector('[data-clear-all]');
const screenCurrent = document.querySelector('[current-screen]');
const screenResult = document.querySelector('[result-screen]');
const equal = document.querySelector('[data-equal]')

const calculator = new Calculator(screenCurrent, screenResult);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertNumber(button.innerText);
        calculator.update();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertOperator(button.innerText)
    })
});
clearAll.addEventListener('click', button => {
    calculator.clear();
    calculator.update();
});

del.addEventListener('click', button => {
    calculator.delete();
});

equal.addEventListener('click', button => {
    calculator.equal();
});