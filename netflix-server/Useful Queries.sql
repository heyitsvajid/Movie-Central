use cmpe275;
#Create Roles
select * from role;
delete from role where id in (3,4);
drop table role;

insert into role(name) values('ADMIN');
insert into role(name) values('CUSTOMER');

select * from review;
delete from view where id = 2;

select * from user;
delete from user where id in (12);
drop table user;
	
select * from movie;
select actors + '#' + director + '#' + title as CLUB from movie;

SELECT * from movie where CONCAT_WS('#', actors, director, title) like '%Ched%' OR CONCAT_WS('#', actors, director, title) like '%Boseman%';


select * from subscription;
insert into subscription(type) values('FREE');
insert into subscription(type) values('SBCR');
insert into subscription(type) values('PPVO');
insert into subscription(type) values('PAID');


select * from payment;
drop table payment;

SELECT * FROM   movie WHERE  actors + '#' + director + '#' + title ;

select * from view;

-- Top 10 rated movies
SELECT *,SUM(rating)/COUNT(rating) as AVG FROM review where (`created_at` > DATE_SUB(now(), INTERVAL 30 DAY)) GROUP BY movie_id order by AVG desc LIMIT 10;


SELECT *, COUNT(id) as count FROM view where (`timestamp` > DATE_SUB(now(), INTERVAL 30 DAY)) GROUP BY movie_id order by count desc LIMIT 10;

select * from payment;
select * from payment where (`end_at` > now()) && subscription_id = 2  group by user_id ;

update payment set subscription_id = 2 where id = 3;

select * from payment where subscription_id = 2  group by user_id ;

select * from view group by user_id,MONTH(timestamp) ;
describe view;

insert into view(timestamp,movie_id,user_id) values('2018-12-01 13:16:18',7,15);
insert into view(timestamp,movie_id,user_id) values('2018-12-01 13:17:17',11,16);
insert into view(timestamp,movie_id,user_id) values('2018-11-03 13:17:17',12,15);
insert into view(timestamp,movie_id,user_id) values('2018-10-04 13:17:17',13,16);
insert into view(timestamp,movie_id,user_id) values('2018-10-05 13:17:17',7,15);
insert into view(timestamp,movie_id,user_id) values('2018-11-06 13:17:17',11,16);
insert into view(timestamp,movie_id,user_id) values('2018-11-07 13:17:17',14,15);

select count(*) from view where user_id=15;
select *,count(*) as views from view group by user_id,DAY(timestamp) order by views desc LIMIT 10;

select *,count(*) as views from view group by movie_id,DAY(timestamp) order by views desc LIMIT 10;


select *,count(*) as views from view group by movie_id,DAY(timestamp) order by views desc LIMIT 10;

select *,count(*) as views from view group by movie_id;


select * from payment where subscription_id = 2;

select * from view group by DAY(timestamp),movie_id;
select count(*) from view where user_id=13; 

select id,title,availability,deleted from movie;

select * from payment order by id desc;
select * from movie;
select * from user;
delete from user where id = 20;
update user set email='vajid@gmail.com' where id = 11;
update payment set end_at='2018-11-07 13:17:17' where id = 13;


delete from payment where id in (10,9,8,7,6);
select * from review;
update review set user_id = 13 where id in (36,37,39,40,41);

delete from review where id in (5,19,20,35,38);

alter table review ADD FOREIGN KEY (movie_id) REFERENCES movie(id);
alter table review ADD FOREIGN KEY (user_id) REFERENCES user(id);