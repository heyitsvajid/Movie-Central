package com.netflix.app.model;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "view")
@EntityListeners(AuditingEntityListener.class)
public class View {

	private Long id;
	private User user;
	private Movie movie;

	private Timestamp timestamp;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "movieId")
	public Movie getMovie() {
		return movie;
	}

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "userId")
	public User getUser() {
		return user;
	}

	public View() {
		super();
		this.id = 0l;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public View(User user, Movie movie) {
		super();
		this.user = user;
		this.movie = movie;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		View other = (View) obj;
		if (id != other.id)
			return false;
		return true;
	}
}