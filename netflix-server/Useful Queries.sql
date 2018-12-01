use cmpe275;
#Create Roles
select * from role;
delete from role where id in (3,4);
drop table role;

insert into role(name) values('ADMIN');
insert into role(name) values('CUSTOMER');

select * from view;
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

SELECT * FROM   movie WHERE  actors + '#' + director + '#' + title 