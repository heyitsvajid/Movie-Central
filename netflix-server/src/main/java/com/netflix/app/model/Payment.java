package com.netflix.app.model;
import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "payment")
@EntityListeners(AuditingEntityListener.class)

public class Payment {
	
	private Long id;
	private Long userId;
	private Long movieId;
	private Long subscription_type;
	private double amount;
	private String card_number;
	private Long exp_month;
	private Long exp_year;
	

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public Long getSubscription_type() {
		return subscription_type;
	}

	public void setSubscription_type(Long subscription_type) {
		this.subscription_type = subscription_type;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCard_number() {
		return card_number;
	}

	public void setCard_number(String card_number) {
		this.card_number = card_number;
	}

	public Long getExp_month() {
		return exp_month;
	}

	public void setExp_month(Long exp_month) {
		this.exp_month = exp_month;
	}

	public Long getExp_year() {
		return exp_year;
	}

	public void setExp_year(Long exp_year) {
		this.exp_year = exp_year;
	}

	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	
	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Payment() {
		super();
		this.id = 0l;
	}
	
	public Payment(Long id,Long userId,
			Long movieId,String card_number) 
	{
		super();
		setId(id);
		setUserId(userId);
		setMovieId(movieId);
		setCard_number(card_number);
	}


}
