package com.netflix.app.service;

import java.util.List;
import com.netflix.app.model.User;
import com.netflix.app.model.View;

public interface ViewService {
	View findById(long id);

	View findByMovieId(String name);

	void save(View view);

	void updateView(View view);

	void deleteViewById(long id);

	List<View> findAllViews();

	void deleteAllViews();

	List<View> findByUser(User user);

}
