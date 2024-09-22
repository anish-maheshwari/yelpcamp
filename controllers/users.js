const User = require('../models/user.js');



module.exports.signPage = (req,res)=>{
    res.render("./Users/user.ejs");

}
module.exports.logInPage = (req,res)=>{
    res.render("./Users/login.ejs");

}
module.exports.signedUp = async(req,res,next)=>{try{
    const {username,password,email} = req.body;

    const user = new User({username,email});
    const registeredUser = await User.register(user,password);

    req.login(registeredUser,(err)=>{
        if(err){
            next(err);
        }
        else {
            req.flash('success',"Welcome to Shopanion");
            res.redirect("/campgrounds");
        }
        

    })
   }
    catch(e){
        req.flash("error",e.message);
        res.redirect('/register');
    }
}
module.exports.loggedIn = async(req,res)=>{
    req.flash("success",'Welcome Back');

    const redirectUrl = req.session.returnTo || "/campgrounds";
 delete req.session.returnTo;
    res.redirect(redirectUrl);
   
} 

module.exports.logOut  = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}