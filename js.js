document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navbar = document.querySelector('.navbar');
    const rocketBtn = document.getElementById('rocketBtn');
    const trailHead = document.querySelector('.trail-head');

    let currentSection = 0;
    let isScrolling = false;

    function goToSection(index) {
        if (index < 0) index = 0;
        if (index >= sections.length) index = sections.length - 1;

        currentSection = index;
        sections[index].scrollIntoView({ behavior: 'smooth' });

        updateActiveNavLink(sections[index].id);
        toggleNavbarVisibility(sections[index].id);
    }


    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    function toggleNavbarVisibility(sectionId) {
        navbar.style.display = sectionId === 'inicio' ? 'flex' : 'flex';
    }

  
    let lastScrollTime = 0;
    window.addEventListener('wheel', function (e) {
        const now = Date.now();
        if (isScrolling || now - lastScrollTime < 1000) return;

        lastScrollTime = now;
        isScrolling = true;

        if (e.deltaY > 0) {
            goToSection(currentSection + 1);
        } else {
            goToSection(currentSection - 1);
        }

        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }, { passive: false });

 
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(s => s.id === targetId);

            if (targetIndex >= 0) {
                goToSection(targetIndex);
            }
        });
    });


    rocketBtn.addEventListener('click', function () {
        if (rocketBtn.classList.contains('clicked')) return;

        rocketBtn.classList.add('clicked', 'active');

        setTimeout(() => {
            if (sections[0]) {
                sections[0].scrollIntoView({ behavior: 'smooth' });
                updateActiveNavLink(sections[0].id);
                toggleNavbarVisibility(sections[0].id);
                currentSection = 0;
            }
        }, 770);

        setTimeout(() => {
            rocketBtn.classList.remove('clicked', 'active');
        }, 5500);
    });

    rocketBtn.addEventListener('mouseenter', function () {
        document.querySelector('.rocket-container').classList.add('active');
    });

    rocketBtn.addEventListener('mouseleave', function () {
        document.querySelector('.rocket-container').classList.remove('active');
    });

  
    document.addEventListener('mousemove', function (e) {
        trailHead.style.left = e.pageX + 'px';
        trailHead.style.top = e.pageY + 'px';
    });


    document.addEventListener('click', function () {
        trailHead.classList.add('click-effect');
        setTimeout(() => {
            trailHead.classList.remove('click-effect');
        }, 300);
    });


    window.addEventListener('scroll', function () {
        const fromTop = window.scrollY + window.innerHeight / 2;

        let found = false;
        sections.forEach((section, index) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (fromTop >= top && fromTop < bottom && !found) {
                currentSection = index;
                updateActiveNavLink(section.id);
                toggleNavbarVisibility(section.id);
                found = true;
            }
        });
    });


    const bolas = [
        document.getElementById("bola1"),
        document.getElementById("bola2"),
        document.getElementById("bola3"),
        document.getElementById("bola4"),
        document.getElementById("bola5"),
    ];

    const nodos = Array.from(document.querySelectorAll('.habilidad'));
    const posiciones = nodos.map(n => {
        const rect = n.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 + window.scrollX,
            y: rect.top + rect.height / 2 + window.scrollY,
        };
    });

    const conexiones = {
        0: [1, 4],
        1: [2, 5],
        2: [3, 6],
        3: [7],
        4: [5, 8],
        5: [6, 9],
        6: [7, 10],
        7: [11],
        8: [9],
        9: [10],
        10: [11],
        11: [6, 9, 2]
    };

    function moverBola(bola, nodoActual) {
        const opciones = conexiones[nodoActual];
        const siguiente = opciones[Math.floor(Math.random() * opciones.length)];

        bola.style.left = `${posiciones[siguiente].x - 7}px`;
        bola.style.top = `${posiciones[siguiente].y - 7}px`;

        setTimeout(() => moverBola(bola, siguiente), 600 + Math.random() * 500);
    }

    bolas.forEach((bola, i) => {
        const nodoInicial = i;
        bola.style.left = `${posiciones[nodoInicial].x - 7}px`;
        bola.style.top = `${posiciones[nodoInicial].y - 7}px`;
        setTimeout(() => moverBola(bola, nodoInicial), 500 * i);
    });


    const radios = document.querySelectorAll('input[name="slider"]');
    const boxes = document.querySelectorAll('.box');

    function updateActiveBox() {
        boxes.forEach(box => box.classList.remove('active'));
        const checkedRadio = document.querySelector('input[name="slider"]:checked');
        if (checkedRadio) {
            const label = checkedRadio.nextElementSibling;
            if (label && label.classList.contains('box')) {
                label.classList.add('active');
            }
        }
    }

    radios.forEach(radio => {
        radio.addEventListener('change', updateActiveBox);
    });

    // Inicializar al cargar
    updateActiveBox();


    const grid = document.querySelector('.button-grid');
    const squareSize = 127.8;
    const cols = Math.ceil(window.innerWidth / squareSize);
    const rows = Math.ceil(window.innerHeight / squareSize);
    const total = cols * rows;

    for (let i = 0; i < total; i++) {
        const btn = document.createElement('button');
        grid.appendChild(btn);
    }

    document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(field => {
        const wrapper = field.parentElement;

        const toggleClass = () => {
            if (field.value.trim() !== '' || document.activeElement === field) {
                wrapper.classList.add('active');
            } else {
                wrapper.classList.remove('active');
            }
        };

        field.addEventListener('input', toggleClass);
        field.addEventListener('focus', toggleClass);
        field.addEventListener('blur', toggleClass);


        toggleClass();
    });

   

    // Inicializar
    goToSection(0);



});
