import express from "express";

exports.sendResponse = (statusCode : number, message : string, data : any, res : express.Response) => {
    return res.status(statusCode).json({
       error:false,
      message,
      data,
    });
  };

  exports.sendResponseGet = (statusCode : number,data : any, res : express.Response) => {
    return res.status(statusCode).json({
       error:false,
      // message,
      data,
    });
  };

  exports.sendResponseDelete = (statusCode : number,message : string,res:express.Response) => {
    return res.status(statusCode).json({
       error:false,
      message,
      // data,
    });
  };