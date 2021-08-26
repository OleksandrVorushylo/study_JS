'use strict';

const buttonCalculate = document.getElementById('start');
const buttonAddIncome = document.getElementsByTagName('button')[0];
const buttonAddExpenses = document.getElementsByTagName('button')[1];
const buttonAddDeposit = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
console.log('budgetMonthValue: ', budgetMonthValue);
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const inputAdditionalExpenses = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');







let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
  income: {}, // Дополнительный доход;
  addIncome: [], // Перечисление доп.доходов;
  expenses: {}, // Доп.расходы;
  addExpenses: [], // Перечисление возможных расходов;
  deposit: false, // Наличие депозита;
  percentDeposit: 0, // Процент депозита
  moneyDeposit: 0, // Сколько денег на депозите
  mission: 300000, // Поставленная цель;
  period: 6, // За какой период необходимо придти к цели;
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
      // do {
      //   money = prompt('Ваш месячный доход?', 10000);
      // } while (!isNumber(money));

      if(inputSalaryAmount.value === ''){
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        return;
      }

      appData.budget = inputSalaryAmount.value;
      appData.budget = +appData.budget;

      appData.getExpenses();
      appData.getExpensesMonth();
      // appData.asking();
      appData.getInfoDeposit();
      appData.getBudget();
      appData.getAddExpenses();
      appData.showResult();
    },


  addExpensesBlock: function () {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    console.log('expensesItems: ', expensesItems);

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

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  // getAddIncome: function () {
  //   additionalIncomeItem
  // },

  asking: function () {

    if(confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
      } while(isNumber(itemIncome) || itemIncome === null || itemIncome === '' || itemIncome.trim() === '');
      do {
        cashIncome = prompt('Сколько вам приносит дополнительный заработок в месяц?');
      } while(!isNumber(cashIncome)); 
      appData.income[itemIncome] = +cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ресторан, Кино');
    if (addExpenses === null) {
      return appData.asking();
    } else { 
      appData.addExpenses = addExpenses.toLowerCase().split(/, |,/);
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      }
      for (let i = 0; i < appData.addExpenses.length; i++) {
        appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].slice(1);        
      }
      console.log(`Возможные расходы: ${appData.addExpenses.join(', ')}`);
      //   for (let i = 0; i < 2; i++) {
      //     do {
      //       expenses = prompt('Введите обязательную статью расходов?');
      //     } while(isNumber(expenses) || expenses === null || expenses === '' || expenses.trim() === '');         
      //   function askAmount() { 
      //     amount = prompt('Во сколько это обойдется?');
      //     if (!isNumber(amount)) {
      //       return askAmount();
      //     } else if (amount === null) {
      //       return askAmount();
      //     } else {
      //       return +amount;
      //     }
      //   }          
        
      //   appData.expenses['"'+ expenses +'"'] = askAmount();
      // }
  }, 

  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses ) {
      sum += appData.expenses[key];    
    }     
    return sum;
  },


  // expensesMount = appData.getExpensesMonth(),
  getBudget: function(){
    appData.expensesMount = appData.getExpensesMonth();
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // accumulatedMonth = getAccumulatedMonth(),
  // if (accumulatedMonth >= 0) {
  // console.log('Бюджет на месяц: ', accumulatedMonth);
  // },

  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
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
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
  },

};
console.log('getExpensesMonth: ', appData.getExpensesMonth());
buttonCalculate.addEventListener('click', appData.start);
buttonAddExpenses.addEventListener('click', appData.addExpensesBlock);

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
// console.log(appData.getStatusIncome());
// console.log('Бюджет на день: ', budgetDay);
// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log(key , appData[key] );
// }