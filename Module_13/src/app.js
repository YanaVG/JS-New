import v4 from 'uuid/v4';
import { setLocalStorage, getLocalStorage } from './services/storage';
import './css/style.css';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

const form = document.querySelector('.form');
const input = form.querySelector('.input')
const notesGrid = document.querySelector('.grid');
const buttonSubmit = document.querySelector('.btn_submit');

const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.js-modal-backdrop');
const modalCloseBtn = document.querySelector('.js-close-modal');
const modalContent = document.querySelector('.js-modal--content');

let arrInLocalStorage = [];

class Items {
    constructor(){
        this.items = [];

        const hydration = getLocalStorage();
        this.startLoading(hydration);
    }

    startLoading(arr) {
        arr.forEach(item => this.createCard(item.text))
    };

    addItem(text) {
        const item = {
            id: v4(),
            text,
        };

        this.items.push(item);
        arrInLocalStorage.push(item);
        setLocalStorage(arrInLocalStorage);

        return item;
    };

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        arrInLocalStorage = this.items.filter(item => item.id !== id);
        setLocalStorage(arrInLocalStorage);
    };

    validateItem(inputText) {
        const VALIDATOR = {
            paterns: {
                url: /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i,
            },
            validate(text) {
                const valid = this.isValid(text);
                if (!valid) {
                    alert('Write correct url!');
                    // this.showModal();
                    // modalContent.src = 'Write correct url!';

                    
                } else {
                    return text;
                }
            },
            isValid(value) {
                return this.paterns["url"].test(value);
            },
        };
        const validated = VALIDATOR.validate(inputText);
        return validated;
    };

    filtrate(input) {
        const filtratedItem = this.items.find(item => item.text === input);
        if(filtratedItem === undefined) {
            return input;
        } else {
            this.input = '';
            alert('You have already saved this url!');
            // this.showModal();
            // modalContent.src = 'You have already saved this url!';
            
        }
    };

    createNode(note){
        const item = document.createElement('div');
        item.dataset.id = note.id;
        item.classList.add('grid-item');

        const text = document.createElement('p');
        text.textContent = note.text;
        text.classList.add('item_url');

        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Delete';
        buttonRemove.dataset.id = note.id;
        buttonRemove.dataset.action = 'remove';
        buttonRemove.classList.add('btn', 'btn_delete');

        item.append(text, buttonRemove);

        return item;
    };

    addNode(node) {
        const item = this.createNode(node);
        notesGrid.appendChild(item);

        form.reset(); 
    };

    removeNote(id) {
        const item = notesGrid.querySelector(`[data-id="${id}"]`);
        // console.log(item);
        notesGrid.removeChild(item);
    };

    createCard(text) {
        const valid = this.validateItem(text);
        if(valid !== undefined) {
            const filtrated = this.filtrate(valid);
            if(filtrated !== undefined) {
                const item = this.addItem(text);
                this.addNode(item);
            }
        } 
    };

    removeCard(id) {
        this.removeItem(id);
        this.removeNote(id);
    };

    handleBackdropClick (event) {
        if(this !== event.target) return;
    
        hideModal();
    };
    
    showModal() { 
       return modal.classList.remove('modal--hidden');
    };
    
    hideModal () {
        return modal.classList.add('modal--hidden');
    };

}

const item = new Items();

buttonSubmit.addEventListener('click', () => {
    item.createCard(input.value);
});

document.addEventListener('click', (event) => {
    const target = event.target;
    const node = target.nodeName;

    if( node !== 'BUTTON') return;

    const buttonId = target.dataset.id;
    // console.log(buttonId);
    item.removeCard(buttonId);
});

// modalBackdrop.addEventListener('click', item.handleBackdropClick);
// modalCloseBtn.addEventListener('click', item.hideModal);