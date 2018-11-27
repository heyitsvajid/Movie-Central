package com.netflix.app.model;

public class ViewRequest {

	private long userId;
	private long movieId;

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

	public ViewRequest() {
		super();
	}

	@Override
	public String toString() {
		return "ViewRequest [userId=" + userId + ", movieId=" + movieId + "]";
	}

	public ViewRequest(long userId, long movieId) {
		super();
		this.userId = userId;
		this.movieId = movieId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (movieId ^ (movieId >>> 32));
		result = prime * result + (int) (userId ^ (userId >>> 32));
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
		ViewRequest other = (ViewRequest) obj;
		if (movieId != other.movieId)
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

}
