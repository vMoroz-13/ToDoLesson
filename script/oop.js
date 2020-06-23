
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
let additionalExpensesItem =document.querySelector('.additional_expenses-item');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const inputSalarAymount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('input.income-title');
const inputExpensesTitle = document.querySelector('.expenses-title');
let  expensesItems = document.querySelectorAll('.expenses-items');//
let incomeItems = document.querySelectorAll('.income-items');
const inputAdditionalIncomeItem = document.querySelector('.additional_income-item');
const inputAdditionalIncomeAmount = document.querySelector('.additional_income-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputDepositCheck = document.querySelector('#deposit-check');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const PeriodSelect = document.querySelector('.period-select');
 let periodAmount = document.querySelector('.period-amount');
let inpAll =  document.querySelectorAll('input[type=text]');
let cancel =document.querySelector('#cancel');


const isText = function(data){
  const pattern = new RegExp('[а-яё]','gi');
    return pattern.test(data);
};

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

start.setAttribute("disabled", "true");
//start.removeAttribute("disabled") https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled

inputSalarAymount.addEventListener("input", function(event) {
    if (event.target.value) {
      start.disabled = false;
    } else {
      start.disabled = true;
    }
      
  }, false);
  

                                     //Начало obj
let appData = {

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0, 
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: [],
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
       
    start (){
           
            appData.budget = +inputSalarAymount.value;
            appData.getExppenses();    
            appData.getExpensesMonth();
            appData.getIncome();
            appData.getAddExpenses();
            appData.getAddIncome();
            
            appData.getBudget();

            appData.showResult();
 //  Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать         
            inpAll.forEach((item)=>{
                item.disabled = true; 
            });          
  //после этого кнопка Рассчитать пропадает
             start.style.display = 'none';
   //появляется кнопка Сбросить
            cancel.style.display = 'block';
         
                 
    }, 
    
     reset(){ 
    appData.start();
    
       
        
     
          },  
    
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        //incomePeriodValue.value = appData.calcSavedMoney();
       
        PeriodSelect.addEventListener('input', ()=>{
            incomePeriodValue.value = this.calcSavedMoney();
        });
    },
    addIncomeBlock(){
        let clonIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(clonIncomeItems,btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            btnPlusIncome.style.display = 'none';
        }
    },
    getIncome(){
        incomeItems.forEach((item)=>{
            let itemIncome = item.querySelector('.income-title').value;
            let cachIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cachIncome !== ''){
                this.income[itemIncome] = cachIncome;
            }
        });
        for(let key in this.income){
            this.incomeMonth += + this.income[key];
        }
        
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
                this.expenses[itemExpanses] = cachExpanses;/////////
            }
        });
    },
    getAddExpenses(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item)=>{
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome(){
        additionalIncomeItem.forEach((item)=>{
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    },
   

    getExpensesMonth() { 
       for(let key in this.expenses){
        this.expensesMonth += +this.expenses[key];         
       } 

    },

    getBudget (){

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;

        this.budgetDay = Math.floor(this.budgetMonth/30);

    },

    getTargetMonth (){
        return inputTargetAmount.value/this.budgetMonth;   
    },

    getStatusIncome (){
        if(this.budgetDay > 800){
            return('У вас высокий уровень дохода!');
        }else if( this.budgetDay > 300){
            return('У вас средний уровень дохода');  
        }else if(this.budgetDay > 0 ){
            return('У вас низкий уровень дохода');  
        }else {
            return('Что то пошло не так');    
        }
    },

    getInfoDeposit(){
        if(this.deposit){
          do{
            this.percentDeposit = prompt('Какой годовой процент?',10);   
          }while(!isNumber(this.percentDeposit));
           do{
            this.moneyDeposit = prompt('Какая сумма заложена в банк?',10000);
           }while(!isNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney(){
       return this.budgetMonth * PeriodSelect.value;
    },
    showChengeRange(event){
        periodAmount.textContent = event.target.value;

    }
};

//appData.reset();
                                 //The end obj
  // 1) Привязать контекст вызова функции start к appData 
 let appDataObj = appData.start.bind(appData);                               

start.addEventListener('click',appData.start);
//навешиваем событие и выполнение метода reset
cancel.addEventListener('click', appData.reset);

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click',appData.addIncomeBlock);
PeriodSelect.addEventListener('input',appData.showChengeRange);


 appData.getInfoDeposit(); 