package com.netflix.app.util;

public class QueryBuilder {
	public static String buildMovieSearchQuery(String search){

	       String[] conditions = search.split(" ");
	       StringBuilder query = new StringBuilder("SELECT * from movie where deleted = 'N' AND (");
	       
	       int i = 1;
	       for(String item: conditions){

	       String appendString = " CONCAT_WS('#', actors, director, title, synopsis, studio) like '%" + item+"%' ";
	       query.append(appendString);
	       
	       if(i<conditions.length){
	       query.append("AND");
	       i++;            
	       }
	           
	       }
	       query.append(")");
	       
	       System.out.println(query.toString());
	       return query.toString();
	    }
	    
	    public static void main(String[] args){
	    		buildMovieSearchQuery("test1 test2 test3");
	    }
}
