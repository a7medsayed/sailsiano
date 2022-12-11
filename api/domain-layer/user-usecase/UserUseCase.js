/* eslint-disable indent */

const bcrypt = require('bcrypt');
const { createNewUser, isUserExist, getUserByUserName, getUserProfile, updateUserProfile, getUserByEmail } = require("../../data-layer/repositories/user/UserRepository");
var { scrypt  } = require('crypto');
const  { promisify } = require('util');
var jwt = require('jsonwebtoken');
const { pushUser } = require('../../data-layer/repositories/search/SearchRepository');

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
            const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            if (!emailRegex.test(Email)) { 
                return {
                    status: "Invalid Email",
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
            const UserIndex = require('../../models/Search/userIndex');

            var uniq = 'id' + (new Date()).getTime();
            User.attributes.Id = uniq;
            User.attributes.Age = Age;
            User.attributes.Password = hashedPassword;
            User.attributes.Email = Email;
            User.attributes.UserName = UserName;
            User.attributes.Role = Role;

            
            UserIndex.attributes.Id = User.attributes.Id;
            UserIndex.attributes.Age = User.attributes.Age;
            UserIndex.attributes.Email = User.attributes.Email;
            UserIndex.attributes.UserName = User.attributes.UserName;
            UserIndex.attributes.Role = User.attributes.Role;

            await pushUser(UserIndex.attributes);
         
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

                const payload = {
                    user: user.Id
                }
           
                var token = jwt.sign(payload, sails.config.jwtSecret, {expiresIn: sails.config.jwtExpires});
                return { token: token };
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
            
            const user = await getUserProfile(id);
            
            const { Age, Email, UserName } = body;

            if (Age) {
                
                if (Age < 18 || Age > 50) { 
                    return {
                        status: "Age should be between 18 and 50",
                        statusCode: 400
                        
                    }
                }
                user.Age = Age;
            }

            if (Email) { 

                const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
              
                if (!emailRegex.test(Email)) { 
                    return {
                        status: "Invalid Email",
                        statusCode: 400
                    }
                }
                const existedUser = await getUserByEmail(Email);
                if (existedUser && existedUser.Id != user.Id) { 
                    return {
                        status: "Email Already Exist",
                        statusCode: 400
                    }
                }
                user.Email = Email;
            }
            if (UserName) { 

                const existedUser = await getUserByUserName(UserName);
                if (existedUser && existedUser.Id != user.Id) { 
                    return {
                        status: "UserName Already Exist",
                        statusCode: 400
                    }
                }
                user.UserName = UserName;

            }

             await updateUserProfile(id, user);

            return {
                status: 'User Updated Successfuly',
            statusCode: 200
            };
            
        }
        catch (err) {
            return err;
         }

    },

};