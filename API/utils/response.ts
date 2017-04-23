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

    static RESOURCE_NOT_FOUND: ResponseObject = {
        code: 404,
        message: 'Asked resource not found'
    };

    static RESOURCE_FOUND: ResponseObject = {
        code: 200,
        message: "Resource found successfully"
    };

    static RESOURCE_UPDATED: ResponseObject = {
        code: 200,
        message: "Resource updated successfully"
    };

    static RESOURCE_DELETED: ResponseObject = {
        code: 200,
        message: "Resource deleted successfully"
    };

    static RESOURCE_CREATED: ResponseObject = {
        code: 201,
        message: "Resource created successfully"
    };

    static send(res: express.Response, responseObject: ResponseObject, data?: Object) {
        if (data) {
            responseObject.data = data;
        }
        res.status(responseObject.code);
        res.json(responseObject);
    };
}