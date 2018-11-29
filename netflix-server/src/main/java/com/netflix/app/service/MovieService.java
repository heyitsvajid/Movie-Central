package com.netflix.app.service;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.netflix.app.model.Movie;

public interface MovieService {

	Movie findById(long id);

	void save(Movie movie);

	void updateMovie(Movie movie);

	void deleteMovieById(long id);

	List<Movie> findAllMovies();

	void deleteAllMovies();
	
	List<Movie> searchMovie(String query);

}