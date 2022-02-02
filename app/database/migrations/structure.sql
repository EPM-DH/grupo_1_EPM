CREATE SCHEMA `DH_EPM_local`;
USE `DH_EPM_local`;

CREATE TABLE `Productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `shortDescription` text NOT NULL,
  `longDescription` text NOT NULL,
  `characteristics` json NOT NULL,
  `identifier` varchar(50) NOT NULL,
  `vendidos` int NOT NULL,
  `rating` int NOT NULL,
  `featured` tinyint NOT NULL,
  `image` varchar(100) NOT NULL,
  `carouselImages` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier_UNIQUE` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `rol_id_idx` (`rol_id`),
  CONSTRAINT `rol_id` FOREIGN KEY (`rol_id`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_carrito_id_idx` (`producto_id`),
  KEY `usuario_carrito_id_idx` (`usuario_id`),
  CONSTRAINT `producto_carrito_id` FOREIGN KEY (`producto_id`) REFERENCES `Productos` (`id`),
  CONSTRAINT `usuario_carrito_id` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Estatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Visibilidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Lista_de_deseos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `image` varchar(100) NOT NULL,
  `identifier` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `visibility_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier_UNIQUE` (`identifier`),
  KEY `usuario_lista_de_deseo_id_idx` (`usuario_id`),
  KEY `visibilidad_id_idx` (`visibility_id`),
  CONSTRAINT `usuario_lista_de_deseo_id` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `visibilidad_id` FOREIGN KEY (`visibility_id`) REFERENCES `Visibilidades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `status_id` int NOT NULL,
  `trackId` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trackId_UNIQUE` (`trackId`),
  KEY `usuario_pedido_id_idx` (`usuario_id`),
  KEY `producto_pedido_id_idx` (`producto_id`),
  KEY `status_id_idx` (`status_id`),
  CONSTRAINT `producto_pedido_id` FOREIGN KEY (`producto_id`) REFERENCES `Productos` (`id`),
  CONSTRAINT `status_id` FOREIGN KEY (`status_id`) REFERENCES `Estatus` (`id`),
  CONSTRAINT `usuario_pedido_id` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Productos_Categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `categoria_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id_idx` (`producto_id`),
  KEY `categoria_id_idx` (`categoria_id`),
  CONSTRAINT `categoria_id` FOREIGN KEY (`categoria_id`) REFERENCES `Categorias` (`id`),
  CONSTRAINT `producto_categoria_id` FOREIGN KEY (`producto_id`) REFERENCES `Productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Productos_Lista_de_deseos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `lista_de_deseo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_lista_de_deseo_id_idx` (`producto_id`),
  KEY `lista_de_deseo_id_idx` (`lista_de_deseo_id`),
  CONSTRAINT `lista_de_deseo_id` FOREIGN KEY (`lista_de_deseo_id`) REFERENCES `Lista_de_deseos` (`id`),
  CONSTRAINT `producto_lista_de_deseo_id` FOREIGN KEY (`producto_id`) REFERENCES `Productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

