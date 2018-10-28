package com.netflix.app.service;


import java.util.List;

import com.netflix.app.model.User;

public interface UserService {
	
	User findById(long id);
	
	User findByUsername(String name);
	
	void save(User user);
	
	void updateUser(User user);
	
	void deleteUserById(long id);

	List<User> findAllUsers();
	
	void deleteAllUsers();
	
	//boolean isUserExist(User user);
	
}
