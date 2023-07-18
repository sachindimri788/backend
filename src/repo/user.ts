import Department from '@src/models/departmentModel';
import Log from '@src/models/logModel';
import Role from '@src/models/roleModel';
import { TGetUser, TUser } from '@src/models/user';
import User from '@src/models/userModel';
import UserRoles from '@src/models/userinroles';
import { IntegerDataType, Op } from 'sequelize';
import moment from 'moment';
const bcrypt = require("bcrypt");


class UserRepo {
  constructor() { }

  async getUserByEmailPassword(email: string, password: string) {
    try {
      const user = await User.findOne({
        where: { emailId: email },
        include: [
          {
            model: UserRoles,
            include: [{ model: Role }],
          },
          {
            model: Department
          }

        ],
      });
      const bpass = await bcrypt.compare(typeof password == "string" ? password : JSON.stringify(password), user.password)                 //////compare bcrypt
      if (bpass) {
        return user;
      }
    } catch (error) {
      throw new Error("internal Error")
    }
  }



  async getUsers(page: any, limit: any, department: any, role: any) {
    try {

      const Users: TGetUser[] = await User.findAll({
        attributes: ['name', 'mobileNo', 'emailId', 'status'],
        include: [
          {
            model: Role,
            attributes: ['role'],
            where: role ? { role } : {},                                           /////////role filter
          },
          {
            model: Department,
            attributes: ['department'],
            where: department ? { department } : {},                               /////////department filter
          },
        ],
        through: {
          attributes: [],
        }
      });
      const totalrecord = Users.length;

      limit = parseInt(limit);
      const offset: any = (parseInt(page) - 1) * parseInt(limit);

      const users=Users.slice(offset, offset + limit);
      return { users, totalrecord };

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async addUser(user: TUser) {
    try {
      const password = await bcrypt.hash(typeof user.password == "string" ? user.password : JSON.stringify(user.password), bcrypt.genSaltSync(8));           //////BCRYPT
      user.password = password;
    }
    catch (e) { console.log(e); return; }
    return User.create(user);
  }

  async addUserRole(userId: number, roleId: number) {
    return UserRoles.create({
      userId,
      roleId,
      isActive: 1,
    });
  }

  async isEmailExists(email: string) {
    const user = await User.findOne({
      where: { emailId: email },
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async addLogin(userId: IntegerDataType) {
    try {
      const log = await Log.findOne({ where: { userId, outTime: null } });

      if (log) {
        await Log.update(
          { inTime: new Date() },
          { where: { userId, outTime: null } }
        )
      }
      else {
        return await Log.create({
          userId,
          inTime: new Date(),
          createdBy: userId,
          createdTime: new Date()
        })
      }
    } catch (e) { console.log(e); }
  }


  async addLogout(userId: IntegerDataType) {
    try {
      const log = await Log.findOne({ where: { userId, outTime: null } });
      if (log) {
        log.outTime = new Date();
        log.updatedTime = new Date();
        return await log.save();
      } else {
        console.log('No active login found for the user');
      }
    } catch (e) {
      console.log(e);
    }
  }
  async userLog(userId: IntegerDataType, startDate: any, endDate: any) {
    try {
      const log = await Log.findAll({
        where: {
          userId,
          createdTime: {
            [Op.gte]: new Date(startDate),          // Greater than or equal to startDate
            [Op.lte]: moment(endDate).endOf('day'), // Less than or equal to endDate (end of the day)
          },
        },
      });
      return log;
    } catch (e) {
      console.log(e);
    }
  }


  async getRoles() {
    try {
      const roles = await Role.findAll();
      return roles.map((val: any) => {
        return val.dataValues.role;
      })
    }
    catch (e) { console.log(e); }
  }

  async getDepartments() {
    try {
      const roles = await Department.findAll();
      return roles.map((val: any) => {
        return val.dataValues.department;
      })
    }
    catch (e) { console.log(e); }
  }

}
export default UserRepo;
