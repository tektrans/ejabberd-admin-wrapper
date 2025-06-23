CREATE TABLE IF NOT EXISTS
  `users` (
    `uuid` UUID NOT NULL DEFAULT uuid (),
    `username` VARCHAR(128) NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `password` VARCHAR(256) NULL DEFAULT NULL,
    `disabled` TINYINT (1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`uuid`),
    UNIQUE (`username`)
  ) ENGINE = InnoDB;
