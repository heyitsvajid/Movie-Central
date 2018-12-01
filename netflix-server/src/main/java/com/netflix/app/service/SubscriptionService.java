package com.netflix.app.service;

import java.util.List;
import com.netflix.app.model.Subscription;

public interface SubscriptionService {
	
	void save(Subscription subscription);
	Subscription findSubscriptionById(long id);
	Subscription findSubscriptionByType(String type);

	List<Subscription> findAllSubscriptions();

}
