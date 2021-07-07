function createUser(email, password, firstname, lastname) {
	UserModel.create({
		email: email,
		password: password,
		firstname: firstname,
		lastname: lastname,
	})
	return "true";
}