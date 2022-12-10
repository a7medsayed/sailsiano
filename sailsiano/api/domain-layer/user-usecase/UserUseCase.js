/* eslint-disable indent */

module.exports = {
  
    async registerNewUser(body) {

        try {
            
        
        }
        catch (err) {
            return err;
         }
    },

    async loginUser(body) {

        try {
            
            const token = '';
            return token;
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