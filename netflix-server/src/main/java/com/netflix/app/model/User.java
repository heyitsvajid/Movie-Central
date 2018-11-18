package com.netflix.app.model;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

	private Long id;
	private String name;
	private String password;
	private String email;
	private Role role;

	@Enumerated(EnumType.STRING)
	@org.hibernate.annotations.ColumnDefault("N")
	private BooleanEnum activated; // 'Y' || 'N'

	@Enumerated(EnumType.STRING)
	@org.hibernate.annotations.ColumnDefault("N")
	private BooleanEnum deleted; // 'Y' || 'N'
	
	
	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;


	public BooleanEnum getActivated() {
		return activated;
	}

	public void setActivated(BooleanEnum activated) {
		this.activated = activated;
	}

	public BooleanEnum getDeleted() {
		return deleted;
	}

	public void setDeleted(BooleanEnum deleted) {
		this.deleted = deleted;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "role_id")
	public Role getRole() {
		return role;
	}

	public User() {
		super();
		this.id = 0l;
	}

	
	
	public User(Long id, String name, String password, String email, Role role, BooleanEnum activated) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.email = email;
		this.role = role;
		this.activated = activated;
		this.deleted = deleted;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}
}