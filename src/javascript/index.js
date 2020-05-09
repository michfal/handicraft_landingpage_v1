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
        image.setAttribute('data-id', `${id}`);
        //image.classList.add(`${id}`)
        image.classList.add('gallery_image')
    }
}

fetchPhotoIds()


//==========================
const imageDisplay = document.querySelector('.j-image_display');
const galleryExit =  document.querySelector('.j-gallery_exit');
const container = document.querySelector('.j-container');
let currentImgId;
let currentIndex;
let displayedPhotoIds;
//const arrows = document.querySelectorAll('.image_display__button')


galleryImages.addEventListener('click', galleryImageClick)
galleryExit.addEventListener('click', function() {
     imageDisplay.classList.remove('image_display__on');
     removeImage();
     currentIndex = null;
     })
imageDisplay.addEventListener('click', arrowClick)

//change pictures with arrows
function arrowClick() {
    // console.log("current img id: " + currentImgId);
    // console.log(currentIndex)
    if(event.target.tagName == 'BUTTON' || event.target.tagName == 'I') {
        let side = event.target.getAttribute('data-side')
        if(side == "right" && currentIndex < displayedPhotoIds.length - 1){
            currentIndex++;
            console.log("up " + currentIndex);
            removeImage();
            getPhotoById(displayedPhotoIds[currentIndex], 10, displayImage);
        }
        if(side == "left" && currentIndex > 0){
            currentIndex--;
            console.log("down " + currentIndex);
            removeImage();
            getPhotoById(displayedPhotoIds[currentIndex], 10, displayImage);
        }
    }
}


//gets id of clicked image an
function galleryImageClick() {
        
    if (event.target.tagName == 'IMG') {
        
        currentImgId = event.target.getAttribute('data-id')
        getPhotoById(currentImgId, 10, displayImage);
        imageDisplay.classList.add('image_display__on');

        displayedPhotoIds = getPhotoData()
        currentIndex = displayedPhotoIds.indexOf(currentImgId);
        
    }
}

function displayImage(source) {
    
    //create img element
    const image = document.createElement("img");
    container.appendChild(image);
    image.src = `${source}`;
    image.classList.add('image_display__image')
}

function removeImage() {
    container.removeChild(container.childNodes[0])
}

//returns array of ids in gallery
function getPhotoData() {
    const images = document.querySelectorAll('.gallery_image');
    let imageIds = []
    images.forEach(function(e){imageIds.push(e.getAttribute('data-id'))})
    console.log(imageIds)
    return imageIds
}


//get index of current photo by its id
//add event listener to arrows that creates image according to next id

//galleryImageClick()


// const scroll = new SmoothScroll('navbar a[href*="#"]', {
// 	speed: 300
// });

// import ("https://cferdinandi.github.io/smooth-scroll/dist/smooth-scroll.js")
//   .then(function () {
//     new SmoothScroll("a[href*=\"#\"]"); // eslint-disable-line
// 	console.log('resolved!');
//   });

//   import SmoothScroll from "https://cferdinandi.github.io/smooth-scroll/dist/smooth-scroll.js";
// const scroll = new SmoothScroll("[data-scroll]");