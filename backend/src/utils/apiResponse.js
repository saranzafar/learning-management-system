class ApiResponse {
    constructor(statuscode, message = "Success", data = null) {
        this.statuscode = statuscode;
        this.message = message;
        this.data = data;
        this.success = statuscode >= 200 && statuscode < 300;
        this.fail = statuscode >= 400;
    }
}

export { ApiResponse };
