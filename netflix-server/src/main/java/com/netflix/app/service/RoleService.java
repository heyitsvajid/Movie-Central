package com.netflix.app.service;

import com.netflix.app.model.Role;

public interface RoleService {
	Role findById(long id);

	Role findByName(String name);

}
