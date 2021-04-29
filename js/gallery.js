import galleryItems from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    btnLightboxClose: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    // gallery: document.querySelector(),
};

const outputGallery = galleryItemsPreview => {
    
    for (const item of galleryItemsPreview) {
        const makeGallery = () =>
            [`
        <li class="gallery__item">
        <a
            class="gallery__link"
            href="${item.original}"
        >
            <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
            />
        </a>
        </li>
        `].join('');

        refs.gallery.insertAdjacentHTML('beforeend', makeGallery());
    };
};
outputGallery(galleryItems);

const openModalWindow = (e) => {
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    e.preventDefault();
    refs.lightbox.classList.add('is-open');
    // console.log(refs.lightBoxImage.classList.lightbox__image.value  = `${item.original}`)
};

const onCloseModalWindow = () => {
    refs.lightbox.classList.remove('is-open');
    if (e.key === 'Escape') {
        refs.lightbox.classList.remove('is-open');
    };
};

const onLightboxCloseModalWindow = () => {
        refs.lightbox.classList.remove('is-open');
};

const clickModalByKey = e => {
    if (e.key === 'Escape') {
        refs.lightbox.classList.remove('is-open');
    };
};

refs.gallery.addEventListener('click', openModalWindow);
refs.btnLightboxClose.addEventListener('click', onCloseModalWindow);
refs.lightboxOverlay.addEventListener('click', onLightboxCloseModalWindow);
window.addEventListener('keydown', clickModalByKey);