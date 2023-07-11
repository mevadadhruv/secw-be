import express from "express";
import ReviewController from "../controllers/reviewController";
import { iocContainer as Container} from "../config/container";
import { IReviewService } from "../interfaces/IReviewService";
import { types } from "../config/types";

const reviewService = Container.get<IReviewService>(types.IReviewService);
const reviewController = new ReviewController(reviewService);
const reviewRouter = express.Router();

reviewRouter.post("/add-review",(req,res,next)=>reviewController.addReview(req,res,next));
reviewRouter.get("/reviews",(req,res,next)=>reviewController.getReviews(req,res,next));
reviewRouter.get("/reviews/:id",(req,res,next)=>reviewController.getReviewById(req,res,next));
reviewRouter.put("/reviews/:id",(req,res,next)=>reviewController.updateReview(req,res,next));
reviewRouter.delete("/reviews/:id",(req,res,next)=>reviewController.deleteReview(req,res,next));

export default reviewRouter;