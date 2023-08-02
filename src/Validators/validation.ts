import Express from "express";
import Joi from "joi";

export const userValidation = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const userSchema = Joi.object().keys({
    emailId: Joi.string()
      .pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      .messages({
        "string.empty": "email can not be empty",
        "string.pattern.base": "Please enter the valid email address",
        "any.required": "Emailid is required",
      })
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[!@#$%^&*_=+-]).{8,12}$/)
      .messages({
        "string.empty": "password can not be empty",
        "string.pattern.base": "Please enter the valid password",
        "any.required": "password is required",
      })
      .required(),
  });
  let options = { abortEarly: false };
  const { error } = userSchema.validate(req.body, options);
  if (error) {
    const errorMessages = error.details.map((err: any) => err.message);
    console.log(errorMessages);
    return res.status(400).json({
      // Error: errorMessages,
      error: true,
      message: errorMessages,
    });
  }
  next();
};
