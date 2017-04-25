import * as express from 'express';
import {ProjectManager} from "./operations/projectManager";
import {Database} from "./config/database";
import {CategoryManager} from "./operations/categoryManager";

export class Routes {
    private router: express.Router;
    private projectManager: ProjectManager;
    private categoryManager: CategoryManager;

    constructor(database: Database) {
        this.router = express.Router();
        this.projectManager = new ProjectManager(database);
        this.categoryManager = new CategoryManager(database);

        // Paths
        this.router.get('/projects/id/:id', this.projectManager.getProjectWithId);
        this.router.get('/projects/:identifier', this.projectManager.getProjectWithIdentifier);
        this.router.post('/projects', this.projectManager.createProject);
        this.router.put('/projects/:id', this.projectManager.modifyProject);
        this.router.delete('/projects/:id', this.projectManager.deleteProject);

        this.router.get('/categories', this.categoryManager.getCategories);
        this.router.get('/categories/:id', this.categoryManager.getCategory);
        this.router.post('/categories', this.categoryManager.createCategory);
        this.router.put('/category/:id', this.categoryManager.modifyCategory);
        this.router.delete('/category/:id', this.categoryManager.deleteCategory);
    }

    public getRouter() {
        return this.router;
    }
}
