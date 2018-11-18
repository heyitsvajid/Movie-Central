package com.netflix.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    	
	Role findByName(String name);
	Role findById(long id);
}
