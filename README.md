Se debe instalar express npm install express
Se debe de ejecutar app.js desde la carpeta de app
El proyecto integrador se encuentra dentro de larpeta app
Dentro de la carpeta app se debe instalar express de forma local mediante npm install express
Se puede ejecutar app.js usando node app.js

grupo_1_EPM
e-comerce, articulos para montaña
E-commerce de articulos para actividades al aire libre

Sprint 1

1. Crear el repositorio del proyecto y agregar colaboradores.
El nombre del repositorio será grupo_#_nombre donde # será su número de grupo y nombre será el nombre del proyecto.
Deberán agregar como colaboradores al resto de los integrantes del grupo. 
Entregable : https://github.com/EPM-DH/grupo_1_EPM.git

2. Definir la temática del Market Place
¿Qué productos o servicios brindará nuestro sitio? ¿Quién será nuestra audiencia
objetivo? ¿Cómo ajustaremos nuestra oferta a ese público?

● El sitio web estará dirigido a personas que disfrutan de las actividades al aire libre, como escalar, rappel, acampar, senderismo, pescar, entre otras. 
Por lo cual se ofreceran artículos como: 
- Casas de campaña
- Cuerdas
- Termos
- Cascos
- Arneses
- Chalecos
- Descensores, entre otros.

Actualmente hay muy pocos sitios que ofrecen este tipo de productos, por lo que vemos viable la creación de un sitio con estas características. La manera de llegar a nuestros clientes será con publicidad y alianzas con eventos para darnos a conocer. Y posteriormente cuando ordenen algo por la página, les llegará por paquetería. 

● Breve descripción de los integrantes del equipo.

El equipo está conformado por: 
- Juan Manuel Ledesma Rangel -> Ingeniero en Sistemas Digitales y Robótica por el Tecnológico de Monterrey. Poca experiencia previa con desarrollo web, pero buena experiencia con programación en general. 

- Jonathan Alvarez -> Estudiante de Informatica por parte de la UNAM en la FCA, uno de mis pasatiempos favoritos es disfrutrar de una larga caminata

- Ricardo Zúñiga -> Disfruto de las aventiras en las alturas, siempre cudanod la seguridad.

- Adolfo Alcaráz -> Aunque paso mucho tiempo en la computadora, se que lo mas inportante es la fanilia

Entregable : archivo README.md

3. Buscar inspiración en referentes del mercado

Sitios encontrados para inspiración: 
- https://www.campingmx.com/
- https://tentmasters.com/es
- https://walkingmexico.com/379/
- https://deportehabitat.com.mx/
- https://www.trekkinn.com/ 
- https://elseptimogrado.com/
- https://tierradenomadas.com.mx/ 
- https://www.decathlon.com.mx/
La razón de elección de los anteriores es porque venden artículos similares a los que buscamos y nos brindan una idea de los productos que podríamos utilizar, así como también un referente en cuanto al precio de los mismo y la manera en que manejan sus servicios en los sitios. 
- https://www.att.com.mx/planes/armalo
La razón de elección de la anterior es por la idea de los paquetes. En nuestro caso podríamos crear paquetes para principiantes y dejar también la opción de artículos individuales. 

4. Crear un wireframe y un boceto del sitio

● Home
● Detalle de producto
● Carrito de compras
● Formulario de registro
● Formulario de login

Entregable : En repositoirio del sitio carpeta /wireframes

5. Boceto o diseño del sitio,

● Logo
    /design/logo.svg

● Colores
    Azul1 #6699cc
    Naranja #cccc99
    Verde #ffcc99
    Azul2 #003366
    
● Tipografías

    Familia: 'Rubik'
    fuentes de Google Fonts. https://fonts.google.com/specimen/Rubik

Entregable : En repositoirio del sitio carpeta /design

Sprint 2

1. Realizar una breve retrospectiva

Se dejan todas retrospectivas en el archivo retro.md

2. Crear un tablero de trabajo

Tablero de Trello
https://trello.com/invite/b/uCNikJ9O/acf08b6c20cf7c698f246943e431067e/proyecto-integrador-e1-dh
Repositorio Github
https://github.com/EPM-DH/Grupo1_EPM_S.git

3. Crear la estructura de archivos utilizando Node.js+Express

Hecho, Estructura en Raiz

4. Página: inicio

Hecho. Grupo1_EPM\views\home.html

5. Página: detalle de producto

Hecho. Grupo1_EPM\views\details.html

6. Página: carrito de compras

Hecho. Grupo1_EPM\views\shoppingcart.html 

7. Página: registro

Hecho. Grupo1_EPM\views\login.html 

Sprint 3

1. Archivo retro.md con el resultado de la retrospectiva.

Se dejan todas retrospectivas en el archivo retro.md

2. Archivo weakly.md con sus opiniones sobre las daylies/weeklies.

Se crea archivo weekly.md

3. Actualizar tablero de trabajo en Trello

Tablero de Trello
https://trello.com/invite/b/uCNikJ9O/acf08b6c20cf7c698f246943e431067e/proyecto-integrador-e1-dh

Repositorio Github
https://github.com/EPM-DH/grupo_1_EPM.git

4. Sitio actualizado con todas las vistas y rutas implementando EJS.

Hecho, Estructura en carpeta app

5. Separar las vistas en carpetas

Hecho. Se crean dentro de la carpeta views , la carpeta products y la carpeta users

grupo_1_EPM\app\views\products
grupo_1_EPM\app\views\users

6. Separar los componentes repetidos en archivos parciales

Hecho. Archivos en la carpeta grupo_1_EPM\app\views\partials


6. Página: carrito de compras

Hecho. Grupo1_EPM\views\shoppingcart.html 

footer.ejs
header.ejs
header2.ejs
navbar.ejs
offcanvas.ejs

7. Página: creación y edición de productos

Hecho. Grupo1_EPM\views\