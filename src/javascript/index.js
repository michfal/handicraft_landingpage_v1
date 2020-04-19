import '../sass/style.scss';
import '../template/template.html';


const galleryImages = document.querySelector('.j-gallery_images')

//get ID's of all user photos

const key = "74f4e44187e9b604246cfdba369c24a6";
const userId = "187676962@N05";

function fetchPhotoIds() { 
    fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${key}&user_id=${userId}&format=json&nojsoncallback=1`)

    .then(resp => resp.json())
    .then(data => {
    getAllPhotos(filterIdsOfPhoto(data))  
    })
}

function filterIdsOfPhoto(data) {
    const pulledValues = data;
    const photos = (pulledValues.photos).photo
    const keys = Object.keys(pulledValues)
    //console.log(photos)
    let photoIds = []
    console.log(photoIds)
    photos.forEach((e) => photoIds.push(e.id))
    
    return photoIds
}


function getAllPhotos(photoIds) {
    photoIds.forEach((id) => getPhotoById(id))
}

    
//pulls photo according to ID and place it on website
function getPhotoById(id) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes& api_key=${key}&user_id=${userId}&  photo_id=${id}&format=json&nojsoncallback=1`)

    .then(resp => resp.json())
    .then(data => {
        createImage(getPhotoSizes(data, 5), id)
    })
}

function getPhotoSizes(data, sizeIndex) {    
    const photoData = data;
    const photoSizes = photoData.sizes;

    return(photoSizes.size[sizeIndex].source)
}

function createImage(source, id) {
    
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