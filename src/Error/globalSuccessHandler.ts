import express from "express";

  export const sendResponse = (statusCode : number, message : string, data : any, res : express.Response) => {
    return res.status(statusCode).json({
       error:false,
      message,
      data,
    });
  };

  export const sendResponseGet = (statusCode : number,data : any, res : express.Response) => {
    return res.status(statusCode).json({
       error:false,
      // message,
      data,
    });
  };

  export const sendResponseDelete = (statusCode : number,message : string,res:express.Response) => {
    return res.status(statusCode).json({
       error:false,
      message,
      // data,
    });
  };