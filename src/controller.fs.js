var fs = require('fs'),
dataPath = './assets/data/records.json',
userPath = './assets/data/user.json';

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
        let recId = req.params.recId;
        response = JSON.parse(response);
        let selectedRec;
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

exports.deleteOneRecord = function(req, res) {
    fs.readFile(dataPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        let recId = req.params.recId;
        if (!recId) {
            res.status(406).send('Record ID not passed');
        }
        response = JSON.parse(response);
        response.forEach((e, i) => {
            if (e.id == recId) {
                response.splice(i, 1);
            }
        });
        response = JSON.stringify(response);
        fs.writeFile(dataPath, response, error => {
            if (error) {
                res.status(406).send(error); 
            }
            res.send(response);
        })
    });
}

exports.addNewRecord = function(req, res) {
    fs.readFile(dataPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        let recData = req.body;
        if (!recData) {
            res.status(406).send('Request body does not have required parameters');
        }
        response = JSON.parse(response);
        let newId = Math.max.apply(Math, response.map(function(o) { return o.id; }))
        recData.id = newId + 1;
        response.push(recData);
        response = JSON.stringify(response, null, 2);
        fs.writeFile(dataPath, response, error => {
            if (error) {
                res.status(406).send(error); 
            }
            res.send(response);
        });
    });
}

exports.updateExistingRecord = function(req, res) {
    fs.readFile(dataPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        let recData = req.body;
        if (!recData || !recData.id) {
            res.status(406).send('Request body does not have required parameters');
        }
        response = JSON.parse(response);
        response.forEach((e, i) => {
            if (e.id == recData.id) {
                response[i] = recData;
            }
        });
        response = JSON.stringify(response, null, 2);
        fs.writeFile(dataPath, response, error => {
            if (error) {
                res.status(406).send(error); 
            }
            res.send(response);
        });
    });
}

exports.loginUser = function(req, res) {
    fs.readFile(userPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        let userData = req.body;
        if (!userData) {
            res.status(406).send('Request body does not have required parameters');
        }
        response = JSON.parse(response);
        let userExists;
        response.forEach((e, i) => {
            if ((e.userName == userData.userName) && (e.password === userData.password)) {
                userExists = e; 
            }
        });
        if (userExists) {
            res.send({name: userExists.name, success: true});
        } else {
            res.send({name: '', success: false});
        }
    });
}