package com.netflix.app.service;

import java.util.List;
import com.netflix.app.model.Subscription;

public interface SubscriptionService {
	
	void save(Subscription subscription);
	List<Subscription> findAllSubscriptionByUserId(long user_id);
	List<Subscription> findAllSubscriptionById(long id);
	List<Subscription> findAllSubscriptions();

}
