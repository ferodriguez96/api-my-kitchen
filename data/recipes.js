require('dotenv').config();
const uri = process.env.RECIPES_API;
const axios = require('axios');
const { response } = require('express');

/*axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });*/


async function create(recipe){
    return axios.post(uri+'/', recipe)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
}

async function retrieveAllRecipes(){
    return axios.get(uri + '/')
            .then(response => {
                return response.data;
            })
}
async function retrieveById(id){
    return axios.get(uri + '/' + id)
            .then(response => {
                return response.data;
            })
}

async function retrieveByUserCode(userCode){
    return axios.get(uri + '/user/' + userCode)
            .then(response => {
                return response.data;
            })
}

async function retrieveByIngredients(ingredients){
    let params = '?ingredients='+ingredients; //Deberia haber otra forma, pero esta es la unica que me funcionó
    return axios.get(uri + '/' + params)
            .then(response => {
                return response.data;
            })
}

async function retrieveByIdList(idList){
    let params = '?idList='+idList; //Deberia haber otra forma, pero esta es la unica que me funcionó
    return axios.get(uri + '/' + params)
            .then(response => {
                return response.data;
            })
}

async function update(id, recipe){
    return axios.put(uri+ '/' + id, recipe)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
            });
}

async function deleteRecipe(id){
    return axios.delete(uri + '/' + id)
            .then(response => {
                return response.data;
            })
}

module.exports = {create, retrieveAllRecipes, retrieveById, retrieveByUserCode,retrieveByIngredients, update, deleteRecipe, retrieveByIdList};