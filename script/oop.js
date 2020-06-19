
'use strict';

const start = document.getElementById('start');
const btnPluses = document.getElementsByTagName('button');
const btnPlusIncome = btnPluses[0];
const btnPlusExpenses = btnPluses[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const inputSalarAymount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('input.income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-title');
let  expensesItems = document.querySelectorAll('.expenses-items');//
const inputAdditionalIncomeItem = document.querySelector('.additional_income-item');
const inputAdditionalIncomeAmount = document.querySelector('.additional_income-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputDepositCheck = document.querySelector('#deposit-check');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
 

const isText = function(data){
  const pattern = new RegExp('[а-яё]','gi');
    return pattern.test(data);
};

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
                                              //Начало obj
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0, 
    income: {},
    addIncome: [],
    expenses: [],
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,

    start (){
        // do{money = prompt ('Ваш месячный доход?',50000); 
        //     }while(!isNumber(money));
           if(inputSalarAymount.value === ''){
               alert('Поле "Месячный доход" обязательно должна быть заполнено!');
               return;
           }
            appData.budget = inputSalarAymount.value;
            appData.getExppenses();      
            appData.getExpensesMonth();
            appData.getBudget();
            appData.showResult();
    }, 
    showResult(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
    },
    addExpensesBlock(){

         let clonExpensesItems = expensesItems[0].cloneNode(true);
         expensesItems[0].parentNode.insertBefore(clonExpensesItems,btnPlusExpenses);
         expensesItems = document.querySelectorAll('.expenses-items');
         if(expensesItems.length === 3){
             btnPlusExpenses.style.display = 'none';
         }     
    },
    getExppenses(){
        expensesItems.forEach((item)=>{

            let itemExpanses = item.querySelector('.expenses-title').value;
            let cachExpanses = item.querySelector('.expenses-amount').value;
            if(itemExpanses !== '' && cachExpanses !== ''){
                appData.expenses[itemExpanses] = cachExpanses;
            }
        });
    },
    asking(){   
        if(confirm('Есть ли у Вас дополнительный заработок?')){
          let itemIncome;
          do{
            itemIncome = prompt('Какой у Вас дополнительный заработок?','Таксую');
          }while(!isText(itemIncome));
          let cashIncome;
            do{
             cashIncome = prompt('Каккую сумму Вы зарабатываете в месяц?', 10000);
            } while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses;
        do{
            addExpenses = prompt('Введите обязательные статьи расходов','Интернет, Такси, Коммунальные расходы');
        }while(!isText(addExpenses));

          appData.addExpenses = addExpenses.toLowerCase().split(',');//

          let str = appData.addExpenses.join().split(', ');//интернет, такси, коммунальные расходы
          let arr =[];
         for(let i = 0; i < str.length; i++){
         arr.push(str[i].split('')[0].toUpperCase() + str[i].slice(1).toLowerCase());
         }
         console.log(arr.join());

          appData.deposit = confirm ('Eсть ли у Вас депозит в банке?');               
        // for(let i = 0; i < 2; i++){
        //     let itemExpenses; 
        //     do{
        //         itemExpenses  = prompt('Введите обязательную статью расходов','Садик государственный');
        //     }while(!isText(itemExpenses));
        //     let cachExpanses;
        //      do{
        //         cachExpanses = prompt ("Во сколько это обойдется?",2500);
        //       }while(!isNumber(cachExpanses));

        //       appData.expenses[itemExpenses] = cachExpanses;
        // }

    },

    getExpensesMonth() { 
       for(let key in appData.expenses){
        appData.expensesMonth += +appData.expenses[key];         
       } 

    },

    getBudget (){

        appData.budgetMonth = appData.budget - appData.expensesMonth;

        appData.budgetDay = Math.floor(appData.budgetMonth/30);

    },

    getTargetMonth (){
        return appData.mission/appData.budgetMonth;   
    },

    getStatusIncome (){
        if(appData.budgetDay > 800){
            return('У вас высокий уровень дохода!');
        }else if( appData.budgetDay > 300){
            return('У вас средний уровень дохода');  
        }else if(appData.budgetDay > 0 ){
            return('У вас низкий уровень дохода');  
        }else {
            return('Что то пошло не так');    
        }
    },

    getInfoDeposit(){
        if(appData.deposit){
          do{
            appData.percentDeposit = prompt('Какой годовой процент?',10);   
          }while(!isNumber(appData.percentDeposit));
           do{
            appData.moneyDeposit = prompt('Какая сумма заложена в банк?',10000);
           }while(!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney(){
       return appData.budgetMonth * appData.period;
    }
};
                                               //The end obj

start.addEventListener('click',appData.start);
btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);




console.log('— Расходы за месяц: ',appData.expensesMonth);

if(appData.getTargetMonth() > 0){
    console.log('— Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');   
}else{
    console.log('— Цель не будет достигнута');  
}

console.log(appData.getStatusIncome());

for(let key in appData){
    console.log("Наша программа включает в себя данные: "  + key + '-' + appData[key]);
}

 appData.getInfoDeposit(); 

 

