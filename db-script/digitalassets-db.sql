DROP DATABASE IF EXISTS digitalassets;
CREATE DATABASE digitalassets;
USE digitalassets;

-- SELECT * FROM `user`;
-- SELECT * FROM phantom_wallets;
select * FROM coin_favorites;

CREATE TABLE phantom_wallets (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
wallet_address VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE `user` (
user_id VARCHAR(25) PRIMARY KEY NOT NULL,
password_hash TEXT,
user_role ENUM('USER') NOT NULL DEFAULT 'USER'  
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




