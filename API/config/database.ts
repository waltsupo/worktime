import * as config from './configuration';

export class Database {

    private mysql: any;
    private pool: any;

    constructor() {

        this.mysql = require('mysql');
        this.pool = this.mysql.createPool(config.database);
    }

    public getMysql() {
        return this.mysql;
    }

    public getPool() {
        return this.pool;
    }
}