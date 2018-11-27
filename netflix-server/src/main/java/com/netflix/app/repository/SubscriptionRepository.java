package com.netflix.app.repository;

import java.util.List;

import com.netflix.app.model.Subscription;

public interface SubscriptionRepository {
	void save (Subscription subscription);
	List<Subscription> findAllSubscriptions();
	List<Subscription> findSubscriptionById(long id);
	List<Subscription> findAllSubscriptionByUserId(long user_id);

}
