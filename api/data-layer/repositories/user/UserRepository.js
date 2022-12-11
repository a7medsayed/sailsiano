const { getById, create, isExist, getItemByCodition, update } = require("../../dbs/firestore/firestore")

var userTable = "users";
module.exports = {

    async createNewUser(user)
    {
        return await create(user, userTable );
    }
    ,
    async getUserProfile(id) { 
        return await getById(id, userTable );
    },
    async getUserByUserName(userName) { 
        return await getItemByCodition(userTable,'UserName',userName);
    },
    async getUserByEmail(Email) { 
        return await getItemByCodition(userTable,'Email',Email);
    },
    async isUserExist(uniqField, value) { 
        return await isExist(userTable, uniqField, value);
    },
    async updateUserProfile(id, user) { 
        return await update(id,user,userTable)
    }
}