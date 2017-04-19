export class ResponseObject {
    code: number;
    message: string;
    data?: Object;
}

export class Response {

    static INTERNAL_ERROR: ResponseObject = {
        code: 500,
        message: 'Server encountered an unexpected error'
    };

    static INVALID_PARAMETERS: ResponseObject = {
        code: 400,
        message: 'Invalid parameters'
    };

    static NOT_FOUND: ResponseObject = {
        code: 404,
        message: 'Asked resource not found'
    };

    static PROJECT_FOUND: ResponseObject = {
        code: 200,
        message: "Project found successfully"
    };

    static PROJECT_UPDATED: ResponseObject = {
        code: 200,
        message: "Project updated successfully"
    };

    static PROJECT_DELETED: ResponseObject = {
        code: 200,
        message: "Project deleted successfully"
    };

    static PROJECT_CREATED: ResponseObject = {
        code: 201,
        message: "Project created successfully"
    };

    static send(res: express.Response, responseObject: ResponseObject, data?: Object) {
        if (data) {
            responseObject.data = data;
        }
        res.status(responseObject.code);
        res.json(responseObject);
    };
}