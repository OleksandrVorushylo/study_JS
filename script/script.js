'use strict';
let money= +prompt('Ваш месячный доход?', 10000);

let income;
income = 'Фриланс';
let addExpenses;
addExpenses = 'Food, communal apartment, fuel, entertainment';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Ресторан, Кино');
let deposit = true;
deposit = confirm('Есть ли у вас депозит в банке?');

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let mission = 30000;
let period = 6;
console.log('Длинна строки - addExpenses: ',addExpenses.length);
// console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(/, |,/));


console.log('Месячный доход: ', money);
console.log('Депозит в банке: ', deposit);

let expenses1;
expenses1 = prompt('Введите обязательную статью расходов?', 'Комунальные услуги');
console.log('Обязательные расходы на: ', expenses1);
let amount1;
amount1 = 500;
amount1 = parseInt(prompt('Во сколько это обойдется?', 1500));
console.log('Во сколько это обойдется: ', amount1);

let expenses2;
expenses2 = prompt('Введите обязательную статью расходов?', 'Еда');
console.log('Обязательные расходы на: ', expenses2);
let amount2;
amount2 = 500;
amount2 = parseInt(prompt('Во сколько это обойдется?', 2500));
console.log('Во сколько это обойдется: ', amount2);


let getExpensesMonth = function(a, b){
  return a + b;
};
let expensesMonth = getExpensesMonth(amount1, amount2);
console.log('Сумма всех обязательных расходов за месяц: ', expensesMonth);

let getAccumulatedMonth = function(a, b, c){
  return a - b - c;
};
let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
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