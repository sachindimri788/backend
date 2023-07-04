const express =  require("express");
const nodemailer=require("nodemailer");
import Role from '@src/models/roleModel';
import UserRoles from '@src/models/userinroles';
import { Request, Response, NextFunction } from 'express';


export const logRequest = ((req:Request, res:Response, next:NextFunction) => {
    console.log("Request::","userId::",res.locals.userId,"Method::",req.method,"Path::",req.url,"Body::",req.body);
    next();
  });

  export const getUserRole = (async(req:Request, res:Response, next:NextFunction) => {
    const userId = res.locals.userId;
    const userRole=await UserRoles.findOne({
      where:{userId},
    })
    const userRoleId=userRole.dataValues.roleId;
    const userRName=await Role.findOne({
      where:{roleId:userRoleId}
    })
     const userRoleName=userRName.dataValues.role;
    res.locals.roleId=userRoleId;
    res.locals.roleName=userRoleName;
    next();
  })

export const sendPasswordEmail=(async(emailId:any) =>{
      var transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "12f1fc94ccb041",
            pass: "629b78cbdd2ef9"
          }
        });
  
      const password=Math.floor(1000+Math.random()*1000);
        

      var mailOptions={
         to: emailId,
         subject: "Password for registration is: ",
         html: "<h3>Hello, Your Password is </h3>"  + "<h1 style='font-weight:bold;'>" + password +"</h1>" // html body
       };
       transporter.sendMail(mailOptions, (error:any, info:any) => {
          if (error) {
              return console.log(error);
          }
      });
      return password;
     
  })