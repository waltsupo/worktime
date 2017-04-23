import {Response} from "../utils/response";
import {Database} from "../config/database";

export class ProjectManager {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public getProjectWithId = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM project WHERE id=?";
        this.database.getPool().query(sql, [req.params.id], (error, results) => {
            if (!error) {
                if (results.length > 0) {
                    Response.send(res, Response.RESOURCE_FOUND, results);
                } else {
                    Response.send(res, Response.RESOURCE_NOT_FOUND);
                }
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };

    public getProjectWithIdentifier = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM project WHERE identifier=?";
        this.database.getPool().query(sql, [req.params.identifier], (error, results) => {
            if (!error) {
                if (results.length > 0) {
                    Response.send(res, Response.RESOURCE_FOUND, results);
                } else {
                    Response.send(res, Response.RESOURCE_NOT_FOUND);
                }
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };

    public createProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.RESOURCE_CREATED);
    };

    public modifyProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.RESOURCE_UPDATED);
    };

    public deleteProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.RESOURCE_DELETED);
    };
}