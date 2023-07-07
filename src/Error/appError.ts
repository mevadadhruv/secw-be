class appError extends Error{
    
    statusCode : number;
    status : boolean | string;
    isOperational : boolean;

    constructor(message:string,statusCode:number){
        super(message);
        
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? true : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default appError;