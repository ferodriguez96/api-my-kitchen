const { json } = require('express');
const recipes = require('../data/recipes');

async function getRecipes(){    
    return recipes.retrieveAllRecipes();
}

async function getRecipesByIngredients(ingredients){
    return recipes.retrieveByIngredients(ingredients);  
}

async function getRecipeById(recipeId){    
    return recipes.retrieveById(recipeId);
}

async function getRecipeByUserCode(userCode){    
    return recipes.retrieveByUserCode(userCode);
}

async function createRecipe(recipe){
    return recipes.create(recipe);
}

async function updateRecipe(id, recipe){
    return recipes.update(id, recipe);
}

async function deleteRecipe(id){
    return recipes.deleteRecipe(id);
}

module.exports = {getRecipes,getRecipesByIngredients, getRecipeById, getRecipeByUserCode, createRecipe, updateRecipe, deleteRecipe};