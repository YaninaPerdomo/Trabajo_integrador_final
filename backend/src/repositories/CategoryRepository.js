import Category from '../models/Category.js';

class CategoryRepository {
    async findAllByUser(userId) {
        return await Category.find({ user: userId });
    }

    async findById(id) {
        return await Category.findById(id);
    }

    async create(categoryData) {
        return await Category.create(categoryData);
    }

    async update(id, categoryData) {
        return await Category.findByIdAndUpdate(id, categoryData, {
            new: true,
            runValidators: true
        });
    }

    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryRepository();
