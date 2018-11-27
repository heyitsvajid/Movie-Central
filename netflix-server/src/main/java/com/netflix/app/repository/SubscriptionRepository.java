package com.netflix.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Subscription;
import com.netflix.app.model.User;

public interface SubscriptionRepository  extends JpaRepository<Subscription, Long> {
	List<Subscription> findSubscriptionById(long id);

}
