
document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("show");
})
ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-cards', { delay: 500 });
ScrollReveal().reveal('.cards-banner-one', { delay: 500 });
// ScrollReveal().reveal('.cards-banner-one', { delay: 500 });

// Import the Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
let resultContainer; // Declaración global en este ámbito

if (path.includes("index.html") || path === "/") {
  resultContainer = document.querySelector('.capitulos');
} else if (path.includes("capitulos.html")) {
  resultContainer = document.querySelector('.allChapter');
}

// let resultContainer = document.querySelector('.capitulos');

async function getPodcastEpisodes() {
  const episodesCollectionRef = collection(db, "episodios");
  //   console.log(episodesCollectionRef)
  // Asegúrate de que cada documento tenga un campo "id" (numérico)
  const q = query(episodesCollectionRef, orderBy("id", "desc"));
  console.log(q);

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


getPodcastEpisodes().then((episodios) => {
  if (path.includes("index.html") || path === "/") {
    displayEpisodes(episodios.slice(0, 4));
  } else if (path.includes("capitulos.html")) {
    displayEpisodes(episodios);
  }
});

function displayEpisodes(episodios) {
  resultContainer.innerHTML = '';

  if (episodios.length === 0) {
    let noEpisodeMessage = document.createElement('h4');
    noEpisodeMessage.textContent = 'No se encontraron episodios. Verifica la conexión a la base de datos o las reglas de Firestore.';
    resultContainer.appendChild(noEpisodeMessage);
    return;
  }

  episodios.forEach(capitulo => {
    let captDiv = document.createElement('div');
    captDiv.classList.add('capt');

    let poster = document.createElement('img');
    poster.src = `https://drive.google.com/thumbnail?id=${capitulo.img}`;
    poster.alt = `Póster de ${capitulo.nombre}`;

    let title = document.createElement('h3');
    title.textContent = `Ep. #${capitulo.id} / ${capitulo.nombre}`;

    const maxPalabras = 20;
    const palabras = capitulo.description.split(/\s+/); // Split por espacios
    let description = document.createElement('p');
    let botonCapt = document.createElement('a');

    if (path.includes("index.html") || path === "/") {
      if (palabras.length > maxPalabras ) {
        description.textContent = palabras.slice(0, maxPalabras).join(' ') + ' ...';
      } else if (path.includes("capitulos.html")) {
        description.textContent = capitulo.description;
      }
      botonCapt.href = `capitulos.html?id=${capitulo.id}`;
      botonCapt.innerHTML = 'Ver más <i class="fas fa-angle-double-right"></i>';
    } else if (path.includes("capitulos.html")) {
      description.textContent = capitulo.description;
      botonCapt.href = capitulo.link;
      botonCapt.innerHTML = 'Escucha el capitulo <i class="fas fa-angle-double-right"></i>';
    };


    // botonCapt.href = capitulo.link;


    captDiv.appendChild(poster);
    captDiv.appendChild(title);
    captDiv.appendChild(description);
    captDiv.appendChild(botonCapt);

    resultContainer.appendChild(captDiv);
  });
}



/* ------------------------- FIREBASE FUNCIONANDO ----------------------------------------*/

// document.querySelector(".menu-btn").addEventListener("click", () => {
//   document.querySelector(".nav-menu").classList.toggle("show");
// })
// ScrollReveal().reveal('.showcase');
// ScrollReveal().reveal('.news-cards', { delay: 500 });
// ScrollReveal().reveal('.cards-banner-one', { delay: 500 });
// ScrollReveal().reveal('.cards-banner-one', { delay: 500 });

// // Import the Firebase libraries
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// // Your Firebase configuration (replace with your actual config)
// const firebaseConfig = {
//   apiKey: "AIzaSyC9zPkZFWqV3EReb2sycMbeSwsXon_gKrk",
//   authDomain: "datos-de-prueba-a6396.firebaseapp.com",
//   projectId: "datos-de-prueba-a6396",
//   storageBucket: "datos-de-prueba-a6396.firebasestorage.app",
//   messagingSenderId: "1057473109635",
//   appId: "1:1057473109635:web:2a7a0e75418e382af705b6",
//   measurementId: "G-SZTSRRW7RZ"
// };

// // Inicialización de Firebase y Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// let resultContainer = document.querySelector('.capitulos');

// async function getPodcastEpisodes() {
//   const episodesCollectionRef = collection(db, "episodios");
//   //   console.log(episodesCollectionRef)
//   // Asegúrate de que cada documento tenga un campo "id" (numérico)
//   const q = query(episodesCollectionRef, orderBy("id", "desc"));
//   console.log(q);

//   try {
//     const querySnapshot = await getDocs(q);
//     const episodes = [];
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       episodes.push({
//         // Si deseas mostrar el campo numérico, úsalo desde data
//         id: data.id,
//         nombre: data.nombre,
//         img: data.img,
//         description: data.description,
//         link: data.link,
//       });
//     });
//     return episodes;
//   } catch (error) {
//     console.error("Error fetching episodes:", error);
//     return [];
//   }
// }

// getPodcastEpisodes().then((episodios) => {
//   displayEpisodes(episodios.slice(0, 4));
// });

// function displayEpisodes(episodios) {
//   resultContainer.innerHTML = '';

//   if (episodios.length === 0) {
//     let noEpisodeMessage = document.createElement('h4');
//     noEpisodeMessage.textContent = 'No se encontraron episodios. Verifica la conexión a la base de datos o las reglas de Firestore.';
//     resultContainer.appendChild(noEpisodeMessage);
//     return;
//   }

//   episodios.forEach(capitulo => {
//     let captDiv = document.createElement('div');
//     captDiv.classList.add('capt');

//     let poster = document.createElement('img');
//     poster.src = `https://drive.google.com/thumbnail?id=${capitulo.img}`;
//     poster.alt = `Póster de ${capitulo.nombre}`;

//     let title = document.createElement('h3');
//     title.textContent = `Ep. #${capitulo.id} / ${capitulo.nombre}`;





//     const maxPalabras = 20;
//     const palabras = capitulo.description.split(/\s+/); // Split por espacios

//     let description = document.createElement('p');

//     if (palabras.length > maxPalabras) {
//       description.textContent = palabras.slice(0, maxPalabras).join(' ') + ' ...';
//     } else {
//       description.textContent = capitulo.description;
//     }

//     ;

//     let botonCapt = document.createElement('a');
//     // botonCapt.href = capitulo.link;
//     botonCapt.href = `capitulos.html?id=${capitulo.id}`;
//     botonCapt.innerHTML = 'Ver más <i class="fas fa-angle-double-right"></i>';

//     captDiv.appendChild(poster);
//     captDiv.appendChild(title);
//     captDiv.appendChild(description);
//     captDiv.appendChild(botonCapt);

//     resultContainer.appendChild(captDiv);
//   });
// }













/* ------------------------- SIN FIREBASE ----------------------------------------*/



// import { episodios } from './db.js'
// let resultContainer = document.querySelector('.capitulos');

// function displayEpisodes(episodios) {
//     resultContainer.innerHTML = '';

//     if (episodios.length === 0) {
//         let noEpisodeMessage = document.createElement('h4');
//         noEpisodeMessage.textContent = 'Lo sentimos, nuestros capitulos fueron borrados por un problema en el multiverso, estamos buscando las esferas del dragon para recuperarlos';
//         resultContainer.appendChild(noEpisodeMessage);
//         return;
//     }

//     episodios.forEach(capitulo => {
//         let captDiv = document.createElement('div');
//         captDiv.classList.add('capt');

//         // Imagen del póster
//         let poster = document.createElement('img');
//         poster.src = `https://drive.google.com/thumbnail?id=${capitulo.img}`;
//         // poster.src = capitulo.img;
//         poster.alt = `Póster de ${capitulo.nombre}`;

//         // Título del capitulo
//         let title = document.createElement('h3');
//         title.textContent = `Ep. #${capitulo.id}/ ${capitulo.nombre}`;

//         // Descripción
//         let description = document.createElement('p');
//         description.textContent = capitulo.description;

//         // Descripción
//         let botonCapt = document.createElement('a');
//         botonCapt.href = capitulo.link;
//         botonCapt.innerHTML = 'Ver mas <i class="fas fa-angle-double-right"></i>';

//         // Añadir elementos al contenedor
//         captDiv.appendChild(poster);
//         captDiv.appendChild(title);
//         captDiv.appendChild(description);
//         captDiv.appendChild(botonCapt);

//         resultContainer.appendChild(captDiv);
//     });
// }

// // Ordenar de mayor a menor ID (para obtener las más recientes)
// const episodiosOrdenadas = episodios.sort((a, b) => b.id - a.id);
// displayEpisodes(episodiosOrdenadas.slice(0, 4)); // Primeros 4 después de ordenar
