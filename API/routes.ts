import * as express from 'express';
import {ProjectManager} from "./operations/projectManager";
import {Database} from "./config/database";
import {CategoryManager} from "./operations/categoryManager";
import {UserManager} from "./operations/userManager";
import {TaskManager} from "./operations/taskManager";

export class Routes {
    private router: express.Router;
    private projectManager: ProjectManager;
    private categoryManager: CategoryManager;
    private userManager: UserManager;
    private taskManager: TaskManager;

    constructor(database: Database) {
        this.router = express.Router();
        this.projectManager = new ProjectManager(database);
        this.categoryManager = new CategoryManager(database);
        this.userManager = new UserManager(database);
        this.taskManager = new TaskManager(database);

        // Paths
        this.router.get('/projects/id/:id', this.projectManager.getProjectWithId);
        this.router.get('/projects/:identifier', this.projectManager.getProjectWithIdentifier);
        this.router.post('/projects', this.projectManager.createProject);
        this.router.put('/projects/:id', this.projectManager.modifyProject);
        this.router.delete('/projects/:id', this.projectManager.deleteProject);

        this.router.get('/categories/:projectId', this.categoryManager.getCategories);
        this.router.get('/categories/id/:id', this.categoryManager.getCategory);
        this.router.post('/categories', this.categoryManager.createCategory);
        this.router.put('/categories/:id', this.categoryManager.modifyCategory);
        this.router.delete('/categories/:id', this.categoryManager.deleteCategory);

        this.router.get('/users/:projectId', this.userManager.getUsers);
        this.router.get('/users/id/:id', this.userManager.getUser);
        this.router.post('/users', this.userManager.createUser);
        this.router.put('/users/:id', this.userManager.modifyUser);
        this.router.delete('/users/:id', this.userManager.deleteUser);

        this.router.get('/tasks/:projectId', this.taskManager.getTasks);
        this.router.get('/tasks/id/:id', this.taskManager.getTask);
        this.router.post('/tasks', this.taskManager.createTask);
        this.router.put('/tasks/:id', this.taskManager.modifyTask);
        this.router.delete('/tasks/:id', this.taskManager.deleteTask);
    }

    public getRouter() {
        return this.router;
    }
}
