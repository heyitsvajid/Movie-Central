//package com.netflix.app.controller;
//import org.apache.solr.client.solrj.SolrClient;
//import org.apache.solr.client.solrj.impl.HttpSolrClient;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.Configuration;
//
//
//@Configuration
//@ComponentScan
//
//public class DBClient {
//	@Bean
//	public static SolrClient getConnection() {
//		SolrClient solr = new HttpSolrClient.Builder(/*SolrConfig.BASE_URL*/"http://localhost:8983/solr").build();
//		return solr;
//	}
//}