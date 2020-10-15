
INSERT INTO users ( name, email, password)
VALUES ('Eva Mendez', 'e@m.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('John Stamos', 'j@s.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Redding Jr', 'r@j.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ray Romano', 'r@r.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Elvis Presley', 'e@p.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
cost_per_night, parking_spaces,number_of_bathrooms, number_of_bedrooms ,country, street, city, province, post_code, active) 
VALUES (
 1, 'yellow door', 'description', 'https://i.imgur.com/GqxegdI.jpg', 'https://i.imgur.com/GqxegdI.jpg',1,1,1,1 ,'australia', 'john street', 'adelaide', 'SA', '5340', true),
(2, 'blue door', 'description', 'https://i.imgur.com/GqxegdI.jpg', 'https://i.imgur.com/GqxegdI.jpg', 1,1,1,1,'canada', 'pirie street', 'vancouver', 'BC', 'V5t', true),
(3, 'white door', 'description', 'https://i.imgur.com/GqxegdI.jpg', 'https://i.imgur.com/GqxegdI.jpg',1,1,1,1, 'canada', 'water street', 'vancouver', 'BC', 'v2X', true),
(4, 'orange door', 'description', 'https://i.imgur.com/GqxegdI.jpg', 'https://i.imgur.com/GqxegdI.jpg', 1,1,1,1,'canada', 'granville avenue', 'vancouver', 'BC', 'v5t',true);



INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (
 1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14'),
(4, 4, '2021-10-01', '2021-10-14');



INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (
 2, 4, 2, 5,'messages'),
(1, 2, 3, 4,'messages'),
(4, 3, 2, 1,'messages'),
(3, 4, 4, 4,'messages');
