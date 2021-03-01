class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
    }
    
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation =undefined;
    }

    delete(){
            this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number ==='.' && this.currentOperand.includes('.')) return
        if (this.currentOperand !== undefined)
            this.currentOperand = this.currentOperand + number.toString() ;
        else
            this.currentOperand = number.toString();
    }

    chooseOperation(operation){ 
        if(this.currentOperand === '' )return
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand ;
        this.currentOperand = '';
    }

    compute()
    {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev)||isNaN(current)) return
        switch (this.operation){
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case '*': computation = prev * current; break;
            case '/': computation = prev / current; break;
        default:
            return
        }
        this.currentOperand =computation;
        this.operation = undefined;
        this.previousOperand ='';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0});
        }
        if (decimalDigits != null ){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
        // if( isNaN(floatNumber)) return '';
        // //Dùng để bỏ dấu phẩy phân cách hàng nghìn giữa các số(nếu có)
        // return floatNumber.toLocaleString('en');
    }
    updateDisplay(){
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerHTML = `${this.previousOperand} ${ this.operation }`;
        }else{
            this.previousOperandTextElement.innerHTML = ''
        }
    }
}
//querySelector sử dụng [] để tìm theo attribute trong thẻ
const numbersButton = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbersButton.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})