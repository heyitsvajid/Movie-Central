package com.netflix.app.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Role;
import com.netflix.app.model.User;
import com.netflix.app.repository.UserRepository;
import com.netflix.app.util.PasswordEncoder;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public void save(User user) {
		userRepository.save(user);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User findByEmailAndRole(String email, Role role) {
		return userRepository.findByEmailAndRole(email, role);
	}

	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public User findById(long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id);
	}

	@Override
	public void updateUser(User user) {
		userRepository.save(user);
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteUserById(long id) {
		userRepository.delete(id);
	}

	@Override
	public void deleteAllUsers() {
		// TODO Auto-generated method stub
		userRepository.deleteAll();
	}

}
