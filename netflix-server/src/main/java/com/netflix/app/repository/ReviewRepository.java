package com.netflix.app.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

//	Review findById(long id);
	List<Review> findAllReviewByMovieId(long id);
}