package com.netflix.app.model;

public enum Subscriptions {

	FREE {
		@Override
		public String toString() {
			return "FREE";

		}
	},
	SBCR {
		@Override
		public String toString() {
			return "SBCR";
		}
	},
	PPVO {
		@Override
		public String toString() {
			return "PPVO";
		}
	},
	PAID {
		@Override
		public String toString() {
			return "PAID";
		}
	}
}
