import UserRepository from "../Repositories/userRepository";

const userRepository = new UserRepository();

export default class UserService {
    async createUser(incoming: any) {
        const repo = await userRepository.createUser(incoming);
        return repo;
    }

    async getUser(){
        const user = await userRepository.getUser();
        return user;
    }

    async getUserbyId(id : String){
        const users = await userRepository.getUserbyId(id); 
        return users;
    }

    async updateUser(id:String,incoming:any){
        const updateUser = await userRepository.updateUser(id,incoming);
        return updateUser;
    }

    async deleteUser(id:String){
        const deleteUser = await userRepository.deleteUser(id);
        return deleteUser; 
    }

}