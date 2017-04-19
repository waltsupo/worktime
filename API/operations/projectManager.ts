import {Response} from "../utils/response";

export class ProjectManager {

    public getProjectWithId = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.PROJECT_FOUND);
    };

    public getProjectWithIdentifier = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.PROJECT_FOUND);
    };

    public createProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.PROJECT_CREATED);
    };

    public modifyProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.PROJECT_UPDATED);
    };

    public deleteProject = (req: express.Request, res: express.Response) => {

        Response.send(res, Response.PROJECT_DELETED);
    };
}