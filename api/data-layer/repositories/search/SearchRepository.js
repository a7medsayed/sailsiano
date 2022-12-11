const algoliasearch = require("algoliasearch");

const client = algoliasearch(sails.config.algoliaAppID, sails.config.algoliaAdminKey);
const index = client.initIndex("users");

module.exports = {

    async pushUser(user)
    { 
        
     return await index.saveObjects([user], { autoGenerateObjectIDIfNotExist: true });
     
    },

    async fetchUser(UserName , Email , Page , Limit) { 

        
      page = Page || 1;
      limit = Limit || 20;
      let filter = '';
      if (UserName) { 
        filter += `UserName:${UserName}`;
      }
      if (Email) { 
        if (UserName) { 
          filter +=  ` OR `
        }
        filter += `Email:${Email}`;
      }

      const content = await index.search('', {
        filters: `UserName:${UserName} OR Email:${Email}`,
        page: page - 1,
        hitsPerPage: limit
      });
    
      return content.hits;
           
    }
}