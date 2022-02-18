USE DH_EPM_local

/*
-- Query: SELECT * FROM DH_EPM_local.Productos
LIMIT 0, 1000

-- Date: 2022-01-21 15:44
*/
INSERT INTO Productos (`id`,`name`,`price`,`shortDescription`,`longDescription`,`characteristics`,`identifier`,`vendidos`,`rating`,`featured`,`image`,`carouselImages`) VALUES (1,'PETZL ATC Escalada',599,'Dispositivo de aseguramiento / rappel versátil y liviano, para usar con uno o dos hilos de cuerda y capacidad para asegurar a un seguidor del ancla','Conocido por ser versátil y ligero, REVERSO es un dispositivo de seguridad para escalada y montañismo de uno o varios largos. Te permite asegurar a tu compañero de escalada, hacer rappel y usar el modo Reverso para asegurar a uno o dos seguidores. El diseño específico permite que la cuerda se deslice suavemente a través del dispositivo y reduce el desgaste. Es compatible con la mayoría de los diámetros de cuerda: simple de 8,5 a 10,5 mm, mitad de 7,1 a 9,2 mm y gemela de 6,9 ​​a 9,2 mm.','[\"Gestualidad común, basada en el acompañamiento de la cuerda en el aparato y la sujeción permanente con una mano en la cuerda lado frenado.\", \"Fluidez de la circulación de la cuerda en el aparato.\", \"Control de frenado, gracias a las zonas de frenado en V y acanaladuras.\", \"Esquemas de instalación grabados en el asegurador (para el aseguramiento y el modo Reverso).\", \"Permite asegurar a un escalador y realizar descensos en rápel con una o dos cuerdas.\", \"Modo Reverso que permite asegurar a uno o dos segundos con asistencia al frenado.\", \"Orificio de desbloqueo que permite dar cuerda al segundo con un simple mosquetón.\", \"Compacto y ultraligero: sólo 57 g.\", \"Mayor durabilidad, gracias al diseño redondeado del paso de cuerda, que limita el desgaste del aparato.\", \"Adecuado para la mayoría de diámetros de cuerda dinámica (simple de 8,5 a 10,5 mm, doble de 7,1 a 9,2 mm y gemela de 6,9 a 9,2 mm).\"]','Petzl',5,5,1,'front.png','[\"front.png\", \"front.png\", \"front.png\"]');
INSERT INTO Productos (`id`,`name`,`price`,`shortDescription`,`longDescription`,`characteristics`,`identifier`,`vendidos`,`rating`,`featured`,`image`,`carouselImages`) VALUES (2,'ESLINGA DYNEEMA QUICKDRAW 16 MM',65,'Eslinga para un juego de cintas exprés. Esta eslinga de 16 mm es ideal para todas las aplicaciones donde el bajo peso y la alta resistencia son lo primero','Eslinga para un juego de cintas exprés. Esta eslinga de 16 mm es ideal para todas las aplicaciones donde el bajo peso y la alta resistencia son lo primero','[\"Ideal para la personalización de su propia cinta rápida o el reemplazo de la eslinga incorrecta\", \"Ligero, delgado y aún muy fuerte\", \"Excelente relación peso-resistencia\", \"Longitud disponible: 13 cm\", \"Material: Dyneema\", \"Ancho: 16 mm\", \"Resistencia: 22 kN\", \"Certificación: CE 1019, EN 566, UIAA\"]','Eslinga',8,4,0,'eslinga.jpg','[\"eslinga.jpg\", \"eslinga.jpg\", \"eslinga.jpg\"]');
INSERT INTO Productos (`id`,`name`,`price`,`shortDescription`,`longDescription`,`characteristics`,`identifier`,`vendidos`,`rating`,`featured`,`image`,`carouselImages`) VALUES (3,'Momentum Men’s',1628,'Una hebilla de rápido ajuste preenhebrada ahorra tiempo y elimina errores al atar, mientras que el Dual Core Construction pone énfasis en la comodidad.','Para los escaladores versátiles que saben que perder el tiempo jugando con las perneras y ajustando un cinturón es una pérdida de tiempo, el Black Diamond Momentum ofrece un diseño que ahorra tiempo, para todos los estilos de escalada. Una hebilla de rápido ajuste preenhebrada ahorra tiempo y elimina errores al atar, mientras que el Dual Core Construction pone énfasis en la comodidad. Las perneras TrakFIT se ajustan fácilmente durante los días fríos de otoño o los ardientes días de verano durante un múltilargo, y cuatro ganchos moldeados a presión y un lazo de arrastre hacen de éste el todo terreno más popular.','[\"Hebilla de rápido ajuste pre enhebrado.\", \"Cinturón en forma de megáfono construido con Dual Core Construction.\", \"Ajuste trakFIT para una fácil personalización de las perneras.\", \"Ascensor trasero, elástico y ajustable.\", \"Cuatro ganchos moldeados a presión.\", \"Lazo de arrastre.\", \"Peso: 302 g\"]','Momentum',70,3,1,'momentum.jpeg','[\"momentum.jpeg\", \"momentum.jpeg\", \"momentum.jpeg\"]');
INSERT INTO Productos (`id`,`name`,`price`,`shortDescription`,`longDescription`,`characteristics`,`identifier`,`vendidos`,`rating`,`featured`,`image`,`carouselImages`) VALUES (4,'COSMO 160 LM',914,'Lámpara en correa para actividades al aire libre','El Cosmo cuenta con 160 lúmenes de potencia y seis modos diferentes de iluminación, incluyendo la visión nocturna de color rojo, que todos ajustan con un solo interruptor pulsador. Y con una construcción resistente al agua elegante y moderno, el Cosmo sigue brillando el camino a través de las tormentas inesperadas, precipitación y por la tarde noche.','[\"1 TriplePower LED, LED y 1 DoublePower 1 DoublePower roja LED emiten 160 lúmenes (ajuste máximo)\", \"Modo de visión nocturna roja tiene valores de proximidad y luz estroboscópica, y activa sin recorrer el modo de blanco\", \"Diseño elegante y moderno con la cubierta inclinable utiliza 3 pilas AAA\", \"Los ajustes incluyen modos de proximidad y distancia, oscurecimiento, luz estroboscópica, la visión nocturna de color rojo y el modo de bloqueo\", \"IPX4: Tormenta de prueba probados para soportar la lluvia y aguanieve desde cualquier ángulo.\", \"Lúmenes: 160\", \"Peso con pilas: 87 g (3,0 oz)\"]','COSMO',123,2,0,'cosmo.jpg','[\"cosmo.jpg\", \"cosmo.jpg\", \"cosmo.jpg\"]');

/*
-- Query: SELECT * FROM DH_EPM_local.Roles
LIMIT 0, 1000

-- Date: 2022-01-21 15:45
*/
INSERT INTO Roles (`id`,`name`) VALUES (1,'estandar');
INSERT INTO Roles (`id`,`name`) VALUES (2,'administrador');

/*
-- Query: SELECT * FROM DH_EPM_local.Usuarios
LIMIT 0, 1000

-- Date: 2022-01-21 15:45
*/
INSERT INTO Usuarios (`id`,`firstName`,`lastName`,`email`,`password`,`avatar`,`rol_id`) VALUES (1,'Juan Manuel','Ledesma Rangel','jujuan27@hotmail.com','$2a$10$Uy7e64kOdqzZzKkDMepwjeu9l8OMp5uQIjPODaWuTuOdGmjxcOYX6','FotoBanderas_1641175730211.JPG',2);
INSERT INTO Usuarios (`id`,`firstName`,`lastName`,`email`,`password`,`avatar`,`rol_id`) VALUES (2,'Ma Guadalupe','Adriana Rangel','lupita.rangel1@hotmail.com','$2a$10$ezGDo6WGVZALUTfe88TtwO8K.LFPFWQkoX57i9pbcWPgzv2OJ.dGy','cosmo_1641962472531.jpg',1);
INSERT INTO Usuarios (`id`,`firstName`,`lastName`,`email`,`password`,`avatar`,`rol_id`) VALUES (3,'Jonathan','Alvarez','abejotav1@gmail.com','$2a$10$5o0V.xJHgijZGmUEX1I7JeeL82ysqRaauoKC5hgqXNVrQXx8UukQ2','51307882275_7479b2422c_1645168108965.jpg',1);
INSERT INTO Usuarios (`id`,`firstName`,`lastName`,`email`,`password`,`avatar`,`rol_id`) VALUES (4,'Administrador','General','correo@dominio.com','$2a$10$fSTYX8sUZyMo8WtUXrR/zem3e5lzCVb2Bu5VOJeYfg6q8w/0CyxTO','32baa76e93fdd34480516570925ac30d_1645168169578.jpg',2);
INSERT INTO Usuarios (`id`,`firstName`,`lastName`,`email`,`password`,`avatar`,`rol_id`) VALUES (5,'Usuario','Generico','correo2@dominio.com','$2a$10$os3LGhg.vS1R/ND1l3nczOOEOUSQpJ9W7TjxhZj1jS07wiW3IS/pC','default.png',1);
/*
-- Query: SELECT * FROM DH_EPM_local.Carritos
LIMIT 0, 1000

-- Date: 2022-01-21 15:43
*/
INSERT INTO Carritos (`id`,`usuario_id`,`producto_id`,`quantity`) VALUES (1,1,1,6);

/*
-- Query: SELECT * FROM DH_EPM_local.Categorias
LIMIT 0, 1000

-- Date: 2022-01-21 15:43
*/
INSERT INTO Categorias (`id`,`name`) VALUES (1,'Escalada');
INSERT INTO Categorias (`id`,`name`) VALUES (2,'Básicos');
INSERT INTO Categorias (`id`,`name`) VALUES (3,'Seguridad');
INSERT INTO Categorias (`id`,`name`) VALUES (4,'Mosquetones y conectores');
INSERT INTO Categorias (`id`,`name`) VALUES (5,'Singing rock');
INSERT INTO Categorias (`id`,`name`) VALUES (6,'Arneses');
INSERT INTO Categorias (`id`,`name`) VALUES (7,'Black Diamond');
INSERT INTO Categorias (`id`,`name`) VALUES (8,'Montañismo');
INSERT INTO Categorias (`id`,`name`) VALUES (9,'Parques de aventura y Vía Ferrata');
INSERT INTO Categorias (`id`,`name`) VALUES (10,'Cañonismo y Espeleo');
INSERT INTO Categorias (`id`,`name`) VALUES (11,'Lámparas');
INSERT INTO Categorias (`id`,`name`) VALUES (12,'Senderismo y Campismo');

/*
-- Query: SELECT * FROM DH_EPM_local.Estatus
LIMIT 0, 1000

-- Date: 2022-01-21 15:44
*/
INSERT INTO Estatus (`id`,`name`) VALUES (1,'En camino');
INSERT INTO Estatus (`id`,`name`) VALUES (2,'Entregado');

/*
-- Query: SELECT * FROM DH_EPM_local.Visibilidades
LIMIT 0, 1000

-- Date: 2022-01-21 15:45
*/
INSERT INTO Visibilidades (`id`,`name`) VALUES (1,'Privada');
INSERT INTO Visibilidades (`id`,`name`) VALUES (2,'Pública');

/*
-- Query: SELECT * FROM DH_EPM_local.Lista_de_deseos
LIMIT 0, 1000

-- Date: 2022-01-21 15:44
*/
INSERT INTO Lista_de_deseos (`id`,`usuario_id`,`image`,`identifier`,`name`,`visibility_id`) VALUES (1,1,'tecno_date.jpg','tec1_1','Tecnología',1);
INSERT INTO Lista_de_deseos (`id`,`usuario_id`,`image`,`identifier`,`name`,`visibility_id`) VALUES (2,1,'casa_date.jpeg','cas1_2','Casa',2);
INSERT INTO Lista_de_deseos (`id`,`usuario_id`,`image`,`identifier`,`name`,`visibility_id`) VALUES (3,2,'casa_date.jpeg','cas2_3','Casa',2);
INSERT INTO Lista_de_deseos (`id`,`usuario_id`,`image`,`identifier`,`name`,`visibility_id`) VALUES (4,1,'default.png','beb1_4','Bebua',2);

/*
-- Query: SELECT * FROM DH_EPM_local.Pedidos
LIMIT 0, 1000

-- Date: 2022-01-21 15:44
*/
INSERT INTO Pedidos (`id`,`usuario_id`,`producto_id`,`status_id`,`trackId`) VALUES (1,1,1,1,'1SD54848345SDSD587');
INSERT INTO Pedidos (`id`,`usuario_id`,`producto_id`,`status_id`,`trackId`) VALUES (2,1,2,2,'FSSD54544SDFSF454S');

/*
-- Query: SELECT * FROM DH_EPM_local.Productos_Categorias
LIMIT 0, 1000

-- Date: 2022-01-21 15:45
*/
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (1,1,1);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (2,1,2);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (3,1,3);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (4,1,5);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (5,2,1);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (6,2,4);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (7,2,5);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (8,3,6);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (9,3,7);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (10,3,1);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (11,3,8);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (12,3,9);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (13,4,1);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (14,4,7);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (15,4,8);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (16,4,9);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (17,4,10);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (18,4,11);
INSERT INTO Productos_Categorias (`id`,`producto_id`,`categoria_id`) VALUES (19,4,12);

/*
-- Query: SELECT * FROM DH_EPM_local.Productos_Lista_de_deseos
LIMIT 0, 1000

-- Date: 2022-01-21 15:45
*/
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (1,1,1);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (2,4,1);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (5,1,2);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (6,2,2);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (7,4,2);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (8,1,3);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (9,3,3);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (10,4,3);
INSERT INTO Productos_Lista_de_deseos (`id`,`producto_id`,`lista_de_deseo_id`) VALUES (11,1,4);

