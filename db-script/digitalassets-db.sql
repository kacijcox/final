DROP DATABASE IF EXISTS digitalassets;
CREATE DATABASE digitalassets;
USE digitalassets;

SELECT * FROM `user`;
-- SELECT * FROM phantom_wallets;
-- select * FROM coin_favorites;
-- select * from user_session;

CREATE TABLE phantom_wallets (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
wallet_address VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE `user` (
user_id VARCHAR(25) PRIMARY KEY NOT NULL,
password_hash TEXT,
user_role ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER' 
);

CREATE TABLE coin_favorites (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(25) NULL,
  wallet_address VARCHAR(255) NULL,
  coin_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_coin_fav_user
    FOREIGN KEY (user_id) REFERENCES `user` (user_id),
  CONSTRAINT fk_coin_fav_wallet
    FOREIGN KEY (wallet_address) REFERENCES phantom_wallets (wallet_address),
  CONSTRAINT uq_coin_fav_user_coin UNIQUE (user_id, coin_id),
  CONSTRAINT uq_coin_fav_wallet_coin UNIQUE (wallet_address, coin_id),
  CONSTRAINT ck_coin_fav_owner CHECK (user_id IS NOT NULL OR wallet_address IS NOT NULL)
) ENGINE=InnoDB;

CREATE TABLE user_session (
  user_id VARCHAR(25) NULL,
  wallet_address VARCHAR(255) NOT NULL,
  session_token_hash VARCHAR(255) NOT NULL UNIQUE,
  user_agent TEXT NULL,
  ip_address VARCHAR(45) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_session_user
    FOREIGN KEY (user_id) REFERENCES `user` (user_id),
  CONSTRAINT fk_session_wallet
    FOREIGN KEY (wallet_address) REFERENCES phantom_wallets (wallet_address)
) ENGINE=InnoDB;

INSERT INTO `user` (user_id, password_hash, user_role)
VALUES ('admin', '$2y$10$Gk6DwmhkIXdbEVKVWJANj.xBPuKTCIp.LqS11/hG2nBDsxQWA9ziS', 'ADMIN');



