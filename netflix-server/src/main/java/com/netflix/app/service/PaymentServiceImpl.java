package com.netflix.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.app.model.Payment;
import com.netflix.app.repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService{

	@Autowired
	private PaymentRepository paymentRepository;
//	
//	@Override
//	public Review findById(long id) {
//		// TODO Auto-generated method stub
//		return reviewRepository.findById(id);
//	}

	@Override
	public void save(Payment payment) {
		// TODO Auto-generated method stub
		paymentRepository.save(payment);
		
	}

	@Override
	public List<Payment> findAllPaymentByUserId(long user_id) {
		// TODO Auto-generated method stub
		return (List<Payment>) paymentRepository.findAllPaymentByUserId(user_id);
	}

	@Override
	public List<Payment> findAllPaymentById(long id) {
		// TODO Auto-generated method stub
		return (List<Payment>) paymentRepository.findAllPaymentById(id);
	}
	

}
