import { HttpCodes } from "../interfaces/http-codes";

export class HttpErrorHandler {
    httpCodes : HttpCodes = {
        "1xx": {
            "description": "Informational",
            "examples": {
                "100": "Continue: The client can continue sending the request."
            }
        },
        "2xx": {
            "description": "Success",
            "examples": {
                "200": "OK: The request was successful.",
                "201": "Created: The resource was successfully created.",
                "204": "No Content: The request was successful, but there is no content to return."
            }
        },
        "3xx": {
            "description": "Redirection",
            "examples": {
                "301": "Moved Permanently: The resource has been permanently moved.",
                "302": "Found: The resource has been temporarily moved.",
                "304": "Not Modified: The resource has not been modified since the last request."
            }
        },
        "4xx": {
            "description": "Client Error",
            "examples": {
                "400": "Bad Request: The request is malformed.",
                "401": "Unauthorized: The user is not authorized to access the resource.",
                "403": "Forbidden: Access to the resource is forbidden, even if the user is authenticated.",
                "404": "Not Found: The requested resource does not exist."
            }
        },
        "5xx": {
            "description": "Server Error",
            "examples": {
                "500": "Internal Server Error: An internal error occurred on the server.",
                "502": "Bad Gateway: The server, acting as a gateway, received an invalid response from another server.",
                "503": "Service Unavailable: The server is temporarily unavailable."
            }
        }
    }
    customHttpCodes! : HttpCodes | undefined

    constructor(codes?: HttpCodes) {
        this.customHttpCodes = codes;
        if(this.customHttpCodes){
            this.httpCodes = this.customHttpCodes
        }
    }

    public getErrorMessage(statusCode: number): string {
        const code = statusCode.toString()
        for (const category in this.httpCodes) {
            if (this.httpCodes.hasOwnProperty(category)) {
                const data = this.httpCodes[category];
                if (data.examples && data.examples[code]) {
                    return data.examples[code];
                }
            }
        }
        return "HTTP code not found";
    }
}