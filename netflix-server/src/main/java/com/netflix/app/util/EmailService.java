package com.netflix.app.util;

public interface EmailService {
	public void sendMail(String to,String url, String name) throws Exception;
}
