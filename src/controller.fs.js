var fs = require('fs'),
dataPath = './assets/data/records.json';

exports.getAllRecord = function(req, res) {
    fs.readFile(dataPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        res.send(response);
    });
};

exports.getOneRecord = function(req, res) {
    fs.readFile(dataPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        var recId = req.params.recId;
        response = JSON.parse(response);
        var selectedRec;
        response.forEach((e, i) => {
            if (e.id == recId) {
                selectedRec = e;
            }
        });
        if (selectedRec) {
            res.send(selectedRec);
        } else {
            res.send('No records found');
        }
    });
}