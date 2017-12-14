const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient-controller');
const recipeController = require('../controllers/recipe-controller');

router.get('/', ingredientController.add_ingredient_get);
router.post('/', ingredientController.add_ingredient_post);
router.get('/recipe', recipeController.recipe_cost_get);
router.get('/delete', ingredientController.delete_ingredient_get);
router.post('/delete', ingredientController.delete_ingredient_post);


module.exports = router;