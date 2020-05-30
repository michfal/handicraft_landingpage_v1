export const galleryContainer = {
    galleryImages: document.querySelector('.j-gallery_images')
}
    

class GalleryElements {
    constructor(){
        this.key = "74f4e44187e9b604246cfdba369c24a6";
        this.userId = "187676962@N05";
    }
    fetchPhotoIds() { 
        fetch(`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${this.key}&user_id=${this.userId}&format=json&nojsoncallback=1`)
    
        .then(resp => resp.json())
        .then(data => {
        this.getAllPhotos(this.filterIdsOfPhoto(data))  
        })
    }

    getAllPhotos(photoIds) {
        photoIds.forEach((id) => this.getPhotoById(id, 5, this.createGalleryImage))
    }

    filterIdsOfPhoto(data) {
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
    //as callback uses createGalleryImage for building gallery images or displayImage for displaying big picture
    getPhotoById(id, size, callback) {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes& api_key=${this.key}&user_id=${this.userId}&  photo_id=${id}&format=json&nojsoncallback=1`)

        .then(resp => resp.json())
        .then(data => {
        
        callback(this.getPhotoSizes(data, size), id)       
        })
    }

    createGalleryImage(source, id) {
    
        const imageContainer = document.createElement("div");
        galleryContainer.galleryImages.appendChild(imageContainer);
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

    getPhotoSizes(data, sizeIndex) {    
        const photoData = data;
        const photoSizes = photoData.sizes;
        return(photoSizes.size[sizeIndex].source)
    }

}

export let galleryElements = new GalleryElements();
//export const galleryContainer = new galleryContainer()