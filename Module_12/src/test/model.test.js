import Model from '../js/model';

describe('Model class', () => {
    it('Should create new Modal', () => {
        const model = new Model([]);
        expect(model instanceof Model).toBe(true);
    });

    it('Should add item', () => {
        const model = new Model();
        model.addItem("asdfghjkl");

        model.items.forEach(el => {
            expect(el).toHaveProperty("text", "asdfghjkl");
        }) 
    });

    it('Should remove item', () => {
        const model = new Model([{ id: "fesdf123456789", text: "some text"}]);

        model.removeItem("fesdf123456789")
        model.items.forEach(el => {
            expect(el).not.toHaveProperty("text", "some text");
        }) 
    });

    it('Should validate item', () => {
        const model = new Model();
        model.validateItem("https://www.themoviedb.org/documentation/api");

        model.items.forEach(el => {
            expect(el).toHaveProperty("text", "https://www.themoviedb.org/documentation/api");
        }) 

    });

    it('Should not validate item', () => {
        const model = new Model();
        model.validateItem("https://www.themoviedb.org/documentation/api");

        model.items.forEach(el => {
            expect(el).not.toHaveProperty("text", "https://www.themoviedb.org/documentation/api");
        }) 

    });
})