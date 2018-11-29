package com.netflix.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

////@EnableJpaAuditing 
//@Configuration @ComponentScan
//@SpringBootApplication
@SpringBootApplication(scanBasePackages={"com.netflix.app"},exclude = { SecurityAutoConfiguration.class } )
public class SpringBootRestApiApp {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootRestApiApp.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
            	System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

				registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST","PUT","OPTIONS",
						"DELETE").allowCredentials(true);
			}
		};
	}
}
