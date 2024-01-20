SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `face_detector`;
USE `face_detector` ;

CREATE TABLE IF NOT EXISTS `face_detector`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) );

CREATE TABLE IF NOT EXISTS `face_detector`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` TEXT NOT NULL,
  `detected_faces` TEXT NOT NULL,
  `face_count` INT NULL DEFAULT 0,
  `bytes` INT NOT NULL,
  `expiration` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `width` INT NOT NULL,
  `height` INT NOT NULL,
  `x_projection` FLOAT NOT NULL,
  `y_projection` FLOAT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `face_detector`.`comparisons` (
  `comparison_id` INT NOT NULL AUTO_INCREMENT,
  `first_face_id` INT NOT NULL,
  `second_face_id` INT NOT NULL,
  `user_id` INT NULL DEFAULT 1,
  `performed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `similarity` INT NOT NULL,
  PRIMARY KEY (`comparison_id`),
  INDEX `user_id` (`user_id` ASC),
  INDEX `first_face_id` (`first_face_id` ASC),
  INDEX `second_face_id` (`second_face_id` ASC),
  CONSTRAINT `comparisons_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `face_detector`.`users` (`id`),
  CONSTRAINT `comparisons_ibfk_2`
    FOREIGN KEY (`first_face_id`)
    REFERENCES `face_detector`.`images` (`id`),
  CONSTRAINT `comparisons_ibfk_3`
    FOREIGN KEY (`second_face_id`)
    REFERENCES `face_detector`.`images` (`id`));

CREATE TABLE IF NOT EXISTS `face_detector`.`detections` (
  `detection_id` INT NOT NULL AUTO_INCREMENT,
  `face_id` INT NOT NULL,
  `user_id` INT NULL DEFAULT 1,
  `performed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`detection_id`),
  INDEX `face_id` (`face_id` ASC),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `detections_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `face_detector`.`users` (`id`),
  CONSTRAINT `detections_ibfk_2`
    FOREIGN KEY (`face_id`)
    REFERENCES `face_detector`.`images` (`id`),
  CONSTRAINT `detections_ibfk_3`
    FOREIGN KEY (`user_id`)
    REFERENCES `face_detector`.`users` (`id`));

CREATE TABLE IF NOT EXISTS `face_detector`.`tags` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE INDEX `tag_name` (`tag_name` ASC));

CREATE TABLE IF NOT EXISTS `face_detector`.`images_tags` (
  `image_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`image_id`, `tag_id`),
  INDEX `tag_id` (`tag_id` ASC),
  CONSTRAINT `images_tags_ibfk_1`
    FOREIGN KEY (`image_id`)
    REFERENCES `face_detector`.`images` (`id`),
  CONSTRAINT `images_tags_ibfk_2`
    FOREIGN KEY (`tag_id`)
    REFERENCES `face_detector`.`tags` (`tag_id`));

CREATE TABLE IF NOT EXISTS `face_detector`.`img_tmp` (
  `id` INT NOT NULL DEFAULT '0',
  `image_url` TEXT NOT NULL,
  `detected_faces` TEXT NOT NULL,
  `face_count` INT NULL DEFAULT 0,
  `bytes` INT NOT NULL,
  `expiration` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `width` INT NOT NULL,
  `height` INT NOT NULL,
  `x_projection` FLOAT NOT NULL,
  `y_projection` FLOAT NOT NULL);