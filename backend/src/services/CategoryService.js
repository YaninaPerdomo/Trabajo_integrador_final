import categoryRepository from '../repositories/CategoryRepository.js';

class CategoryService {
    async getCategories(userId) {
        return await categoryRepository.findAllByUser(userId);
    }

    async getCategoryById(id, userId) {
        const category = await categoryRepository.findById(id);
        if (!category || category.user.toString() !== userId) {
            throw new Error('Categoría no encontrada o acceso no autorizado');
        }
        return category;
    }

    async createCategory(categoryData, userId) {
        return await categoryRepository.create({
            ...categoryData,
            user: userId
        });
    }

    async updateCategory(id, categoryData, userId) {
        const category = await this.getCategoryById(id, userId);
        return await categoryRepository.update(id, categoryData);
    }

    async deleteCategory(id, userId) {
        await this.getCategoryById(id, userId);
        return await categoryRepository.delete(id);
    }
}

export default new CategoryService();
