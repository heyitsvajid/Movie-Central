package com.netflix.app.model;

public enum Roles {

	ADMIN {
		@Override
		public String toString() {
			return "ADMIN";

		}
	},
	CUSTOMER {
		@Override
		public String toString() {
			return "CUSTOMER";
		}
	}
}
