const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const newUserController=require("../controllers/newUserController")
//----------------------------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
//---------userController----------------
router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//---------this is the userId is sent by front end----------
router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)

//-------------------newUserController---------------------
router.post("/loginUser", newUserController.LoginUser)
router.post ('/createUser',newUserController.createUser)

//---------this is the userId is sent by front end----------

router.get("/user/:userId",newUserController.getUserData)
router.put("/user/:userId",newUserController.updateUser)

module.exports = router; 