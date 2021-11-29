const { json } = require('express');
const favorites = require('../data/favorites');
const recipes = require('../data/recipes');

async function createFavorites(favorite){
    return await favorites.create(favorite);
}

async function retrieveFavorites(){
    return await favorites.retrieveAllFavorites();
}

async function retrieveMyFavorites(userCode){
    let currentFavs = await favorites.retrieveByUserCode(userCode);
    var myFavsIdList = [];
    
    currentFavs.forEach(element => {
        myFavsIdList.push(element.recipeId);
    });

    let favoriteRecipes = await recipes.retrieveByIdList(myFavsIdList);
    let response = [];

    if(currentFavs.length == favoriteRecipes.length ){
        let aux = favoriteRecipes.length;
        for(var i = 0 ; i<aux ; i++){
            response.push({"meta":currentFavs[i],"recipe":favoriteRecipes[i]});
        }
    }
    return response;
}

async function deleteFavorite(id){
    return await favorites.deleteFavorite(id);
}

module.exports = {createFavorites, retrieveMyFavorites, retrieveFavorites, deleteFavorite};