'use strict'

const laptops = [
    {
      size: 13,
      color: 'white',
      price: 28000,
      release_date: 2015,
      name: 'Macbook Air White 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 13,
      color: 'gray',
      price: 32000,
      release_date: 2016,
      name: 'Macbook Air Gray 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 13,
      color: 'black',
      price: 35000,
      release_date: 2017,
      name: 'Macbook Air Black 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'white',
      price: 45000,
      release_date: 2015,
      name: 'Macbook Air White 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'gray',
      price: 55000,
      release_date: 2016,
      name: 'Macbook Pro Gray 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'black',
      price: 45000,
      release_date: 2017,
      name: 'Macbook Pro Black 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'white',
      price: 65000,
      release_date: 2015,
      name: 'Macbook Air White 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'gray',
      price: 75000,
      release_date: 2016,
      name: 'Macbook Pro Gray 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'black',
      price: 80000,
      release_date: 2017,
      name: 'Macbook Pro Black 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
  ];

const form = document.querySelector(".js-form");
const btn_filter = form.querySelector(".btn_filter");
const btn_clear = form.querySelector(".btn_clear");

const grid = document.querySelector(".grid");
const list = document.querySelector("#list").innerHTML.trim();
const template = Handlebars.compile(list);

const filter = { 
    size: [], 
    color: [], 
    release_date: [] 
};
const arrOfLaptops = [];
let inputName = '';

function handleInputs() {
    let inputs = form.querySelectorAll("input:checked");
    const arr = inputs.forEach(input => {
        inputName = input.name;
        switch(inputName){
            case "size":
                filter.size.push(inputName);
                break;
            case "color":
            filter.color.push(inputName);
                break;
            case "release_date":
            filter.release_date.push(inputName);
                break;
        };
       return input.name
    });
};

function handleCreateArrOfUserLaptops() {
    handleInputs();
    laptops.forEach(laptop => {
        if(laptop.size == filter.size.toString()) arrOfLaptops.push(laptop);
        if(laptop.color == filter.color.toString()) arrOfLaptops.push(laptop);
        if(laptop.release_date == filter.release_date.toString()) arrOfLaptops.push(laptop);
    });
    console.log(arrOfLaptops);
    return arrOfLaptops;
};

function handleFilter(event){
    event.preventDefault();
    console.log(event.target)
    // handleInputs();
    handleCreateArrOfUserLaptops();
    const markup = arrOfLaptops.reduce((acc, item) => acc + template(item));
    grid.innerHTML = markup;


};
console.log(filter);
console.log(arrOfLaptops);

function handleClear(){
    form.reset();
};

btn_filter.addEventListener('click', handleFilter);
btn_clear.addEventListener('submit', handleClear);

