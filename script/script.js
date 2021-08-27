'use strict';

const buttonCalculate = document.getElementById('start');
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



let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
  income: {}, // Дополнительный доход;
  incomeMonth: 0,
  addIncome: [], // Перечисление доп.доходов;
  expenses: {}, // Доп.расходы;
  addExpenses: [], // Перечисление возможных расходов;
  deposit: false, // Наличие депозита;
  percentDeposit: 0, // Процент депозита
  moneyDeposit: 0, // Сколько денег на депозите
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  checkInput: function() {   
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
  },
  start: function () {
      // do {
      //   money = prompt('Ваш месячный доход?', 10000);
      // } while (!isNumber(money));

      // if(inputSalaryAmount.value === ''){
      //   alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      //   return;
      // }

      appData.budget = inputSalaryAmount.value;
      appData.budget = +appData.budget;

      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      // appData.asking();
      // appData.getInfoDeposit();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      appData.showResult();
    },

  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonAddIncome);
    cloneIncomeItems.querySelectorAll('input').forEach((input)=> {
      input.value = '';  
       });
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
      buttonAddIncome.style.display = 'none';
    }
  },

  addExpensesBlock: function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonAddExpenses);

    cloneExpensesItems.querySelectorAll('input').forEach((input)=> {
      input.value = '';  
       });
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
      buttonAddExpenses.style.display = 'none';
    }

  },


  getExpenses: function () {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  getIncome: function () {
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });

    // if(confirm('Есть ли у вас дополнительный источник заработка?')) {
    //   let itemIncome, cashIncome;
    //   do {
    //     itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
    //   } while(isNumber(itemIncome) || itemIncome === null || itemIncome === '' || itemIncome.trim() === '');
    //   do {
    //     cashIncome = prompt('Сколько вам приносит дополнительный заработок в месяц?');
    //   } while(!isNumber(cashIncome)); 
    //   appData.income[itemIncome] = +cashIncome;
    // }


    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key]; 
    }
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses ) {
      let sum = +(appData.expenses[key]);
      appData.expensesMonth += sum;    
    }     
  },


  // expensesMount = appData.getExpensesMonth(),
  getBudget: function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // accumulatedMonth = getAccumulatedMonth(),
  // if (accumulatedMonth >= 0) {
  // console.log('Бюджет на месяц: ', accumulatedMonth);
  // },

  getTargetMonth: function () {
    return inputTargetAmount.value / appData.budgetMonth;
  },

  
  getStatusIncome: function(){
  if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if(appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if(appData.budgetDay < 600 && appData.budgetDay >= 0){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if(appData.budgetDay <= 0){
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function(){
    if(appData.deposit){
      do {
        appData.percentDeposit = prompt('Какой годовой процент депозита?', '5');
      } while (!isNumber(appData.percentDeposit) || appData.percentDeposit === null || appData.percentDeposit === '' || appData.percentDeposit.trim() === '');
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      } while (!isNumber(appData.moneyDeposit));
      appData.moneyDeposit = +appData.moneyDeposit;
      console.log('appData.moneyDeposit: ', appData.moneyDeposit);


      
    }
  },
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', ()=> {      
      incomePeriodValue.value = appData.calcPeriod();
    });
  },

};
buttonCalculate.disabled = true;
inputSalaryAmount.addEventListener('input', () => {
  if(inputSalaryAmount.value !== '') {
    buttonCalculate.disabled = false;
  } else {
    buttonCalculate.disabled = true;
  }
});
appData.checkInput();
buttonCalculate.addEventListener('click', appData.start);
buttonAddExpenses.addEventListener('click', appData.addExpensesBlock);
buttonAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', ()=> {
  periodAmount.textContent = periodSelect.value;  
});

// console.log(`Сумма обязательных расходов: ${appData.getExpensesMonth()}`);
// while (!isNaN(money) || money.trim() === '' || money === null)


// console.log('Длинна строки - addExpenses: ',appData.addExpenses.length);
// // console.log(`Период равен ${period} месяцев`);
// console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);


// console.log('Месячный доход: ', parseInt(money));

let targetMonth = Math.round(appData.getTargetMonth());
if (appData.budgetDay > 0) {
  console.log(`Цель будет достигнута за ${targetMonth} месяца`);
} else {
 console.log(`Цель не будет достигнута.`); 
}