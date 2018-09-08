import v4 from 'uuid/v4';
import { setLocalStorage } from '../services/storage';

let arrOfUrl = [];

export default class Model {
    constructor(items = []){
        this.items = items;
    }

    validateItem(inputText) {
        const VALIDATOR = {
            paterns: {
                url: /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i,
            },
            validate(text) {
                const valid = this.isValid(text);
                if (!valid) {
                    alert('Write correct url!')
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
    }

    filtrate(input) {
        const filtratedItem = this.items.find(item => item.text === input);
        if(filtratedItem === undefined) {
            return input;
        } else {
            this.input = '';
            alert('You have already saved this url!')
        }
    }

    addItem(text) {
        const item = {
            id: v4(),
            text,

        };

    this.items.push(item);
    arrOfUrl.push(item);
    setLocalStorage(arrOfUrl);

    return item;
    };

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        arrOfUrl = arrOfUrl.filter(item => item.id !== id);
        setLocalStorage(arrOfUrl);
    };
}