Team Members:

Name                  Email                             Student ID
Vajid Kagdi           vajid.kagdi@sjsu.edu              012528971
Murtaza Manasawala    murtaza.manasawala@sjsu.edu       012541828
Jaykumar Patel        jaykumar.a.patel@sjsu.edu         012548432
Akshat Shah           akshatalpesh.shah@sjsu.edu        012535627

URL: 


Build instructions:

Go to path from terminal: /netflix-client
  1. npm install
  2. npm start
  3. Browse to localhost:3006/login

Go to path form terminal: /netflix-server
  1. mvn package
  2. mvn spring-boot:run
  

Bonus Features
  1. Movie Recommendation: We store the viewing history of the user. On home page based on that viewing history we get all movies which match top viewed movies and based on the genre of those search new movies to be shown as recommended movies. We are using MySQL FULLTEXT search feature to compare genres of different movies and get similarity with the help of MATCH() and AGAINST() function. 
  
  2. Solr Search: 
