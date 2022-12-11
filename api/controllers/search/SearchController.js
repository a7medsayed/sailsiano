/**
 * SearchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { searchUsers } = require("../../domain-layer/search-usecase/SearchUseCase");

module.exports = {
  

    async searchUsers(req, res) { 

        return res.send(await searchUsers(req.body));
    }
};

