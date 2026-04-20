import categoryService from '../services/CategoryService.js';

class CategoryController {
    async getCategories(req, res) {
        try {
            const categories = await categoryService.getCategories(req.user.id);
            res.status(200).json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getCategory(req, res) {
        try {
            const category = await categoryService.getCategoryById(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async createCategory(req, res) {
        try {
            const category = await categoryService.createCategory(req.body, req.user.id);
            res.status(201).json({
                success: true,
                message: 'Categoría creada con éxito',
                data: category
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateCategory(req, res) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body, req.user.id);
            res.status(200).json({
                success: true,
                message: 'Categoría actualizada con éxito',
                data: category
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteCategory(req, res) {
        try {
            await categoryService.deleteCategory(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                message: 'Categoría eliminada con éxito'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new CategoryController();
