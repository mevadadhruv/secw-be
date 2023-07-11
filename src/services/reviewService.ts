import { inject, injectable } from "inversify";
import { IReviewService } from "../interfaces/IReviewService";
import { Review } from "../types/userTypes";
import { IReviewRepository } from "../interfaces/IReviewRepository";
import { types } from "../config/types";

@injectable()
export default class ReviewService implements IReviewService{
    private _reviewRepo : IReviewRepository;

    constructor(@inject(types.IReviewRepository) reviewRepo : IReviewRepository){
        this._reviewRepo = reviewRepo;
    }

    async addReview(review: Review): Promise<Review> {
        try{
            const createRev = this._reviewRepo.addReview(review);
            return createRev;
        }
        catch(err){
            console.log("inside review service : ");
            throw(err);
        }
    }
    
    async getAllReview(){
        try{
            const getRevs = this._reviewRepo.getAllReview();
            return getRevs;
        }
        catch(err){
            console.log("inside review service : ");
            throw(err);
        }
    }
    
    async getReviewbyId(id: string): Promise<Review> {
        try{
            const getRev = this._reviewRepo.getReviewbyId(id);
            return getRev;
        }
        catch(err){
            console.log("inside review service : ");
            throw(err);
        }
    }
    
    async updateReview(id: string, review: Review): Promise<Review> {
        try{
            const updateRev = this._reviewRepo.updateReview(id,review);
            return updateRev;
        }
        catch(err){
            console.log("inside review service : ");
            throw(err);
        }
    }
    
    async deleteReview(id: string): Promise<Review> {
        try{
            const deleteRev = this._reviewRepo.deleteReview(id);
            return deleteRev;
        }
        catch(err){
            console.log("inside review service : ");
            throw(err);
        }
    }

}