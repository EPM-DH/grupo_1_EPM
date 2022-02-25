Se deben instalar dependencias npm install 
Se debe de ejecutar app.js desde la carpeta de app
El proyecto integrador se encuentra dentro de larpeta app
Se puede ejecutar app.js usando node app.js o npm run start

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
https://github.com/EPM-DH/Grupo1_EPM.git

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

Sprint 4

1. Archivo retro.md con el resultado de la retrospectiva.

Se dejan todas retrospectivas en el archivo retro.md

2. Archivo weakly.md con sus opiniones sobre las daylies/weeklies.

Se actualiza el archivo weekly.md

3. Actualizar tablero de trabajo en Trello

Tablero de Trello
https://trello.com/invite/b/uCNikJ9O/acf08b6c20cf7c698f246943e431067e/proyecto-integrador-e1-dh

Repositorio Github
https://github.com/EPM-DH/grupo_1_EPM.git

4. Archivos products.json y users.json con datos de productos y usuarios..

Hecho, Archivos en la carpeta data

products.json
id
name
price
categorias
descripcion corta
descripcion larga
caracteristicas
identificador
vendidos
tobuy
devueltos
imagen

users.json
id
primernombre
apellido
email
password
avatar
rol/categoria

5. Administración completa de productos:

Hecho... CRUD de productos
○ Listado
○ Detalle
○ Creación
○ Edición
○ Eliminación

Sprint 5

1. Realizar un breve retrospectiva.

Se dejan todas retrospectivas en el archivo retro.md

2. Actualizar el tablero de trabajo

Tablero de Trello
https://trello.com/invite/b/uCNikJ9O/acf08b6c20cf7c698f246943e431067e/proyecto-integrador-e1-dh

Repositorio Github
https://github.com/EPM-DH/grupo_1_EPM.git

3. Implementar daily / weekly standups.

Se actualiza el archivo weekly.md


4. Implementar la entidad de usuarios.

Hecho, Se tiene la siguiente esytructura de archivos

● Rutas: app/routes/users.js
● Controlador: app/controllers/user.js
● Vistas: app/views/users/
● Directorio para imágenes: app/public/img/users/
● Colección: app/data/usuarios.json

5. Implementar el registro de usuarios

Hecho

Se puede acceder desde el boton de registro o desde la ruta
http://localhost:3500/user/register

6. Implementar el login de usuarios

Hecho

Se puede acceder desde el boton de ingresa o desde la ruta
http://localhost:3500/user/login

7. (Opcional) Implementar la función de recordar al usuario

Hecho

Se creo la casilla de seleccion, se puede visualizar desde el boton de ingresa o desde la ruta
http://localhost:3500/user/login

8. Implementar rutas de huéspedes y de usuarios

Hecho

Seguida de las rutas se coloco como comentario que rutas son accesibles dependiendo si se accede como invitado, como usuario estandar o como administrador.

** Los usuarios se pueden ver en el archivo usuarios.json la contraseña para la mayoria de usuarios es "Hola1234", se puede crear un usuario y cambiar el rol de estandar a administrador para ver las diferentes funcionalidades.

Sprint 6 & 7

1. Realizar un breve retrospectiva.

Se dejan todas retrospectivas en el archivo retro.md

2. Actualizar el tablero de trabajo

Tablero de Trello
https://trello.com/invite/b/uCNikJ9O/acf08b6c20cf7c698f246943e431067e/proyecto-integrador-e1-dh

Repositorio Github
https://github.com/EPM-DH/grupo_1_EPM.git

3. Implementar daily / weekly standups.

Se actualiza el archivo weekly.md

4. Diagrama base de Datos.

Diagrama dentro de la carpeta ./general_files/db

5. Script de estructura

Sentencias de SQL que crearán las tablas y sus relaciones.
● Creación de la base de datos (create database…).
● Creación de todas las tablas del sitio (create table…).
    ● Deberá incluir los tipos de datos de los campos y sus restricciones (primary keys, (not) null, unique, default, etc).
● Relaciones entre las diferentes tablas (foreign keys).

Entregable: archivo dbCreation.sql permita crear la base de datos completa en carpeta ./general_files/db"

6. Script de estructura

Sentencias de SQL que permite poblar las tablas
● Poblar la tabla de usuarios.
● Poblar la tabla de productos.
● Poblar las tablas secundarias.

Entregable: archivo dbData.sql permita poblar base de datos en carpeta ./general_files/db"

7. Elimina base de Datos

Sentencias de SQL que permite eliminar base de datos

Entregable: archivo dbDestruction.sql permita eliminar la base de datos completa en carpeta ./general_files/db"

8. Validaciones del back-end y front-end

En pagina de Registro de usuarios se realiza una validacion al abondanar la casilla mostrando un mensaje al usuario
http://localhost:3500/user/register

○ Nombre y apellido
- Obligatorio.
- Deberá tener al menos 2 caracteres.
○ Email
- Obligatorio.
- Deberá ser un formato de e-mail válido.
- No puede repetirse con los e-mails ya registrados.
○ Contraseña
- Obligatoria.
- Deberá tener al menos 8 caracteres.
- Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial.
○ Imagen
- Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).

En pagina de Acceso de usuarios se realiza una validacion al abondanar la casilla mostrando un mensaje al usuario
http://localhost:3500/user/login


○ Email
- Obligatorio.
- Deberá ser válido.
- Deberá existir en base.
○ Contraseña
- Obligatoria.
- Deberá coincidir con la existente en base.

En pagina de Creación y modificación de productos se realiza una validacion al abondanar la casilla mostrando un mensaje al usuario
http://localhost:3500/product/create
http://localhost:3500/product/edit/id
Aqui se debe ingresar con un usuario con permisos de administrador se puede usar este o crear uno y cambiar rol a administrador
user: correo@dominio.com
pass: Hola1234/

○ Nombre
-Obligatorio.
- Deberá tener al menos 5 caracteres.
○ Descripción
- Deberá tener al menos 20 caracteres.
○ Imagen
- Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).
○ (Opcional) Tablas secundarias
- Verificar que los valores existan en base. Es decir, que los valores de talles, colores, etc. que lleguen sean válidos en la base.