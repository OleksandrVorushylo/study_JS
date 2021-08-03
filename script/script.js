'use strict';
let money = 260;
money = prompt('Ваш месячный доход?');
console.log('money: ', typeof money);

let income;
income = 'freelance';
console.log('income: ', typeof income);
let addExpenses;
addExpenses = 'Food, communal apartment, fuel, entertainment';
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = true;
deposit = confirm('Есть ли у вас депозит в банке?');
console.log('deposit: ', typeof deposit);
let mission = 10000;
let period = 6;
console.log('Длинна строки - addExpenses: ',addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(', '));


console.log('Месячный доход: ', money);
console.log('Депозит в банке: ', deposit);

let expenses1;
expenses1 = prompt('Введите обязательную статью расходов?');
console.log('Статья расходов: ', expenses1);
let amount1;
amount1 = 500;
amount1 = prompt('Во сколько это обойдется?');
console.log('Во сколько это обойдется: ', amount1);

let expenses2;
expenses2 = prompt('Введите обязательную статью расходов?');
console.log('Статья расходов: ', expenses2);
let amount2;
amount2 = 500;
amount2 = prompt('Во сколько это обойдется?');
console.log('Во сколько это обойдется: ', amount2);

let budgetMonth;
budgetMonth = money-amount1-amount2;
console.log('Бюджет на месяц: ', budgetMonth);

let missionMonth;
missionMonth = Math.ceil(mission/budgetMonth);
console.log(`Цель будет достигнута за ${missionMonth} месяца`);

let budgetDay;
budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ', budgetDay);
// let budgetDay;
// budgetDay = -100;

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if(budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if(budgetDay < 600 && budgetDay >= 0){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if(budgetDay <= 0){
  console.log('Что то пошло не так');
}
// let questionDeposit = confirm('Есть ли у вас депозит в банке?');
// console.log('questionDeposit: ', questionDeposit);