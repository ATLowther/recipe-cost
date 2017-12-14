const Ingredient = require('../models/ingredient');

exports.recipe_cost_get = function(req, res, next) {
	Ingredient.find()
	.exec(function(err, ingredients) {
		if(err) throw err;
		console.log(ingredients);
		res.render('add_recipe', { title: 'Add Recipe', ingredients: ingredients });
	})
};