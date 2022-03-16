const passport = require("passport");
const User = require("../models/user");

module.exports.renderLogin = (req, res) =>{
    if(req.session.messages){
        res.render("login", {
            info: req.session.messages
        });
    }
    else{
        res.render("login", {
            info: ""
        });
    }
}

module.exports.login = (req, res) =>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    req.login(user, (err) =>{
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local", {
                failureRedirect: "/auth/login",
                failureMessage: true
            })(req, res, () =>{
                res.redirect("/user");
            });
        }
    });
}

module.exports.renderRegister = (req, res) =>{
    res.render("register", {
        info: ""
    });
}

module.exports.register = (req, res) =>{
    User.register({
        username: req.body.username,
        email: req.body.email,
    }, req.body.password, (err, user) =>{
        if(err){
            console.log(err);
            res.render("register", {
                info: err.message
            });
        }
        else{
            res.redirect("/auth/login");
        }
    });
}


module.exports.logout = (req, res) =>{
    req.logout();
    res.redirect("/");
}