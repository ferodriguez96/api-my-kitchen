const conn = require('./conn');
var ObjectId = require('mongodb').ObjectId;
const DATABASE = 'myKitchenDB';
const USERS = 'users';


async function create(user){
    const connectiondb = await conn.getConnection();
    const newUser = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .insertOne(user);
    return user;
}

async function retrieveAllUsers(){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find()
                        .toArray();    
    return users;
}

async function retrieveById(id){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({ '_id': ObjectId(id) });    
    return users;
}

async function retrieveByIngredients(ingredients){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find({'ingredients': {'$in': ingredients}})
                        .toArray();
    return users;
}


async function update(id, user){
    let query = {'_id':ObjectId(id)};
    delete user._id;
    const connectiondb = await conn.getConnection();
    const response = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .updateOne(query,{$set : user},{ upsert: true });
    return retrieveById(id);
}

async function deleteUser(id){
    const connectiondb = await conn.getConnection();
    const result =  await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .deleteOne({'_id':ObjectId(id)});
    return result;
}

async function logIn(logInData){
    const connectiondb = await conn.getConnection();
    const user = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({ 'email': logInData.email});  
    return user;
}

async function exists(email){
    const connectiondb = await conn.getConnection();
    const usersCount = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .count({ 'email': email });    
    let existente = usersCount>0;
    return existente;
}
module.exports = {create, retrieveAllUsers, retrieveById, retrieveByIngredients, update, deleteUser, logIn, exists};