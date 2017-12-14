$(document).ready(function() {
	let totalIngredients = 0;	
	let totalCost = 0;
	let totalYield = 0;
	let costPerItem = 0;
	let allIngredients = [];
	$('#addRow').click(function() {
		totalIngredients++;
		$('.ingredients')	
			.append("<div class='form-group row' id='Ingredient" + totalIngredients + "' display='none'> \
				<div class='col-5'> \
					<input type='text' name='name' class='form-control' placeholder='Ingredient name' required> \
				</div> \
				<div class='col'> \
					<input type='number' step='0.01' min='0' name='quantity' class='form-control' placeholder='Quantity of ingredient' required> \
				</div> \
				<div class='col'> \
					<input type='number' step='0.01' min='0' name='price' class='form-control' placeholder='Price per pound' required> \
				</div> \
			</div>");
	});
	$('#deleteRow').click(function() {
		if(totalIngredients > 1) {
			$('#Ingredient' + totalIngredients).remove();
			totalIngredients--;
		}		
	});


	$('#selectIngredients').change(function() {		
		totalIngredients++;		
		const ingredientName = $(this)[0].selectedOptions[0].attributes.value.nodeValue;
		const ingredientPrice = $(this)[0].selectedOptions[0].attributes.price.nodeValue;		
		$('#selectIngredients option[value='+ ingredientName + ']').remove();
		$('.recipeIngredients')		
		.append("<div class='form-group row' id='ingredient" + totalIngredients + "'> \
				<div class='col-5'> \
					<input type='text' id='name' class='form-control' value='"+ ingredientName +"' disabled> \
				</div> \
				<div class='col'> \
					<input type='number' step='0.01' min='0' data-price='"+ ingredientPrice +"' class='form-control' placeholder='Quantity used in lbs' required> \
				</div> \
				<div class='col'> \
					<input type='text' id='price' class='form-control' value='$"+ parseFloat(ingredientPrice).toFixed(2) + " per pound' disabled> \
				</div> \
			</div>");
		$(this).val(0);
	});

	$('.costs').on('keyup', 'input', function() {
		if(this.id === 'count') {			
			totalYield = parseFloat(this.value);		
		}
		if(totalYield && totalCost) {
			costPerItem = totalCost / totalYield;
			$('#cost').val('$' + costPerItem.toFixed(2) + ' per item');
		}		
	})

	$('.recipeIngredients').on('keyup', 'input', function() {	
		let ingredient = $(this).closest('.form-group').find('#name').val();		
		let perPound = parseFloat($(this).attr('data-price'));
		let totalUsed = parseFloat($(this).val());

		let exists = allIngredients.findIndex(i => i.name === ingredient);

		if(exists === -1) {
			allIngredients.push({
				name: ingredient,
				totalUsed: totalUsed,
				perPound: perPound
			});
		} else {
			allIngredients[exists].totalUsed = totalUsed;
		}
		if(allIngredients.length) {
			totalCost = 0;
			for(let c = 0; c < allIngredients.length; c++) {
				totalCost += allIngredients[c].perPound * allIngredients[c].totalUsed;
			}
			$('#fullCost').val('$' + totalCost.toFixed(2));
		}	
		
	})


	

});