import {Response} from "../utils/response";
import {Database} from "../config/database";
import {isNullOrUndefined} from "util";
import {ProjectManager} from "./projectManager";

export class CategoryManager {

    database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public getCategories = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM category WHERE projectId=?";
        this.database.getPool().query(sql, req.params.projectId, (error, results) => {
            if (!error) {
                Response.send(res, Response.RESOURCE_FOUND, results);
            } else {
                Response.send(res, Response.INTERNAL_ERROR);
            }
        });
    };

    public getCategory = (req: express.Request, res: express.Response) => {

        let sql: string ="SELECT * FROM category WHERE id=?";
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

    public createCategory = (req: express.Request, res: express.Response) => {

        if (req.body.name && req.body.projectId) {

            let sql: string ="INSERT INTO category SET ?";
            this.database.getPool().query(sql, {name: req.body.name, projectId: req.body.projectId},
                (error, results) => {

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

    public modifyCategory = (req: express.Request, res: express.Response) => {

        if (req.body.name) {

            let sql: string ="UPDATE category SET ? WHERE id=?";
            this.database.getPool().query(sql, [{name: req.body.name}, req.params.id], (error, results) => {

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

    public deleteCategory = (req: express.Request, res: express.Response) => {

        let sql: string ="DELETE FROM category WHERE id=?";
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