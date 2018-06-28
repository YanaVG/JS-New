/* 
  Необходимо создать функцию-конструктор Cashier.
  
  Поля будущего объекта кассира (🔔 объявляются как this.имя_поля в конструкторе): 
    - name - строка, имя кассира, передается при вызове конструктора
    
    - productsDatabase - объект база данных продуктов, передается при вызове конструктора
    
    - totalPrice - число, общая стоимость покупок текущего покупателя, всегда начинается с 0 
    
    - customerMoney - число, сумма введенная пользователем при запросе денег, всегда начинается с 0 
    
    - changeAmount - число, сдача, всегда начинается с 0
    
    - greet() - метод, выводит в консоль строку `Здравствуйте, вас обслуживает ${имя_кассира}`
    
    - onSuccess() - метод, выводит в консоль строку `Спасибо за покупку, ваша сдача ${сдача}` 
        если сдача больше 0, и строку `Спасибо за покупку` если сдача равна 0.
    
    - onError() - метод, выводит в консоль строку 'Очень жаль, вам не хватает денег на покупки'    
    
    - countTotalPrice(order) - метод, получает список покупок, считает общую стоимость исходя из поля productsDatabase. Записывает результат в поле totalPrice.
      
    - getCustomerMoney(value) - метод, получает число - деньги покупателя и записывает его в поле customerMoney
        
    - countChange() - метод, считает сдачу, разницу между общей суммой покупок и деньгами покупателя, 
        записывает результат в поле changeAmount.
        * Обязательно проверьте что customerMoney не меньше чем значение поля totalPrice
        * Если денег было передано достаточно, возвращает текущее значение changeAmount
        * Если было передано меньше денег чем в поле totalPrice, возвращает null 
    
    - reset() - метод, сбрасывает поля totalPrice, customerMoney и changeAmount в 0.
*/

function Cashier(name, productsDatabase) {
  
    this.name = name;
    this.productsDatabase = productsDatabase;
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
    
    this.greet = function (){
      console.log(`Здравствуйте, вас обслуживает ${this.name}`)
    };
    
    this.onSuccess = function () {
      if (this.changeAmount > 0) {
          console.log(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
      } else {  
          console.log(`Спасибо за покупку`); 
      }
    };
   
    this.onError = function () {
      if (this.customerMoney - this.totalPrice < 0) {
        console.log('Очень жаль, вам не хватает денег на покупки');
      }
    };
    
    this.countTotalPrice = function (order) {
      const values = Object.values(order);
        for (let i = 0; i < values.length; i++) {
           this.totalPrice += values[i];       
        };
        return this.totalPrice;
    };
    
    this.getCustomerMoney = function (value) {
      this.customerMoney = value;
      return this.customerMoney;
    }
    
    this.countChange = function () {    
      if(this.customerMoney - this.totalPrice > 0) {
         this.changeAmount = this.customerMoney - this.totalPrice;
         return this.changeAmount;
       } else {
           return null;
         };
    };
    
    this.reset = function() {
      this.totalPrice = 0;
      this.customerMoney = 0;
      this.changeAmount = 0.
    };
  };
  
  const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
  };
  
  const mango = new Cashier('Mango', products);
  
  // Проверяем исходные значения полей
  console.log(mango.name); // Mango
  console.log(mango.productsDatabase); // ссылка на базу данных продуктов (объект products)
  console.log(mango.totalPrice); // 0
  console.log(mango.customerMoney); // 0
  console.log(mango.changeAmount); // 0
  
  // Вызываем метод greet
  mango.greet(); // Здравствуйте, вас обслуживает Mango
  
  // Вызываем метод countTotalPrice для подсчета общей суммы
  // передавая order - список покупок пользователя
  mango.countTotalPrice(products);
  
  // Проверям что посчитали
  console.log(mango.totalPrice); // 135
  
  // Вызываем getCustomerMoney для запроса денег покупателя
  mango.getCustomerMoney(300);
  
  // Проверяем что в поле с деньгами пользователя
  console.log(mango.customerMoney); // 300
  
  // Вызываем countChange для подсчета сдачи
  const result = mango.countChange();
  
  // Проверяем что нам вернул countChange
  console.log(result); // 165
  
  // Проверяем результат подсчета денег
  if(result !== null) {
     // При успешном обслуживании вызываем метод onSuccess
    mango.onSuccess(); // Спасибо за покупку, ваша сдача 190
  } else {
    // При неудачном обслуживании вызываем метод onError   
    mango.onError(); // Очень жаль, вам не хватает денег на покупки
  }
  
  // Вызываем reset при любом исходе обслуживания
  mango.reset();
  
  // Проверяем значения полей после reset
  console.log(mango.totalPrice); // 0
  console.log(mango.customerMoney); // 0
  console.log(mango.changeAmount); // 0