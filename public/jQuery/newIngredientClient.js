$(document).ready(function() {
	let totalIngredients = 1;
	$('#addRow').click(function() {
		totalIngredients++;
		$('.ingredients')	
			.append("<div class='form-group row' id='ingredient" + totalIngredients + "' style='display:none'> \
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
			$('#ingredient' + totalIngredients).slideDown();
	});
	$('#deleteRow').click(function() {
		if(totalIngredients > 1) {
			$('#ingredient' + totalIngredients).slideUp(function() {
				$(this).remove();
			});			
			totalIngredients--;
		}		
	});
});