package com.netflix.app.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.netflix.app.model.Payment;
import com.netflix.app.model.Role;
import com.netflix.app.model.User;
import com.netflix.app.service.PaymentService;
import com.netflix.app.service.RoleService;
import com.netflix.app.service.UserService;
import com.netflix.app.util.CustomErrorType;

@RestController
public class PaymentController {

	public static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

	@Autowired
	PaymentService paymentService;
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	
	
	//Retreive list of payments for a particular user and if the user is an admin, he can have the access to all the payments.
	
	@RequestMapping(value = "/payment/{user_id}", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> findAllPaymentByUserId(@PathVariable("role") String role, @PathVariable("user_id") long user_id) {
		logger.info("Fetching all Payments for user id {} ", user_id);
		User user = userService.findById(user_id);
		Role role_admin= roleService.findById(user_id);
		
		List<Payment> payments = paymentService.findAllPayments();
		if(role_admin.equals("admin"))
		{
			
			if (payments.isEmpty()) {
				return new ResponseEntity(HttpStatus.NO_CONTENT);
				// You many decide to return HttpStatus.NOT_FOUND
			}
			else {
			return new ResponseEntity<List<Payment>>(payments,HttpStatus.OK);
			}
		}
		
		List<Payment> payment = paymentService.findAllPaymentByUserId(user_id);
		if (payment.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Payment>>(payment, HttpStatus.OK);
	}
	
	
	//Retreive data for particular payment id.
	
	@RequestMapping(value = "/payment/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> listPaymentId(@PathVariable("id") long id) {
		logger.info("Fetching all Payments ");
		List<Payment> p = paymentService.findAllPaymentById(id);
		if (p.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Payment>>(p, HttpStatus.OK);
	}
	//Make a payment
	@RequestMapping(value = "/payments", method = RequestMethod.POST)
	public ResponseEntity<?> addPayment(@RequestBody Payment payment,UriComponentsBuilder ucBuilder) {

		logger.info("Adding a payment");

		paymentService.save(payment);

		return new ResponseEntity<String>("Payment posted successfully", HttpStatus.CREATED);
		
	}
	
	//Update Payment
	
	@RequestMapping(value = "/pay/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUser(@PathVariable("id") long id, @PathVariable("role") String role, @RequestBody Payment payment) {
		logger.info("Updating Payment with id {}", id);
		Role currentRole=roleService.findById(id);
		User currentUser = userService.findById(id);

		if (currentRole.equals("admin")) {
			paymentService.updatePayment(payment);
			return new ResponseEntity<Payment>(payment, HttpStatus.OK);
		}
		else {
			logger.error("Unable to update. User with role {} not allowed.", role);
			return new ResponseEntity(new CustomErrorType("Unable to upate paymemt as your role is not an admin "),
					HttpStatus.NOT_FOUND);
		}
		
	}
	

}


