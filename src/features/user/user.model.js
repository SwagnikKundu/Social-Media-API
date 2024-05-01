let userCount =1;
export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  static signUp(name, email, password, type) {
    const newUser = new UserModel(
      name,
      email,
      password
    );
    newUser.id = ++userCount;
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find(
      (u) =>
        u.email == email && u.password == password
    );
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@social.com',
    password: 'Admin1234'
  }
];
