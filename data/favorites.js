const conn = require('./conn');
var ObjectId = require('mongodb').ObjectId;
const DATABASE = 'myKitchenDB';
const FAVORITES = 'favs';

async function create(favorite){
    const connectiondb = await conn.getConnection();
    const newFavorite = await connectiondb
                        .db(DATABASE)
                        .collection(FAVORITES)
                        .insertOne(favorite);
    return favorite;
}

async function retrieveById(id){
    const connectiondb = await conn.getConnection();
    const favorites = await connectiondb
                        .db(DATABASE)
                        .collection(FAVORITES)
                        .findOne({ '_id': ObjectId(id) });    
    return favorites;
}

async function retrieveAllFavorites(){
    const connectiondb = await conn.getConnection();
    const favorites = await connectiondb
                        .db(DATABASE)
                        .collection(FAVORITES)
                        .find()
                        .toArray();    
    return favorites;
}

async function retrieveByUserCode(userCode){
    const connectiondb = await conn.getConnection();
    const favorites = await connectiondb
                        .db(DATABASE)
                        .collection(FAVORITES)
                        .find({ 'userCode': userCode})
                        .toArray();    
    return favorites;
}

async function deleteFavorite(id){
    const connectiondb = await conn.getConnection();
    const result =  await connectiondb
                        .db(DATABASE)
                        .collection(FAVORITES)
                        .deleteOne({'_id':ObjectId(id)});
    return result;
}

module.exports = {create, retrieveById, retrieveByUserCode, retrieveAllFavorites, deleteFavorite};