import '../sass/style.scss';
import '../template/template.html';

console.log("hi")


const galleryImages = document.querySelector('.j-gallery_images')

//get ID's of all user photos

fetch('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=874fa0262a2884c9b12c0e6a032030fc&user_id=146495496@N08&format=json&nojsoncallback=1')

.then(resp => resp.json())
.then(data => {
    getAllPhotos(getPhotoIds(data))  
})



function getAllPhotos(photoIds) {
    photoIds.forEach((id) => getPhotoById(id))
}

function getPhotoIds(data) {
    const pulledValues = data;
    const photos = (pulledValues.photos).photo
    const keys = Object.keys(pulledValues)
    //console.log(photos)
    let photoIds = []
    photos.forEach((e) => photoIds.push(e.id))
    //console.log(photoIds)
    return photoIds
}    


//pulls photo according to ID and place it on website

function getPhotoById(id) {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes& api_key=874fa0262a2884c9b12c0e6a032030fc&user_id=146495496@N08&  photo_id=${id}&format=json&nojsoncallback=1`)

    .then(resp => resp.json())
    .then(data => {
        createImage(getPhotoSizes(data, 5))
    })
}

function getPhotoSizes(data, sizeIndex) {    
    const photoData = data;
    const photoSizes = photoData.sizes;
    console.log(photoSizes)
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