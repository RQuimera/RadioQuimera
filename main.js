<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link class="logo" rel="shortcut icon" href="./assets/img/ico_animals.ico" type="image/x-icon" />
    <title>Radio Quimera</title>
    <!--Font Awesome
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />  -->
    <script src="https://kit.fontawesome.com/e1abd97cf0.js" crossorigin="anonymous"></script>
    <!--Font Quicksand-->
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
    <!--Custom CSS-->
    <link rel="stylesheet" href="./styles/styles.css" />
    <link rel="stylesheet" href="./styles/conocenos.css" />
</head>

<body>
    <div class="menu-btn">
        <i class="fas fa-bars"></i>
    </div>

    <div class="container">
        <nav class="nav-main">
            <a href="index.html"><img src="./assets/img/letras.png" alt="logo" class="nav-brand" /></a>
            <ul class="nav-menu">
                <li>
                    <a href="index.html"><b>Inicio</b></a>
                </li>
                <li>
                    <a href="./capitulos.html"><b>Capitulos</b></a>
                </li>
                <li>
                    <a class="active" href="./escuchanos.html"><b>Escuchanos</b></a>
                </li>
                <li>
                    <a href="./conocenos.html"><b>Conocenos</b></a>
                </li>
            </ul>

            <!-- <ul class="lupa">
                <li>
                    <a href="">
                        <i class="fas fa-search"></i>
                    </a>
                </li>
            </ul> -->
        </nav>

        <section>
            <div class="content">
                <div class="texto">
                    <h2>¿Que es Radio Quimera?</h2>
                </div>
                <div class="video">
                    <video class="video-intro" width="500" controls poster="./assets/img/logo.png">
                        <source src="./assets/vid/Teaser.mp4" type="video/mp4">
                        Tu navegador no admite la etiqueta de video.
                    </video>
                </div>
                <div class="texto">
                    <p>
                        Somos un grupo de amigos que un día decidieron reunirse a hablar de temas que nos gustaban, y empezamos a grabarlos por si alguien ahí afuera quisiera escucharnos (no sabemos por qué nos escucharías, pero gracias por hacerlo). Visita nuestro canal de Youtube para escuchar los capitulos</b>
                    </p>
                    <a href="https://www.youtube.com/channel/UCvkGZV8PeWWnikLLlBu380g?sub_confirmation=1" target="_blank" class="btn"> Canal de youtube <i class="fas fa-angle-double-right"></i></a>
                </div>
            </div>
        </section>

        <!--scroll reveal-->
        <script src="https://unpkg.com/scrollreveal"></script>
        <!--custom js-->
        <script src="main.js"></script>
</body>

</html>
