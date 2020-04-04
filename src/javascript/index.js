import '../sass/style.scss';
import '../template/template.html';


const galleryImages = document.querySelector('.j-gallery_images')

//get ID's of all user photos

const key = "74f4e44187e9b604246cfdba369c24a6";
const userId = "187676962@N05";

fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${key}&user_id=${userId}&format=json&nojsoncallback=1`)


.then(resp => resp.json())
.then(data => {
    getAllPhotos(getIdsOfPhoto(data))  
})



function getAllPhotos(photoIds) {
    photoIds.forEach((id) => getPhotoById(id))
}

function getIdsOfPhoto(data) {
    const pulledValues = data;
    const photos = (pulledValues.photos).photo
    const keys = Object.keys(pulledValues)
    //console.log(photos)
    let photoIds = []
    console.log(photoIds)
    photos.forEach((e) => photoIds.push(e.id))
    
    return photoIds
}    


//pulls photo according to ID and place it on website

function getPhotoById(id) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes& api_key=${key}&user_id=${userId}&  photo_id=${id}&format=json&nojsoncallback=1`)

    .then(resp => resp.json())
    .then(data => {
        createImage(getPhotoSizes(data, 5))
    })
}

function getPhotoSizes(data, sizeIndex) {    
    const photoData = data;
    const photoSizes = photoData.sizes;
    //console.log(photoSizes)
    //photoSizes.size gets array of objects cotaining: label, dimentions and source of picture
    //console.log(photoSizes.size)   //uncoment to see available sizes
    //photoSizes.size[x].source get's source of image according to it's index
    return(photoSizes.size[sizeIndex].source)
}

function createImage(source) {
    
    const imageContainer = document.createElement("div");
    galleryImages.appendChild(imageContainer);
    imageContainer.classList.add('image_container')
    
    const image = document.createElement("img");
    imageContainer.appendChild(image);
    image.src = `${source}`
}