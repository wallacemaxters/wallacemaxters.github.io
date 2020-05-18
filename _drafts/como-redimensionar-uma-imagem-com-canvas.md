---
layout: post
title: Como redimensionar uma imagem com Canvas
date: 2020-05-18 00:00:00 -0300
categories:
- javascript
- " imagem"
- " canvas"
sitemap: true
image: ''

---
```javascript
export async function loadImage(img, src) {
    return new Promise((resolve, reject) => {
        img.src = src;
        img.completed ? resolve(img) : img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => reject(img));
    })
}

export async function resizeImage(src, options)
{
    const image = await loadImage(document.createElement('img'), src);

    const canvas = document.createElement('canvas');

    if (options.width && !options.height) {
        options.height = image.height * (options.width / image.width)
    } else if (! options.width && options.height) {
        options.width = image.width * (options.height / image.height)
    }

    Object.assign(canvas, options);

    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

    console.log(options)

    return new Promise(resolve => {
        canvas.toBlob(resolve, options.type || 'image/png', options.quality)
    })
}


export async function resizeImageFromBlob(blobImage, options) {
    return await resizeImage(URL.createObjectURL(blobImage), options);
}

```