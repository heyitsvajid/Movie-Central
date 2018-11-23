package com.netflix.app.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	
	Movie findById(long id);
	Movie findByDeleted(String deleted);
	
}