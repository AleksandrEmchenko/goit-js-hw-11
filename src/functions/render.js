export function renderGallery(data) {
  return (images = data
    .map((image) => {
      return `<div class="photo-card">
  
          <a class="gallery__item" href="${image.largeImageURL}">
            <img class="gallery__image" src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" width=300 height=200/>
          </a>
  
          <div class="info">
            <p class="info-item">
              <b>Likes </b>${image.likes}
            </p>
            <p class="info-item">
              <b>Views </b>${image.views}
            </p>
            <p class="info-item">
              <b>Comments </b>${image.comments}
            </p>
            <p class="info-item">
              <b>Downloads </b>${image.downloads}
            </p>
          </div>
        </div>
          `;
    })
    .join(""));
}
