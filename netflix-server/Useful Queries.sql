use cmpe275;
#Create Roles
insert into role(name) values('ADMIN');
insert into role(name) values('CUSTOMER');

select * from user;

delete from user where id in (1,2);

