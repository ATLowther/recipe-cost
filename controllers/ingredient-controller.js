const Ingredient = require('../models/ingredient');

exports.add_ingredient_get = function(req, res, next) {
	res.render('add_ingredient', { title: 'Add Ingredients' });
};

exports.add_ingredient_post = function(req, res, next) {
	let oldIngredients = [];	
	console.log(req.body);	
	if(typeof(req.body.name) === 'object') {
		for(let i = 0; i < req.body.name.length; i++) {
			let ingredient = new Ingredient({
				name: req.body.name[i],
				quantity: req.body.quantity[i],
				price: req.body.price[i]
			});	
			Ingredient.findOne({'name': req.body.name[i]})
			.exec(function(err, result) {
				if(err) {
					console.log("Error here");
					throw err;
				}
				console.log(result);

				if(result) {
					oldIngredients.push(req.body.name[i]);
					res.end('Found One');
				} else {
					ingredient.save(function(err) {
						if(err) {
						console.log("Error there");
						throw err;
					}
						
					})
				}
			})	
		}
	} else {		
		let ingredient = new Ingredient({
				name: req.body.name,
				quantity: req.body.quantity,
				price: req.body.price
			});	
		Ingredient.findOne({'name': req.body.name})
		.exec(function(err, result) {
			if(err) throw err;

			console.log(result);

			if(result) {
				oldIngredients.push(req.body.name);
				res.end('Found One');
			} else {
				ingredient.save(function(err) {
					if(err) {
					console.log("Error there");
					throw err;
					}					
				})
			}
		})	
	}			
	console.log(oldIngredients);
	res.redirect('/');		
};

exports.delete_ingredient_get = function(req, res, next) {
	Ingredient.find()
	.exec(function(err, ingredients) {
		if(err) throw err;

		res.render('delete_ingredient', { title: 'Delete Ingredient', ingredients: ingredients });
	})
};


exports.delete_ingredient_post = function(req, res, next) {	
	
	Ingredient.findOneAndRemove({ name: req.body.ingredient })
	.exec(function(err, ingredient) {
		if(err) throw err;		

		res.render('delete_ingredient', { title: 'Delete Ingredient', ingredients: ingredient });
	})
};

