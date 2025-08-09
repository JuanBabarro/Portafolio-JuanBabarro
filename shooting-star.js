document.addEventListener('DOMContentLoaded', () => {
    // Crear contenedor (ya está en el HTML ahora)
    const trailContainer = document.getElementById('mouse-trail') || document.createElement('div');
    trailContainer.id = 'mouse-trail';
    
    // Asegurarse de que está al final del body
    if (!document.getElementById('mouse-trail')) {
        document.body.appendChild(trailContainer);
    }
    
    const pathContainer = trailContainer.querySelector('.trail-path') || document.createElement('div');
    pathContainer.className = 'trail-path';
    trailContainer.appendChild(pathContainer);
    
    const head = trailContainer.querySelector('.trail-head') || document.createElement('div');
    head.className = 'trail-head';
    trailContainer.appendChild(head);
    
    // Resto del código permanece igual...
    let points = [];
    const maxPoints = 40;
    let lastRenderTime = 0;
    const renderInterval = 16;
    
    function updateTrail(timestamp) {
        // Código existente...
    }
    
    document.addEventListener('mousemove', (e) => {
        // Mover la cabeza al frente en cada frame
        head.style.zIndex = '10000';
        head.style.left = `${e.clientX}px`;
        head.style.top = `${e.clientY}px`;
        
        const x = e.clientX;
        const y = e.clientY;
        
        if (points.length === 0) {
            points.push({ x, y });
        } else {
            const lastPoint = points[points.length - 1];
            const distance = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2));
            
            if (distance > 5) {
                points.push({ x, y });
                
                if (points.length > maxPoints) {
                    points.shift();
                }
            }
        }
    });
    
    // Restaura el cursor cuando sale de la ventana (opcional)
    document.addEventListener('mouseout', () => {
        points = [];
        document.querySelectorAll('.trail-line').forEach(seg => seg.remove());
    });
    
    requestAnimationFrame(updateTrail);
});

function createTrailSegment(start, end) {
    const segment = document.createElement('div');
    segment.className = 'trail-line';
    
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    
    segment.style.left = `${start.x}px`;
    segment.style.top = `${start.y}px`;
    segment.style.width = `${length}px`;
    segment.style.transform = `rotate(${angle}rad)`;
    segment.style.opacity = '1';
    segment.style.animation = `trailFadeOut ${maxPoints*20}ms linear forwards`;
    
    document.querySelector('.trail-path').appendChild(segment);
}

// Efecto al hacer click
document.addEventListener('mousedown', () => {
    head.classList.add('click-effect');
});

document.addEventListener('mouseup', () => {
    head.classList.remove('click-effect');
});