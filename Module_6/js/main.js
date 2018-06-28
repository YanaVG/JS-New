class Hamburger {
/**
 * @constructor
 * @param {String} size - Размер
 * @param {String} stuffing - Начинка
 */
  
constructor({size, stuffing}) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
}


/**
 * Добавить topping к гамбургеру. Можно добавить несколько topping, при условии, что они разные.
 * @param {String} topping - Тип добавки
 */
addTopping(topping) {
    if(this.toppings.includes(topping)){
        console.log(`${topping} has already existed`);
    } else {
        this.toppings.push(topping);
    };
    
}

/**
 * Убрать topping, при условии, что она ранее была добавлена
 * @param {String} topping - Тип добавки
 */

removeTopping(topping) {
    if(this.toppings.length > 0) {
       return this.toppings.filter(item => item !== topping);
    } else {
        console.log(`You don't have any topping`);
    };
    console.log(this.toppings);
}

/**
 * Получить список toppings
 * @returns {Array} - Массив добавленных topping, содержит значения констант Hamburger.TOPPING_*
 */

getToppings() {
    if (this.toppings.length > 0 ) {
        console.log(`this.toppings: ${this.toppings}`);
    } else {
        console.log('It was not added any toppings');
    };
}

/**
 * Узнать размер гамбургера
 * @returns {String} - размер гамбургера
 */

getSize() {
    if (this.size === undefined) {
        console.log('It was not added any hamburger'); 
    } else {
        console.log(`this.size: ${this.size}`);   
    };
}

/**
 * Узнать начинку гамбургера
 * @returns {String} - начинка гамбургера
 */

getStuffing() {
    if (this.toppings === undefined) {
        console.log('It was not added any toppings');
    } else {
        console.log(`this.toppings: ${this.toppings}`);     
    };
}

/**
 * Узнать цену гамбургера
 * @returns {Number} - Цена в деньгах
 */

calculatePrice() {
    // debugger
    if(this.size === undefined || this.topping === undefined){
        //???
        console.log(`WE can't count price`);
        console.log(`this.toppings in price: ${this.toppings}`);

        console.log(`this.size in price: ${this.size}`);
    } else {
        const hamSizePrice = Hamburger.SIZES[this.size].price;
        const hamStuffingPrice = Hamburger.STUFFINGS[this.stuffing].price;
        const hamToppingPrice = this.toppings.reduce((acc, topping) => acc + Hamburger.TOPPINGS[topping].price, 0);
    // debugger
        console.log(`Price: ${hamSizePrice + hamStuffingPrice + hamToppingPrice}$`);
        
    };
}

/**
 * Узнать калорийность
 * @returns {Number} - Калорийность в калориях
 */

calculateCalories() {
    // debugger
    if(this.size === undefined || this.topping === undefined){
        console.log(`WE can't count callories`)
    } else {
        const hamSizeCal = Hamburger.SIZE[this.size].calories;
        const hamStuffingCal = Hamburger.STUFFINGS[this.stuffing].calories;
        const hamToppingCal = this.toppings.reduce((acc, topping) => acc + Hamburger.TOPPINGS[topping].calories, 0);
    // debugger
        console.log(`Calories: ${hamSizeCal + hamStuffingCal + hamStuffingCal}ccal`); 
    };     
}
};

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_LARGE = 'SIZE_LARGE';

Hamburger.SIZES = {
  [Hamburger.SIZE_SMALL]: {
    price: 30,
    calories: 50,
  },
};
Hamburger.SIZES = {
    [Hamburger.SIZE_LARGE]: {
      price: 50,
      calories: 100,
    },
  };

Hamburger.STUFFING_CHEESE = 'STUFFING_CHEESE';
Hamburger.STUFFING_SALAD = 'STUFFING_SALAD';
Hamburger.STUFFING_MEAT = 'STUFFING_MEAT';

Hamburger.STUFFINGS = {
    [Hamburger.STUFFING_CHEESE]: {
        price: 15,
        calories: 20,
      },
    [Hamburger.STUFFING_SALAD]: {
      price: 20,
      calories: 5,
    },
    [Hamburger.STUFFING_MEAT]: {
        price: 35,
        calories: 15,
      },
  };  
					
Hamburger.TOPPING_SPICE = 'TOPPING_SPICE';
Hamburger.TOPPING_SAUCE = 'TOPPING_SAUCE';

Hamburger.TOPPINGS = {
  [Hamburger.TOPPING_SPICE]: {
    price: 10,
    calories: 0,
  },
  [Hamburger.TOPPING_SAUCE]: {
    price: 15,
    calories: 5,
  },
};

const ham = new Hamburger({
    size: Hamburger.SIZE_SMALL,
    stuffing: Hamburger.STUFFING_CHEESE,
});

ham.addTopping(Hamburger.TOPPING_SPICE);
ham.addTopping(Hamburger.TOPPING_SAUCE);
// ham.addTopping(Hamburger.TOPPING_SPICE);
// ham.addTopping(Hamburger.TOPPING_SAUCE);

ham.getToppings();
ham.getSize();
ham.getStuffing();
ham.calculatePrice();
ham.calculateCalories();

// Маленький гамбургер с начинкой из сыра
// const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// Добавка из приправы
// hamburger.addTopping(Hamburger.TOPPING_SPICE);

// Спросим сколько там калорий
// console.log("Calories: ", ham.calculateCalories());

// Сколько стоит?
// console.log("Price: ", ham.calculatePrice());

// Я тут передумал и решил добавить еще соус
// hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А сколько теперь стоит? 
// console.log("Price with sauce: ", ham.calculatePrice());

// Проверить, большой ли гамбургер? 
console.log("Is hamburger large: ", ham.getSize() === Hamburger.SIZE_LARGE); // -> false

// Убрать добавку
ham.removeTopping(Hamburger.TOPPING_SPICE);

console.log(`Ham: ${ham}`);