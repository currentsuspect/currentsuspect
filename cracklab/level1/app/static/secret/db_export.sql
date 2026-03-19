-- NexaCore Internal DB Export
-- Generated: 2024-01-15 03:00:01
-- WARNING: Contains sensitive data

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100),
  email VARCHAR(100),
  role VARCHAR(20)
);

INSERT INTO users VALUES (1, 'admin', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin@nexacore.io', 'superadmin');
INSERT INTO users VALUES (2, 'jsmith', 'e10adc3949ba59abbe56e057f20f883e', 'j.smith@nexacore.io', 'staff');
INSERT INTO users VALUES (3, 'deploy-bot', '482c811da5d5b4bc6d497ffa98491e38', 'deploy@nexacore.internal', 'deploy');

CREATE TABLE flags (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  value VARCHAR(100)
);

INSERT INTO flags VALUES (1, 'level1_flag', 'FLAG{r3c0n_m4st3r_y0u_f0und_th3_s3cr3ts}');
