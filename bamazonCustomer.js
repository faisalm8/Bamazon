var mysql = require('mysql');
var inquirer = require('inquirer');
var blank = ('\n ===========================================') 
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'twoboys136',
	database: 'Bamazon'
});

// establish connection
connection.connect(function(err) {
	if (err) throw err;
	startShop();
});

// define startShop function
function startShop() {
	inquirer.prompt(
		{
			name: 'name',
			type: 'input',
			message: 'Hi customer, what is your name?'
		}

	).then(function(answer) {
		console.log(blank);
		console.log('\nWelcome', answer.name, '\nThese are today\'s products...\n');
		itemList(); 
	})
}

function itemList() {
	connection.query('SELECT * FROM products', function(err, results) {
		if (err) throw err;
		for (var i=0; i < results.length; i++) {
			console.log(results[i].id + '\nProduct: ' + results[i].product_name + '\nPrice: $' + results[i].price + '.00');
			console.log(blank)
		}
		buyingPrompt();
	})
}

// asking the customer what they would like to purchase
function buyingPrompt() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item',
			message: 'Which product would you like to buy (id)?'
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like?'
		}
	]).then(function(answer) {
		connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function(err, result) {
			total = (result[0].price);
			dept = result[0].department_name;
			if (answer.quantity > result[0].stock_quantity) {
				console.log('Insufficient quantity! Please shop again another time.');
				endConnection();
			} else {
				connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?', [answer.quantity, answer.item], function(err, result) {
					connection.query('UPDATE department_name SET total_sales = total_sales + ? WHERE department_name = ?' [total, dept], function(err, result) {
						console.log('Your total for today is $' + total + '\nThanks for shopping!');
						endConnection();
					});
				});
			}
		})
	})

	}
	// end connection function
	function endConnection() {
		connection.end(function(err) {
			if (err) throw err;
		})
	
}










































