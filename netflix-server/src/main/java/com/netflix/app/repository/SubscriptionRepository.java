package com.netflix.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Subscription;

public interface SubscriptionRepository  extends JpaRepository<Subscription, Long> {
	Subscription findSubscriptionById(long id);
	Subscription findSubscriptionByType(String type);

}
