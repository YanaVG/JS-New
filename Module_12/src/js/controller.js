export default class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        view.on('add', this.addNode.bind(this));
        view.on('remove', this.removeNote.bind(this));
    }

    addNode(text) {
        const item = this.model.addItem(text);
        this.view.addNode(item);
    }

    addNodes(node) {
        const item = this.model.addItem(node);
        this.view.addNodes(item);
    }

    removeNote(id) {
        this.model.removeItem(id);
        this.view.removeNote(id);
    }
}