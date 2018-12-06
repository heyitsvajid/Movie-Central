package com.netflix.app.controller;

import java.util.ArrayList;
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

import com.netflix.app.model.Movie;
import com.netflix.app.model.SearchRequest;
import com.netflix.app.service.MovieService;
import com.netflix.app.util.CustomErrorType;
import com.netflix.app.util.QueryBuilder;

@RestController
public class MovieController {

	public static final Logger logger = LoggerFactory.getLogger(MovieController.class);

	@Autowired
	MovieService movieService;
	
	// Service which will do all data retrieval/manipulation work for Movie
	// Movies---------------------------------------------

	@RequestMapping(value = "/movies", method = RequestMethod.GET)
	public ResponseEntity<List<Movie>> findAllMovies() {
		logger.info("Fetching all Movies ");
		List<Movie> movies = movieService.findAllMovies();
		if (movies.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<Movie>>(movies, HttpStatus.OK);
	}

	// -------------------Retrieve Single
	// Movie------------------------------------------

	@RequestMapping(value = "/movie/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getMovie(@PathVariable("id") long id) {
		logger.info("Fetching Movie with id {}", id);
		Movie movie = movieService.findById(id);
		if (movie == null || movie.getDeleted().equals("Y")) {
			logger.error("Movie with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Movie with id " + id + " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Movie>(movie, HttpStatus.OK);
	}

	// -------------------Add a
	// Movie-------------------------------------------

	@RequestMapping(value = "/movie", method = RequestMethod.POST)
	public ResponseEntity<?> addMovie(@RequestBody Movie movie,UriComponentsBuilder ucBuilder) {

		logger.info("Adding a movie");
		movie.setCreatedAt(new Date());
		movie.setDeleted("N");
		movieService.save(movie);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/movie/{id}").buildAndExpand(movie.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
		
	}

//	 ------------------- Update a Movie
//	 ------------------------------------------------

	@RequestMapping(value = "/movie/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody Movie movie) {
		logger.info("Updating Movie with id {}", id);

		Movie currentMovie = movieService.findById(id);
		currentMovie.setUpdatedAt(new Date());
		if (currentMovie == null || currentMovie.getDeleted().equals("Y")) {
			logger.error("Unable to update. Movie with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to upate Movie with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		movieService.updateMovie(movie);
		logger.info(currentMovie.getStudio());
		return new ResponseEntity<Movie>(movie, HttpStatus.OK);
	}
	

//	// ------------------- Delete a
//	// Movie-----------------------------------------

	@RequestMapping(value = "/movie/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteMovie(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting Movie with id {}", id);

		Movie movie = movieService.findById(id);
		if (movie == null) {
			logger.error("Unable to delete. Movie with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. Movie with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		movie.setDeleted("Y");
		movieService.save(movie);
		return new ResponseEntity<Movie>(HttpStatus.NO_CONTENT);
	}
	
//	// ------------------- Search 
//	// Movie-----------------------------------------

	@RequestMapping(value = "/movie/search", method = RequestMethod.POST)
	public ResponseEntity<?> searchMovie(@RequestBody SearchRequest search) {
		logger.info("Searching Movies");

		System.out.println(search.getSearch());
		String query = QueryBuilder.buildMovieSearchQuery(search.getSearch());
		
//		System.out.println(query);
		
		List<Movie> movies = movieService.searchMovie(query);
		
		if (movies == null) {
			logger.error("Unable to find related movie");
			return new ResponseEntity(new CustomErrorType("Unable to find related movie"),
					HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Movie>>(movies, HttpStatus.OK);
	}

}