const { getById } = require("../../dbs/firestore/firestore")

module.exports = {

    async createNewUser(user)
    {
         
    }
    ,
    async getUserProfile(id) { 
        return await getById(id, "users");
    }
}