'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
// let money= +prompt('Ваш месячный доход?', 10000);

let income;
income = 'Фриланс';
let addExpenses;
addExpenses = 'Food, communal apartment, fuel, entertainment';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ресторан, Кино');
let deposit = true;
deposit = confirm('Есть ли у вас депозит в банке?');

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));

};
start();

// while (!isNaN(money) || money.trim() === '' || money === null)

// var filterInt = function (value) {
//   if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)){
//     return Number(value);
//   }   
//   return NaN;
// };


let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(parseInt(money));
showTypeOf(income);
showTypeOf(deposit);
let expenses1, expenses2;

let mission = 30000;
let period = 6;
console.log('Длинна строки - addExpenses: ',addExpenses.length);
// console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(/, |,/));


console.log('Месячный доход: ', parseInt(money));
console.log('Депозит в банке: ', deposit);

// let expenses1;
// expenses1 = prompt('Введите обязательную статью расходов?', 'Комунальные услуги');
// console.log('Обязательные расходы на: ', expenses1);
// let amount1;
// amount1 = 500;
// amount1 = parseInt(prompt('Во сколько это обойдется?', 1500));
// console.log('Во сколько это обойдется: ', amount1);

// let expenses2;
// expenses2 = prompt('Введите обязательную статью расходов?', 'Еда');
// console.log('Обязательные расходы на: ', expenses2);
// let amount2;
// amount2 = 500;
// amount2 = parseInt(prompt('Во сколько это обойдется?', 2500));
// console.log('Во сколько это обойдется: ', amount2);


let getExpensesMonth = function(){
  let sum = 0;
  for (let i = 0; i < 2; i++) {

    if (i === 0) {

      expenses1 = prompt('Введите обязательную статью расходов?', 'Комунальные услуги');
    } else if (i === 1) {
      expenses2 = prompt('Введите обязательную статью расходов?', 'Еда');
    }
    sum += +prompt('Во сколько это обойдется?', 1500);
  }
  console.log('Обязательные расходы на: ', expenses1);
  console.log('Обязательные расходы на: ', expenses2);
  return sum;
};
// getExpensesMonth();

let expensesAmount = getExpensesMonth();

// let expensesMonth = getExpensesMonth(amount1, amount2);
console.log('Сумма всех обязательных расходов за месяц: ', + expensesAmount);

let getAccumulatedMonth = function(a, b){
  return a - b;
};
let accumulatedMonth = +getAccumulatedMonth(money, expensesAmount);
if (accumulatedMonth >= 0) {
  console.log('Бюджет на месяц: ', accumulatedMonth);
}

let getTargetMonth = (a, b) => a / b;
let targetMonth = getTargetMonth(mission, accumulatedMonth);
if (accumulatedMonth > 0) {
  targetMonth = Math.ceil(mission/accumulatedMonth);
  console.log(`Цель будет достигнута за ${targetMonth} месяца`);
} else {
 console.log(`Цель не будет достигнута.`); 
}

let budgetDay;
budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день: ', budgetDay);

let getStatusIncome = function(){
  if (budgetDay >= 1200) {
  return ('У вас высокий уровень дохода');
} else if(budgetDay >= 600) {
  return ('У вас средний уровень дохода');
} else if(budgetDay < 600 && budgetDay >= 0){
  return ('К сожалению у вас уровень дохода ниже среднего');
} else if(budgetDay <= 0){
  return ('Что то пошло не так');
}
};
console.log(getStatusIncome());