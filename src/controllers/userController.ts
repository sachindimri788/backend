import Express from 'express';
import { generateToken } from '@src/util/auth';
import UserService from '@src/services/userService';
import HttpStatusCodes from '@src/constants/httpStatusCodes';
import { TAddUser, TGetUser } from '@src/models/user';
import { sendPasswordEmail } from '@src/util/middleware';

const userService = new UserService();

export const login = async (req: Express.Request, res: Express.Response) => {
  try {
    const { email, password } = req.body;
    
    const userInfo = await userService.getUserByEmailPassword(email, password);
    if (userInfo && userInfo.dataValues) {
      const { userId } = userInfo.dataValues;
      const token = generateToken({ userId });
      const role = userInfo.dataValues?.userinrole?.role.dataValues.role;
      const department = userInfo.dataValues?.department?.dataValues.department;
      const user = {
        name: userInfo.dataValues.name,
        email: userInfo.dataValues.emailId,
        mobileNo: userInfo.dataValues.mobileNo,
        status: userInfo.dataValues.status,
        role,
        department,
      }

      await userService.addLoginTime(userInfo.dataValues.userId);

      return res.status(HttpStatusCodes.OK).json({ token, user });
    }
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ mesage: 'invalid user' });
  } catch (error) {

    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'internal server error' });
  }
};

export const getUsers = async (req: Express.Request, res: Express.Response) => {
  if (res.locals.roleName === 'Admin' || res.locals.roleName === 'SuperAdmin') {
    try {
      const userId = res.locals.userId;
      const {pageNo,pageSize,department,role}=req.body;
      if (pageNo === undefined && pageSize === undefined) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "please provie page and page size details" })
      };

      const { users, totalrecord } = await userService.getUsers(pageNo, pageSize,department,role);

      const Users = users.map((user: TGetUser) => {
        return {
          userId,
          name: user.name,
          mobileNo: user.mobileNo,
          emailId: user.emailId,
          status: user.status,
          roles: user.roles.length ? user.roles[0].role : '',
          department: user.department.department,
        };
      });

      return res.status(HttpStatusCodes.OK).json({ Users, totalrecord });
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'internal server error' });
    }
  }
  else {
    return res.json({ message: "not a verified user" });
  }
};

export const addUser = async (req: Express.Request, res: Express.Response) => {
  if (res.locals.roleName === 'Admin' || res.locals.roleName === 'SuperAdmin') {
    try {
      const { email, name, mobileNo, department, role } = req.body;

      /////////////email validation check
      const exist=await userService.isEmailExists(email);
      if(exist){
        const password:any=await sendPasswordEmail(email);
        if(password){
        const userId = 1; //res.locals.userId
        const user: TAddUser = {
          emailId: email,
          name,
          mobileNo,
          departmentId: department,
          roleId: role,
          createdDate: new Date(),
          createdBy: Number(userId),
          status: 1,
          password,
        };
          await userService.addUser(user);
          return res.status(HttpStatusCodes.CREATED).json({ message: 'success' });
      }else{
        return res.status(400).json({message:'error in password generation'});
      }
    }
      else {
        return res.status(409).json({ message: 'Email Already Exist' });
      }
    } catch (e) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'interenal server error' });
    }
  }
  else {
    return res.json({ message: "not a verified user" });
  }
};


export const logout = async (req: Express.Request, res: Express.Response) => {
  try {
    await userService.addLogoutTime(res.locals.userId);
    return res.status(HttpStatusCodes.CREATED).json({ message: 'log out' });
  }
  catch {
    return res.status(400).json({ message: 'Error in logout' });
  }
}

export const logTime = async (req: Express.Request, res: Express.Response) => {
  try {
    const log = await userService.userLog(res.locals.userId, req.body.fromDate, req.body.toDate);
    const loguser = log.map((item: any) => {
      return {
        createdDate: item.dataValues.createdDate,
        inTime: item.dataValues.inTime,
        outTime: item.dataValues.outTime
      }

    })
    return res.status(HttpStatusCodes.OK).json({ loguser });
  }
  catch {
    return res.status(400).json({ message: 'Error in log Time' });
  }
}

export const getRoles = async (req: Express.Request, res: Express.Response) => {
  if (res.locals.roleName === 'Admin' || res.locals.roleName === 'SuperAdmin') {
    try {
      const allRoles = await userService.getRoles();
      return res.status(200).json({ allRoles })
    }
    catch (e) {
      return res.status(400);
    }
  } else {
    return res.json({ message: "not a verified user" });
  }

}

export const getDepartments = async (req: Express.Request, res: Express.Response) => {
  if (res.locals.roleName === 'Admin' || res.locals.roleName === 'SuperAdmin') {
    try {
      const allDepartments = await userService.getDepartments();
      return res.status(200).json({ allDepartments })
    }
    catch (e) {
      return res.status(400);
    }
  } else {
    return res.json({ message: "not a verified user" });
  }
}