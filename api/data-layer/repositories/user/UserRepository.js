const { getById, create, isExist } = require("../../dbs/firestore/firestore")

var table = "users";
module.exports = {

    async createNewUser(user)
    {
        console.log(user,table)
        return await create(user, table );
    }
    ,
    async getUserProfile(id) { 
        return await getById(id, table );
    },
    async isUserExist(uniqField, value) { 
        return await isExist("users", uniqField, value);
    }
}