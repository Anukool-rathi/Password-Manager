const User = require("../models/user");
const cryptoJS = require("crypto-js");

module.exports.renderIndex = (req, res) =>{
    User.findById(req.user.id, (err, foundObject) =>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {
                name: req.user.username,
                passwords: foundObject.passwords
            });
        }
    });
}

module.exports.renderAdd = (req, res) =>{
    res.render("add", {
        name: req.user.username
    });
}

module.exports.addPassword = (req, res) =>{
    const data = {
        title: req.body.title,
        password: cryptoJS.AES.encrypt(req.body.password, req.body.key)
    }

    User.findById(req.user.id, (err, foundObject)=>{
        if(err){
            console.log(err);
        }
        else{
            foundObject.passwords.push(data);
            foundObject.save((err, updatedObject)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(updatedObject);
                }
            });
        }
    });

    res.redirect("/user");

}

module.exports.getKey = (req, res)=>{
    res.render("key", {
        name: req.user.username,
        title: req.params.id,
        info: ""
    });
}

module.exports.showPassword = (req,res)=>{
    const id = req.params.id;

    User.findById(req.user.id, (err, foundObject)=>{
        if(err){
            console.log(err);
        }
        else{
            foundObject.passwords.forEach(element =>{
                if(element.id === id){
                    const bytes = cryptoJS.AES.decrypt(element.password, req.body.key);
                    try{
                        const data = bytes.toString(cryptoJS.enc.Utf8);
                        if(data){
                            res.render("show", {
                                name: req.user.username,
                                data: data
                            });
                        }
                        else{
                            res.render("key", {
                                name: req.user.username,
                                title: req.params.id,
                                info: "Invalid Key! Try again"
                            });
                        }
                    }
                    catch{
                        res.render("key", {
                            name: req.user.username,
                            title: req.params.id,
                            info: "Invalid Key! Try again"
                        });
                    }
                }
            });
        }
    });
}

module.exports.renderConfirm = (req, res)=>{
    res.render("confirm", {
        name: req.user.username,
        id: req.query.id
    });
}

module.exports.deletePassword = async (req, res)=>{
    await User.updateOne({_id: req.user.id}, {
        $pull: {
            passwords : {_id: req.query.id}
        }
    });
    res.redirect("/user");
}

module.exports.renderEdit = (req, res)=>{
    res.render("edit", {
        name: req.user.username,
        id: req.params.id
    });
}

module.exports.updatePassword = (req, res)=>{
    User.findById(req.user.id, (err, foundObject)=>{
        if(err){
            console.log(err);
        }
        else{
            foundObject.passwords.forEach(element =>{
                if(element.id === req.params.id){
                    element.password = cryptoJS.AES.encrypt(req.body.password, req.body.key)
                }
            });
            foundObject.save((err, updatedObject)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(updatedObject);
                }
            });
        }
    });
    res.redirect("/user");
}