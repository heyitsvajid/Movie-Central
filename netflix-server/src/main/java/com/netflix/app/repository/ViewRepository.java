package com.netflix.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.netflix.app.model.View;

public interface ViewRepository extends JpaRepository<View, Long> {
    	
	View findByMovieId(String movieId);
	View findById(long id);
}
