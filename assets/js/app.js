window.addEventListener('load', function () {

    var container = document.querySelector('.top-header-overlay');

    function createParticle(size) 
    {
        var particle = document.createElement('span');
        particle.className = 'particle';

        particle.style.width =  size + 'px';
        particle.style.height = size + 'px';
        container.appendChild(particle);

        var vx = ((Math.random() * 1.2) - 0.6);
        var vy = ((Math.random() * 1.2) - 0.6);

        particle.style.left = '50%'
        particle.style.top = '50%'

        var left  = parseFloat(particle.style.left.replace('%'));
        var top = parseFloat(particle.style.top.replace('%'));

        return function (opt) {

            if (typeof opt === 'object') {
                top  = opt.top;
                left = opt.left;
            }

            particle.classList.toggle('invert-x', vx < 0);
    
            if (left > 100 || left < 0) {
                vx *= -1;
            }

            if (top > 100 || top < 0) vy *= -1;

            top += vy;
            left += vx;

            particle.style.top = top  + '%';
            particle.style.left = left + '%';

        }
    }

    if (! container) return;
    

    var particles = [];

    for (var i = 0; i < 8; i++) {
        particles.push(
            createParticle(Math.random() * 8)
        )
    }

    function nextFrame() {

        particles.forEach(function (nextMove) {
            nextMove();
        })

        requestAnimationFrame(nextFrame);
    }

    nextFrame();
})