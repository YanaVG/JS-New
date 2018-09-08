import { getLocalStorage } from '../services/storage';

export default class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        view.on('add', this.addNote.bind(this));
        view.on('remove', this.removeNote.bind(this));

        const hydration = getLocalStorage();
        this.startLoading(hydration);
    }

    startLoading(arr) {
        arr.forEach(item => this.addNote(item.text))
    }

    addNote(text) {
        const valid = this.model.validateItem(text);
        if(valid !== undefined) {
            const filtrated = this.model.filtrate(valid);
            if(filtrated !== undefined) {
                const item = this.model.addItem(text);
                this.view.addNode(item);
            }
        }
    }

    removeNote(id) {
        this.model.removeItem(id);
        this.view.removeNote(id);
    }
}