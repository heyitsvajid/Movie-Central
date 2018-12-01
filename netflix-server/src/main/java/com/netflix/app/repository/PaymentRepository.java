package com.netflix.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.netflix.app.model.Payment;



public interface PaymentRepository extends JpaRepository<Payment, Long>{
	
	List<Payment> findAllPaymentByUserId(long user_id);
	List<Payment> findAllPaymentById(long id);
	List<Payment> findAll();
	Payment findById(long id);

}
