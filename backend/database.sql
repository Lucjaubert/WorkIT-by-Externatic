DROP DATABASE IF EXISTS externatic;
CREATE DATABASE externatic;
USE externatic;
CREATE TABLE `user` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `role_id` int  NOT NULL ,
    `gender`  VARCHAR(50)  NULL ,
    `firstname` VARCHAR(50)  NOT NULL ,
    `lastname` VARCHAR(50)  NOT NULL ,
    `email` VARCHAR(50)  NOT NULL ,
    `city` VARCHAR(100)  NOT NULL ,
    `postal_code` int  NULL ,
    `country` VARCHAR(100)  NULL ,
    `adress` VARCHAR(100)  NULL ,
    `phone` VARCHAR(100)  NULL ,
    `isActive` BOOLEAN  NOT NULL DEFAULT FALSE,
    `linkedin` VARCHAR(100)  NULL ,
    `website` VARCHAR(100)  NULL ,
    `github` VARCHAR(100)  NULL ,
    `actual_job` VARCHAR(100)  NULL ,
    `job_id` int  NOT NULL ,
    `salary` int  NULL ,
    `diploma` VARCHAR(200)  NULL ,
    `handicap` BOOLEAN  NOT NULL DEFAULT FALSE,
    `password` VARCHAR(100)  NOT NULL ,
    `hard_skills` VARCHAR(500)  NULL ,
    `experience_id` int  NULL ,
    `contract_id` int  NULL ,
    `file`  VARCHAR(200)  NULL ,
    `fileName`  VARCHAR(500)  NULL ,
    `photo`  VARCHAR(200)  NULL ,
    `photoName`  VARCHAR(500)  NULL ,
    `consultant_id` int  NULL ,
    `userNote` VARCHAR(1000)  NULL ,
    `reset_token` VARCHAR(250)  NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `admin` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `role_id` int  NOT NULL ,
    `gender` VARCHAR(50)  NOT NULL ,
    `firstname` VARCHAR(50)  NOT NULL ,
    `lastname` VARCHAR(50)  NOT NULL ,
    `email` VARCHAR(40)  NOT NULL ,
    `password` VARCHAR(100)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `consultant` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `role_id` int  DEFAULT 2 ,
    `firstname` VARCHAR(30)  NOT NULL ,
    `lastname` VARCHAR(30)  NOT NULL ,
    `phone` VARCHAR(100)  NULL ,
    `city` VARCHAR(100)  NULL ,
    `email` VARCHAR(40)  NULL ,
    `password` VARCHAR(100)  NULL,
    `linkedin` VARCHAR(100) NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `firm` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `email` VARCHAR(100)  NOT NULL ,
    `name` VARCHAR(50)  NOT NULL ,
    `contact_phone` VARCHAR(100)  NOT NULL ,
    `city` VARCHAR(100)  NULL ,
    `postal_code` INT NULL ,
    `country` VARCHAR(100)  NOT NULL ,
    `adress` VARCHAR(60)  NOT NULL ,
    `type` VARCHAR(100) DEFAULT 'IT' ,
    `logo_url` VARCHAR(150)  NOT NULL ,
    `consultant_id` int NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `role` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `status` VARCHAR(60)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `job` (
    `id` int AUTO_INCREMENT NOT NULL ,
     `category` VARCHAR(300)  NOT NULL ,
    `job_title` VARCHAR(300)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `experience` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `experience` VARCHAR(50)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `offer` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `title` VARCHAR(100)  NOT NULL ,
    `firm_id` int  NOT NULL ,
    `firm_city` VARCHAR(500)  NULL ,
    `date` DATETIME   DEFAULT CURRENT_TIMESTAMP ,
    `postal_code` int  NULL ,
    `country` VARCHAR(500)  NULL ,
    `job_id` int  NOT NULL ,
    `salary` int  NULL ,
    `description_firm` VARCHAR(3000)  NOT NULL ,
    `description_mission` VARCHAR(3000)  NOT NULL ,
    `soft_skills` VARCHAR(500)  NULL ,
    `hard_skills` VARCHAR(500)  NULL ,
    `experience_id` int  NULL ,
    `contract_type` int  NULL ,
    `consultant_id` int  NULL ,
    `urgence_id` int  NULL ,
    `state_offer_id` int  NULL ,

    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `userOffer` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `isFavorite` BOOLEAN  NOT NULL DEFAULT FALSE ,
    `candidated` BOOLEAN  NOT NULL DEFAULT FALSE,
    `offer_id` int  NOT NULL ,
    `user_id` int  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);
CREATE TABLE `contract` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `contract_type` VARCHAR(100)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `urgence` (
	`id` INT auto_increment NOT NULL,
	`name` varchar(100) NOT NULL,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `state_offer` (
	`id` INT auto_increment NOT NULL,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `spontaneous_application` (
	`id` INT auto_increment NOT NULL,
	`user_id` int NOT NULL,
	`job_id` int NOT NULL,
	`application_state_id` int NOT NULL,
    `creation_date` DATETIME NOT NULL,
	PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `application_state` (
	`id` INT auto_increment NOT NULL,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `favorite` (
	`favorite_id` INT auto_increment NOT NULL,
	`user_id` int NOT NULL,
	`offer_id` int NOT NULL,
	PRIMARY KEY (
        `favorite_id`
    )
);


CREATE TABLE `candidated` (
	`candidated_id` INT auto_increment NOT NULL,
	`user_id` int NOT NULL,
	`offer_id` int NOT NULL,
    `application_state_id` int NOT NULL,
	PRIMARY KEY (
        `candidated_id`
    )
);

CREATE TABLE `userAlert` (
	`userAlert_id` INT auto_increment NOT NULL,
	`user_id` int NOT NULL,
	`job_id` int NOT NULL,
    `city` VARCHAR(100)  NOT NULL ,
	PRIMARY KEY (
        `userAlert_id`
    )
);

CREATE TABLE `alert` (
	`alert_id` INT auto_increment NOT NULL,
	`user_id` int NOT NULL,
	`offer_id` int NOT NULL,
	PRIMARY KEY (
        `alert_id`
    )
);




ALTER TABLE `user` ADD CONSTRAINT `fk_user_role_id` FOREIGN KEY(`role_id`)
REFERENCES `role` (`id`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_job_id` FOREIGN KEY(`job_id`)
REFERENCES `job` (`id`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_experience_id` FOREIGN KEY(`experience_id`)
REFERENCES `experience` (`id`) ON DELETE SET NULL;
ALTER TABLE `user` ADD CONSTRAINT `fk_user_contract_id` FOREIGN KEY(`contract_id`)
REFERENCES `contract` (`id`) ON DELETE SET NULL;
ALTER TABLE `user` ADD CONSTRAINT `fk_user_consultant_id` FOREIGN KEY(`consultant_id`)
REFERENCES `consultant` (`id`) ON DELETE SET NULL;
ALTER TABLE `admin` ADD CONSTRAINT `fk_admin_role_id` FOREIGN KEY(`role_id`)
REFERENCES `role` (`id`);
ALTER TABLE `consultant` ADD CONSTRAINT `fk_consultant_role_id` FOREIGN KEY(`role_id`)
REFERENCES `role` (`id`);
ALTER TABLE `firm` ADD CONSTRAINT `fk_firm_consultant_id` FOREIGN KEY(`consultant_id`)
REFERENCES `consultant` (`id`) ON DELETE SET NULL;
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_firm_id` FOREIGN KEY(`firm_id`)
REFERENCES `firm` (`id`);
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_job_id` FOREIGN KEY(`job_id`)
REFERENCES `job` (`id`);
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_experience_id` FOREIGN KEY(`experience_id`)
REFERENCES `experience` (`id`);
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_contract_type` FOREIGN KEY(`contract_type`)
REFERENCES `contract` (`id`);
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_consultant_id` FOREIGN KEY(`consultant_id`)
REFERENCES `consultant` (`id`) ON DELETE SET NULL;
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_urgence_id` FOREIGN KEY(`urgence_id`)
REFERENCES `urgence` (`id`);
ALTER TABLE `offer` ADD CONSTRAINT `fk_offer_state_offer_id` FOREIGN KEY(`state_offer_id`)
REFERENCES `state_offer` (`id`) ON DELETE SET NULL;

ALTER TABLE `userOffer` ADD CONSTRAINT `fk_userOffer_offer_id` FOREIGN KEY(`offer_id`)
REFERENCES `offer` (`id`);
ALTER TABLE `userOffer` ADD CONSTRAINT `fk_userOffer_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`);

ALTER TABLE `spontaneous_application` ADD CONSTRAINT `fk_spontaneous_application_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`);
ALTER TABLE `spontaneous_application` ADD CONSTRAINT `fk_spontaneous_application_job_id` FOREIGN KEY(`job_id`)
REFERENCES `job` (`id`) ;

ALTER TABLE `favorite` ADD CONSTRAINT `fk_favorite_offer_id` FOREIGN KEY(`offer_id`)
REFERENCES `offer` (`id`) ;
ALTER TABLE `favorite` ADD CONSTRAINT `fk_favorite_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`) ;

ALTER TABLE `candidated` ADD CONSTRAINT `fk_candidated_offer_id` FOREIGN KEY(`offer_id`)
REFERENCES `offer` (`id`) ;
ALTER TABLE `candidated` ADD CONSTRAINT `fk_candidated_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`);
ALTER TABLE `candidated` ADD CONSTRAINT `fk_candidated_application_state_id` FOREIGN KEY(`application_state_id`)
REFERENCES `application_state` (`id`);

ALTER TABLE `userAlert` ADD CONSTRAINT `fk_userAlert_job_id` FOREIGN KEY(`job_id`)
REFERENCES `job` (`id`) ;
ALTER TABLE `userAlert` ADD CONSTRAINT `fk_userAlert_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`);

ALTER TABLE `alert` ADD CONSTRAINT `fk_alert_offer_id` FOREIGN KEY(`offer_id`)
REFERENCES `offer` (`id`);

ALTER TABLE `alert` ADD CONSTRAINT `fk_alert_user_id` FOREIGN KEY(`user_id`)
REFERENCES `user` (`id`); 


INSERT INTO role (status) VALUES('user');
INSERT INTO role (status) VALUES('consultant');
INSERT INTO role (status) VALUES('admin');

INSERT INTO job (category, job_title)
VALUES ('Technologies','Développeur Back End'),
       ('Technologies','Développeur Front End'),
       ('Technologies','Développeur Full Stack'),
       ('Technologies','DevOps'),
       ('Technologies','Lead technique'),
       ('Technologies','Architecte Infrastructure'),
       ('Technologies','Scrum master'),
       ('Technologies','Product owner'),
       ('Technologies','Product Manager'),
       ('Technologies','Ingénieur Test'),
       ('Technologies','UX / UI designer'),
       ('Technologies','Administrateur Système  Réseaux'),
       ('Technologies','Ingénieur Système Cloud'),
       ('Technologies','Architecte Logiciel'),
       ('Technologies','Ingénieur Hardware'),
       ('Technologies','Analyste fonctionnel / AMOA'),
       ('Technologies','Intégrateur Web'),
       ('Technologies','Ingénieur Logiciel Embarqué'),
       ('Technologies','Technicien support'),
       ('Management / Marketing','Directeur du Système d Informations'),
       ('Management / Marketing','Directeur / chef de projet'),
       ('Management / Marketing','Directeur technique / CTO'),
       ('Management / Marketing','Responsable de la Sécurité du Système Informatique'),
       ('Management / Marketing','Directeur Marketing'),
       ('Management / Marketing','Service Delivery Manager'),
       ('Management / Marketing','Customer Success Manager'),
       ('Management / Marketing','Chief Operating Officer'),
       ('Management / Marketing','Business Developper'),
       ('Management / Marketing','Growth Hacker'),
       ('Management / Marketing','Expert SEO Trafic content Manager'),
       ('Management / Marketing','Chef de projet Web'),
       ('DATA','Data Architect'),
       ('DATA','Data Engineer'),
       ('DATA','Data Analyst'),
       ('DATA','Data Scientist'),
       ('Ressources humaines','Consultant en recrutement IT'),
       ('Ressources humaines','Recruteur tech');

INSERT INTO experience (experience) VALUES
     ('Debutant'),
     ('2-3 ans'),
     ('4-10 ans'),
     ('10 ans et +');
    
INSERT INTO externatic.application_state (name) VALUES
    ('En cours de traitement'),
    ('Refusée'),
    ('Acceptée');

INSERT INTO consultant (role_id,firstname,lastname,phone,city,email,password,linkedin) VALUES
     (2,'Paul','Delos','0625456289','Bordeaux','pauldelos@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM','https://www.linkedin.com/in/paul-delos/%27'),
     (2,'Jeremie','Cavanier','0625458978','Bordeaux','jeremiecavanier@gmail.com','256poulpom','https://www.linkedin.com/in/jeremie-cavanier/%27'),
     (2,'Claire ','Jacquier','0625694563','Pessac','clairejacquier@gmail.com','25mpelodpmpe','https://www.linkedin.com/in/claire-jacquier/%27'),
     (2,'Charlotte','Calier','0647852697','Cadillac','cha.calier@gmail.com','54789oopzmlpdo','https://www.linkedin.com/in/charlotte-calier/%27'),
     (2,'Romain','Permontade','0647859632','Bordeaux','romain.permontade@gmail.com','sampodjk41255','https://www.linkedin.com/in/romain-permontade/%27'),
     (2,'Ophelie','Gavernie','0796896321','Begles','opheliegaverie@gmail.com','gdteej#48569','https://www.linkedin.com/in/ophelie-gavernie/%27'),
     (2,'Bertrand','Pomelo','0769365478','Bordeaux','bertrandpomelo@gmail.com','89654derop#klmp','https://www.linkedin.com/in/bertrand-pomelo/%27'),
     (2,'Carole','Artelis','0658963250','Cauderan','carole.artelis@gmail.com','7856aldopme','https://www.linkedin.com/in/carole-artelis/%27'),
     (2,'Michael','Birepinte','062356637','Bordeaux','mickael.birepinte@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$yYVpZ3U+F/ee1AZlNTaZYQ$Zua2dOcNVSU5He6hV8h5z9uRwyXRQrq6gc0lSA6IjQU','https://www.linkedin.com/in/michael-birepinte/'),
     (2,'Luc','Jaubert','0625458978','Bordeaux','lucjaubert@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$K2QB56XZobdyCRWiiUuhIg$gYT2ev6y4g/K28Y96kjzaIqk4BBj/k+o6wE3U3CMG78','https://www.linkedin.com/in/luc-jaubert/'),
     (2,'Olga','Yasnopolskaya','06963969620','Bordeaux','olga_yasn@hotmail.com','$argon2id$v=19$m=65536,t=3,p=4$QxHxZ2KRGgnpOzs5AL0YBQ$ZM6Altf4QNGDMFTdpZ7baT6lunYEplqDawawGpoC5Iw','https://www.linkedin.com/in/olga-yasnopolskaya-349b04aa/'),
     (2,'Amandine','Leporace','0768076995','Bordeaux','leporace.amandine@gmail.com','$argon2id$v=19$m=16,t=2,p=1$ZWd3QjVPSmpUWFdyWDV1Vg$69CKCWqeR7Jo6OZxzVbGWA','https://www.linkedin.com/in/amandine-leporace-aa023222a/');


     INSERT INTO firm (email, name, contact_phone, city, postal_code, country, adress, type, logo_url, consultant_id) 
VALUES('contact@betclic.com', 'Betclic Group', '05 10 20 30 40', 'Bordeaux', 33000, 'France', '117 Quai de Bacalan', 'IT', 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/fe/Logo_Betclic_2019.svg/langfr-340px-Logo_Betclic_2019.svg.png', 1),
('contact@cdiscount.com', 'Cdiscount', '05 56 89 09 76', 'Bordeaux', 33000, 'France', '120-126 Quai de Bacalan', 'IT', 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/74/Logo-Cdiscount-baseline.png/560px-Logo-Cdiscount-baseline.png', 2),
('contact@kwantic.com', 'Kwantic', '05 30 90 78 65', 'Bordeaux', 33000, 'France', '74 Rue Georges Bonnac', 'IT', 'https://kwantic.fr/wp-content/uploads/2022/01/logo-kwantic-noir-et-blanc-sur-jaune.svg', 3),
('contact@fictivtech.com', 'FictivTech', '05 40 20 10 30', 'Toulouse', 31000, 'France', '50 Avenue des Minimes', 'IT', 'https://i.imgur.com/ad10O6I.png', 4),
('contact@virtuosoft.com', 'Virtuosoft', '05 67 89 12 34', 'Pau', 64000, 'France', '12 Rue de la Paix', 'IT', 'https://i.imgur.com/aSn3btX.png', 5),
('contact@innovasys.com', 'Innovasys', '05 57 88 99 01', 'Agen', 47000, 'France', '1 Place des Lices', 'IT', 'https://i.imgur.com/bAflqnS.png', 6),
('contact@techonix.com', 'Techonix', '05 56 45 33 21', 'Bordeaux', 33000, 'France', '5 Avenue de la Victoire', 'IT', 'https://i.imgur.com/U9BJ3oG.png', 7),
('contact@softwaresolutions.com', 'Software Solutions', '05 78 23 67 89', 'Toulouse', 31000, 'France', '3 Rue des Carmes', 'IT', 'https://i.imgur.com/U0bOMYC.png', 8),
('contact@digitalexpert.com', 'Digital Expert', '05 12 34 56 78', 'Pau', 64000, 'France', '4 Avenue Charles de Gaulle', 'IT', 'https://i.imgur.com/5K9qZs0.png', 9),
('contact@cybertechgroup.com', 'Cybertech Group', '05 67 89 01 23', 'Agen', 47000, 'France', '2 Place de la Republique', 'IT', 'https://i.imgur.com/lIqdysJ.png', 10),
('contact@infotechplus.com', 'Infotech Plus', '05 23 45 67 89', 'Bordeaux', 33000, 'France', '1 Rue de la Bourse', 'IT', 'https://i.imgur.com/SAQVt0b.png', 11),
('contact@cloudtechconsulting.com', 'Cloudtech Consulting', '05 78 90 12 34', 'Toulouse', 31000, 'France', '6 Boulevard de Strasbourg', 'IT', 'https://i.imgur.com/k1hg6Ok.png', 12),
('contact@datatechpro.com', 'Datatech Pro', '05 12 34 56 78', 'Pau', 64000, 'France', '7 Avenue des Pyrenees', 'IT', 'https://i.imgur.com/b6NLZ9b.png', 11),
('contact@techminds.com', 'TechMinds', '05 67 89 01 23', 'Agen', 47000, 'France', '8 Place de la Gare', 'IT', 'https://i.imgur.com/2CxRzMh.png', 4),
('contact@digisolutions.com', 'DigiSolutions', '05 23 45 67 89', 'Bordeaux', 33000, 'France', '9 Rue des Faienceries', 'IT', 'https://i.imgur.com/k1sJtUp.png', 3);

INSERT INTO externatic.admin (role_id,gender,firstname,lastname,email,password) VALUES
	 (3,'homme','Michael','Birepinte','mickael.birepinte@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM'),
	 (3,'femme','Olga','Yasno','olga_yasn@hotmail.com','$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM'),
	 (3,'homme','Luc','Jaubert','lucjaubert@gmail.com','$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM');

     INSERT INTO urgence (name) VALUES
	 ('faible'),
	 ('moyenne'),
	 ('forte'),
	 ('absolue');

     INSERT INTO state_offer (name) VALUES
	('En attente'),
    ('En cours de traitement'),
    ('Refusée'),
    ('Acceptée');

     INSERT INTO contract (id, contract_type) VALUES(1, 'CDI'), (2, 'CDD'), (3, 'Stage'), (4, 'Contrat de professionnalisation'), (5, 'Contrat d apprentissage');
	

	

INSERT INTO externatic.`user` (role_id,gender,firstname,lastname,email,city,postal_code,country,adress,phone,isActive,linkedin,website,github,actual_job,job_id,salary,diploma,handicap,password,hard_skills,experience_id,contract_id,consultant_id,userNote, reset_token, photo) VALUES
	 (1,'homme','Luc','Thebest','lucthebest@gmail.com','Bordeaux',33000,'FRANCE','43 rue du loup','0640899345',1,'lebgdu33',NULL,NULL,'Developpeur',2,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,1,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
	 (1,'femme','Josette','Colin','josettecol@gmail.com','Nantes',44000,'FRANCE','5 rue du temple','0640899678',1,NULL,NULL,NULL,'chomage',3,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,7,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
	 (1,'homme','Bertrand','Molina','btr@gmail.com','soustons',40140,'FRANCE','8 rue des pins','0558411032',1,NULL,NULL,NULL,'boulanger',7,NULL,NULL,1,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,8,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'homme','José','Garcia','j.garcia@gmail.com','Bordeaux',33000,'France',' 6 Alleé des platanes','0678294729',0,'j.garcia@linkedin.com','',NULL,'Développpeur Web',2,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,1,NULL,1,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'homme','Paul','Dupont','paul.dupont@gmail.com','Lyon',69000,'France','12 rue de la Paix','0612345678',1,'paul.dupont@linkedin.com','','','Ingénieur en informatique',5,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,4,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'femme','Sophie','Martin','sophie.martin@gmail.com','Paris',75000,'France','15 avenue des Champs-Elysées','0698765432',1,'sophie.martin@linkedin.com','','','Avocate',1,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,5,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'homme','Emile','Leroy','emile.leroy@gmail.com','Marseille',13000,'France','2 rue de la Mer','0600000000',1,'emile.leroy@linkedin.com','','','Directeur commercial',3,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,6,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'femme','Anne','Dubois','anne.dubois@gmail.com','Toulouse',31000,'France','18 rue des Fleurs','0622222222',1,'anne.dubois@linkedin.com','','','Enseignante',4,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,2,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'homme','Pierre','Dupont','pierredupont@gmail.com','Paris',75000,'FRANCE','12 rue de la paix','0612345678',1,'pierredupont@linkedin.com','https://www.pierredupont.fr',NULL,'Ingénieur en informatique',4,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,1,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'femme','Sophie','Martin','sophiemartin@gmail.com','Lyon',69000,'FRANCE','7 rue de la gare','0640899999',1,'sophiemartin@linkedin.com','https://www.sophiemartin.fr',NULL,'Conseillère en ressources humaines',5,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,8,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'homme','Marc','Dubois','marcdubois@gmail.com','Marseille',13000,'FRANCE','15 avenue du Prado','0640891234',1,'marcdubois@linkedin.com','https://www.marcdubois.fr',NULL,'Architecte d intérieur',1,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,5,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"),
     (1,'homme','Jean','Leroy','jeanleroy@gmail.com','Nantes',44000,'FRANCE','2 rue des remparts','0640899999',1,'jeanleroy@linkedin.com','https://www.jeanleroy.fr',NULL,'Directeur des ventes',6,NULL,NULL,0,'$argon2id$v=19$m=65536,t=3,p=4$wLubu1w/HZ/IoOXLX/Dg+Q$Y6u3DEhcUo/Scr/b33V/5lgqc4VpeYbTr9rXx22EAGM',NULL,NULL,NULL,4,NULL,NULL,"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png");

    
     INSERT INTO firm (email, name, contact_phone, city, postal_code, country, adress, type, logo_url, consultant_id) 
VALUES('contact@betclic.com', 'Betclic Group', '05 10 20 30 40', 'Bordeaux', 33000, 'France', '117 Quai de Bacalan', 'IT', 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/fe/Logo_Betclic_2019.svg/langfr-340px-Logo_Betclic_2019.svg.png', 1),
('contact@cdiscount.com', 'Cdiscount', '05 56 89 09 76', 'Bordeaux', 33000, 'France', '120-126 Quai de Bacalan', 'IT', 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/74/Logo-Cdiscount-baseline.png/560px-Logo-Cdiscount-baseline.png', 2),
('contact@kwantic.com', 'Kwantic', '05 30 90 78 65', 'Bordeaux', 33000, 'France', '74 Rue Georges Bonnac', 'IT', 'https://kwantic.fr/wp-content/uploads/2022/01/logo-kwantic-noir-et-blanc-sur-jaune.svg', 3),
('contact@fictivtech.com', 'FictivTech', '05 40 20 10 30', 'Toulouse', 31000, 'France', '50 Avenue des Minimes', 'IT', 'https://i.imgur.com/ad10O6I.png', 4),
('contact@virtuosoft.com', 'Virtuosoft', '05 67 89 12 34', 'Pau', 64000, 'France', '12 Rue de la Paix', 'IT', 'https://i.imgur.com/aSn3btX.png', 5),
('contact@innovasys.com', 'Innovasys', '05 57 88 99 01', 'Agen', 47000, 'France', '1 Place des Lices', 'IT', 'https://i.imgur.com/bAflqnS.png', 6),
('contact@techonix.com', 'Techonix', '05 56 45 33 21', 'Bordeaux', 33000, 'France', '5 Avenue de la Victoire', 'IT', 'https://i.imgur.com/U9BJ3oG.png', 7),
('contact@softwaresolutions.com', 'Software Solutions', '05 78 23 67 89', 'Toulouse', 31000, 'France', '3 Rue des Carmes', 'IT', 'https://i.imgur.com/U0bOMYC.png', 8),
('contact@digitalexpert.com', 'Digital Expert', '05 12 34 56 78', 'Pau', 64000, 'France', '4 Avenue Charles de Gaulle', 'IT', 'https://i.imgur.com/5K9qZs0.png', 9),
('contact@cybertechgroup.com', 'Cybertech Group', '05 67 89 01 23', 'Agen', 47000, 'France', '2 Place de la Republique', 'IT', 'https://i.imgur.com/lIqdysJ.png', 10),
('contact@infotechplus.com', 'Infotech Plus', '05 23 45 67 89', 'Bordeaux', 33000, 'France', '1 Rue de la Bourse', 'IT', 'https://i.imgur.com/SAQVt0b.png', 11),
('contact@cloudtechconsulting.com', 'Cloudtech Consulting', '05 78 90 12 34', 'Toulouse', 31000, 'France', '6 Boulevard de Strasbourg', 'IT', 'https://i.imgur.com/k1hg6Ok.png', 12),
('contact@datatechpro.com', 'Datatech Pro', '05 12 34 56 78', 'Pau', 64000, 'France', '7 Avenue des Pyrenees', 'IT', 'https://i.imgur.com/b6NLZ9b.png', 11),
('contact@techminds.com', 'TechMinds', '05 67 89 01 23', 'Agen', 47000, 'France', '8 Place de la Gare', 'IT', 'https://i.imgur.com/2CxRzMh.png', 4),
('contact@digisolutions.com', 'DigiSolutions', '05 23 45 67 89', 'Bordeaux', 33000, 'France', '9 Rue des Faienceries', 'IT', 'https://i.imgur.com/k1sJtUp.png', 3);

INSERT INTO externatic.`spontaneous_application` (`user_id`,`job_id`,`application_state_id`, `creation_date` )
VALUES
  (3,23,1,"2022-08-25 20:53:44"),
  (3,13,3,"2022-09-09 03:48:58"),
  (3,3,3,"2023-01-20 16:11:19"),
  (4,15,2,"2022-12-31 03:07:01"),
  (2,8,4,"2022-03-24 01:14:46"),
  (4,11,3,"2022-09-18 07:58:06"),
  (2,6,2,"2022-11-15 18:23:07"),
  (4,21,3,"2022-08-13 16:00:40"),
  (4,13,3,"2022-09-10 20:11:29"),
  (2,2,1,"2022-04-16 21:43:28"),
  (2,33,3,"2022-03-19 20:36:33"),
  (2,12,3,"2022-05-20 01:48:36"),
  (2,10,2,"2022-03-16 11:30:18"),
  (1,34,2,"2022-07-22 07:36:14"),
  (3,24,3,"2022-11-13 03:30:59"),
  (3,30,1,"2022-04-03 01:40:25"),
  (2,33,3,"2022-05-28 13:09:14"),
  (2,9,2,"2022-08-21 14:19:17"),
  (2,4,3,"2022-02-16 17:14:59"),
  (2,10,2,"2022-09-24 19:13:00");

INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Front-End Developpeur (H/F)',1,'Bordeaux','2023-01-01',92000,'France',1,35000,'Betclic Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Issu d une formation informatique vous avez une première expérience en développement sur SAGE X3',2,1,1,1,1),
	 ('Senior JAVA Developpeur (H/F)',2,'Bordeaux','2022-12-23',33130,'France',2,45000,'Cdiscount est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','-','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,2,2,1),
	 (' PHP Développeur (H/F)',1,'Bordeaux','2022-12-10',33000,'France',1,33000,'Betclic Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Gestion des anomalies remontées sur le périmètre technique dans le respect des engagements de service (délais) et des bonnes pratiques (qualité, sécurité) via l outil de ticketing, assurer et coordonner les demandes sur le périmètre technique, réalisation de l analyse technico-fonctionnelle avec les équipes de SI et du métier, participation à la conception et à la réalisation de la solution avec les équipes','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Issu d une formation informatique vous avez une première expérience en développement sur SAGE X3',2,1,1,1,2),
	 ('DevOps (H/F)',5,'Pau','2022-12-24',64000,'France',4,35000,'Virtuosoft est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','-','Expérience significative en développement BackEnd (+ de 3 ans),',3,1,3,1,1),
	 ('Développeur Full Stack',4,'Toulouse','2023-01-02',31000,'France',4,32000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Ruby et RubyOnRails',2,1,4,4,3),
	 ('Lead technique (H/F)',5,'Pau','2023-01-12',64000,'France',5,35000,'Virtuosoft est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Développer et maintenir nos applicatifs (back, front, kiosque, etc. )','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,5,1,2),
	 ('Développeur Full-Stack (H/F)',4,'Toulouse','2023-01-10',31000,'France',3,45000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Ruby et RubyOnRails',4,1,6,3,4),
	 ('Architecte Infrastructure (H/F)',1,'Bordeaux','2023-01-13',33000,'France',6,32000,'Betclic Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','-','LAN, WAN, Wifi, Routage N3, Protocoles OSPF, BGP, Haute Disponibilité, gestion plan adressage, sécurité (Palo Sophos...)',1,1,7,4,1),
	 ('Scrum Master (H/F)',2,'Bordeaux','2023-01-16',33000,'France',7,35000,'Cdiscount est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Vous avez un bon relationnel, le sens du service et vous aimez travailler en équipe.','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,8,3,2),
	 ('Product Owner (H/F)',3,'Bordeaux','2023-01-06',33000,'France',8,45000,'Kwantic est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Expérience significative en développement BackEnd (+ de 3 ans),',3,1,9,1,3);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Product Manager (H/F)',6,'Agen','2023-01-08',47000,'France',9,32000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Développer et maintenir nos applicatifs (back, front, kiosque, etc. )','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Ruby et RubyOnRails',4,1,10,2,2),
	 ('Ingénieur Test (H/F)',7,'Bordeaux','2023-01-10',33000,'France',10,45000,'Techonix est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',1,1,11,1,1),
	 ('UX/UI designer (H/F)',8,'Toulouse','2023-01-11',31000,'France',11,32000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','-','Ruby et RubyOnRails',2,1,12,2,2),
	 ('Administrateur Système (H/F)',9,'Pau','2023-01-16',64000,'France',12,32000,'Digital Expert est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','-','Expérience significative en développement BackEnd (+ de 3 ans),',3,1,3,1,2),
	 ('Ingénieur Système Cloud (H/F)',10,'Agen','2023-01-18',47000,'France',13,32000,'Cybertech Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Ruby et RubyOnRails',4,1,4,1,4),
	 ('Architecte Logiciel (H/F)',6,'Agen','2023-01-02',47000,'France',14,45000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',1,1,5,3,1),
	 ('Ingénieur Hardware (H/F)',13,'Pau','2023-01-23',64000,'France',15,32000,'Datatech Pro est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,3,2,4),
	 ('Analyste fonctionnel / AMOA (H/F)',8,'Toulouse','2023-01-10',31000,'France',16,35000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,7,3,1),
	 ('Intégrateur Web (H/F)',9,'Pau','2023-01-02',64000,'France',17,32000,'Digital Expert est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',4,1,8,1,2),
	 ('Ingénieur Logiciel Embarqué (H/F)',9,'Pau','2023-01-10',64000,'France',18,32000,'Digital Expert est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','-','Ruby et RubyOnRails',1,1,9,2,3);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Technicien(ne) Support (H/F)',7,'Bordeaux','2023-01-10',33000,'France',19,45000,'Techonix est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Ruby et RubyOnRails',2,1,10,4,2),
	 ('Directeur du Système d Informations (H/F)',10,'Agen','2023-01-02',47000,'France',20,32000,'Cybertech Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,11,2,1),
	 ('Directeur / chef de projet (H/F)',14,'Agen','2023-01-13',47000,'France',21,32000,'TechMinds est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',4,1,12,2,2),
	 ('Directeur technique / CTO (H/F)',11,'Bordeaux','2023-01-02',33000,'France',22,35000,'Infotech Plus est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Expérience significative en développement BackEnd (+ de 3 ans),',1,1,1,3,4),
	 ('Responsable de la Sécurité du Système Informatique (H/F)',8,'Toulouse','2023-01-13',31000,'France',23,47000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',2,1,2,2,2),
	 ('Directeur Marketing (H/F)',15,'Bordeaux','2023-01-10',33000,'France',24,35000,'DigiSolutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','-','Ruby et RubyOnRails',3,1,3,4,4),
	 ('Service Delivery Manager (H/F)',12,'Toulouse','2023-01-23',31000,'France',25,47000,'Cloudtech Consulting est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',4,1,4,1,4),
	 ('Customer Success Manager (H/F)',8,'Toulouse','2023-01-13',31000,'France',26,32000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Expérience significative en développement BackEnd (+ de 3 ans),',1,1,5,2,2),
	 ('Chief Operating Officer (H/F)',13,'Pau','2023-01-10',64000,'France',27,47000,'Datatech Pro est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','-','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,6,4,1),
	 ('Business Developper (H/F)',14,'Pau','2023-01-24',64000,'France',28,32000,'TechMinds est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,7,1,2);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Growth Hacker (H/F)',9,'Pau','2023-01-23',64000,'France',29,35000,'Digital Expert est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Ruby et RubyOnRails',4,1,8,3,3),
	 ('Expert SEO Trafic content Manager (H/F)',8,'Toulouse','2023-01-10',31000,'France',30,47000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',1,1,9,2,2),
	 ('Chef de projet Web (H/F)',7,'Bordeaux','2023-01-23',33000,'France',31,47000,'Techonix est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Expérience significative en développement BackEnd (+ de 3 ans),',2,1,10,2,1),
	 ('Data Architect (H/F)',12,'Toulouse','2023-01-13',31000,'France',32,32000,'Cloudtech Consulting est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,11,3,2),
	 ('Data Engineer (H/F)',9,'Pau','2023-01-24',64000,'France',33,35000,'Digital Expert est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Expérience significative en développement BackEnd (+ de 3 ans),',4,1,12,2,4),
	 ('Data Analyst (H/F)',9,'Pau','2023-01-14',64000,'France',34,32000,'Digital Expert est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',1,1,1,4,2),
	 ('Data Scientist (H/F)',8,'Toulouse','2023-01-13',31000,'France',35,47000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','-','Expérience significative en développement BackEnd (+ de 3 ans),',2,1,2,1,3),
	 ('Consultant en recrutement IT (H/F)',9,'Bordeaux','2023-01-14',33000,'France',36,35000,'DigiSolutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,3,3,2),
	 ('Recruteur tech (H/F)',8,'Toulouse','2023-01-23',31000,'France',37,47000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',4,1,4,2,2),
	 ('Front-End Developpeur (H/F)',4,'Toulouse','2023-01-29',31000,'France',2,60000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',4,1,1,1,1);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Senior JAVA Developpeur (H/F)',10,'Agen','2023-02-02',47000,'France',1,45000,'Cybertech Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Ruby et RubyOnRails',3,1,2,2,2),
	 (' PHP Développeur (H/F)',3,'Bordeaux','2023-01-25',33000,'France',1,36000,'Kwantic est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Ruby et RubyOnRails',2,1,3,3,3),
	 ('DevOps (H/F)',14,'Pau','2023-01-29',64000,'France',4,65000,'TechMinds est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Expérience significative en développement BackEnd (+ de 3 ans),',4,1,4,1,4),
	 ('Senior JAVA Developpeur (H/F)',6,'Agen','2023-01-28',47000,'France',1,32000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',1,1,5,3,2),
	 ('Développeur Full Stack',9,'Bordeaux','2023-01-24',33000,'France',3,39000,'DigiSolutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',2,1,6,2,1),
	 ('Lead technique (H/F)',7,'Bordeaux','2023-01-30',33000,'France',5,33000,'Techonix est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',1,1,7,4,3),
	 ('Architecte Infrastructure (H/F)',13,'Pau','2023-02-02',64000,'France',6,42000,'Datatech Pro est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,8,1,2),
	 ('Scrum Master (H/F)',8,'Toulouse','2023-01-27',31000,'France',7,56000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',4,1,9,3,3),
	 ('Product Owner (H/F)',4,'Toulouse','2023-02-06',31000,'France',8,31000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',1,1,10,2,1),
	 ('Product Manager (H/F)',10,'Agen','2023-01-30',47000,'France',9,43000,'Cybertech Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,11,4,1);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Ingénieur Test (H/F)',1,'Bordeaux','2023-01-29',33000,'France',10,34000,'Betclic Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Expérience significative en développement BackEnd (+ de 3 ans),',2,1,12,2,2),
	 ('UX/UI designer (H/F)',9,'Bordeaux','2023-01-25',33000,'France',11,51000,'DigiSolutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Expérience significative en développement BackEnd (+ de 3 ans),',3,1,1,4,3),
	 ('Administrateur Système (H/F)',6,'Agen','2023-01-28',47000,'France',12,34000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,2,1,1),
	 ('Ingénieur Système Cloud (H/F)',3,'Bordeaux','2023-01-27',33000,'France',13,49000,'Kwantic est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,3,4,3),
	 ('Architecte Logiciel (H/F)',1,'Bordeaux','2023-02-04',33000,'France',14,42000,'Betclic Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,4,2,2),
	 ('Ingénieur Hardware (H/F)',14,'Pau','2023-02-06',64000,'France',15,56000,'TechMinds est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,5,2,4),
	 ('Analyste fonctionnel / AMOA (H/F)',13,'Pau','2023-02-05',64000,'France',16,48000,'Datatech Pro est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',4,1,6,2,2),
	 ('Intégrateur Web (H/F)',7,'Bordeaux','2023-01-24',33000,'France',17,31000,'Techonix est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',1,1,7,2,4),
	 ('Ingénieur Logiciel Embarqué (H/F)',9,'Bordeaux','2023-01-29',33000,'France',18,51000,'DigiSolutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,8,2,3),
	 ('Technicien(ne) Support (H/F)',6,'Agen','2023-01-30',47000,'France',19,75000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',4,1,9,2,2);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Directeur du Système d Informations (H/F)',6,'Agen','2023-01-27',47000,'France',20,37000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,10,2,1),
	 ('Directeur / chef de projet (H/F)',4,'Toulouse','2023-01-28',31000,'France',21,41000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Expérience significative en développement BackEnd (+ de 3 ans),',2,1,11,3,2),
	 ('Directeur technique / CTO (H/F)',14,'Pau','2023-02-02',64000,'France',22,31000,'TechMinds est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Expérience significative en développement BackEnd (+ de 3 ans),',1,1,12,2,4),
	 ('Responsable de la Sécurité du Système Informatique (H/F)',8,'Toulouse','2023-01-29',31000,'France',23,67000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Expérience significative en développement BackEnd (+ de 3 ans),',4,1,1,2,4),
	 ('Directeur Marketing (H/F)',10,'Agen','2023-02-06',47000,'France',24,34000,'Cybertech Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,2,2,2),
	 ('Service Delivery Manager (H/F)',3,'Bordeaux','2023-01-25',33000,'France',25,34000,'Kwantic est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',2,1,3,2,4),
	 ('Customer Success Manager (H/F)',6,'Agen','2023-02-04',47000,'France',26,56000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Connaissances requises en développement Web autour des technologies Java, HTML, CSS, Javascript, XSL, SQL',3,1,4,1,4),
	 ('Chief Operating Officer (H/F)',1,'Bordeaux','2023-01-27',33000,'France',27,42000,'Betclic Group est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,5,3,1),
	 ('Business Developper (H/F)',4,'Toulouse','2023-01-30',31000,'France',28,34000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Participer à l''évolution de la solution, les projets à venir étant : La migration de l’authentification vers le service Cognito (oAuth par AWS),','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',2,1,6,2,1),
	 ('Growth Hacker (H/F)',6,'Agen','2023-01-28',47000,'France',29,31000,'Innovasys est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',1,1,7,4,4);
INSERT INTO externatic.offer (title,firm_id,firm_city,`date`,postal_code,country,job_id,salary,description_firm,description_mission,soft_skills,hard_skills,experience_id,contract_type,consultant_id,urgence_id,state_offer_id) VALUES
	 ('Expert SEO Trafic content Manager (H/F)',14,'Pau','2023-01-24',64000,'France',30,67000,'TechMinds est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Expérience significative en développement BackEnd (+ de 3 ans),',4,1,8,2,2),
	 ('Chef de projet Web (H/F)',3,'Bordeaux','2023-02-04',33000,'France',31,32000,'Kwantic est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','-','Expérience significative en développement BackEnd (+ de 3 ans),',1,1,9,3,3),
	 ('Data Architect (H/F)',7,'Bordeaux','2023-01-28',33000,'France',32,43000,'Techonix est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Prendre en charge la conception, le développement, les tests et la documentation, participer aux phases d analyse, de recette et de mise en production, Assurer le support aux utilisateurs, corriger les dysfonctionnements et prendre en charge les évolutions, proposer des actions d optimisation des process et outils de développement','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,10,2,2),
	 ('Data Engineer (H/F)',13,'Pau','2023-01-27',64000,'France',33,36000,'Datatech Pro est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Expérience significative en développement BackEnd (+ de 3 ans),',2,1,11,2,1),
	 ('Data Scientist (H/F)',4,'Toulouse','2023-01-30',31000,'France',35,32000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Expérience significative en développement BackEnd (+ de 3 ans),',1,1,12,4,4),
	 ('Consultant en recrutement IT (H/F)',3,'Bordeaux','2023-01-24',33000,'France',36,46000,'Kwantic est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','Autonomie, Créativité, sens de l’innovation, Adaptabilité et flexibilité, Capacité d’analyse et de synthèse, Esprit d’équipe / sens de la communauté','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',3,1,1,3,2),
	 ('Recruteur tech (H/F)',8,'Toulouse','2023-02-02',31000,'France',37,37000,'Software Solutions est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques',' Audit sur un périmètre infrastructure dans un contexte de refonte de l''architecture réseau : Etude de l’existant et proposer une nouvelle architecture, Refonte de l''architecture réseau, Mise en place d''une architecture, Création d''une salle serveur, Remplacement des équipements switchs DC et Sièges','Vous êtes curieux, force de proposition et avez le sens du service. Vous savez gérer les priorités, prendre des initiatives, et vous adapter à différents acteurs. Vous avez une capacité d écoute et d analyse et vous savez être force de proposition. Vous faites preuve d une bonne aisance rédactionnelle','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',2,1,2,2,3),
	 ('Front-End Developpeur (H/F)',4,'Toulouse','2023-02-04',31000,'France',2,38000,'FictivTech est une société de conseil en technologies de l information et de la communication. Nous accompagnons nos clients dans la transformation digitale de leurs activités et de leurs processus métiers. Nous intervenons sur des projets de développement, d intégration, de déploiement et de maintenance de solutions informatiques','Maintenir et faire évoluer le site e-commerce https://www.artphotolimited.com/(RubyOnRails, MongoDB) tant sur sa partie frontend que backend, sous la supervision de notre CTO','-','Front (vuejs ou react), Sensibilité sur l''UX/UI, Linux (bash), Compétence devops, Saas & Cloud, Requêtage SQL',2,1,3,2,4);

INSERT INTO externatic.favorite (user_id,offer_id) VALUES
	 (1,8),
	 (1,12);

INSERT INTO externatic.candidated (user_id,offer_id,application_state_id) VALUES
	 (1,8,1),
	 (1,12,1);

INSERT INTO userAlert (user_id, job_id, city) VALUES(1, 1, "Bordeaux");

INSERT INTO userAlert (user_id, job_id, city) VALUES(2, 1,"Bordeaux");

INSERT INTO userAlert (user_id, job_id, city) VALUES(3, 1,"Bordeaux");

INSERT INTO userAlert (user_id, job_id, city) VALUES(4, 1,"Bordeaux");

INSERT INTO externatic.alert (user_id,offer_id) VALUES
	 (1,23),
	 (1,25),
	 (1,45),
	 (1,25);