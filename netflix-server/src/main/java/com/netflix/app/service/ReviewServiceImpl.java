package com.netflix.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Review;
import com.netflix.app.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{
	@Autowired
	private ReviewRepository reviewRepository;
//	
//	@Override
//	public Review findById(long id) {
//		// TODO Auto-generated method stub
//		return reviewRepository.findById(id);
//	}
	
	@Override
	public void save(Review review) {
		// TODO Auto-generated method stub
		reviewRepository.save(review);
	}
	
	@Override
	public List<Review> findAllReviewById(long id) {
		// TODO Auto-generated method stub
		return (List<Review>) reviewRepository.findAllReviewByMovieId(id);
	}

	
}