package com.netflix.app.model;

import java.util.Date;

public class PaymentRequest {
	private Double amount;
	private String cardNumber;
	private int expMonth;
	private int expYear;
	private long userId;
	private long movieId;
	private String subscriptionType;
	private Date endDate;
	
	

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public int getExpMonth() {
		return expMonth;
	}

	public void setExpMonth(int expMonth) {
		this.expMonth = expMonth;
	}

	public int getExpYear() {
		return expYear;
	}

	public void setExpYear(int expYear) {
		this.expYear = expYear;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getMovieId() {
		return movieId;
	}

	public void setMovieId(long movieId) {
		this.movieId = movieId;
	}

	public String getSubscriptionType() {
		return subscriptionType;
	}

	public void setSubscriptionType(String subscriptionId) {
		this.subscriptionType = subscriptionId;
	}
	
	public PaymentRequest() {
		super();
	}

	public PaymentRequest(Date endDate, Double amount, String cardNumber, int expMonth, int expYear, long userId, long movieId,
			String subscriptionType) {
		super();
		this.endDate = endDate;
		this.amount = amount;
		this.cardNumber = cardNumber;
		this.expMonth = expMonth;
		this.expYear = expYear;
		this.userId = userId;
		this.movieId = movieId;
		this.subscriptionType = subscriptionType;
	}

	
}
