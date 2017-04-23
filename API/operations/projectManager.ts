import {Response} from "../utils/response";
import {Database} from "../config/database";

export class ProjectManager {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public getProjectWithId = (req: express.Request, res: express.Response) => {

        this.getProjectWithIdPromise(req.params.id).then((results) => {
            if (results.length > 0) {
                Response.send(res, Response.RESOURCE_FOUND, results);
            } else {
                Response.send(res, Response.RESOURCE_NOT_FOUND);
            }
        }, () => {
            Response.send(res, Response.INTERNAL_ERROR);
        });
    };

    public getProjectWithIdentifier = (req: express.Request, res: express.Response) => {

        this.getProjectWithIdentifierPromise(req.params.identifier).then((results) => {
            if (results.length > 0) {
                Response.send(res, Response.RESOURCE_FOUND, results);
            } else {
                Response.send(res, Response.RESOURCE_NOT_FOUND);
            }
        }, () => {
            Response.send(res, Response.INTERNAL_ERROR);
        });
    };

    public createProject = (req: express.Request, res: express.Response) => {

        if (req.body.name && req.body.identifier) {

            this.getProjectWithIdentifierPromise(req.body.identifier).then((results) => {
                if (results.length > 0) {
                    Response.send(res, Response.RESOURCE_ALREADY_EXISTS);
                } else {
                    let sql: string ="INSERT INTO project SET ?";
                    this.database.getPool().query(sql, {name: req.body.name, identifier: req.body.identifier,
                        last_modified: new Date()}, (error, results) => {

                        if (!error) {
                            Response.send(res, Response.RESOURCE_CREATED, {id: results.insertId});
                        } else {
                            Response.send(res, Response.INTERNAL_ERROR);
                        }
                    });
                }
            }, () => {
                Response.send(res, Response.INTERNAL_ERROR);
            });
        } else {
            Response.send(res, Response.INVALID_PARAMETERS);
        }
    };

    public modifyProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.RESOURCE_UPDATED);
    };

    public deleteProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.RESOURCE_DELETED);
    };

    private getProjectWithIdPromise = (id: number) => {

        return new Promise((resolve, reject) => {
            let sql: string ="SELECT * FROM project WHERE id=?";
            this.database.getPool().query(sql, id, (error, results) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject();
                }
            });
        });
    };

    public getProjectWithIdentifierPromise = (identifier: any) => {

        return new Promise((resolve, reject) => {
            let sql: string ="SELECT * FROM project WHERE identifier=?";
            this.database.getPool().query(sql, identifier, (error, results) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject();
                }
            });
        });
    };
}