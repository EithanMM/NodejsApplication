DROP DATABASE IF EXISTS `json_mysql_db`;
CREATE DATABASE IF NOT EXISTS `json_mysql_db` DEFAULT CHARACTER SET utf8;

USE `json_mysql_db`;

DROP TABLE IF EXISTS `json_mysql_db`.`User`;
CREATE TABLE `json_mysql_db`.`User`(
    `PK_IdUser` INT(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `UserName`  VARCHAR(20) NOT NULL,
    `Password`  VARCHAR(60) NOT NULL,
    `FullName`  VARCHAR(100) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `json_mysql_db`.`Contact`;
CREATE TABLE `json_mysql_db`.`Contact`(
    `PK_IdContact`  INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `FK_User`       INT(11),
    `ContactName`   VARCHAR(60) NOT NULL,
    `Cellphone`     VARCHAR(20) NOT NULL,
    `Description`   VARCHAR(100) NULL,
    `CreationDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT `id_user_fk`FOREIGN KEY (`FK_User`) REFERENCES `json_mysql_db`.`User`(`PK_IdUser`))
ENGINE = InnoDB
DEFAULT CHARSET=utf8;