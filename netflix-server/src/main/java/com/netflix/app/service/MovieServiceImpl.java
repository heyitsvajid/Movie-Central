package com.netflix.app.service;

import java.util.HashSet;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Movie;
import com.netflix.app.model.Role;
import com.netflix.app.model.User;
import com.netflix.app.repository.MovieRepository;
import com.netflix.app.util.PasswordEncoder;

@Service
public class MovieServiceImpl implements MovieService {
	@Autowired
	private MovieRepository movieRepository;

	@Override
	public Movie findById(long id) {
		// TODO Auto-generated method stub
		return movieRepository.findById(id);
	}

	@Override
	public void save(Movie movie) {
		// TODO Auto-generated method stub
		movieRepository.save(movie);
	}

	@Override
	public void updateMovie(Movie movie) {
		// TODO Auto-generated method stub
		movieRepository.save(movie);
	}

	@Override
	public void deleteMovieById(long id) {
		// TODO Auto-generated method stub
		movieRepository.delete(id);
		
	}

	@Override
	public List<Movie> findAllMovies() {
		// TODO Auto-generated method stub
		return movieRepository.findByDeleted("N");
	}

	@Override
	public void deleteAllMovies() {
		// TODO Auto-generated method stub
		movieRepository.deleteAll();
	}

	@PersistenceContext
    private EntityManager em;
	
	@Override
	public List<Movie> searchMovie(String query) {
		// TODO Auto-generated method stub
		List<Movie> results = em.createNativeQuery(query,Movie.class).getResultList();
		return results;
	}
	
	
}
