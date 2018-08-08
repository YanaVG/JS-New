'use strict'

const laptops = [
    {
        size: 13,
        color: 'white',
        price: 28000,
        release_date: 2015,
        name: 'Macbook Air White 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'gray',
        price: 32000,
        release_date: 2016,
        name: 'Macbook Air Gray 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 13,
        color: 'black',
        price: 35000,
        release_date: 2017,
        name: 'Macbook Air Black 13"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'white',
        price: 45000,
        release_date: 2015,
        name: 'Macbook Air White 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'gray',
        price: 55000,
        release_date: 2016,
        name: 'Macbook Pro Gray 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 15,
        color: 'black',
        price: 45000,
        release_date: 2017,
        name: 'Macbook Pro Black 15"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'white',
        price: 65000,
        release_date: 2015,
        name: 'Macbook Air White 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'gray',
        price: 75000,
        release_date: 2016,
        name: 'Macbook Pro Gray 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
        size: 17,
        color: 'black',
        price: 80000,
        release_date: 2017,
        name: 'Macbook Pro Black 17"',
        img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
        descr:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
];

const form = document.querySelector(".js-form");
const btn_filter = form.querySelector(".btn_filter");
const btn_clear = form.querySelector(".btn_clear");

const grid = document.querySelector(".grid");
const list = document.querySelector("#list").innerHTML.trim();
const template = Handlebars.compile(list);

const filter = {
    size: [],
    color: [],
    release_date: []
};

const markup = laptops.reduce((acc, laptop) => acc + template(laptop), '');
grid.innerHTML = markup;

form.addEventListener('submit', event => {
    event.preventDefault();

    const checkboxes = Array.from(form.querySelectorAll("input:checked"));

    const filter = checkboxes.reduce((acc, checkbox) => {
        acc[checkbox.name].push(checkbox.value);
        return acc;
    }, {
            size: [],
            color: [],
            release_date: []
        });

    const filterLaptops = filter => laptops.filter(laptop => {
        if (
            (filter.size.includes(laptop.size.toString()) && filter.color.includes(laptop.color) && filter.release_date.includes(laptop.release_date.toString()))
            // (filter.size.includes(laptop.size.toString()) && filter.color.includes(laptop.color)) ||
            // (filter.size.includes(laptop.size.toString()) && filter.release_date.includes(laptop.release_date.toString())) ||
            // (filter.color.includes(laptop.color) && filter.release_date.includes(laptop.release_date.toString()))
            // filter.size.includes(laptop.size.toString()) ||
            // filter.color.includes(laptop.color) ||
            // filter.release_date.includes(laptop.release_date.toString())
        ) {
            return laptop;
        }
    });

    const filteredLaptops = filterLaptops(filter);
    const filteredMarkup = filteredLaptops.reduce((acc, filteredLaptop) => acc + template(filteredLaptop), '');
    grid.innerHTML = filteredMarkup;

    function handleClear() {
        form.reset();
        grid.innerHTML = markup;
    };

    btn_clear.addEventListener('click', handleClear);
}); 