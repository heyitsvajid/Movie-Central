package com.netflix.app.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import com.netflix.app.model.Movie;
import com.netflix.app.model.Payment;
//import com.netflix.app.model.PaymentRequest;
import com.netflix.app.model.Role;
import com.netflix.app.model.Subscription;
import com.netflix.app.model.User;
import com.netflix.app.service.MovieService;
import com.netflix.app.service.PaymentService;
import com.netflix.app.service.RoleService;
import com.netflix.app.service.SubscriptionService;
import com.netflix.app.service.UserService;

@RestController
public class PaymentController {

	public static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

	@Autowired
	PaymentService paymentService;
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	@Autowired
	MovieService movieService;
	@Autowired
	SubscriptionService subscriptionService;

	// Retreive list of payments for a particular user and if the user is an
	// admin, he can have the access to all the payments.

	@RequestMapping(value = "/payment/{userId}", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> findAllPaymentByUserId(@PathVariable("userId") long userId) {

		User user = userService.findById(userId);
		Role role_admin = roleService.findById(userId);

		List<Payment> payments = paymentService.findAll();
		if (role_admin.equals("admin")) {
			logger.info("Fetching all Payments for admin analysis");
			if (payments.isEmpty()) {
				return new ResponseEntity(HttpStatus.NO_CONTENT);
				// You many decide to return HttpStatus.NOT_FOUND
			} else {
				return new ResponseEntity<List<Payment>>(payments, HttpStatus.OK);
			}
		}
		List<Payment> payment = paymentService.findAllPaymentByUserId(userId);
		if (payment.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		} else {
			logger.info("Fetching all Payments for user id {} ", userId);
			return new ResponseEntity<List<Payment>>(payment, HttpStatus.OK);
		}
	}

	// Fetch all payments.
	@RequestMapping(value = "/payments", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> findAllPayment() {

		List<Payment> payments = paymentService.findAll();
		logger.info("Fetching all Payments for admin analysis");
		if (payments == null) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Payment>>(payments, HttpStatus.OK);
		}
	}

	// Retreive data for particular payment id.
	@RequestMapping(value = "/payment/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> listPaymentId(@PathVariable("id") long id) {
		logger.info("Fetching all Payments ");
		List<Payment> p = paymentService.findAllPaymentById(id);
		if (p == null) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Payment>>(p, HttpStatus.OK);
	}

	// Make a payment
//	@RequestMapping(value = "/payment", method = RequestMethod.POST)
//	public ResponseEntity<?> addPayment(@RequestBody PaymentRequest paymentRequest, UriComponentsBuilder ucBuilder) {
//
//		// To be Implemented based on subscription type
//		Date endDate = new Timestamp(System.currentTimeMillis());
//
//		User user = userService.findById(paymentRequest.getUserId());
//		Movie movie = movieService.findById(paymentRequest.getMovieId());
//
//		Subscription subscription = subscriptionService.findSubscriptionByType(paymentRequest.getSubscriptionType());
//
//		if (user == null) {
//			return new ResponseEntity<String>("User does not exists", HttpStatus.BAD_REQUEST);
//		}
//		if (user == null) {
//			return new ResponseEntity<String>("Movie does not exists", HttpStatus.BAD_REQUEST);
//		}
//
//		if (subscription == null) {
//			return new ResponseEntity<String>("Subscription type does not exists", HttpStatus.BAD_REQUEST);
//		}
//		Payment payment = new Payment(paymentRequest.getAmount(), paymentRequest.getCardNumber(),
//				paymentRequest.getExpMonth(), paymentRequest.getExpYear(), endDate,
//				new Timestamp(System.currentTimeMillis()), subscription, user, movie);
//
//		logger.info("Adding a payment");
//		logger.info("{}", payment);
//
//		paymentService.save(payment);
//
//		return new ResponseEntity<String>("Payment posted successfully", HttpStatus.CREATED);
//
//	}
}
