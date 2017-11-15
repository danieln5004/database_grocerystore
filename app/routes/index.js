const databaseRoutes = require('./database_routes.js');

module.exports = function(app, db) {
	databaseRoutes(app, db);
};