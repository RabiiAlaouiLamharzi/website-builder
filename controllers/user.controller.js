import { createUser, listUsers, loginUserService, createAdminUser } from '../services/user.services';
import passport from 'passport';

export const createUserController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await createUser({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: `Error creating user: ${error.message}` });
    }
};
export const usersList = async (req, res) => {
    try {
      const users = await listUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: `Error fetching users: ${error.message}` });
    }
  };
export const loginUserController = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication Error:', err);
            return res.status(500).json({ message: 'An error occurred during login', error: err });
        }
        if (!user) {
            console.log('Authentication Failed:', info.message);
            return res.status(400).json({ message: info.message });
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                console.error('Login Error:', loginErr);
                return res.status(500).json({ message: 'An error occurred during login', error: loginErr });
            }
            console.log('User Logged In:', user);
            res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res, next);
};
export const logoutUserController = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).json({ message: 'An error occurred during logout' });
        }
        req.session.destroy((sessionErr) => {
            if (sessionErr) {
                console.error('Session Destroy Error:', sessionErr);
                return res.status(500).json({ message: 'Error clearing session' });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: 'Logout successful' });
        });
    });
};


