import '../sass/style.scss';
import '../template/template.html';
import '../javascript/GalleryElements'
import { galleryElements } from '../javascript/GalleryElements';
import {galleryContainer} from '../javascript/GalleryElements';
import {galleryDisplayParts} from '../javascript/DisplayGalleryImage';
import {displayGalleryImage} from '../javascript/DisplayGalleryImage';
import {removeImage} from '../javascript/DisplayGalleryImage'



galleryElements.fetchPhotoIds()


galleryContainer.galleryImages.addEventListener('click', displayGalleryImage.galleryImageClick)
galleryDisplayParts.galleryExit.addEventListener('click', function() {
     galleryDisplayParts.imageDisplay.classList.remove('image_display__on');
     removeImage();
     galleryDisplayParts.currentIndex = null;
     })
galleryDisplayParts.imageDisplay.addEventListener('click', displayGalleryImage.arrowClick)


function getCurrentDate() {
    const footerDate = document.querySelector('.j-copyright_date')
    const today = new Date();
    const year = today.getFullYear()
    footerDate.innerHTML = `${year}`
}

getCurrentDate()

const formButton = document.querySelector('.j-form_button')


const cookieMessageBtn = document.querySelector('.cookie_message__button');
const cookieMessage = document.querySelector('.cookie_message');

cookieMessageBtn.addEventListener('click', () => {
    cookieMessage.style.display = "none";
})