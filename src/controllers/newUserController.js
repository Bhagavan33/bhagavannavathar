const newUserModel = require("../models/newUserModel")
const jwt = require("jsonwebtoken")

//---------create user -----------------
const createUser = async function (req, res) {
    try {
        let data = req.body
        let savedData = await newUserModel.create(data)
        res.send({ savedData })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}

//-----------login user ---------------------
const LoginUser = async function (req, res) {
    try {
        let userId = req.body.emailId;
        let password = req.body.password;

        let user = await newUserModel.findOne({ emailId: userId, password: password })
        if (!user) {
            res.send({ msg: "user not found" })
        }

        let token = jwt.sign({
            User: user._id.toString(),
            msg: "bhagavan"
        }, "this is a very very important key"
        )
        res.send({ status: true, msg: "your succsefully login this server", token })
    } catch (err) {
        res.status(404).send({ errror: err.message })
    }
}
//-----------get user data after login------------------------------------------
const getUserData = async function (req, res) {
    try {
        let token = req.headers["x-auth-token"]
        if (!token) {
            res.send({ msg: "your headers is empty" })
        }

        let decotedtoken = jwt.verify(token, "this is a very very important key")
        if (!decotedtoken) {
            res.status(400).send({
                status: false, msg: "your not logged in "
            })
        }
        let userId = req.params.userId
        let userDetails = await newUserModel.findById(userId)

        if (!userDetails) {
            res.status(404).send({
                status: false, msg: "No such user found your database"
            })
        } else {
            res.send({ status: true, data: userDetails })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }

}
//-------------------updateUser-------------


const updateUser = async function (req, res) {

    let userId = req.params.userId;
    let user = await newUserModel.findById(userId);
    if (!user) {
        return res.send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await newUserModel.findOneAndUpdate({ _id: userId }, userData);
    res.send({ status: updatedUser, data: updatedUser });
};
//--------------------------------






module.exports.createUser = createUser;
module.exports.LoginUser = LoginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
