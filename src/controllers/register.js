const UserDAO = require('../dao/User');


const registerGetController = (req,res) => {
    // display form
    res.render('register');
}

const registerPostController = async (req,res) => {
    // store to database
    try
    {
        // CHECK IF USER IS ALAREDY THERE
        const emailExist = await UserDAO.findUserByEmail(req,res);
        if(emailExist)
        {
            return res.status(400).send(`${req.body.userEmail} already exists`);
        }
       
        try{
            const createdUser = UserDAO.createUser(req, res);
            req.session.user = createdUser;
            // redirect
            return res.redirect(`/user`);
        }
        catch(err){
            console.error(err);
            return res.status(400).send(`Server Error!`);
        }
        
    }
    catch(err)
    {
        return res.status(400).json({message: err});
    }
}

module.exports = {
    registerGetController,
    registerPostController
};