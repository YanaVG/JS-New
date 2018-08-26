import EventEmitter from '../services/event-emitter';

export default class View extends EventEmitter {
    constructor() {
        super();

        this.form = document.querySelector('.form');
        this.input = this.form.querySelector('.input')
        this.notesGrid = document.querySelector('.grid');

        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    handleAdd(e){
        e.preventDefault();

        const { value } = this.input;
    
        if(value === '') return;

        this.emit('add', value);
    }

    createNode(note){
        const item = document.createElement('div');
        item.dataset.id = note.id;
        item.classList.add('grid-item');

        const text = document.createElement('p');
        text.textContent = note.text;
        text.classList.add('item_url');

        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Delete';
        buttonRemove.dataset.action = 'remove';
        buttonRemove.classList.add('btn', 'btn_delete');

        item.append(text, buttonRemove);

        this.appendEventListener(item);
        return item;
    }

    addNode(node) {
        const item = this.createNode(node);

        this.notesGrid.appendChild(item);

        this.form.reset(); 
    }

    appendEventListener(item) {
        const removeBtn = item.querySelector('[data-action="remove"]');
        removeBtn.addEventListener('click', this.handleRemove.bind(this));
    }

    handleRemove({target}){
        const parent = target.closest('.grid-item');
        this.emit('remove', parent.dataset.id);
    }

    removeNote(id) {
        const item = this.notesGrid.querySelector(`[data-id="${id}"]`);
        this.notesGrid.removeChild(item);
    }

}