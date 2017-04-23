import {Response} from "../utils/response";
import {Database} from "../config/database";

export class ProjectManager {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public getProjectWithId = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM project WHERE id=?";
        this.database.getPool().query(sql, [1], (error, results) => {
            if (!error) {
                Response.send(res, Response.RESOURCE_FOUND, results);
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };

    public getProjectWithIdentifier = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.RESOURCE_FOUND);
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