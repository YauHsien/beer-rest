import {IfRest} from "./interface.js";
import {Request, Response} from "express";
import {TypeRecipe} from "./recipe_data_load.js";

export class RecipeRest implements IfRest {
    data: (TypeRecipe|null)[] = [null];

    constructor(recipe_data: TypeRecipe[]) {
        this.data = this.data.concat(recipe_data);
    }

    index(req: Request, res: Response){
        res.send({count: this.data.length-1});
    }

    show(req: Request, res: Response){
        let id: number = req.params.id as unknown as number;
        if (!(id in this.data))
            res.send({error: 'Cannot find recipe'});
        else if (this.data[id]!.deleted)
            res.send({error: 'Deleted'});
        else
            res.send(this.data[id]);
    }

    create(req: Request, res: Response) {
        let new_id: number = this.data.length;
        let new_record: TypeRecipe = create_record(req.body, new_id);
        this.data[this.data.length] = new_record;
        res.send({result: 'OK'});
    }

    update(req: Request, res: Response, id: number) {
        
    }

    destroy(req: Request, res: Response, id: number){
        var id_existed = id in this.data;
        if (!(id in this.data))
            res.send({error: 'Cannot find recipe'});
        else if (!this.data[id]!.deleted)
            this.data[id]!.deleted = true;
        res.send({result: 'ok'});
    }
};

function create_record(record: object, new_id: number): TypeRecipe {
    throw undefined;
}
