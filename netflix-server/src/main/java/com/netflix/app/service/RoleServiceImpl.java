package com.netflix.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Role;
import com.netflix.app.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleRepository roleRepository;
	
	
	@Override
	public Role findById(long id) {
		return roleRepository.findById(id);
	}
	
	@Override
	public Role findByName(String name) {
		return roleRepository.findByName(name);
	}


}
