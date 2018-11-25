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

	public Payment() {
		// TODO Auto-generated constructor stub
	}

}
