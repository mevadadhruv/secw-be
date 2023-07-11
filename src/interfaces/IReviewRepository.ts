import { Review } from "../types/userTypes";

export interface IReviewRepository{
    addReview(review : Review) : Promise<Review>;
    getAllReview() : any;
    getReviewbyId(id:string) : Promise<Review>;
    updateReview(id:string,review : Review) : Promise<Review>;
    deleteReview(id:string) : Promise<Review>;   
}