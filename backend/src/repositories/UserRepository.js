import User from '../models/User.js';

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }

    async findById(id) {
        return await User.findById(id);
    }

    async create(userData) {
        return await User.create(userData);
    }

    async findByVerificationToken(token) {
        return await User.findOne({ verificationToken: token });
    }

    async update(user) {
        return await user.save();
    }
}

export default new UserRepository();
