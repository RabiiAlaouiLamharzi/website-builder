import User from '../modals/user.modal';
import bcrypt from 'bcrypt';

export const createUser = async ({ username, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error(`Error creating user: ${error.message}`);
    }
};
export const createAdminUser = async ({ username, email, password }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new User({ username, email, password: hashedPassword, role: 'admin' });
        await newAdmin.save();
        return newAdmin;
    } catch (error) {
        console.error('Error creating admin user:', error);
        throw new Error(`Error creating admin user: ${error.message}`);
    }
};
export const listUsers = async () => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        return users || [];
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};
export const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return null;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error in login service:', error);
        throw new Error(`Error during login: ${error.message}`);
    }
};