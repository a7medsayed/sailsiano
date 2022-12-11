const { getById, create, isExist, getItemByCodition } = require("../../dbs/firestore/firestore")

var table = "users";
module.exports = {

    async createNewUser(user)
    {
        return await create(user, table );
    }
    ,
    async getUserProfile(id) { 
        return await getById(id, table );
    },
    async getUserByUserName(userName) { 
        return await getItemByCodition("users",'UserName',userName);
    },
    async isUserExist(uniqField, value) { 
        return await isExist("users", uniqField, value);
    }
}