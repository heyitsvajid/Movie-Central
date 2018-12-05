package com.netflix.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.app.model.User;
import com.netflix.app.model.View;
import com.netflix.app.repository.ViewRepository;

@Service
public class ViewServiceImpl implements ViewService {
	@Autowired
	private ViewRepository viewRepository;

	@Override
	public View findById(long id) {
		return viewRepository.findById(id);
	}

	@Override
	public View findByMovieId(String movieId) {
		return viewRepository.findByMovieId(movieId);
	}

	@Override
	public List<View> findAllViews() {
		// TODO Auto-generated method stub
		return viewRepository.findAll();
	}

	@Override
	public void updateView(View view) {
		viewRepository.save(view);
		// TODO Auto-generated method stub

	}

	@Override
	public void deleteViewById(long id) {
		viewRepository.delete(id);
	}

	@Override
	public void deleteAllViews() {
		// TODO Auto-generated method stub
		viewRepository.deleteAll();
	}

	@Override
	public void save(View view) {
		// TODO Auto-generated method stub
		viewRepository.save(view);
	}

	@Override
	public List<View> findByUser(User user) {
		// TODO Auto-generated method stub
		return viewRepository.findByUserOrderByTimestamp(user);
	}
}
