package com.netflix.app.service;


import java.util.List;
import com.netflix.app.model.Payment;

public interface PaymentService {

	
	void save(Payment payment);
	List<Payment> findAllPaymentByUserId(long user_id);
	List<Payment> findAllPaymentById(long id);
}

