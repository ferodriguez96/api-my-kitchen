const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipes');


/*router.get('/', async(req,res)=>{
    console.log("Geting all Recipes");
    res.json(await controller.getRecipes())
})*/

router.get('/', async(req,res)=>{
    console.log("Geting all Recipes");
    var ingredients = req.query.ingredients;
    if(ingredients != undefined){
        console.log("recipes with this ingredients: " + ingredients);
        res.json(await controller.getRecipesByIngredients(ingredients));
    }
    else{
        console.log("searching all recipes");
        res.json(await controller.getRecipes());
    }
})

router.get('/:id', async (req, res) => {
    console.log("check id: " + req.params.id);
    res.json(await controller.getRecipeById(req.params.id));
});

router.get('/user/:userCode', async (req, res) => {
    console.log("check userCode: " + req.params.userCode);
    res.json(await controller.getRecipeByUserCode(req.params.userCode));
});

router.post('/', async(req,res)=>{
    console.log("Creating recipe...");
    var recipe = req.body;
    res.json(await controller.createRecipe(recipe))
})

router.put('/:id', async(req,res)=>{
    console.log("Updating recipe...");
    let recipe = req.body;
    let id = req.params.id;
    if(recipe._id == id || recipe._id == undefined && id != undefined){
        res.json(await controller.updateRecipe(id, recipe))
    }else{
        res.status(400).send("Los Ids no coinciden")
    }
    
})

router.delete('/:id', async(req,res)=>{
    console.log("Deleting recipe...");
    let id = req.params.id;
    res.json (await controller.deleteRecipe(id));
})

module.exports = router;