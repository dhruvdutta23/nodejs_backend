'use strict'
module.exports = function(app, express) {
    var controller = require('./controller.fs');
// Routing paths start
    app.route('/get-all-records').get(controller.getAllRecord);

// Routing path ends
    
}