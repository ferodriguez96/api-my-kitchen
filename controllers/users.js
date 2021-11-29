const users = require('../data/users');
const bcrypt = require('bcrypt');
const UUID = require('uuid');

async function createUser(user){
    if(await users.exists(user.email)){
        return {"message":"usuario existente"}
    }else{
        let newUser = user;
        newUser.password = await bcrypt.hash(user.password,10);
        newUser.userCode = UUID.v1();
        return await users.create(newUser);
    }
}

async function logIn(logInData){
    let user = await users.logIn(logInData);
    var correctLogIn;
    if(user !== null){
        correctLogIn = decryptPassword(logInData.password, user.password);//await bcrypt.compare(logInData.password, user.password)
    }else{
        correctLogIn=false;
    }
    
    if(correctLogIn){
        return user;
    }else{
        return {"message":"error de login"};
    }
}

async function updateUser(id, user){
    let dbUser = await users.logIn(user);
    let curretPassword = dbUser.password;
    let correctLogIn = decryptPassword(user.password, curretPassword);
    if(correctLogIn){
        user.password=curretPassword;
        var newUser = user;
        if(user.newPassword !== undefined){
            console.log("entre al if")
            newUser.password = await bcrypt.hash(user.newPassword,10);
            delete newUser.newPassword;
        }
        return await users.update(id, newUser);
    }else{
        return {"message":"error de login"};
    }
}

async function deleteUser(id, user){
    let dbUser = await users.logIn(user);
    let curretPassword = dbUser.password;
    let correctLogIn = decryptPassword(user.password, curretPassword);
    if(correctLogIn){
        return users.deleteUser(id);
    }else{
        return {"message":"error de login"};
    }
}

async function decryptPassword(password, hash){
    return await bcrypt.compare(password, hash)
}



module.exports = {createUser, logIn, updateUser, deleteUser}