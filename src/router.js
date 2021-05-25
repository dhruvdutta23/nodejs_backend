'use strict'
module.exports = function(app, express) {
    var controller = require('./controller.fs');
// Routing paths start
    app.route('/get-all-records').get(controller.getAllRecord);
    app.route('/get-one-record/:recId').get(controller.getOneRecord);
// Routing path ends
    
}