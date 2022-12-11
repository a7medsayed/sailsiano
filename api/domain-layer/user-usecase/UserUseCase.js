/* eslint-disable indent */

const bcrypt = require('bcrypt');
const { createNewUser, isUserExist, getUserByUserName } = require("../../data-layer/repositories/user/UserRepository");
var { scrypt  } = require('crypto');
const  { promisify } = require('util');

scrypt = promisify(scrypt);



const authenticatePassword = async (  password , hashedPassword )=> {
    return await bcrypt.compare(password, hashedPassword);

    }
module.exports = {
  
    async registerNewUser(body) {

        try {
          
            const { Age, Password, Email, UserName , Role } = body;
            
            if (!Age) { 
                return {
                    status: "Age is required",
                    statusCode: 400
                    
                }
            }
            
            if (!Password) { 
                return {
                    status: "Password is required",
                    statusCode: 400
                    
                }
            }
            
            if (!Email) { 
                return {
                    status: "Email is required",
                    statusCode: 400
                    
                }
            }
            
            if (!UserName) { 
                return {
                    status: "UserName is required",
                    statusCode: 400
                    
                }
            }
            
            if (!Role) { 
                return {
                    status: "Role is required",
                    statusCode: 400
                    
                }
            }
            //check if Username is unique
            if (await isUserExist("UserName", UserName)) {
                return {
                    status: "This UserName Already Registered",
                    statusCode: 400
                    
                }
             }
            //check if email is valid and unique
            if (await isUserExist("Email", Email)) {
                return {
                    status: "This Email Already Registered",
                    statusCode: 400
                    
                }
            }
            if (Age < 18 || Age > 50) { 

                return {
                    status: "Age should be between 18 and 50",
                    statusCode: 400
                    
                }
            }
            const passwordReqex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ _%^&*-]).{6,20}$/
         
            if (!passwordReqex.test(Password)) {
                return {
                    status: "Age should be more than 6 characters contains numbers and letters",
                    statusCode: 400                         
                    
                }
             }
            //encrypt password
            const hashedPassword = await bcrypt.hash(Password, 10);
            const User = require('../../models/User/user');

            User.attributes.Age = Age;
            User.attributes.Password = hashedPassword;
            User.attributes.Email = Email;
            User.attributes.UserName = UserName;
            User.attributes.Role = Role;

            //create user
            await createNewUser(User.attributes);
            return {
                    status: "User Registered Successfuly",
                    statusCode: 200
                }
        }
        catch (err) {
            return err;
         }
    }
    ,
    async loginUser(body) {

        try {
            const { UserName, Password } = body;

            const user = await getUserByUserName(UserName);
            if (!user) { 
                return {
                    status: 'this user not register',
                    statusCode: 400
                }
            }

            const isAuthnticated = await authenticatePassword(Password, user.Password);
            if (isAuthnticated) {
                return { token: 'aaaaadddadaf' };
            }

            return {
                status: 'invalid passowrd',
                statusCode: 400
            };
        }
        catch (err) {
            return err;
         }
    },

    async getUserProfile(id) {
        try {
          
        
            const user = await getUserProfile(id);
            return user;
        }
        catch (err) {
            return err;
         }
    },

    async updateUserProfile(id, body) {

        try {
            
            const updatedUser = await updateUserProfile(id, body);
            return updatedUser;
            
        }
        catch (err) {
            return err;
         }

    },

};