import * as express from 'express';

export class Routes {
    private router: express.Router;

    constructor() {
        this.router = express.Router();

        // Paths
        this.router.get('/', function(req, res) {
            res.send('Am the home page!');
        });
    }

    public getRouter() {
        return this.router;
    }
}
