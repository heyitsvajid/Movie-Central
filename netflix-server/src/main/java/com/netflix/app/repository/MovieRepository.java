package com.netflix.app.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	
	Movie findById(long id);
	List<Movie> findByDeleted(String deleted);
//	List<Movie> searchMovie();
}