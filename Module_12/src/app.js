// import { fetchUrl } from './services/api';
import gridItemTpl from './template/grid-item.hbs';
import { setLocalStorage, getLocalStorage, removeFromLocalStorage } from './services/storage';
import './css/style.css';
import './css/reset.css';

const form = document.querySelector('.form');
// const btnSubmit = document.querySelector('.btn_submit');
const input = document.querySelector('.input');
const grid = document.querySelector('.grid');

const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const modalCloseBtn = document.querySelector('.js-close-modal');
const modalContent = document.querySelector('.js-modal--content');

let arrWithUrl = [];
let inputValue = null;
const persistedUrls = getLocalStorage();

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

function createUrlItem(item) {
    const markup = gridItemTpl(item);
    addNewCard(markup);
    const btnDelete = document.querySelector('.btn_delete');
    btnDelete.addEventListener('click', handleDelete);
};
function updateGrid() {
    grid.innerHTML = '';
};

//============== Save URL ====================

function handleSaveUrl() {
    inputValue = input.value;
    let checkUrl = arrWithUrl.includes(inputValue);
    console.log('checkurl ', checkUrl);
     if(checkUrl) {
        showModal();
        modalContent.textContent = "You have already saved this url"; 
    } else {
        arrWithUrl.push(inputValue);
        setLocalStorage(arrWithUrl);
        createUrlItem(inputValue);
    }
    form.reset();
}; 

function handleSubmit(e) {
    e.preventDefault();
    handleSaveUrl();

};

function handleDelete({target}) {
    const nodeName = target.nodeName;
    if( nodeName !== 'BUTTON') return;
    const parent = target.parentNode;
    const elem = parent.querySelector('.item_url');
    // const arrOfUrls = getLocalStorage();

    const updateListOfUrls = arrWithUrl.filter(item => item !== elem.textContent);
    arrWithUrl = updateListOfUrls; 
    console.log('updateListOfUrls', updateListOfUrls);
    console.log('arrWithUrl', arrWithUrl);
    updateGrid();
    hydratePhotosGrid(arrWithUrl);
    removeFromLocalStorage();
    setLocalStorage(arrWithUrl);
    parent.innerHTML= '';

    console.log(parent);
};

modalBackdrop.addEventListener('click', handleBackdropClick);
modalCloseBtn.addEventListener('click', hideModal);