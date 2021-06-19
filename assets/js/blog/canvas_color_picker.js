document.addEventListener('DOMContentLoaded', function () {
    function loadImg() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height)
    }
    
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    const debug = document.createElement('pre');
    
    canvas.insertAdjacentElement('afterend', debug)
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * canvas.width / rect.width;
        const y = (e.clientY - rect.top) * canvas.height / rect.height;
    
        const pixel = context.getImageData(x, y, 1, 1).data;
    
        const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`

        debug.innerText = rgba;
        debug.style.color = rgba;
    });
    const img = document.createElement('img');
    img.src = '/assets/img/bg.jpg';
    img.complete ? loadImg() : img.addEventListener('load', loadImg)
});