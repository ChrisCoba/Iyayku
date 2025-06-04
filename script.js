// JavaScript functionality can be added here for the slider or other interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Example: Initialize slider functionality if needed
});

// Añade el hover dinámico a los elementos del menú
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.letras_menu a');

  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.color = 'blue';
    });

    item.addEventListener('mouseleave', () => {
      item.style.color = 'black';
    });
  });
});

// Hover para el menú

const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');

searchToggle.addEventListener('click', () => {
    searchToggle.style.display = 'none';  // oculta el ícono
    searchInput.classList.add('visible'); // muestra el input
    searchInput.focus();
});

searchInput.addEventListener('blur', () => {
    searchInput.classList.remove('visible');
    searchToggle.style.display = 'inline-block';
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.classList.remove('visible');
        searchToggle.style.display = 'inline-block';
    }
});


const slider = document.getElementById('slider');
const images = slider.querySelectorAll('img');
const imgCount = images.length;
const imgWidth = images[0].clientWidth;
const gap = parseInt(getComputedStyle(slider).gap) || 30;

// Clonamos las primeras imágenes para hacer el loop infinito
for (let i = 0; i < imgCount; i++) {
  const clone = images[i].cloneNode(true);
  slider.appendChild(clone);
}

let index = 0;

// Función para mover slider
function moveSlider(step = 1) {
  index += step;
  slider.style.transition = 'transform 0.5s ease-in-out';
  slider.style.transform = `translateX(${-index * (imgWidth + gap)}px)`;

  // Cuando llegamos a la mitad (las imágenes clonadas)
  if (index >= imgCount) {
    // Esperamos que termine la transición para hacer el "salto invisible"
    setTimeout(() => {
      slider.style.transition = 'none';
      index = 0;
      slider.style.transform = `translateX(0px)`;
    }, 500); // debe coincidir con la duración del transition
  }
}

// Botones para mover slider
document.querySelector('.next').addEventListener('click', () => moveSlider(1));
document.querySelector('.prev').addEventListener('click', () => {
  if (index === 0) {
    // Si estamos al principio, saltamos al clone final instantáneamente
    slider.style.transition = 'none';
    index = imgCount;
    slider.style.transform = `translateX(${-index * (imgWidth + gap)}px)`;
    // Luego movemos un paso atrás con animación
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease-in-out';
      index--;
      slider.style.transform = `translateX(${-index * (imgWidth + gap)}px)`;
    }, 20);
  } else {
    moveSlider(-1);
  }
});

// Auto slide cada 5 segundos
setInterval(() => moveSlider(1), 2500);

