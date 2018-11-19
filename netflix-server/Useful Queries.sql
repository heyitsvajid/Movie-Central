use cmpe275;
#Create Roles
select * from role;
delete from role where id in (5,6);

insert into role(name) values('ADMIN');
insert into role(name) values('CUSTOMER');


select * from user;
delete from user where id in (1,2,3,4,5,6);
drop table user;

