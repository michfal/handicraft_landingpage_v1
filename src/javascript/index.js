import '../sass/style.scss';
import '../template/template.html';


const galleryImages = document.querySelector('.j-gallery_images')

const key = "74f4e44187e9b604246cfdba369c24a6";
const userId = "187676962@N05";

//get ID's of all user photos
function fetchPhotoIds() { 
    fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${key}&user_id=${userId}&format=json&nojsoncallback=1`)

    .then(resp => resp.json())
    .then(data => {
    getAllPhotos(filterIdsOfPhoto(data))  
    })
}


//filters raw data
function filterIdsOfPhoto(data) {
    const pulledValues = data;
    const photos = (pulledValues.photos).photo
    const keys = Object.keys(pulledValues)
    //console.log(photos)
    let photoIds = []
    
    photos.forEach((e) => photoIds.push(e.id))
    //console.log(photoIds)
    return photoIds
}


function getAllPhotos(photoIds) {
    photoIds.forEach((id) => getPhotoById(id, 5, createGalleryImage))
}

    
//pulls photo according to ID and place it on website
//as callback uses createGalleryImage for building gallery images or displayImage for displaying big picture
function getPhotoById(id, size, callback) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes& api_key=${key}&user_id=${userId}&  photo_id=${id}&format=json&nojsoncallback=1`)

    .then(resp => resp.json())
    .then(data => {
        //console.log(data)
        callback(getPhotoSizes(data, size), id)       
    })
}

//get source of image according do size index
function getPhotoSizes(data, sizeIndex) {    
    const photoData = data;
    const photoSizes = photoData.sizes;
    return(photoSizes.size[sizeIndex].source)
}

function createGalleryImage(source, id) {
    
    const imageContainer = document.createElement("div");
    galleryImages.appendChild(imageContainer);
    imageContainer.classList.add('image_container')
    
    const image = document.createElement("img");
    imageContainer.appendChild(image);
    image.src = `${source}`
    if(id) {
        image.classList.add(`${id}`)
    }
}

fetchPhotoIds()


//==========================
const imageDisplay = document.querySelector('.j-image_display');
const galleryExit =  document.querySelector('.j-gallery_exit');
const container = document.querySelector('.j-container');


galleryImages.addEventListener('click', galleryImageClick)
galleryExit.addEventListener('click', function() {
     console.log("click")
     imageDisplay.classList.remove('image_display__on');
     removeImage()
     })

function galleryImageClick() {
    console.log("click")    
    if (event.target.tagName == 'IMG') {
        console.log(event.target.classList.value)
        let id = event.target.classList.value;
        getPhotoById(id, 10, displayImage);
        imageDisplay.classList.add('image_display__on')
    }
    //test purpose
    // console.log("creating")
    // let id = 49721768792
    // getPhotoById(id, 10, displayImage)
}

function displayImage(source, id) {
    
    //create img element
    const image = document.createElement("img");
    container.appendChild(image);
    image.src = `${source}`;
    image.classList.add('image_display__image')
    //assign class image_display__image
    //append child image display
}

function removeImage() {
    container.removeChild(container.childNodes[0])
}

//galleryImageClick()