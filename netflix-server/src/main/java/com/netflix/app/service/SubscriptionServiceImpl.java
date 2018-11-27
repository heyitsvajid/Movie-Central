package com.netflix.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Subscription;
import com.netflix.app.repository.SubscriptionRepository;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{

	public SubscriptionServiceImpl() {
		// TODO Auto-generated constructor stub
	}
	
	@Autowired
	private SubscriptionRepository subscriptionRepository;

	@Override
	public void save(Subscription subscription) {
		// TODO Auto-generated method stub
		subscriptionRepository.save(subscription);
	}

	@Override
	public List<Subscription> findAllSubscriptionById(long id) {
		// TODO Auto-generated method stub
		return (List<Subscription>) subscriptionRepository.findSubscriptionById(id);
	}

	@Override
	public List<Subscription> findAllSubscriptions() {
		// TODO Auto-generated method stub
		return (List<Subscription>) subscriptionRepository.findAll();
	}


}
