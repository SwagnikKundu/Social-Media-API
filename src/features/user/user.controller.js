import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';

export default class UserController {
  signUp(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    console.log(req.body);
    if(!name || !email || !password)
      return res.status(404).send('Invalid request body');
    const user = UserModel.signUp(
      name,
      email,
      password
    );
    res.status(201).send(user);
  }

  signIn(req, res) {
    const result = UserModel.signIn(
      req.body.email,
      req.body.password
    );
    if (!result) {
      return res
        .status(400)
        .send('Incorrect Credentials');
    } else {
      // 1. Create token.
      const token = jwt.sign(
        {
          userId: result.id,
          email: result.email,
        },
        'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
        {
          expiresIn: '1h',
        }
      );

      // 2. Send token.
      return res.status(200).send(token);
    }
  }
}
