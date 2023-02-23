import {IfRest} from "./interface.js";
import {Request, Response} from "express";
import {TypeStyle} from "./style_data_load.js";
import {TypeRecipe} from "./recipe_data_load.js";

export class RecipeRest implements IfRest {
    _style_data: (TypeStyle|null)[] = [null];
    data: (TypeRecipe|null)[] = [null];

    constructor(style_data: TypeStyle[], recipe_data: TypeRecipe[]) {
        this._style_data = this._style_data.concat(style_data);
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
