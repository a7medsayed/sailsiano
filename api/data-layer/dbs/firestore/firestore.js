
var admin = require("firebase-admin");
var serviceAccount = require("../../../../firebase-key.json");
admin.initializeApp(
   {
     credential: admin.credential.cert(serviceAccount)
    }
  );
var db = admin.firestore();


module.exports = {

  async getById(id, table) { 
    
        return await (await db.collection(table).doc(id).get()).data();
    },

    async create(item , table) { 
      const usersDb = db.collection(table);
      var uniq = 'id' + (new Date()).getTime();
        const response = await usersDb.doc(uniq).set(item);
        return response;
    },
    async update(id, item, table) { 

      return  await db.collection(table).doc(id).update(item);
   
  },
  async isExist(table, field, value) { 
    const size = await (await db.collection(table).where(field, "==", value).get()).size;
    return  size;
  }
,
  async getItemByCodition(table, field, value) { 
    let userCollection = db.collection(table);
    let query = userCollection.where(field, "==", value);

    let users = await (await query.get()).docs;
    let result = [];
    for (let user of users) { 
      result.push(user.data());
    }
    return result[0];
  }
    
}