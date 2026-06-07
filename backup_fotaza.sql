-- ============================================
-- BACKUP DE BASE DE DATOS - FOTAZA 2
-- Trabajo Práctico Integrador - Programación Web II
-- Autor: José Ontiveros
-- Fecha: 2026-06-08
-- ============================================

-- Crear base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS fotaza_db;
USE fotaza_db;

-- ============================================
-- TABLA: fotazas
-- ============================================
DROP TABLE IF EXISTS `fotazas`;
CREATE TABLE `fotazas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `etiquetas` varchar(255) DEFAULT NULL,
  `votos` int(11) DEFAULT 0,
  `denuncias` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================
-- TABLA: comentarios
-- ============================================
DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` varchar(255) DEFAULT NULL,
  `fotazaId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fotazaId` (`fotazaId`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`fotazaId`) REFERENCES `fotazas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ============================================
-- DATOS DE PRUEBA: FOTAZAS
-- ============================================
INSERT INTO `fotazas` (`id`, `titulo`, `descripcion`, `url_imagen`, `etiquetas`, `votos`, `denuncias`, `createdAt`, `updatedAt`) VALUES
(1, 'Atardecer en las Sierras', 'Hermoso atardecer capturado en las Sierras de San Luis', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'naturaleza,sierras,atardecer,sanluis', 15, 0, '2026-06-01 10:30:00', '2026-06-01 10:30:00'),
(2, 'Lago Esmeralda', 'Reflejo perfecto en el lago Esmeralda', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', 'naturaleza,lago,montaña,paisaje', 23, 0, '2026-06-02 14:20:00', '2026-06-02 14:20:00'),
(3, 'Café de la Mañana', 'Mi ritual matutino con café y código', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 'café,programacion,mañana,codigo', 8, 1, '2026-06-03 08:15:00', '2026-06-03 08:15:00'),
(4, 'Setup Gamer', 'Mi nuevo setup para programar y jugar', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705', 'tecnología,setup,gamer,computadora', 12, 0, '2026-06-04 16:45:00', '2026-06-04 16:45:00'),
(5, 'Playa al Atardecer', 'Día perfecto en la playa', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'playa,mar,atardecer,vacaciones', 31, 0, '2026-06-05 18:30:00', '2026-06-05 18:30:00');

-- ============================================
-- DATOS DE PRUEBA: COMENTARIOS
-- ============================================
INSERT INTO `comentarios` (`id`, `contenido`, `fotazaId`, `createdAt`, `updatedAt`) VALUES
(1, '¡Qué hermosa foto! Me encanta el color del cielo', 1, '2026-06-01 11:00:00', '2026-06-01 11:00:00'),
(2, 'San Luis tiene los mejores paisajes', 1, '2026-06-01 12:30:00', '2026-06-01 12:30:00'),
(3, 'Increíble el reflejo en el agua', 2, '2026-06-02 15:00:00', '2026-06-02 15:00:00'),
(4, '¿Dónde es esto? Quiero ir', 2, '2026-06-02 16:20:00', '2026-06-02 16:20:00'),
(5, 'Yo también necesito café para programar', 3, '2026-06-03 09:00:00', '2026-06-03 09:00:00'),
(6, 'Ese setup está increíble, ¿cuánto te costó?', 4, '2026-06-04 17:30:00', '2026-06-04 17:30:00'),
(7, 'Me da nostalgia ver esta foto, extraño la playa', 5, '2026-06-05 19:00:00', '2026-06-05 19:00:00'),
(8, 'Los atardeceres en la playa son los mejores', 5, '2026-06-05 20:15:00', '2026-06-05 20:15:00');

-- ============================================
-- FIN DEL BACKUP
-- ============================================