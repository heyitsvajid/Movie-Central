package com.netflix.app.model;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "payment")
@EntityListeners(AuditingEntityListener.class)
public class Payment {

	private Long id;
	private Double amount;
	private String cardNumber;
	private int expMonth;
	private int expYear;
	private Date endAt;
	private Date startAt;
	private Subscription subscription;
	private User user;
	private Movie movie;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "userId")
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "movieId")	
	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
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

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Payment() {
		super();
		this.id = 0l;

	}

	public Date getEndAt() {
		return endAt;
	}

	public void setEndAt(Date endAt) {
		this.endAt = endAt;
	}

	public Date getStartAt() {
		return startAt;
	}

	public void setStartAt(Date startAt) {
		this.startAt = startAt;
	}

	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "subscriptionId")
	public Subscription getSubscription() {
		return subscription;
	}

	public void setSubscription(Subscription subscription) {
		this.subscription = subscription;
	}

	public Payment(Double amount, String cardNumber, int expMonth, int expYear, Date endAt, Date startAt,
			Subscription subscription, User user, Movie movie) {
		super();
		this.amount = amount;
		this.cardNumber = cardNumber;
		this.expMonth = expMonth;
		this.expYear = expYear;
		this.endAt = endAt;
		this.startAt = startAt;
		this.subscription = subscription;
		this.user = user;
		this.movie = movie;
	}

}
