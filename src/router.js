'use strict'
module.exports = function(app, express) {
    var controller = require('./controller.fs');
// Routing paths start
    app.route('/get-all-records').get(controller.getAllRecord);
    app.route('/get-one-record/:recId').get(controller.getOneRecord);
    app.route('/delete-one-record/:recId').delete(controller.deleteOneRecord);
    app.route('/add-new-record').put(controller.addNewRecord);
    app.route('/update-existing-record').post(controller.updateExistingRecord);
    app.route('/login-user').post(controller.loginUser);
// Routing path ends
    
}