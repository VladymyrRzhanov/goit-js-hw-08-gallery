import galleryItems from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    btnLightboxClose: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    lightBoxImage: document.querySelector('.lightbox__image'),
};

const outputGallery = galleryItemsPreview => {
    
    // for (const item of galleryItemsPreview) {
    //     const makeGallery = () =>
    //         [`
    //     <li class="gallery__item">
    //     <a
    //         class="gallery__link"
    //         href="${item.original}"
    //     >
    //         <img
    //         class="gallery__image"
    //         src="${item.preview}"
    //         data-source="${item.original}"
    //         alt="${item.description}"
    //         data-scrolling = ""
    //         />
    //     </a>
    //     </li>
    //     `].join('');

    //     refs.gallery.insertAdjacentHTML('beforeend', makeGallery());
    // };

    for (let i = 0; i < galleryItemsPreview.length; i +=1) {
        const makeGallery = () =>
            [`
        <li class="gallery__item">
        <a
            class="gallery__link"
            href="${galleryItemsPreview[i].original}"
        >
            <img
            class="gallery__image"
            src="${galleryItemsPreview[i].preview}"
            data-source="${galleryItemsPreview[i].original}"
            alt="${galleryItemsPreview[i].description}"
            data-index = "${[i]}"
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
    refs.btnLightboxClose.addEventListener('click', onCloseModalWindow);
    refs.lightboxOverlay.addEventListener('click', onCloseModalWindow);
    window.addEventListener('keydown', clickModalByKey);
    window.addEventListener('keydown', onKeyChangeImage);
    e.preventDefault();
    refs.lightbox.classList.add('is-open');
    refs.lightBoxImage.src = e.target.dataset.source;
    refs.lightBoxImage.alt = e.target.alt;
    refs.lightBoxImage.dataset.scrolling = e.target.dataset.index;
};

const onCloseModalWindow = e => {
    refs.lightbox.classList.remove('is-open');
    if (e.key === 'Escape') {
        refs.lightbox.classList.remove('is-open');
    };
    refs.lightBoxImage.src = '';
    refs.lightBoxImage.alt = '';
    refs.btnLightboxClose.removeEventListener('click', onCloseModalWindow);
    refs.lightboxOverlay.removeEventListener('click', onCloseModalWindow);
    window.removeEventListener('keydown', clickModalByKey);
    window.removeEventListener('keydown', onKeyChangeImage);
};

const clickModalByKey = e => {
    if (e.key === 'Escape') {
        onCloseModalWindow(e);
    };
};

const onKeyChangeImage = e => {
    if (e.key === 'ArrowLeft') {
        console.log(e.key);
        console.log(refs.lightBoxImage.dataset.scrolling)
    }
    else if (e.key === 'ArrowRight') {
        console.log(e.key);
        console.log(refs.lightBoxImage.dataset.scrolling)
    };
};

refs.gallery.addEventListener('click', openModalWindow);