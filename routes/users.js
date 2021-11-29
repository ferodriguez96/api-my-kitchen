var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');


/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/signup', async(req,res)=>{
  console.log("Creating user...");
  var user = req.body;
  res.json(await controller.createUser(user))
})

router.post('/login', async(req,res)=>{
  console.log("Trying to LogIn...");
  var logInData = req.body;
  res.json(await controller.logIn(logInData))
})

router.put('/:id', async(req,res)=>{
  console.log("Trying to Update...");
  let user = req.body;
  let id = req.params.id;
  if(user._id == id || user._id == undefined && id != undefined){
    res.json(await controller.updateUser(id, user))
  }else{
    res.status(400).send("Los Ids no coinciden")
  }
})

router.delete('/:id', async(req,res)=>{
  console.log("Trying to Delete...");
  let user = req.body;
  let id = req.params.id;
  if(user._id == id || user._id == undefined && id != undefined){
    res.json(await controller.deleteUser(id, user))
  }else{
    res.status(400).send("Los Ids no coinciden")
  }
})

module.exports = router;
