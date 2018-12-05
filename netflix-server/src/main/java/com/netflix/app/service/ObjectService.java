package com.netflix.app.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Review;
import com.netflix.app.model.User;
import com.netflix.app.model.View;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class ObjectService {

	@PersistenceContext
	private EntityManager em;

	public List<User> getUsersTest() {
		List<User> results = em.createNativeQuery("SELECT * FROM user", User.class).getResultList();
		return results;
	}

	public List<Review> findTopTenRatedMovies(String query) {
		List<Review> results = em.createNativeQuery(
				"SELECT *,SUM(rating)/COUNT(rating) as AVG FROM review where (`created_at` > DATE_SUB(now(), INTERVAL 30 DAY)) GROUP BY movie_id order by AVG desc LIMIT 10;",
				Review.class).getResultList();
		return results;
	}

	public List<View> findTopTenViewedMovies(String string) {
		List<View> results = em.createNativeQuery(
				"SELECT *, COUNT(id) as count FROM view where (`timestamp` > DATE_SUB(now(), INTERVAL 30 DAY)) GROUP BY movie_id order by count desc LIMIT 10;",
				Review.class).getResultList();
		return results;
	}

}
