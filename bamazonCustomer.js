var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	password: '',
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
		console.log('\n ===========================================');
		console.log('\nWelcome', answer.name, '\nThese are today\'s products...\n');
		productsList(); 
	})
}