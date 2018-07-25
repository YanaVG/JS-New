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
    // let createObj = {
    //     url: inputValue
    // }
   
    let checkUrl = arrWithUrl.includes(inputValue);
    console.log(checkUrl);
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
    // const markup = arrWithUrl.forEach(item => template(item));
    const markup = template(arrWithUrl);
    // const markup = arrWithUrl.map(item => template(item));
    // grid.innerHTML += markup;
    grid.insertAdjacentHTML('afterbegin', markup);
    console.log(markup);
};

function handleDelete(e) {
    e.preventDefault();
    const target = e.target;
    console.log(target);
};



btnSubmit.addEventListener('click', handleSubmit);
// btnDelete.addEventListener('click', handleDelete);