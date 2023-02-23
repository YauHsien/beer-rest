import {Request, Response} from "express";

export type TypeId = string | number;

export interface IfRest {
    index(req: Request, res: Response): void;
    show(req: Request, res: Response): void;
    create(req: Request, res: Response): void;
    update(req: Request, res: Response, id: TypeId): void;
    destroy(req: Request, res: Response, id: TypeId): void;
};
