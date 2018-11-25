package com.netflix.app.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.app.service.ObjectService;
import com.netflix.app.service.RoleService;
import com.netflix.app.service.UserService;
import com.netflix.app.util.EmailService;

@RestController
public class PaymentController {
	
	public static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
	
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	@Autowired
	ObjectService objectService;
	@Autowired
	EmailService es;

	public PaymentController() {
		
	}

}
