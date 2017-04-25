import * as express from 'express';
import {ProjectManager} from "./operations/projectManager";
import {Database} from "./config/database";

export class Routes {
    private router: express.Router;
    private projectManager: ProjectManager;

    constructor(database: Database) {
        this.router = express.Router();
        this.projectManager = new ProjectManager(database);

        // Paths
        this.router.get('/projects/id/:id', this.projectManager.getProjectWithId);
        this.router.get('/projects/:identifier', this.projectManager.getProjectWithIdentifier);
        this.router.post('/projects', this.projectManager.createProject);
        this.router.put('/projects/:id', this.projectManager.modifyProject);
        this.router.delete('/projects/:id', this.projectManager.deleteProject);

    }

    public getRouter() {
        return this.router;
    }
}
