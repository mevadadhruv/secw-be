import { ObjectId } from "mongodb";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import reviewModel from "../models/review.model";
import { Review } from "../types/userTypes";
import { injectable } from "inversify";

@injectable()
export default class ReviewRepository implements IReviewRepository{
    async addReview(review: Review): Promise<Review> {
        try{
            const rev = review.review;
            const rev_star = review.reviewstar;
            const addrev = await reviewModel.create({review:rev,reviewStar:rev_star});
            return {review:addrev.review,reviewstar:addrev.reviewStar};
        }
        catch(err){
            console.log("inside review repository");
            throw(err);
        }
    }
    
    async getAllReview(){
        try{
            const getReviews = await reviewModel.find();
            return getReviews;
        }
        catch(err){
            console.log("inside review repository");
            throw(err);
        }
    }
    
    async getReviewbyId(id: string): Promise<Review> {
        try{
            const getReview = await reviewModel.findById(new ObjectId(id));
            return {id:getReview.id,review:getReview.review,reviewstar:getReview.reviewStar};
        }
        catch(err){
            console.log("inside review repository");
            throw(err);
        }
    }
    
    async updateReview(id: string, review: Review): Promise<Review> {
        try{
            const updateRev = await reviewModel.findByIdAndUpdate(id,review);
            return {id:updateRev.id,review:updateRev.review,reviewstar:updateRev.reviewStar};
        }
        catch(err){
            console.log("inside review repository");
            throw(err);
        }
    }
    
    async deleteReview(id: string): Promise<Review> {
        try{
            const deleteRev = await reviewModel.findByIdAndDelete(id);
            return {id:deleteRev.id,review:deleteRev.review,reviewstar:deleteRev.reviewStar};
        }
        catch(err){
            console.log("inside review repository");
            throw(err);
        }
    }
    
}