import { TAddUser} from '@src/models/user';
import UserRepo from '../repo/user';
import { IntegerDataType } from 'sequelize';

const userRepo = new UserRepo();

class UserService {
  constructor() {}

  async getUserByEmailPassword(email:string,password:string) {
    try{
    return await userRepo.getUserByEmailPassword(email,password);
    }
    catch(error){
      throw new Error("internal Error")
    }
  }

  async getUsers(page:any,limit:any,department:any,role:any) {
    return userRepo.getUsers(page,limit,department,role);
  }

  async addUser(user: TAddUser) {      
      const response = await userRepo.addUser(user);
      if (response && response.dataValues) {
        return await userRepo.addUserRole(response.dataValues.userId,user.roleId);
      }
  }

  async isEmailExists(emailId:any){
    const exist = await userRepo.isEmailExists(emailId); 
    if(exist){return true;}
    else{return false;} 
  }


  async addLoginTime(userid:IntegerDataType){
    return await userRepo.addLogin(userid);
  }
  async addLogoutTime(userid:IntegerDataType){
    return await userRepo.addLogout(userid);
  }
  async userLog(userid:IntegerDataType,fromDate:any,toDate:any){
    return await userRepo.userLog(userid,fromDate,toDate);
  }

  async getRoles(){
    return await userRepo.getRoles();
  }

  async getDepartments(){
    return await userRepo.getDepartments();
  }

}

export default UserService;
