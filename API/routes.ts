import * as express from 'express';
import {ProjectManager} from "./operations/projectManager";

export class Routes {
    private router: express.Router;
    private projectManager: ProjectManager;

    constructor() {
        this.router = express.Router();

        // Paths
        this.router.post('/projects/id/:id', this.projectManager.getProjectWithId());
        this.router.post('/projects/:identifier', this.projectManager.getProjectWithIdentifier());
        this.router.post('/projects', this.projectManager.createProject());
        this.router.post('/projects/:id', this.projectManager.modifyProject());
        this.router.post('/projects/:id', this.projectManager.deleteProject());

    }

    public getRouter() {
        return this.router;
    }
}
