package com.netflix.app.service;

import java.util.List;

import com.netflix.app.model.Payment;
//import com.netflix.app.model.User;

public interface PaymentService {
	Payment findById(long id);

	User findByEmail(String email);

	void save(User user);

	User findByEmailAndRole(String email,Role role);

	void updateUser(User user);

	void deleteUserById(long id);

	List<User> findAllUsers();

	void deleteAllUsers();
}
