import express, { NextFunction } from "express";
import { IReviewService } from "../interfaces/IReviewService";
import { inject, injectable } from "inversify";
import { types } from "../config/types";
import { Review } from "../types/userTypes";
import { checking } from "../error/globalErrorHandler";
import { sendResponse, sendResponseDelete, sendResponseGet } from "../error/globalSuccessHandler";

@injectable()
export default class ReviewController {
private _reviewService : IReviewService;
    
    constructor(@inject(types.IReviewService) reviewService : IReviewService){
        this._reviewService = reviewService;
    }

    async addReview(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const review : Review = {
                review : req.body.review,
                reviewstar : req.body.reviewStar
            } 
            const createreview = await this._reviewService.addReview(review);
            if(createreview){
                return sendResponse(200,"created",createreview,res);
            }           
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async getReviews(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const reviews = await this._reviewService.getAllReview();
            if(reviews){
                return sendResponseGet(300,reviews,res);
            }
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async getReviewById(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const id = req.params.id;
            const review = this._reviewService.getReviewbyId(id);
            if(review){
                return sendResponseGet(300,review,res);
            }
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async updateReview(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const id = req.params.id;
            const review : Review = {
                review : req.body.review,
                reviewstar : req.body.reviewStar
            };
            const updatereview = await this._reviewService.updateReview(id,review);
            if(updatereview){
                return sendResponse(200,"updated",updatereview,res);
            }
        }
        catch(err){
            return checking(err,req,res,next);
        }
    }

    async deleteReview(req:express.Request,res:express.Response,next:NextFunction){
        try{
            const id = req.params.id;
            const deleteRev = await this._reviewService.deleteReview(id);
            if(deleteRev){
                return sendResponseDelete(200,"deleted",res);
            }
        }
        catch(err){
            return checking(err,req,res,next);           
        }
    }
}