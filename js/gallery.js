import galleryItems from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    btnLightboxClose: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightBoxImage: document.querySelector('.lightbox__image'),
};

const outputGallery = galleryItemsPreview => {
   const makeGallery = galleryItemsPreview.map((item,index) => `<li class="gallery__item">
       <a class="gallery__link" href="${item.original}">
       <img class="gallery__image" src="${item.preview}"
       data-source="${item.original}"
       alt="${item.description}"
       data-index="${index}"/>
       </a>
       </li>`).join('');
    refs.gallery.insertAdjacentHTML('beforeend', makeGallery);
    
};


outputGallery(galleryItems);

const openModalWindow = (e) => {
    e.preventDefault();

    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    refs.lightbox.classList.add('is-open');
    refs.lightBoxImage.src = e.target.dataset.source;
    refs.lightBoxImage.alt = e.target.alt;
    refs.lightBoxImage.dataset.scrolling = e.target.dataset.index;
    refs.btnLightboxClose.addEventListener('click', onCloseModalWindow);
    refs.lightboxOverlay.addEventListener('click', onCloseModalWindow);
    window.addEventListener('keydown', clickModalByKey);
    window.addEventListener('keydown', onKeyChangeImage);
};

const onCloseModalWindow = e => {
    refs.lightbox.classList.remove('is-open');
    
    refs.lightBoxImage.src = '';
    refs.lightBoxImage.alt = '';
    refs.btnLightboxClose.removeEventListener('click', onCloseModalWindow);
    refs.lightboxOverlay.removeEventListener('click', onCloseModalWindow);
    window.removeEventListener('keydown', clickModalByKey);
    window.removeEventListener('keydown', onKeyChangeImage);
};

const clickModalByKey = e => {
    if (e.code === 'Escape') {
        onCloseModalWindow(e);
    };
};

const onKeyChangeImage = e => {
    if (e.code === 'ArrowLeft') {
        // console.log(e.code);
        // console.log(refs.lightBoxImage.dataset.scrolling)
    }
    else if (e.code === 'ArrowRight') {
        console.log(e.code);
        console.log(refs.lightBoxImage.dataset.scrolling)
    };
};

refs.gallery.addEventListener('click', openModalWindow);