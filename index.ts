import express from "express";
import {Recipe} from "./recipe.js";
const app = express();

app.get('/', (req, res) => {
    res.send('It works!');
});

app.resource = function(path, obj) {
    this.get(path, obj.index);
    this.get(path + '/:a..:b.:format?', function(req, res){
        var a = parseInt(req.params.a, 10);
        var b = parseInt(req.params.b, 10);
        var format = req.params.format;
        obj.range(req, res, a, b, format);
    });
    this.get(path + '/:id', obj.show);
    this.delete(path + '/:id', function(req, res){
        var id = parseInt(req.params.id, 10);
        obj.destroy(req, res, id);
    });
};
app.resource('/recipes', Recipe);

// curl http://localhost:34567/users     -- responds with all users
// curl http://localhost:34567/users/1   -- responds with user 1
// curl http://localhost:34567/users/4   -- responds with error
// curl http://localhost:34567/users/1..3 -- responds with several users
// curl -X DELETE http://localhost:34567/users/1  -- deletes the user

const port = process.env.PORT || 34567;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
