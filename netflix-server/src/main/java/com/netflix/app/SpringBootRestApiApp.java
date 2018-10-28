package com.netflix.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


//@Configuration @EnableAutoConfiguration @ComponentScan
@SpringBootApplication(scanBasePackages={"com.netflix.app"} ,exclude = { SecurityAutoConfiguration.class }) //@EnableJpaAuditing 
public class SpringBootRestApiApp {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootRestApiApp.class, args);
	}
}
