import galleryItems from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = modal.querySelector('.lightbox__image');

let activeImage;

/*Функция формирования разметки галереи*/
const makeMarkup = (galleryRef,items) => {
    galleryRef.innerHTML = items.reduce((acc, { preview, original, description }) => {
        return acc + `
            <li class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img class="gallery__image class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
            </a>
            </li>`
    }, '');
};

/*Функция-обработчик клика на елемент галереи*/
const onGalleryItemClick = e => {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    openModal(e);
};

/*Функция-обработчик клика на кнопку закрытия или пустую площадь модалки*/
const onModalElemsClick = e => {
    const isCloseButton= e.target.dataset.action === 'close-lightbox';
    const isModalArea = e.target.classList.contains('lightbox__overlay');
   
    if (!isCloseButton && !isModalArea){
        return;
    }

    closeModal();
};
 
/*Функция-обработчик нажатия клавиши клавиатуры*/
const onKeyboardPress = e => {
    if (e.code === 'Escape') {
        closeModal();
        return;
    }

    if (e.code === 'ArrowLeft') {
        const previousSiblingBranch = activeImage.closest('li').previousElementSibling;

        if (previousSiblingBranch) {
            const previousImage = previousSiblingBranch.querySelector('.gallery__image');
            changeImage(previousImage);
        }
        return;
    }

    if (e.code === 'ArrowRight') {
        const nextSiblingBranch = activeImage.closest('li').nextElementSibling;

        if (nextSiblingBranch) {
            const nextImage = nextSiblingBranch.querySelector('.gallery__image');
            changeImage(nextImage);
        }
        return;
    }
};

/*Функция открытия модалки*/
const openModal = e => {
    modal.classList.add('is-open');
    modalImage.src= e.target.dataset.source;
    modalImage.alt = e.target.getAttribute('alt');
    activeImage = e.target;

    window.addEventListener('keydown', onKeyboardPress);
}

/*Функция закрытия модалки*/
const closeModal = () => {
    modal.classList.remove('is-open');
    modalImage.src = '';
    modalImage.alt = '';
    
    window.removeEventListener('keydown', onKeyboardPress);
}

/*Функция смены картинки в модалке*/
const changeImage = target => {
    modalImage.src= target.dataset.source;
    modalImage.alt = target.getAttribute('alt');
    activeImage = target;
 };

makeMarkup(gallery,galleryItems);
gallery.addEventListener('click', onGalleryItemClick);
modal.addEventListener('click', onModalElemsClick);
