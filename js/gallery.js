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
    refs.lightBoxImage.dataset.index = e.target.dataset.index;
    addMethods();
};

const addMethods = () => {
    refs.btnLightboxClose.addEventListener('click', onCloseModalWindow);
    refs.lightboxOverlay.addEventListener('click', onCloseModalWindow);
    window.addEventListener('keydown', clickModalByKey);
    window.addEventListener('keydown', onLeftKeyChangeImage);
    window.addEventListener('keydown', onRightKeyChangeImage);
};

const onCloseModalWindow = e => {
    refs.lightbox.classList.remove('is-open');
    refs.lightBoxImage.src = '';
    refs.lightBoxImage.alt = '';
    removeMethods();
};

const removeMethods = () => {
    refs.btnLightboxClose.removeEventListener('click', onCloseModalWindow);
    refs.lightboxOverlay.removeEventListener('click', onCloseModalWindow);
    window.removeEventListener('keydown', clickModalByKey);
    window.removeEventListener('keydown', onLeftKeyChangeImage);
    window.removeEventListener('keydown', onRightKeyChangeImage);
};

const clickModalByKey = e => {
    if (e.code === 'Escape') {
        onCloseModalWindow(e);
    };
};

let index = 0;

const onLeftKeyChangeImage = e => {
    index = Number(refs.lightBoxImage.dataset.index);

    if (e.code === 'ArrowLeft') {

        if (index === 0) {
            index += galleryItems.length-1;
            changedImageByKey();
        }
        else {
            index -= 1;
            changedImageByKey();
        };
    };
};

const onRightKeyChangeImage = e => {
    index = Number(refs.lightBoxImage.dataset.index);

    if (e.code === 'ArrowRight') {
        if (index === galleryItems.length-1) {
            index -= index;
            changedImageByKey();
        } else {
            index += 1;
            changedImageByKey();
        };
    };
};

const changedImageByKey = () => {
    refs.lightBoxImage.src = galleryItems[index].original;
    refs.lightBoxImage.alt = galleryItems[index].description;
    refs.lightBoxImage.dataset.index = index;
};

refs.gallery.addEventListener('click', openModalWindow);