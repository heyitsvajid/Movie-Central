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
import com.netflix.app.model.User;
import com.netflix.app.model.View;
import com.netflix.app.model.ViewRequest;
import com.netflix.app.service.MovieService;
import com.netflix.app.service.UserService;
import com.netflix.app.service.ViewService;
import com.netflix.app.util.CustomErrorType;

@CrossOrigin
@RestController
public class ViewController {

	public static final Logger logger = LoggerFactory.getLogger(ViewController.class);

	@Autowired
	ViewService viewService;
	@Autowired
	ViewService roleService;
	@Autowired
	MovieService movieService;
	@Autowired
	UserService userService;

	// Service which will do all data retrieval/manipulation work for View
	// object

	// -------------------Retrieve All
	// Views---------------------------------------------

	@RequestMapping(value = "/views", method = RequestMethod.GET)
	public ResponseEntity<List<View>> listAllViews() {
		logger.info("Fetching all Views ");
		List<View> views = viewService.findAllViews();
		if (views.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<View>>(views, HttpStatus.OK);
	}

	// -------------------Retrieve Single
	// View------------------------------------------

	@RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getView(@PathVariable("id") long id) {
		logger.info("Fetching View with id {}", id);
		View view = viewService.findById(id);
		if (view == null) {
			logger.error("view with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("view with id " + id + " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<View>(view, HttpStatus.OK);
	}

	// -------------------Create view-------------------------------------------

	@RequestMapping(value = "/view", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@RequestBody ViewRequest viewRequest,UriComponentsBuilder ucBuilder) {
		logger.info("Creting View {}", viewRequest);

		Movie movie = null;
		User user = null;
		if (viewRequest.getMovieId() == 0) {
			logger.error("Movie ID not provided");
			return new ResponseEntity(new CustomErrorType("Unable to add View. Movie ID not provided"),
					HttpStatus.NOT_FOUND);
		} else {
			movie = movieService.findById(viewRequest.getMovieId());
		}

		if (viewRequest.getUserId() == 0) {
			logger.error("User ID not provided");
			return new ResponseEntity(new CustomErrorType("Unable to add View. User ID not provided"),
					HttpStatus.NOT_FOUND);
		} else {
			user = userService.findById(viewRequest.getUserId());
		}

		View view = new View(user, movie);
		view.setTimestamp(new Timestamp(System.currentTimeMillis()));
		viewService.save(view);
		HttpHeaders headers = new HttpHeaders();

		headers.setLocation(ucBuilder.path("/movie/{id}").buildAndExpand(view.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

	// ------------------- Update a View
	// ------------------------------------------------

	@RequestMapping(value = "/view/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateView(@PathVariable("id") long id, @RequestBody View user) {
		logger.info("Updating View with id {}", id);

		View currentView = viewService.findById(id);

		if (currentView == null) {
			logger.error("Unable to update. View with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to upate. View with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		viewService.updateView(currentView);
		return new ResponseEntity<View>(currentView, HttpStatus.OK);
	}

	// ------------------- Delete a
	// View-----------------------------------------

	@RequestMapping(value = "/view/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting view with id {}", id);

		View view = viewService.findById(id);
		if (view == null) {
			logger.error("Unable to delete. view with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. view with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		viewService.deleteViewById(id);
		return new ResponseEntity<View>(HttpStatus.NO_CONTENT);
	}

	// ------------------- Delete All Users-----------------------------

	@RequestMapping(value = "/view/", method = RequestMethod.DELETE)
	public ResponseEntity<View> deleteAllUsers() {
		logger.info("Deleting All views");

		viewService.deleteAllViews();
		return new ResponseEntity<View>(HttpStatus.NO_CONTENT);
	}

}