import { galleryElements } from '../javascript/GalleryElements';

 export let galleryDisplayParts = {
    imageDisplay: document.querySelector('.j-image_display'),
    galleryExit: document.querySelector('.j-gallery_exit'),
    container: document.querySelector('.j-container'),
    currentImgId: null,
    currentIndex: null,
    displayedPhotoIds: null,
}


class DisplayGalleryImage {
    constructor(){

    }
    //change pictures with arrows
    arrowClick() {
        if(event.target.tagName == 'BUTTON' || event.target.tagName == 'I') {
            let side = event.target.getAttribute('data-side')
            if(side == "right" && galleryDisplayParts.currentIndex < galleryDisplayParts.  displayedPhotoIds.length - 1){
                galleryDisplayParts.currentIndex++;
                //console.log("up " + galleryDisplayParts.currentIndex);
                removeImage();
                 galleryElements.getPhotoById(galleryDisplayParts.displayedPhotoIds[galleryDisplayParts.currentIndex], 10, displayGalleryImage.displayImage);
            }
            if(side == "left" && galleryDisplayParts.currentIndex > 0){
                galleryDisplayParts.currentIndex--;
                //console.log("down " + galleryDisplayParts.currentIndex);
                removeImage();
                galleryElements.getPhotoById(galleryDisplayParts.displayedPhotoIds[galleryDisplayParts.currentIndex], 10, displayGalleryImage.displayImage);
            }
        }
    }

    galleryImageClick() {
        
        if (event.target.tagName == 'IMG') {
            
            galleryDisplayParts.currentImgId = event.target.getAttribute('data-id')
            galleryElements.getPhotoById(galleryDisplayParts.currentImgId, 10, displayGalleryImage.displayImage);
            galleryDisplayParts.imageDisplay.classList.add('image_display__on');
    
            galleryDisplayParts.displayedPhotoIds = getPhotoData()
            galleryDisplayParts.currentIndex = galleryDisplayParts.displayedPhotoIds.indexOf(galleryDisplayParts.currentImgId);
            
        }
    }

    displayImage(source) {

        //create img element
        const image = document.createElement("img");
        galleryDisplayParts.container.appendChild(image);
        image.src = `${source}`;
        image.classList.add('image_display__image')
    }
       
}

function getPhotoData() {
    const images = document.querySelectorAll('.gallery_image');
    let imageIds = []
    images.forEach(function(e){imageIds.push(e.getAttribute('data-id'))})
   // console.log(imageIds)
    return imageIds
}    

export function removeImage() {
    galleryDisplayParts.container.removeChild(galleryDisplayParts.container.childNodes[0])
}






//export let galleryDisplayParts = new GalleryDisplayParts();
export let displayGalleryImage = new DisplayGalleryImage();