package com.netflix.app.controller;

import java.util.List;
import java.util.UUID;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import com.netflix.app.model.Roles;
import com.netflix.app.model.User;
import com.netflix.app.service.ObjectService;
import com.netflix.app.service.RoleService;
import com.netflix.app.service.UserService;
import com.netflix.app.util.CustomErrorType;
import com.netflix.app.util.EmailService;
import com.netflix.app.util.PasswordEncoder;

@CrossOrigin
@RestController
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	@Autowired
	ObjectService objectService;
	@Autowired
	EmailService es;

	// Service which will do all data retrieval/manipulation work for User
	// object

	// -------------------Retrieve All
	// Users---------------------------------------------

	@RequestMapping(value = "/users/", method = RequestMethod.GET)
	public ResponseEntity<List<User>> listAllUsers() {
		logger.info("Fetching all Users ");
		List<User> users = objectService.getUsersTest();
		if (users.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	// -------------------Retrieve Single
	// User------------------------------------------

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable("id") long id) {
		logger.info("Fetching User with id {}", id);
		User user = userService.findById(id);
		if (user == null) {
			logger.error("User with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("User with id " + id + " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	// -------------------Create a
	// User-------------------------------------------

	@RequestMapping(value = "/signup/{role}", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@RequestBody User user, @PathVariable("role") String role,
			UriComponentsBuilder ucBuilder) {

		logger.info("Sign Up API called");

		if (role.equalsIgnoreCase("admin")) {
			String[] temp;
			String delimiter = "@";
			temp = user.getEmail().split(delimiter);
			if ("sjsu.edu".equalsIgnoreCase(temp[1])) {
				user.setRole(roleService.findByName(Roles.ADMIN.name()));

			} else {
				logger.error("Invalid email domain for ADMIN role {}", temp[1]);
				return new ResponseEntity(new CustomErrorType("Invalid email domain for ADMIN role"),
						HttpStatus.CONFLICT);
			}

		} else {
			user.setRole(roleService.findByName(Roles.CUSTOMER.name()));
		}

		if (userService.findByEmailAndRole(user.getEmail(), user.getRole()) != null) {
			logger.error("Unable to create. A User with email {} and role {} already exist", user.getEmail(),
					user.getRole().getName());
			return new ResponseEntity(new CustomErrorType("Unable to create. A User with email " + user.getEmail()
					+ " and role " + user.getRole().getName() + " already exist."), HttpStatus.CONFLICT);
		}
		UUID uuid = UUID.randomUUID();

		user.setActivated(uuid.toString());
		user.setDeleted("N");
		userService.save(user);

		String url = "localhost:8080/SpringBootRestApi/activate/" + uuid.toString() + "--" + user.getId();
		try {
			es.sendMail(user.getEmail(), url, user.getName());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("Error sending email");
			e.printStackTrace();
		}

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/user/{id}").buildAndExpand(user.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

	// ------------------- Update a User
	// ------------------------------------------------

	@RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody User user) {
		logger.info("Updating User with id {}", id);

		User currentUser = userService.findById(id);

		if (currentUser == null) {
			logger.error("Unable to update. User with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to upate. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		userService.updateUser(currentUser);
		return new ResponseEntity<User>(currentUser, HttpStatus.OK);
	}

	// ------------------- Delete a
	// User-----------------------------------------

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting User with id {}", id);

		User user = userService.findById(id);
		if (user == null) {
			logger.error("Unable to delete. User with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. User with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		userService.deleteUserById(id);
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}

	// ------------------- Delete All Users-----------------------------

	@RequestMapping(value = "/user/", method = RequestMethod.DELETE)
	public ResponseEntity<User> deleteAllUsers() {
		logger.info("Deleting All Users");

		userService.deleteAllUsers();
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
	}

	// ------------------- Login User-----------------------------

	@RequestMapping(value = "/login/{role}", method = RequestMethod.POST)
	public ResponseEntity<?> login(@RequestBody User user, @PathVariable("role") String role, HttpSession session) {
		logger.info("Fetching User with username and password {}", user.getEmail());
		if (user.getEmail() != null && user.getPassword() != null) {

			if (role.equalsIgnoreCase("admin")) {
				user.setRole(roleService.findByName(Roles.ADMIN.name()));
			} else {
				user.setRole(roleService.findByName(Roles.CUSTOMER.name()));
			}

			User userDetails = userService.findByEmailAndRole(user.getEmail(), user.getRole());

			if (userDetails == null) {
				logger.error("User with email {} and role {} not found.", user.getEmail(), role);
				return new ResponseEntity(
						new CustomErrorType("User with email " + user.getEmail() + "and role " + role + " not found."),
						HttpStatus.NOT_FOUND);
			} else if (PasswordEncoder.checkPassword(user.getPassword(), userDetails.getPassword())) {
				logger.error("Email {} and its password matched", user.getEmail());

				if (userDetails.getActivated().equals("Y")) {
					session.setAttribute("email", userDetails.getEmail());
					session.setAttribute("name", userDetails.getName());
					session.setAttribute("id", userDetails.getId());
					session.setAttribute("role", userDetails.getRole().getName());
					return new ResponseEntity<User>(userDetails, HttpStatus.OK);
				} else {
					logger.error("Account not activated yet" + userDetails.getEmail());
					return new ResponseEntity(new CustomErrorType("Account not activated yet"),
							HttpStatus.UNAUTHORIZED);
				}

			} else {
				logger.error("Email and password not match for: " + userDetails.getEmail());
				return new ResponseEntity(new CustomErrorType("Email and password mismatch"), HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity(new CustomErrorType("No email or password in request"), HttpStatus.UNAUTHORIZED);
		}
	}

	// ------------------- Check session -----------------------------

	@RequestMapping(value = "/isLoggedIn", method = RequestMethod.GET)
	public ResponseEntity<?> isLoggedIn(HttpSession session) {
		logger.info("Under /isLoggedIn Request");
		logger.info(session.getAttribute("email") + "");

		if (session.getAttribute("email") != null) {
			logger.info("User already logged in");
			return new ResponseEntity<>(userService.findByEmail(session.getAttribute("email") + ""), HttpStatus.OK);
		} else {
			return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
		}
	}

	// ------------------- Check session -----------------------------

	@RequestMapping(value = "/activate/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> activateUser(@PathVariable("id") String id) {
		logger.info("Under /isLoggedIn Request");

		String[] temp = id.split("--");
		logger.info("Looking for user id {} and {}", temp[temp.length - 1], temp[0]);

		User user = userService.findById(Long.parseLong(temp[temp.length - 1]));
		logger.info("User found with activation key {}", user.getActivated());

		if (user.getActivated().equals(temp[0])) {
			logger.info("User account activated");
			user.setActivated("Y");
			userService.save(user);
			return new ResponseEntity<>("Account activated. Sign In to continue", HttpStatus.OK);
		} else {
			return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
		}
	}

}