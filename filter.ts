import {TypeId, IfRest} from "./interface.js";
import {Request, Response} from "express";

type Dictionary = {[id: string]: {[k: string]: string}};

export class FilterRest implements IfRest {
    filters: Dictionary = {};

    index(req: Request, res: Response){
        res.send({count: Object.keys(this.filters).length});
    }

    show(req: Request, res: Response){
        let id: string = req.params.id as string;
        if (id in this.filters) {
            res.send(this.filters[id]);
        }
        else {
            res.send({error: 'Cannot find entry'});
        }
    }

    create(req: Request, res: Response) {
        let token: string = req.body!.token as string;
        let new_id: string = Object.keys(this.filters).length.toString();
        this.filters[new_id] = {token: token};
        res.send({id: new_id});
    }

    update(req: Request, res: Response, id: TypeId) {
        if (id in this.filters) {
            let entry: {[k: string]: string} = this.filters[id];
            let body = req.body!;
            for (let key in body) {
                entry[key] = body[key] as string;
            }
        }
        res.send({result: 'ok'});
    }

    destroy(req: Request, res: Response, id: TypeId){
        let _id: string = id.toString();
        if (_id in this.filters) {
            delete this.filters[_id];
        }
        res.send({result: 'ok'});
    }
};
