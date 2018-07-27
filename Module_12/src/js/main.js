'use strict'

const form = document.querySelector('.form');
const btnSubmit = document.querySelector('.btn_submit');
const input = document.querySelector('.input');
const grid = document.querySelector('.grid');
const list = document.querySelector('#list').innerHTML.trim();
const btnDelete = document.querySelector('.btn_delete');
const template = Handlebars.compile(list);

const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const modalCloseBtn = document.querySelector('.js-close-modal');
const modalContent = document.querySelector('.js-modal--content');

const arrWithUrl = [];
let inputValue = '';

//============== Modal Window ===============
function handleBackdropClick (event) {
    if(this !== event.target) return;

    hideModal();
};

const showModal = () => modal.classList.remove('modal--hidden');

const hideModal = () => modal.classList.add('modal--hidden');

//============== Save to LocalStorage ===============
const setLocalStorage = value => {
    localStorage.setItem('saved-url', JSON.stringify(value));
};
  
const getLocalStorage = () => {
    const data = localStorage.getItem('saved-url');
  
    // return data ? JSON.parse(data) : null;
    return data ? data.toString() : null;
};

// const persistedUrl = getLocalStorage();
// const checkUserUrl = persistedUrl ? persistedUrl : '';
// console.log(checkUserUrl);
// const markup = template(checkUserUrl);
// console.log(markup);

// checkUserUrl.length !== 0 ? grid.insertAdjacentHTML('afterbegin', markup) : null;
// checkUserUrl.length !== 0 ? grid.innerHTML = markup : null;
// grid.innerHTML = markup;
//============== Save URL ====================

function handleSaveUrl() {
    inputValue = input.value;
    console.log(inputValue);

    let checkUrl = arrWithUrl.includes(inputValue);
    console.log(checkUrl);
    if(checkUrl === true) {
        showModal();
        modalContent.textContent = "You have already saved this url";
    } else {
        arrWithUrl.push(inputValue); 
        console.log(arrWithUrl)
    }
    // setLocalStorage(inputValue);
    form.reset();
};

function handleSubmit(e) {
    e.preventDefault();
    handleSaveUrl();

    const markup = template(arrWithUrl);
    // grid.innerHTML += markup;
    grid.insertAdjacentHTML('afterbegin', markup);
    // console.log(markup);
};

function handleDelete() {
    // e.preventDefault();
    // const target = e.target;
    console.log("clicked");
};
// btnDelete.addEventListener('load', handleDelete);


btnSubmit.addEventListener('click', handleSubmit);
modalBackdrop.addEventListener('click', handleBackdropClick);
modalCloseBtn.addEventListener('click', hideModal);
