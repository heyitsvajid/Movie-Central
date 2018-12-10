package com.netflix.app.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Payment;
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
				View.class).getResultList();
		return results;
	}

	public List<Payment> findUniqueSubscriptionUsers() {
		List<Payment> results = em
				.createNativeQuery("select * from payment where subscription_id = 2  group by user_id ;", Payment.class)
				.getResultList();
		return results;
	}

	public List<Payment> findUniquePayPerViewUsers() {
		List<Payment> results = em
				.createNativeQuery("select * from payment where subscription_id = 3 group by user_id ;", Payment.class)
				.getResultList();
		return results;
	}

	public List<View> findUniqueActiveUsers(String string) {
		List<View> results = em.createNativeQuery("select * from view group by user_id,MONTH(timestamp);", View.class)
				.getResultList();
		return results;
	}

	public List<User> findUniqueUsers() {
		List<User> results = em.createNativeQuery("select * from user;", User.class).getResultList();
		return results;
	}

	public List<View> findUserPlayingHistory(String string) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<View> findUserMostPlays(String string) {
		List<View> results = em.createNativeQuery(
				"select *,count(*) as views from view group by user_id,DAY(timestamp) order by views desc;",
				View.class).getResultList();
		return results;

	}

	public List<View> findMovieMostPlays(String string) {
		List<View> results = em.createNativeQuery("select * from view group by DAY(timestamp),movie_id", View.class)
				.getResultList();
		return results;
	}

	public List<View> findTopTenMovieViews(String string) {
		List<View> results = em.createNativeQuery(
				"select *,count(*) as views from view group by movie_id,DAY(timestamp) order by views desc;",
				View.class).getResultList();
		return results;
	}


}
