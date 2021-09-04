'use strict';

const buttonCalculate = document.getElementById('start');
const resetCalculate = document.getElementById('cancel');
const depositCheck = document.getElementById('deposit-check');
const buttonAddIncome = document.getElementsByTagName('button')[0];
const buttonAddExpenses = document.getElementsByTagName('button')[1];
const buttonAddDeposit = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
let inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const inputAdditionalExpenses = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items');
let result = document.querySelectorAll('.result input[type=text]');



let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function() {
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
};

AppData.prototype.checkInput = function() {   
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
  };

AppData.prototype.start = function () {

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

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
    };

AppData.prototype.reset = function () {
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
  };

  AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonAddIncome);
    cloneIncomeItems.querySelectorAll('input').forEach((input)=> {
      input.value = '';  
       });
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
      buttonAddIncome.style.display = 'none';
    }
  };

  AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonAddExpenses);

    cloneExpensesItems.querySelectorAll('input').forEach((input)=> {
      input.value = '';  
       });
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
      buttonAddExpenses.style.display = 'none';
    }

  };


  AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  };

  AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        _this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key]; 
    }
  };

  AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        _this.addExpenses.push(item);
      }
    });
  };
  AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        _this.addIncome.push(itemValue);
      }
    });
  };

  AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses ) {
      let sum = +(this.expenses[key]);
      this.expensesMonth += sum;    
    }     
  };

  AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  

  AppData.prototype.getTargetMonth = function () {
    return inputTargetAmount.value / this.budgetMonth;
  };

  
  AppData.prototype.getStatusIncome = function(){
  if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if(this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if(this.budgetDay < 600 && this.budgetDay >= 0){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if(this.budgetDay <= 0){
      return ('Что то пошло не так');
    }
  };
  AppData.prototype.getInfoDeposit = function(){
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
  };
  AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
  };
  AppData.prototype.showResult = function () {
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
  };

  AppData.prototype.eventsListeners = function(){
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
    buttonAddExpenses.addEventListener('click', this.addExpensesBlock);
    buttonAddIncome.addEventListener('click', this.addIncomeBlock);
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
  };

const appData = new AppData();
console.log('appData: ', appData);
appData.eventsListeners();



