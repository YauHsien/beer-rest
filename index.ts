import express from "express";
//import {style_data} from "./style_data_load.js";
import {recipe_data} from "./recipe_data_load.js";
import {RecipeRest} from "./recipe.js";
 
const app = express();

app.get('/', (req, res) => {
    res.send('It works!');
});

app.resource = function(path: string, obj: RecipeRest) {
    this.get(path, (q,r)=> obj.index(q,r));
    this.get(path + '/:id', (q,r)=> obj.show(q,r));
    this.post(path, obj.create);
    this.put(`${path}/:id`, function(req, res) {
        var id = parseInt(req.params.id, 10);
        obj.update(req, res, id);
    });
    this.delete(path + '/:id', function(req, res){
        var id = parseInt(req.params.id, 10);
        obj.destroy(req, res, id);
    });
};
app.resource('/recipes', new RecipeRest(recipe_data));

// curl http://localhost:34567/recipes     -- responds with all recipes
// curl http://localhost:34567/recipes/1   -- responds with user 1
// curl http://localhost:34567/recipes/4   -- responds with error
// curl http://localhost:34567/recipes/1..3 -- responds with several recipes
// curl -X DELETE http://localhost:34567/recipes/1  -- deletes the user

const port = process.env.PORT || 34567;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
