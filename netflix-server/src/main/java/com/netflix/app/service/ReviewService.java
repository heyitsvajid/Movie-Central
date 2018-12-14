package com.netflix.app.service;


import java.util.List;
import com.netflix.app.model.Review;

public interface ReviewService {
	
//	Review findById(long id);
	void save(Review review);
	List<Review> findAllReviewById(long id);
	List<Review> findAll();
//	void deleteReviewById(long id);
//	void deleteAllReview(long id);
	
}