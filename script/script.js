'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const buttonCalculate = document.getElementById('start'),
      resetCalculate = document.getElementById('cancel'),
      depositCheck = document.getElementById('deposit-check'),
      buttonAddIncome = document.getElementsByTagName('button')[0],
      buttonAddExpenses = document.getElementsByTagName('button')[1],
      buttonAddDeposit = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.querySelector('.budget_month-value'),
      budgetDayValue = document.querySelector('.budget_day-value'),
      expensesMonthValue = document.querySelector('.expenses_month-value'),
      additionalIncomeValue = document.querySelector('.additional_income-value'),
      additionalExpensesValue = document.querySelector('.additional_expenses-value'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      incomePeriodValue = document.querySelector('.income_period-value'),
      targetMonthValue = document.querySelector('.target_month-value'),
      inputSalaryAmount = document.querySelector('.salary-amount'),
      inputIncomeTitle = document.querySelector('.income-title'),
      inputIncomeAmount = document.querySelector('.income-amount'),
      inputExpensesTitle = document.querySelector('.expenses-title'),
      inputExpensesAmount = document.querySelector('.expenses-amount'),
      inputAdditionalExpenses = document.querySelector('.additional_expenses-item'),
      inputTargetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    result = document.querySelectorAll('.result input[type=text]');



class AppData {
  constructor() {
    this.income = {}; // Дополнительный доход;
    this.incomeMonth = 0;
    this.addIncome = []; // Перечисление доп.доходов;
    this.expenses = {}; // Доп.расходы;
    this.addExpenses = []; // Перечисление возможных расходов;
    this.deposit = false; // Наличие депозита;
    this.percentDeposit = 0; // Процент депозита
    this.moneyDeposit = 0; // Сколько денег на депозите
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }

  checkInput() {   
    let allInput = document.querySelectorAll('input');
    allInput.forEach((item)=>{
      item.addEventListener('input', () => {
        if (item.getAttribute('placeholder') === 'Наименование') {
            item.value = item.value.replace(/[^а-я ^А-Я \s !?,. ]/,'');
        }
        if (item.getAttribute('placeholder') === 'Сумма') {
            item.value = item.value.replace(/[^0-9]/,'');
        }
      });  
    });
  }

  start() {

      if (inputSalaryAmount.value === '') {
      buttonCalculate.removeAttribute('disabled');
      return;
    }
      this.budget = inputSalaryAmount.value;
      this.budget = +this.budget;

      const allInput = document.querySelectorAll('.data input[type=text]');
            allInput.forEach(function(item){
              item.setAttribute('disabled', 'disabled');
        });

      buttonAddIncome.setAttribute('disabled', 'disabled');
      buttonAddDeposit.setAttribute('disabled', 'disabled');


      buttonCalculate.style.display = 'none';
      resetCalculate.style.display = 'block';

      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
  }

    reset() {
    const allInputReset = document.querySelectorAll('.data input[type=text]');
    allInputReset.forEach(function(elem){
              elem.value = '';
            });
    periodSelect.value = 0;
    periodAmount.innerHTML = periodSelect.value;

    result = document.querySelectorAll('.result input[type=text]');
            result.forEach(function(elem) {
              elem.value = '';

            });

    incomeItems.forEach((item, index) => {
      if (index !== 0) item.remove();
      });
      expensesItems.forEach((item, index) => {
      if (index !== 0) item.remove();
      });


    buttonCalculate.style.display = 'block';
    resetCalculate.style.display = 'none';
    buttonAddIncome.removeAttribute('disabled', 'disabled');
    buttonAddDeposit.removeAttribute('disabled', 'disabled');
    depositCheck.checked=false;


    const allInput = document.querySelectorAll('.data input[type=text]');
            allInput.forEach(function(item){
              item.removeAttribute('disabled', 'disabled');
        });
  }

  // addIncomeBlock() {
  //   let cloneIncomeItems = incomeItems[0].cloneNode(true);
  //   incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonAddIncome);
  //   cloneIncomeItems.querySelectorAll('input').forEach((input)=> {
  //     input.value = '';  
  //      });
  //   incomeItems = document.querySelectorAll('.income-items');

  //   if(incomeItems.length === 3){
  //     buttonAddIncome.style.display = 'none';
  //   }
  // }

  // addExpensesBlock() {
  //   let cloneExpensesItems = expensesItems[0].cloneNode(true);
  //   expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonAddExpenses);

  //   cloneExpensesItems.querySelectorAll('input').forEach((input)=> {
  //     input.value = '';  
  //      });
  //   expensesItems = document.querySelectorAll('.expenses-items');

  //   if(expensesItems.length === 3){
  //     buttonAddExpenses.style.display = 'none';
  //   }
    

  // }

  addExpIncBlock(items, button) {
    let cloneItems = items[0].cloneNode(true);
    items[0].parentNode.insertBefore(cloneItems, button);

    cloneItems.querySelectorAll('input').forEach((input)=> {
      input.value = '';  
       });
    
    incomeItems = document.querySelectorAll('.income-items');
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      buttonAddExpenses.style.display = 'none';
    }
    if(incomeItems.length === 3){
      buttonAddIncome.style.display = 'none';
    }

    this.checkInput();

  }

  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      console.log('startStr: ', startStr);
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = itemAmount;
      }
    };

    expensesItems.forEach(count);

    incomeItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key]; 
    }

  }   // getExpenses + getIncome;

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses ) {
      let sum = +(this.expenses[key]);
      this.expensesMonth += sum;    
    }     
  }

  getBudget(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth () {
    return inputTargetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
  if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if(this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if(this.budgetDay < 600 && this.budgetDay >= 0){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if(this.budgetDay <= 0){
      return ('Что то пошло не так');
    }
  }

  getInfoDeposit (){
    if(this.deposit){
      do {
        this.percentDeposit = prompt('Какой годовой процент депозита?', '5');
      } while (!isNumber(this.percentDeposit) || this.percentDeposit === null || this.percentDeposit === '' || this.percentDeposit.trim() === '');
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?');
      } while (!isNumber(this.moneyDeposit));
      this.moneyDeposit = +this.moneyDeposit;
      console.log('appData.moneyDeposit: ', this.moneyDeposit);
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', ()=> {      
      incomePeriodValue.value = _this.calcPeriod();
    });
  }

  eventsListeners () {
    buttonCalculate.disabled = true;
    inputSalaryAmount.addEventListener('input', () => {
      if(inputSalaryAmount.value !== '') {
        buttonCalculate.disabled = false;
      } else {
        buttonCalculate.disabled = true;
      }
    });
    this.checkInput();
    buttonCalculate.addEventListener('click', this.start.bind(appData));

    buttonAddExpenses.addEventListener('click', function(){
      appData.addExpIncBlock(expensesItems, buttonAddExpenses);
    });

    buttonAddIncome.addEventListener('click', function(){
      appData.addExpIncBlock(incomeItems, buttonAddIncome);
    });

    periodSelect.addEventListener('input', ()=> {
      periodAmount.textContent = periodSelect.value;  
    });
    resetCalculate.addEventListener('click', this.reset);

    let targetMonth = Math.round(this.getTargetMonth());
    if (appData.budgetDay > 0) {
      console.log(`Цель будет достигнута за ${targetMonth} месяца`);
    } else {
    console.log(`Цель не будет достигнута.`); 
    }
  }




}


  

const appData = new AppData();
console.log('appData: ', appData);
appData.eventsListeners();



