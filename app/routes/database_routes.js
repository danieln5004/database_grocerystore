var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	/*
	GET - Takes a plate number and returns the plate information if it finds it
	*/
	app.get('/spent/:date', (req, res) => {
		const date = req.params.date;
		console.log('We got a get request for date ' + date);
		const query = {'date': date};
		db.collection('spent').findOne(query, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

	/*
	POST - Takes a plate_number and a flag status through x-www-formurlencoded data for adding new users to the database
	*/

	app.post('/spent', (req, res) => {
		const expense = { date: req.body.date, amount: req.body.amount };
		db.collection('spent').insert(expense, (err, result) => {
			if (err) { 
				res.send({ 'error': 'An error has occurred' }); 
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	app.get('/checklist', (req, res) => {
		db.collection('checklist').find({}).toArray(function(err, item) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

	app.post('/checklist', (req, res) => {
		const check_item = { item_name: req.body.item_name };
		db.collection('checklist').insert(check_item, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item.ops[0]);
			}
		});
	});

	app.delete('/checklist/:item_name', (req, res) => {
		db.collection('checklist').remove({item_name: req.params.item_name}, function(err, db))
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('Item ' + req.params.item_name + ' deleted!');
			}
		});
	});

	/*
	DELETE - Deletes a plate from the database if found
	

	app.delete('/plates/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('plates').remove(details, (err, item) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send('Plate ' + id + ' deleted!');
			}
		});
	});

	app.put('/plates/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const plate = { plate_flag: req.body.flag, plate_number: req.body.number };
		db.collection('plates').update(details, plate, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(plate);
			}
		});
	});
	*/
};