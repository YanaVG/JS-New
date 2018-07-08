'use strict'

const galleryItems = [
   { 
    preview: 'img/preview-1.jpeg', 
    fullview: 'img/fullview-1.jpeg', 
    alt: "alt text 1" 
   },
   { 
    preview: 'img/preview-2.jpeg', 
    fullview: 'img/fullview-2.jpeg', 
    alt: "alt text 2" 
   },
   { 
    preview: 'img/preview-3.jpeg', 
    fullview: 'img/fullview-3.jpeg', 
    alt: "alt text 3" 
   },
   { 
    preview: 'img/preview-4.jpeg', 
    fullview: 'img/fullview-4.jpeg', 
    alt: "alt text 4" 
   },
   { 
    preview: 'img/preview-5.jpeg', 
    fullview: 'img/fullview-5.jpeg', 
    alt: "alt text 5" 
   },
   {
    preview: 'img/preview-6.jpeg', 
    fullview: 'img/fullview-6.jpeg', 
    alt: "alt text 6" 
   },
   {
   preview: 'img/preview-7.jpeg', 
   fullview: 'img/fullview-7.jpeg', 
   alt: "alt text 7" 
   },
   {
   preview: 'img/preview-8.jpeg', 
   fullview: 'img/fullview-8.jpeg', 
   alt: "alt text 8" 
   },
  ];

document.addEventListener("DOMContentLoaded", () => {

const gallery = document.querySelector('.js-image-gallery');

const previewImgWrap = showPreviewImg(galleryItems);
const fullviewImgWrap = showFullviewImg(galleryItems[0]);

gallery.innerHTML = fullviewImgWrap;
gallery.innerHTML += previewImgWrap;

const previewImgs = gallery.querySelectorAll('.preview-img');

gallery.addEventListener('click', handleClick);

function handleClick ({ target }) {

    const hasClass = target.classList.contains('preview-img');

    if(!hasClass) return;
    
    const achiveFullImg = gallery.querySelector('.fullview-img');
    achiveFullImg.setAttribute('src', target.dataset.fullview);

    setActiveImg(previewImgs, target);
  };

function setActiveImg(previewImgs, target) {
    previewImgs.forEach(previewImg => {
        if(previewImg !== target) {
            previewImg.classList.remove('preview-img-active');
        } else {
            previewImg.classList.add('preview-img-active');
        }
    });
  };

function showFullviewImg({ fullview }) {
    const setFullViewItem = `
    <div class='fullview-item'>
        <img class='fullview-img' src='${fullview}' alt='citrus'>
    </div>
    `;

    return setFullViewItem;
};

function showPreviewImg() {
    const setPreviewItem = `
    <div class='preview'>
        <ul class='preview-items'>
            ${galleryItems.reduce((acc, {preview, fullview, alt}) => 
            acc +
                `<li>
                    <img class='preview-img' 
                        src=${preview}
                        data-fullview=${fullview}
                        alt=${alt}    
                    >
                </li>`,
                ''
            )}
        <ul>
    </div>
    `;
    return setPreviewItem;
};



}); 