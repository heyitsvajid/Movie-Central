package com.netflix.app.controller;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import com.netflix.app.model.Movie;
import com.netflix.app.model.Payment;
import com.netflix.app.model.Review;
import com.netflix.app.model.User;
import com.netflix.app.model.View;
import com.netflix.app.model.ViewRequest;
import com.netflix.app.service.MovieService;
import com.netflix.app.service.ObjectService;
import com.netflix.app.service.UserService;
import com.netflix.app.service.ViewService;
import com.netflix.app.util.CustomErrorType;

@CrossOrigin
@RestController
public class AnalyticsController {

	public static final Logger logger = LoggerFactory.getLogger(AnalyticsController.class);

	@Autowired
	ViewService viewService;
	@Autowired
	ViewService roleService;
	@Autowired
	MovieService movieService;
	@Autowired
	UserService userService;
	@Autowired
	ObjectService objectService;

	// -------------------uniqueSubscriptionUsers month by
	// month-------------------------------------------

	@RequestMapping(value = "/uniqueSubscriptionUsers", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> uniqueSubscriptionUsers() {
		logger.info("Fetching all Views ");
		List<Payment> payments = objectService.findUniqueSubscriptionUsers();
		if (payments.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Payment>>(payments, HttpStatus.OK);
	}

	// -------------------uniquePayPerViewUsers month by
	// month-------------------------------------------

	@RequestMapping(value = "/uniquePayPerViewUsers", method = RequestMethod.GET)
	public ResponseEntity<List<Payment>> uniquePayPerViewUsers() {
		logger.info("Fetching all Views ");
		List<Payment> payments = objectService.findUniquePayPerViewUsers();
		if (payments.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Payment>>(payments, HttpStatus.OK);
	}

	// -------------------uniqueActiveUsers month by
	// month-------------------------------------------

	@RequestMapping(value = "/uniqueActiveUsers", method = RequestMethod.GET)
	public ResponseEntity<List<View>> uniqueActiveUsers() {
		logger.info("Fetching all Views ");
		List<View> views = objectService.findUniqueActiveUsers("");
		if (views.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<View>>(views, HttpStatus.OK);
	}

	@RequestMapping(value = "/userPlayingHistory", method = RequestMethod.GET)
	public ResponseEntity<List<View>> userPlayingHistory() {
		logger.info("Fetching all Views ");
		List<View> views = objectService.findUserPlayingHistory("");
		if (views.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<View>>(views, HttpStatus.OK);
	}

	
	@RequestMapping(value = "/userMostPlays", method = RequestMethod.GET)
	public ResponseEntity<List<View>> userMostPlays() {
		logger.info("Fetching all Views ");
		List<View> views = objectService.findUserMostPlays("");
		if (views.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<View>>(views, HttpStatus.OK);
	}

	@RequestMapping(value = "/movieMostPlays", method = RequestMethod.GET)
	public ResponseEntity<List<View>> movieMostPlays() {
		logger.info("Fetching all Views ");
		List<View> views = objectService.findMovieMostPlays("");
		if (views.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<View>>(views, HttpStatus.OK);
	}

	@RequestMapping(value = "/topTenMovieViews", method = RequestMethod.GET)
	public ResponseEntity<List<View>> topTenMovieViews() {
		logger.info("Fetching all Views ");
		List<View> views = objectService.findTopTenMovieViews("");
		if (views.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<View>>(views, HttpStatus.OK);
	}

}