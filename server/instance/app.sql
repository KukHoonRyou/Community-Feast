PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE food_tag (
	id INTEGER NOT NULL, 
	name VARCHAR(50) NOT NULL, 
	PRIMARY KEY (id), 
	CONSTRAINT uq_food_tag_name UNIQUE (name)
);
INSERT INTO food_tag VALUES(1,'fruit');
INSERT INTO food_tag VALUES(2,'food');
INSERT INTO food_tag VALUES(3,'vegetarian');
INSERT INTO food_tag VALUES(4,'healthy');
INSERT INTO food_tag VALUES(5,'kids');
INSERT INTO food_tag VALUES(6,'meat');
INSERT INTO food_tag VALUES(7,'beef');
INSERT INTO food_tag VALUES(8,'pork');
INSERT INTO food_tag VALUES(9,'marinara');
INSERT INTO food_tag VALUES(10,'bbq');
INSERT INTO food_tag VALUES(11,'sauce');
INSERT INTO food_tag VALUES(12,'chicken');
INSERT INTO food_tag VALUES(13,'fried');
INSERT INTO food_tag VALUES(14,'hot');
INSERT INTO food_tag VALUES(15,'dessert');
INSERT INTO food_tag VALUES(16,'chocolate');
INSERT INTO food_tag VALUES(17,'nuts');
INSERT INTO food_tag VALUES(18,'seaweed');
INSERT INTO food_tag VALUES(19,'roll');
INSERT INTO food_tag VALUES(20,'vegetable');
INSERT INTO food_tag VALUES(21,'Korean');
INSERT INTO food_tag VALUES(22,'raw');
INSERT INTO food_tag VALUES(23,'pizza');
INSERT INTO food_tag VALUES(24,'Italian');
INSERT INTO food_tag VALUES(25,'bake');
INSERT INTO food_tag VALUES(26,'strawberry');
CREATE TABLE eats (
	id INTEGER NOT NULL, 
	eats_name VARCHAR(120) NOT NULL, 
	category VARCHAR(50) NOT NULL, 
	description VARCHAR(300) NOT NULL, 
	cook_time VARCHAR(50) NOT NULL, 
	quantity INTEGER NOT NULL, 
	allergic_ingredient VARCHAR(300), 
	perishable BOOLEAN NOT NULL, 
	image_url VARCHAR(200), 
	is_available BOOLEAN NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	user_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	CONSTRAINT fk_eats_user_id_user FOREIGN KEY(user_id) REFERENCES user (id)
);
INSERT INTO eats VALUES(2,'cherrye','fruit','fresh cherry','0',15,'',1,'https://i2n.news1.kr/system/photos/2017/8/25/2697423/article.jpg',1,'2024-05-28 03:47:32','2024-05-28 15:12:18',11);
INSERT INTO eats VALUES(3,'banana','fruit','fresh banana','0',5,'',1,'https://kormedi.com/wp-content/uploads/2021/09/gettyimages-1189095854-580x443.jpg',0,'2024-05-28 03:48:45','2024-05-28 17:30:11',11);
INSERT INTO eats VALUES(4,'mac and cheese','pasta','fresh baked mac and cheese','10',2,'dairy',1,'https://hips.hearstapps.com/hmg-prod/images/mac-and-cheese-index-64d25bdf03b98.jpg?crop=0.888888888888889xw:1xh;center,top',1,'2024-05-28 03:50:40','2024-05-28 03:50:40',11);
INSERT INTO eats VALUES(5,'meatballs','meatball','beef and pork meatballs','12',10,'',1,'https://www.flavcity.com/wp-content/uploads/2018/06/meatballs-tomato-sauce.jpg',1,'2024-05-28 03:53:30','2024-05-28 03:53:30',12);
INSERT INTO eats VALUES(6,'pork ribs','bbq','pork ribs with bbq sauce','3:00',5,'',1,'https://www.southernliving.com/thmb/J02EQeOhOKHfmALt-jE_61idUck=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/oven-baked-baby-back-ribs-beauty-332-7deda00b7b4f4820a9c79f13ed09cfb9.jpg',0,'2024-05-28 03:56:04','2024-05-28 05:12:47',12);
INSERT INTO eats VALUES(7,'chicken wings','chicken','party leftover chicken wings','18:31',31,'chicken',1,'https://www.thecookierookie.com/wp-content/uploads/2018/12/baked-chicken-wings-reshoot-500x375.jpg',0,'2024-05-28 05:04:55','2024-05-28 15:15:29',13);
INSERT INTO eats VALUES(8,'brownie','dessert','party leftover brownies','17:00',10,'nuts',1,'https://makeitdough.com/wp-content/uploads/2019/09/Brownies-12-1-scaled.jpg',0,'2024-05-28 05:06:37','2024-05-28 17:36:05',13);
INSERT INTO eats VALUES(9,'gimbob','food','Korean seaweed roll with beaf and vegetable ','12:00',5,'seaweed',1,'https://mblogthumb-phinf.pstatic.net/MjAyMzA3MjVfNDcg/MDAxNjkwMjg0NzE1Nzkw.R3dDm_ZUJjFs3X6oYCKyTOcAZ5O6WcuyRq-gQH2wTI4g.UadKRoy6KjNPkwtr5ihhFQIW62MrbiROjtG4DjXcwssg.JPEG.kies84/IMG_8060.JPG?type=w800',0,'2024-05-28 05:12:34','2024-05-28 17:33:21',14);
INSERT INTO eats VALUES(10,'tomahawk','steak','raw tomahawk','10:00',2,'',1,'https://cdn.shopify.com/s/files/1/0418/5659/8182/products/tomahawk1_600x600.jpg?v=1672872076',0,'2024-05-28 05:40:37','2024-05-28 15:23:28',15);
INSERT INTO eats VALUES(11,'pizza','Italian','homemade pepperoni pizza','12:00',7,'',1,'https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg',0,'2024-05-28 13:28:24','2024-05-29 07:26:27',14);
INSERT INTO eats VALUES(12,'potato','vegetable','fresh potato','09:00',20,'',0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRGOfACwA_S-BiRe_DPJsfJF0E3e9lQDZRc9wxMi8Vzw&s',0,'2024-05-28 15:23:17','2024-05-28 17:34:12',16);
INSERT INTO eats VALUES(13,'dumpling','yummy','made too many dumpling!','12:00',20,'',1,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Xiaolongbao-breakfast.jpg/800px-Xiaolongbao-breakfast.jpg',1,'2024-05-29 06:53:38','2024-05-29 07:06:44',14);
INSERT INTO eats VALUES(14,'apple','fruit','fresh newly cropped apple!','',50,'',0,'https://post.healthline.com/wp-content/uploads/2021/06/apple-varieties-types-1296x728-header.jpg',1,'2024-05-29 07:18:03','2024-05-29 07:18:03',11);
INSERT INTO eats VALUES(15,'cheese cake','dessert','homemade cheese cake!','13:00',5,'nuts',1,'https://drivemehungry.com/wp-content/uploads/2022/07/strawberry-cheesecake-11-500x375.jpg',1,'2024-05-29 07:26:03','2024-05-29 07:26:03',19);
CREATE TABLE dibs (
	id INTEGER NOT NULL, 
	dib_status BOOLEAN NOT NULL, 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	user_id INTEGER, 
	eats_id INTEGER, 
	PRIMARY KEY (id), 
	CONSTRAINT fk_dibs_user_id_user FOREIGN KEY(user_id) REFERENCES user (id), 
	CONSTRAINT fk_dibs_eats_id_eats FOREIGN KEY(eats_id) REFERENCES eats (id)
);
INSERT INTO dibs VALUES(2,0,'2024-05-28 05:12:47','2024-05-28 05:12:47',14,6);
INSERT INTO dibs VALUES(3,0,'2024-05-28 05:40:52','2024-05-28 05:40:52',15,7);
INSERT INTO dibs VALUES(4,0,'2024-05-28 15:23:28','2024-05-28 15:23:28',16,10);
INSERT INTO dibs VALUES(5,0,'2024-05-28 17:30:11','2024-05-28 17:30:11',12,3);
INSERT INTO dibs VALUES(6,0,'2024-05-28 17:33:21','2024-05-28 17:33:21',13,9);
INSERT INTO dibs VALUES(7,0,'2024-05-28 17:34:12','2024-05-28 17:34:12',17,12);
INSERT INTO dibs VALUES(8,0,'2024-05-28 17:36:05','2024-05-28 17:36:05',18,8);
INSERT INTO dibs VALUES(9,0,'2024-05-29 07:26:27','2024-05-29 07:26:27',19,11);
CREATE TABLE eats_food_tag (
	eats_id INTEGER NOT NULL, 
	food_tag_id INTEGER NOT NULL, 
	PRIMARY KEY (eats_id, food_tag_id), 
	CONSTRAINT fk_eats_food_tag_eats_id_eats FOREIGN KEY(eats_id) REFERENCES eats (id), 
	CONSTRAINT fk_eats_food_tag_food_tag_id_food_tag FOREIGN KEY(food_tag_id) REFERENCES food_tag (id)
);
INSERT INTO eats_food_tag VALUES(2,1);
INSERT INTO eats_food_tag VALUES(2,4);
INSERT INTO eats_food_tag VALUES(3,1);
INSERT INTO eats_food_tag VALUES(3,2);
INSERT INTO eats_food_tag VALUES(3,3);
INSERT INTO eats_food_tag VALUES(3,4);
INSERT INTO eats_food_tag VALUES(4,2);
INSERT INTO eats_food_tag VALUES(4,5);
INSERT INTO eats_food_tag VALUES(5,2);
INSERT INTO eats_food_tag VALUES(5,7);
INSERT INTO eats_food_tag VALUES(5,8);
INSERT INTO eats_food_tag VALUES(5,9);
INSERT INTO eats_food_tag VALUES(6,10);
INSERT INTO eats_food_tag VALUES(6,8);
INSERT INTO eats_food_tag VALUES(6,11);
INSERT INTO eats_food_tag VALUES(7,2);
INSERT INTO eats_food_tag VALUES(7,11);
INSERT INTO eats_food_tag VALUES(7,12);
INSERT INTO eats_food_tag VALUES(7,13);
INSERT INTO eats_food_tag VALUES(7,14);
INSERT INTO eats_food_tag VALUES(8,17);
INSERT INTO eats_food_tag VALUES(8,16);
INSERT INTO eats_food_tag VALUES(8,15);
INSERT INTO eats_food_tag VALUES(8,2);
INSERT INTO eats_food_tag VALUES(9,2);
INSERT INTO eats_food_tag VALUES(9,7);
INSERT INTO eats_food_tag VALUES(9,19);
INSERT INTO eats_food_tag VALUES(9,18);
INSERT INTO eats_food_tag VALUES(9,20);
INSERT INTO eats_food_tag VALUES(10,7);
INSERT INTO eats_food_tag VALUES(10,10);
INSERT INTO eats_food_tag VALUES(10,2);
INSERT INTO eats_food_tag VALUES(10,22);
INSERT INTO eats_food_tag VALUES(11,24);
INSERT INTO eats_food_tag VALUES(11,23);
INSERT INTO eats_food_tag VALUES(11,2);
INSERT INTO eats_food_tag VALUES(11,5);
INSERT INTO eats_food_tag VALUES(12,2);
INSERT INTO eats_food_tag VALUES(12,3);
INSERT INTO eats_food_tag VALUES(12,4);
INSERT INTO eats_food_tag VALUES(12,20);
INSERT INTO eats_food_tag VALUES(12,22);
INSERT INTO eats_food_tag VALUES(9,21);
INSERT INTO eats_food_tag VALUES(11,9);
INSERT INTO eats_food_tag VALUES(11,6);
INSERT INTO eats_food_tag VALUES(13,4);
INSERT INTO eats_food_tag VALUES(13,20);
INSERT INTO eats_food_tag VALUES(13,22);
INSERT INTO eats_food_tag VALUES(13,7);
INSERT INTO eats_food_tag VALUES(13,8);
INSERT INTO eats_food_tag VALUES(14,1);
INSERT INTO eats_food_tag VALUES(14,4);
INSERT INTO eats_food_tag VALUES(14,3);
INSERT INTO eats_food_tag VALUES(14,2);
INSERT INTO eats_food_tag VALUES(14,5);
INSERT INTO eats_food_tag VALUES(15,2);
INSERT INTO eats_food_tag VALUES(15,15);
INSERT INTO eats_food_tag VALUES(15,1);
INSERT INTO eats_food_tag VALUES(15,25);
INSERT INTO eats_food_tag VALUES(15,26);
CREATE TABLE reviews (
	id INTEGER NOT NULL, 
	rating INTEGER, 
	comment VARCHAR(300), 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	user_id INTEGER, 
	eats_id INTEGER, 
	dibs_id INTEGER, 
	PRIMARY KEY (id), 
	CONSTRAINT fk_reviews_user_id_user FOREIGN KEY(user_id) REFERENCES user (id), 
	CONSTRAINT fk_reviews_eats_id_eats FOREIGN KEY(eats_id) REFERENCES eats (id), 
	CONSTRAINT fk_reviews_dibs_id_dibs FOREIGN KEY(dibs_id) REFERENCES dibs (id)
);
INSERT INTO reviews VALUES(2,4,'taste good!!!','2024-05-28 05:12:59','2024-05-28 05:12:59',14,6,2);
INSERT INTO reviews VALUES(3,2,'not bad','2024-05-28 05:41:02','2024-05-28 05:41:02',15,7,3);
INSERT INTO reviews VALUES(4,4,'great taste!','2024-05-28 17:33:33','2024-05-28 17:33:33',13,9,6);
INSERT INTO reviews VALUES(5,3,'good','2024-05-28 17:35:02','2024-05-28 17:35:02',12,3,5);
INSERT INTO reviews VALUES(6,5,'wonderful!','2024-05-28 17:35:25','2024-05-28 17:35:25',16,10,4);
INSERT INTO reviews VALUES(7,4,'fresh','2024-05-28 17:35:43','2024-05-28 17:35:43',17,12,7);
INSERT INTO reviews VALUES(8,1,'bad taste','2024-05-28 17:36:12','2024-05-28 17:36:12',18,8,8);
INSERT INTO reviews VALUES(9,5,'fantastic taste!!!','2024-05-29 07:26:41','2024-05-29 07:26:41',19,11,9);
CREATE TABLE alembic_version (
	version_num VARCHAR(32) NOT NULL, 
	CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);
INSERT INTO alembic_version VALUES('b1b9d66e7913');
CREATE TABLE IF NOT EXISTS "user" (
	id INTEGER NOT NULL, 
	username VARCHAR(100) NOT NULL, 
	password VARCHAR(128) NOT NULL, 
	first_name VARCHAR(50), 
	last_name VARCHAR(50), 
	email_address VARCHAR(120) NOT NULL, 
	phone_number VARCHAR(15), 
	address VARCHAR(200), 
	allergic_info VARCHAR(300), 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	"isAdmin" BOOLEAN NOT NULL, 
	PRIMARY KEY (id), 
	CONSTRAINT uq_user_username UNIQUE (username), 
	CONSTRAINT uq_user_email_address UNIQUE (email_address)
);
INSERT INTO user VALUES(11,'kuk','pbkdf2:sha256:260000$3oNtLFw3LuclbRa7$7a0775c1645071f444c97f11cdc527ef70a11ae112f23fef26fb7619f892caf8','Kuk Hoon','Ryou','kuk@example.net','444-444-4444','11241 Willow Crest Drive, MD, 20313','No','2024-05-22 20:15:05','2024-05-28 02:32:41',1);
INSERT INTO user VALUES(12,'bb','pbkdf2:sha256:260000$cN3Yywtxxw4k4Xgw$b07efeff350db757fbf2afa7c08ccd4fde8b673f2aebb0235b8afd48c0cada8c','bb','bb','bb@bb.bb','111-111-1111','1234 banana apple road, VA, 23948','banana','2024-05-28 03:51:01','2024-05-28 04:13:24',0);
INSERT INTO user VALUES(13,'cc','pbkdf2:sha256:260000$ZaqQJYcgDw1A34uM$df4106727d1b1c623a0be453dd0bd2cadb3994dccf628c5d741dfe44b15861ee','cc','cc','cc@cccc.cc',NULL,NULL,NULL,'2024-05-28 05:01:55','2024-05-28 05:35:06',0);
INSERT INTO user VALUES(14,'aa','pbkdf2:sha256:260000$CJYb7UnIsxFWq2lh$ddfa02855c05b80b0127a03329e4cfb0c3dce8767126c089d5d1bba1edecf70a','aa','aa','aa@aaaa.aa','555-555-5555','23523 Disney World, NY, 23033','nuts','2024-05-28 05:07:19','2024-05-29 06:37:10',0);
INSERT INTO user VALUES(15,'dd','pbkdf2:sha256:260000$pzVYX90kV8IJFtC0$b23637fa7883e319ac68f1a2fece35379bd23dfaa65e6faaa79bc8550961091e','dd','dd','dd@dd.dd',NULL,NULL,NULL,'2024-05-28 05:38:52','2024-05-28 05:38:52',0);
INSERT INTO user VALUES(16,'ee','pbkdf2:sha256:260000$1c2APHOIzwp8zVwC$d6aeec64ea4c3bbc0d86cf895390d7931e7e8a24dd6613c307f2fa693f103327','ee','ee','ee@ee.ee',NULL,NULL,NULL,'2024-05-28 15:21:53','2024-05-28 15:21:53',0);
INSERT INTO user VALUES(17,'ff','pbkdf2:sha256:260000$IEuYp37TBosx1IP7$38739a8be886b59f1768d4fdb560ca9031fe9a3575526daae2e4c255e7a79cc5','ff','ff','ff@ff.ff',NULL,NULL,NULL,'2024-05-28 17:34:04','2024-05-28 17:34:04',0);
INSERT INTO user VALUES(18,'gg','pbkdf2:sha256:260000$kiubcX6RbTEUC6su$c20b4c671626c9a58cbc0918f60bd1a082039027432c508c245c0e28754aeb42','gg','gg','gg@gg.gg',NULL,NULL,NULL,'2024-05-28 17:35:54','2024-05-28 17:35:54',0);
INSERT INTO user VALUES(19,'hh','pbkdf2:sha256:260000$3fqgLrTycQqqkLOx$71377be3edb0718b24fb672e9ae94c60f2609214c0de90385dda326633f1a8bc','hh','hh','hh@hh.hh',NULL,NULL,NULL,'2024-05-29 07:23:08','2024-05-29 07:23:08',0);
CREATE TABLE _alembic_tmp_user (
	id INTEGER NOT NULL, 
	"is_Admin" BOOLEAN NOT NULL, 
	username VARCHAR(80) NOT NULL, 
	password VARCHAR(128) NOT NULL, 
	first_name VARCHAR(50), 
	last_name VARCHAR(50), 
	email_address VARCHAR(120) NOT NULL, 
	phone_number VARCHAR(15), 
	address VARCHAR(200), 
	allergic_info VARCHAR(300), 
	created_at DATETIME NOT NULL, 
	updated_at DATETIME NOT NULL, 
	PRIMARY KEY (id), 
	CONSTRAINT uq_user_email_address UNIQUE (email_address), 
	CONSTRAINT uq_user_username UNIQUE (username)
);
COMMIT;
