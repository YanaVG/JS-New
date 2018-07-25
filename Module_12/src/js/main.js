'use strict'

const form = document.querySelector('.form');
const btnSubmit = document.querySelector('.btn_submit');
const input = document.querySelector('.input');
const grid = document.querySelector('.grid');
const list = document.querySelector('#list').innerHTML.trim();
const btnDelete = document.querySelector('.btn_delete');
const template = Handlebars.compile(list);

// const modal = document.querySelector('.modal');
// const modalBackdrop = document.querySelector('.js-modal-backdrop');
// const modalCloseBtn = document.querySelector('.js-close-modal');
// const modalContent = document.querySelector('.js-modal--content');

const arrWithUrl = [];
let inputValue = '';

function handleSavaUrl() {
    inputValue = input.value;
    console.log(inputValue);

    let checkUrl = arrWithUrl.includes(inputValue);

    if(checkUrl === true) {
        console.log("You have already saved this url");
    } else {
        arrWithUrl.push(inputValue); 
        console.log(arrWithUrl)
    }

    form.reset();
};

function handleSubmit(e) {
    e.preventDefault();

    handleSavaUrl();
    // template(item)console.log(item)
    const markup = arrWithUrl.forEach(item => template(item));
    // const markup = arrWithUrl.reduce((acc, item) => acc + template(item),'');
    grid.innerHTML += markup;
}



btnSubmit.addEventListener('click', handleSubmit);
// btnDelete.addEventListener('submit', handleDelete);