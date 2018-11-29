package com.netflix.app.model;

public class SearchRequest {

		private String search;

		public String getSearch() {
			return search;
		}

		public void setSearch(String search) {
			this.search = search;
		}

		public SearchRequest(String search) {
			super();
			this.search = search;
		}

		public SearchRequest() {
			super();
		}
		
		
}
