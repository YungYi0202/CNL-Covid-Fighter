const fs = require('fs');
exports.AddFootprint = async (req, res) => { 
    fs.writeFile(__dirname + "/../data/footprint.json", JSON.stringify(req.body.footprint), (err) => { 
        if (err) {
            console.log(err); 
            res.status(500).json({message: 'error'});
        }
        else { 
            /* Send message back */   
            res.status(200).json({message: 'success'});
        } 
    });
}
exports.AddUser = async (req, res) => { 
    fs.writeFile(__dirname + "/../data/users.json", JSON.stringify(req.body.users), (err) => { 
        if (err) {
            console.log(err); 
            res.status(500).json({message: 'error'});
        }
        else { 
            /* Send message back */   
            res.status(200).json({message: 'success'});
        } 
    });
}
exports.UpdateUser = async (req, res) => { 
    fs.writeFile(__dirname + "/../data/users.json", JSON.stringify(req.body.users), (err) => { 
        if (err) {
            console.log(err); 
            res.status(500).json({message: 'error'});
        }
        else { 
            /* Send message back */   
            res.status(200).json({message: 'success'});
        } 
    });
}