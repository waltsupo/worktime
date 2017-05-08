import {Response} from "../utils/response";
import {Database} from "../config/database";
import {isNullOrUndefined} from "util";
import {isNumber} from "util";

export class TaskManager {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public getTasks = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM task WHERE projectId=?";
        this.database.getPool().query(sql, req.params.projectId, (error, results) => {
            if (!error) {
                Response.send(res, Response.RESOURCE_FOUND, results);
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };

    public getTask = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM task WHERE id=?";
        this.database.getPool().query(sql, req.params.id, (error, results) => {
            if (!error) {
                if (!isNullOrUndefined(results) && results.length > 0) {
                    Response.send(res, Response.RESOURCE_FOUND, results);
                } else {
                    Response.send(res, Response.RESOURCE_NOT_FOUND);
                }
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };


    public createTask = (req: express.Request, res: express.Response) => {

        let desc: string = req.body.desc;
        let hours: number = req.body.hours;
        let user: number = req.body.userId;
        let category: number = req.body.categoryId;
        let project: number = req.body.projectId;

        if (desc && hours && user && category && project) {

            let sql: string ="INSERT INTO task SET ?";
            this.database.getPool().query(sql, {desc: desc, hours: hours, date: new Date(), userId: user,
                    categoryId: category, projectId: project}, (error, results) => {

                    if (!error) {
                        Response.send(res, Response.RESOURCE_CREATED, {id: results.insertId});
                    } else {
                        Response.send(res, Response.INTERNAL_ERROR);
                    }
                });
        } else {
            Response.send(res, Response.INVALID_PARAMETERS);
        }
    };


    public modifyTask = (req: express.Request, res: express.Response) => {

        if (req.body.desc || req.body.hours || req.body.userId || req.body.categoryId) {

            let values: any = {};
            if (req.body.desc) {
                values.desc = req.body.desc;
            }
            if (req.body.hours) {
                values.hours = req.body.hours;
            }
            if (req.body.userId) {
                values.userId = req.body.userId;
            }
            if (req.body.categoryId) {
                values.categoryId = req.body.categoryId;
            }

            let sql: string ="UPDATE task SET ? WHERE id=?";
            this.database.getPool().query(sql, [values, req.params.id], (error, results) => {

                if (!error) {
                    if (!isNullOrUndefined(results.affectedRows) && results.affectedRows == 0) {
                        Response.send(res, Response.RESOURCE_NOT_FOUND);
                    } else {
                        Response.send(res, Response.RESOURCE_UPDATED);
                    }
                } else {
                    Response.send(res, Response.INTERNAL_ERROR);
                }
            });
        } else {
            Response.send(res, Response.INVALID_PARAMETERS);
        }
    };

    public deleteTask = (req: express.Request, res: express.Response) => {

        let sql: string ="DELETE FROM task WHERE id=?";
        this.database.getPool().query(sql, req.params.id, (error, results) => {
            if (!error) {
                if (!isNullOrUndefined(results.affectedRows) && results.affectedRows == 0) {
                    Response.send(res, Response.RESOURCE_NOT_FOUND);
                } else {
                    Response.send(res, Response.RESOURCE_DELETED);
                }
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };
}