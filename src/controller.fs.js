var fs = require('fs'),
dataPath = './assets/data/records.json',
userPath = './assets/data/user.json',
successRes = {success: true, data: []},
faliureRes = {success: false, data: []};

exports.getAllRecord = function(req, res) {
    fs.readFile(dataPath, 'utf8', (err, response) => {
        if (err) {
            res.status(406).send(err);
        }
        response = JSON.parse(response);
        if (response && response.length > 0) {
            successRes.data = response;
            res.send(successRes);
        } else {
            res.send(faliureRes);
        }

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
            successRes.data = selectedRec;
            res.send(successRes);
        } else {
            res.send(faliureRes);
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
        let recFound;
        response.forEach((e, i) => {
            if (e.id == recId) {
                response.splice(i, 1);
                recFound = true;
            }
        });
        if (recFound) {
            response = JSON.stringify(response, null, 2);
            fs.writeFile(dataPath, response, error => {
                if (error) {
                    res.status(406).send(error); 
                }
                successRes.data = JSON.parse(response);
                res.send(successRes);
            });
        } else {
            res.send(faliureRes);
        }
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
        if (response && response.length > 0) {
            let newId = Math.max.apply(Math, response.map(function(o) { return o.id; }))
            recData.id = newId + 1;
        } else {
            recData.id = 1;
        }
        response.push(recData);
        response = JSON.stringify(response, null, 2);
        fs.writeFile(dataPath, response, error => {
            if (error) {
                res.status(406).send(error); 
            }
            successRes.data = JSON.parse(response);
            res.send(successRes);
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
        let isRecUpdate;
        response.forEach((e, i) => {
            if (e.id == recData.id) {
                response[i] = recData;
                isRecUpdate = true;
            }
        });
        if (isRecUpdate) {
            response = JSON.stringify(response, null, 2);
            fs.writeFile(dataPath, response, error => {
                if (error) {
                    res.status(406).send(error); 
                }
                successRes.data = JSON.parse(response);
                res.send(successRes);
            });
        } else {
            res.send(faliureRes);
        }
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