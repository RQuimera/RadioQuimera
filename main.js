document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("show");
})
ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-cards', { delay: 500 });
ScrollReveal().reveal('.cards-banner-one', { delay: 500 });

// Import the Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, where, doc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyC9zPkZFWqV3EReb2sycMbeSwsXon_gKrk",
  authDomain: "datos-de-prueba-a6396.firebaseapp.com",
  projectId: "datos-de-prueba-a6396",
  storageBucket: "datos-de-prueba-a6396.firebasestorage.app",
  messagingSenderId: "1057473109635",
  appId: "1:1057473109635:web:2a7a0e75418e382af705b6",
  measurementId: "G-SZTSRRW7RZ"
};

// Inicialización de Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const path = window.location.pathname;
// Obtener el parámetro "id" de la URL (si existe)
const params = new URLSearchParams(window.location.search);
const chapterId = params.get("id");

let resultContainer;
if (path.includes("itsatrap.html")) {
  resultContainer = document.querySelector('.cuartoSecreto');
} else if (chapterId) {
  resultContainer = document.querySelector('.chapter-detail');
} else if (path.includes("index.html") || path === "/") {
  resultContainer = document.querySelector('.capitulos');
} else if (path.includes("capitulos.html")) {
  resultContainer = document.querySelector('.allChapter');
} 

// Variables globales para paginación (usadas en "capitulos.html" sin parámetro "id")
let allEpisodes = [];
let currentPage = 1;
const pageSize = 5;
let prevButton, nextButton;

if (chapterId) {
  if (path.includes("itsatrap.html")) {
    displaySecrets()
  }else {
    getIdEpisode().then((capitulo) => {
      if (capitulo) {
        displayIdEpisode(capitulo);
      } else {
        resultContainer.innerHTML = `<p>No se encontró el episodio con id ${chapterId}</p>`;
      }
    });
  }
  
} else {
  getPodcastEpisodes().then((episodios) => {
    if (path.includes("index.html") || path === "/") {
      displayEpisodes(episodios.slice(0, 4));
    } else if (path.includes("capitulos.html")) {
      allEpisodes = episodios;
      currentPage = 1;
      displayEpisodesPage(currentPage);
      createPaginationControls();

      // displayEpisodes(episodios);
    }
  });
}

async function getPodcastEpisodes() {
  const episodesCollectionRef = collection(db, "episodios");
  const q = query(episodesCollectionRef, orderBy("id", "desc"));
  // console.log(q);

  try {
    const querySnapshot = await getDocs(q);
    const episodes = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      episodes.push({
        // Si deseas mostrar el campo numérico, úsalo desde data
        id: data.id,
        nombre: data.nombre,
        img: data.img,
        description: data.description,
        link: data.link,
      });
    });
    return episodes;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}

async function getIdEpisode() {
  try {
    const episodesCollectionRef = collection(db, "episodios");
    // Convertimos chapterId a número si es necesario
    const q = query(episodesCollectionRef, where("id", "==", Number(chapterId)));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Retornamos el primer documento encontrado
      return querySnapshot.docs[0].data();
    } else {
      console.error("No se encontró el capitulo #", chapterId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching episode:", error);
    return null;
  }
}

function displayEpisodes(episodios) {
  resultContainer.innerHTML = '';

  if (episodios.length === 0) {
    let noEpisodeMessage = document.createElement('h4');
    resultContainer.classList.replace('capitulos', 'noCapt')
    noEpisodeMessage.textContent = 'Lo sentimos, nuestros capitulos fueron borrados por un problema en el multiverso, estamos buscando las esferas del dragon para recuperarlos';
    resultContainer.appendChild(noEpisodeMessage);
    return;
  }

  episodios.forEach(capitulo => {
    let captDiv = document.createElement('div');
    captDiv.classList.add('capt');

    const maxPalabras = 20;
    const palabras = capitulo.description.split(/\s+/); // Split por espacios

    let poster = document.createElement('img');
    poster.src = capitulo.img;
    // poster.src = `https://drive.google.com/thumbnail?id=${capitulo.img}`;
    poster.alt = `Póster de ${capitulo.nombre}`;

    let title = document.createElement('h3');
    title.textContent = `Ep. #${capitulo.id}/ ${capitulo.nombre}`;

    let description = document.createElement('p');
    if (palabras.length > maxPalabras) {
      description.textContent = palabras.slice(0, maxPalabras).join(' ') + ' ...';
    } else {
      description.textContent = capitulo.description;
    }

    let botonCapt = document.createElement('a');
    botonCapt.href = `capitulos.html?id=${capitulo.id}`;
    botonCapt.innerHTML = 'Ver más <i class="fas fa-angle-double-right"></i>';

    captDiv.append(poster, title, description, botonCapt);
    resultContainer.appendChild(captDiv);
  });
}

function displayIdEpisode(capitulo) {
  resultContainer.innerHTML = '';

  let captDiv = document.createElement('div');
  captDiv.classList.add('capts');

  let poster = document.createElement('img');
  poster.src = capitulo.img;
  // poster.src = `https://drive.google.com/thumbnail?id=${capitulo.img}`;
  poster.alt = `Póster de ${capitulo.nombre}`;

  let title = document.createElement('h3');
  title.textContent = `Ep. #${capitulo.id}/ ${capitulo.nombre}`;

  let description = document.createElement('p');
  description.textContent = capitulo.description;

  let botonCapt = document.createElement('a');
  botonCapt.href = capitulo.link;
  botonCapt.innerHTML = 'Escucha el capitulo <i class="fas fa-angle-double-right"></i>';

  let botonCaptAll = document.createElement('a');
  botonCaptAll.href = 'capitulos.html';
  botonCaptAll.innerHTML = ' <i class="fas fa-angle-double-left"></i> Todos los episodios';

  captDiv.appendChild(poster);
  captDiv.appendChild(title);
  captDiv.appendChild(description);

  let botDiv = document.createElement('div');
  botDiv.classList.add('botDiv');

  botDiv.appendChild(botonCaptAll);
  botDiv.appendChild(botonCapt);

  captDiv.appendChild(botDiv);

  resultContainer.appendChild(captDiv);
}

function displayEpisodesPage(page) {
  resultContainer.innerHTML = '';
  const startIndex = (page - 1) * pageSize;
  const pageEpisodes = allEpisodes.slice(startIndex, startIndex + pageSize);

  if (pageEpisodes.length === 0) {
    resultContainer.innerHTML = `<h4>No hay episodios para mostrar.</h4>`;
    return;
  }

  pageEpisodes.forEach(capitulo => {
    let captDiv = document.createElement('div');
    captDiv.classList.add('capt');

    // Para la vista en capitulos.html, se muestra la info completa
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    let poster = document.createElement('img');
    poster.src = capitulo.img;
    // poster.src = `https://drive.google.com/thumbnail?id=${capitulo.img}`;
    poster.alt = `Póster de ${capitulo.nombre}`;

    let title = document.createElement('h3');
    title.textContent = `Ep. #${capitulo.id} / ${capitulo.nombre}`;

    let description = document.createElement('p');
    description.textContent = capitulo.description;

    let botonCapt = document.createElement('a');
    botonCapt.href = capitulo.link;
    botonCapt.innerHTML = 'Escucha el capítulo <i class="fas fa-angle-double-right"></i>';

    infoDiv.append(title, description, botonCapt);
    // Dependiendo del diseño, se pueden colocar la imagen e info en distintas posiciones.
    // Por ejemplo, se puede hacer:
    captDiv.append(poster, infoDiv);
    resultContainer.appendChild(captDiv);
  });
}

function createPaginationControls() {
  let paginationDiv = document.createElement('div');
  paginationDiv.id = "pagination";
  paginationDiv.style.textAlign = "center";
  paginationDiv.style.marginTop = "20px";

  // Creamos los botones y los asignamos a las variables globales
  prevButton = document.createElement('button');
  prevButton.textContent = "Anterior";
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayEpisodesPage(currentPage);
      updatePaginationControls();
    }
  });

  nextButton = document.createElement('button');
  nextButton.textContent = 'Siguiente';
  nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(allEpisodes.length / pageSize)) {
      currentPage++;
      displayEpisodesPage(currentPage);
      updatePaginationControls();
    }
  });

  let pageInfo = document.createElement('span');
  pageInfo.id = "pageInfo";
  pageInfo.style.marginLeft = "10px";
  pageInfo.textContent = `${currentPage} de ${Math.ceil(allEpisodes.length / pageSize)}`;
  // pageInfo.textContent = ` Página ${currentPage} de ${Math.ceil(allEpisodes.length / pageSize)}`;

  paginationDiv.append(prevButton, nextButton, pageInfo);
  // Insertar el contenedor de paginación justo después del resultContainer
  resultContainer.parentNode.insertBefore(paginationDiv, resultContainer.nextSibling);

  updatePaginationControls();
}

function updatePaginationControls() {
  let pageInfo = document.getElementById('pageInfo');
  let totalPages = Math.ceil(allEpisodes.length / pageSize);
  if (pageInfo) {
    pageInfo.textContent = `${currentPage} de ${totalPages}`;
    // pageInfo.textContent = ` Página ${currentPage} de ${totalPages}`;
  }
  // Ocultar el botón "Anterior" si estamos en la primera página
  if (currentPage === 1) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "inline-block";
  }
  // Ocultar el botón "Siguiente" si estamos en la última página
  if (currentPage === totalPages) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "inline-block";
  }
}



function displaySecrets() {

  resultContainer.innerHTML = '';
  let secretDiv = document.createElement('div');
  secretDiv.classList.add('itsASecret');

  let title = document.createElement('h3');
  title.classList.add('secretText');
  let poster = document.createElement('img');
  poster.classList.add('secretImg');

  if (chapterId  === 'c1') {
    title.textContent = `Yohohohohohou, vienes a tomar una taza de té con nosotros?`;
    poster.src = 'https://64.media.tumblr.com/0619e457fd122e3033e1887d23e9e695/404b197327442998-f9/s1280x1920/f9f8dd9e31f9cbe980aa48c8527bddd47e01312d.jpg';
    poster.alt = `Gato con botas`;
  } else if (chapterId === 'j1') {
    title.textContent = `que haces aquí? Es peligroso que vayas solo por ahi, toma este kuriboh para que te acompañe`;
    poster.src = 'https://live.staticflickr.com/65535/54371249032_3943105ff3_b.jpg';
    poster.alt = `Kuriboh`;
  } else if (chapterId === 'p1') {
    title.textContent = `Zoro? como llegaste aquí? te perdiste de nuevo?`;
    poster.src = 'https://i.blogs.es/54f024/zoro/1366_2000.jpeg';
    poster.alt = `zoro?`;
  } 

  secretDiv.appendChild(poster);
  secretDiv.appendChild(title);
  resultContainer.appendChild(secretDiv);
}
