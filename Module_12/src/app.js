// import { fetchUrl } from './services/api';
import gridItemTpl from './template/grid-item.hbs';
import { setLocalStorage, getLocalStorage } from './services/storage';
import './css/style.css';
import './css/reset.css';

const form = document.querySelector('.form');
// const btnSubmit = document.querySelector('.btn_submit');
const input = document.querySelector('.input');
const grid = document.querySelector('.grid');
const btnDelete = document.querySelector('.btn_delete');

const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const modalCloseBtn = document.querySelector('.js-close-modal');
const modalContent = document.querySelector('.js-modal--content');

const arrWithUrl = [];
let inputValue = null;


// const persistedUrls = getLocalStorage();

// if(persistedUrls) {
//     hydratePhotosGrid(persistedUrls);
// }

form.addEventListener('submit', handleSubmit);

//============== Modal Window ===============
function handleBackdropClick (event) {
    if(this !== event.target) return;
    hideModal();
};

const showModal = () => modal.classList.remove('modal--hidden');
const hideModal = () => modal.classList.add('modal--hidden');

//================= Helpers =================
function hydratePhotosGrid(items) {
    const markup = createUrlItems(items);
    addNewCard(markup);
};

function createUrlItems(items) {
    return items.reduce((markup, item) => markup + gridItemTpl(item), '');
};

function addNewCard(markup) {
    grid.insertAdjacentHTML('afterbegin', markup);
};

// function updateUrl() {
//     grid.innerHTML = '';
// };

//============== Save URL ====================

function handleSaveUrl() {
    inputValue = input.value;
    let checkUrl = arrWithUrl.find(item => item.includes(inputValue));
    console.log('checkurl ', checkUrl);
     if(checkUrl !== undefined) {
        showModal();
        modalContent.textContent = "You have already saved this url"; 
    } else {
        arrWithUrl.push(inputValue);
        setLocalStorage(arrWithUrl);
    }

    form.reset();
}; 

function handleSubmit(e) {
    e.preventDefault();
    handleSaveUrl();
    hydratePhotosGrid(arrWithUrl);
};

function handleDelete() {
    // e.preventDefault();
    // const target = e.target;
    console.log("clicked");
};

// btnDelete.addEventListener('load', handleDelete);
modalBackdrop.addEventListener('click', handleBackdropClick);
modalCloseBtn.addEventListener('click', hideModal);