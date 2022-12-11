/* eslint-disable indent */

const { pushUser, fetchUser } = require("../../data-layer/repositories/search/SearchRepository");



const authenticatePassword = async (  password , hashedPassword )=> {
    return await bcrypt.compare(password, hashedPassword);

    }
module.exports = {
  
   
    async pushUser(body) {

        try {
            return await pushUser(body);
        }
        catch (err) {
            return err;
         }
    },

    async searchUsers(body) {
        try {
          
            const { UserName,
                Email,
                Page,
                Limit } = body;
        
            const users = await fetchUser(UserName , Email , Page , Limit);
            return users;
        }
        catch (err) {
            return err;
         }
    },

   

};