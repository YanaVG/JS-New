import v4 from 'uuid/v4';
import { setLocalStorage } from '../services/storage';

export default class Model {
    constructor(items = []){
        this.items = items;
    }

    addItem(text) {
        const item = {
            id: v4(),
            text,

        };

    // console.log(this.items);
    // console.log(this.item);
    this.items.push(item);

    setLocalStorage(this.items);

    return item;
    };

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
    };
}