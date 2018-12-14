package com.netflix.app.controller;

import java.util.Date;
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

import com.netflix.app.model.Review;
import com.netflix.app.model.View;
import com.netflix.app.service.ObjectService;
import com.netflix.app.service.ReviewService;

@RestController
public class ReviewController {

	public static final Logger logger = LoggerFactory.getLogger(MovieController.class);

	@Autowired
	ReviewService reviewService;
	@Autowired
	ObjectService objectService;

	
	// Service which will do all data retrieval/manipulation work for Review
	// Reviews---------------------------------------------

	@RequestMapping(value = "/review/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Review>> findAllReviews(@PathVariable("id") long id) {
		logger.info("Fetching all Reviews for movie id {} ", id);
		
		List<Review> reviews = reviewService.findAllReviewById(id);
		if (reviews.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}
	
	// -------------------Add a
	// Review-------------------------------------------

	@RequestMapping(value = "/review", method = RequestMethod.POST)
	public ResponseEntity<?> addReview(@RequestBody Review review,UriComponentsBuilder ucBuilder) {

		logger.info("Adding a review");
		review.setCreatedAt(new Date());
		reviewService.save(review);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/review/{id}").buildAndExpand(review.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
		
	}
	
	@RequestMapping(value = "/reviews", method = RequestMethod.GET)
	public ResponseEntity<List<Review>> findAll() {
		logger.info("Fetching all reviews");
		
		List<Review> reviews = reviewService.findAll();
		if (reviews.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}
	
	// -------------------Top 10 rated movies-------------------------------------------

	@RequestMapping(value = "/topTenRatedMovies", method = RequestMethod.GET)
	public ResponseEntity<List<Review>> movieScoreboard() {
		logger.info("Fetching all Views ");
		List<Review> reviews = objectService.findTopTenRatedMovies("");
		if (reviews.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Review>>(reviews, HttpStatus.OK);
	}

}