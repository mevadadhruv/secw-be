import express from "express";
const appError = require("./appError");

const sendErrorProd = (err: any, req: express.Request, res: express.Response) => {

  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        error: err.status,
        message: err.message
      });
    }
    console.error('ERROR 💥', err);
    return res.status(500).json({
      error: err.status,
      message: 'Something went very wrong!'
    });
  }

  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      error: err.status,
      message: 'Something went wrong!'
    });
  }
  
  console.error('ERROR 💥', err);
  
  return res.status(err.statusCode).render('error', {
    error: err.status,
    message: 'Something went wrong!'
  });
};

const checking = (err: any, req: express.Request, res: express.Response, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || true;

  let error = {...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Cast error: Invalid id!please check your id:${err.value}.`;
    return new appError(message, 400);
  } else if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `This named field is already exists:${value}. Please use another value!`;
    return new appError(message, 400);
  } else if (error.name === 'ValidationError') {
    const errors: { [key: string]: string[] } = err.errors;
    const message = `Invalid input data. ${Object.values(errors).join('. ')}`;
    return new appError(message, 400);
  } else {
    sendErrorProd(error, req, res);
  }
};

export default sendErrorProd;