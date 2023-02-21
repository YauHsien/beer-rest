import {IfRest} from "./interface.js";
import {Request, Response} from "express";

export class UserIdentityRest implements IfRest {
    data: (string|null)[] = [];

    index(req: Request, res: Response){
        res.send({count: this.data.length-1});
    }

    show(req: Request, res: Response){
        let id: number = req.params.id as unknown as number;
        if (!(id in this.data) || this.data[id] === null)
            res.send({error: 'Cannot find this user'});
        else
            res.send(this.data[id]);
    }

    create(req: Request, res: Response) {
        let token = req.body!.token as string;
        let new_id = this.data.length;
        this.data[new_id] = token;
        res.send({id: new_id});
    }

    update(req: Request, res: Response, id: number) {
        res.send({error: 'Not feasible'});
    }

    destroy(req: Request, res: Response, id: number){
        if (!(id in this.data))
            res.send({error: 'Cannot find entry'});
        else
            this.data[id] = null;
        res.send({result: 'ok'});
    }
};
