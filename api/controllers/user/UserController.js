/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { registerNewUser, getUserProfile, loginUser, updateUserProfile } = require("../../domain-layer/user-usecase/UserUseCase");

module.exports = {
  
    async registerNewUser(req, res) {

        try {
            
            const response = await registerNewUser(req.body);

            res.send(response);
        }
        catch (err) {
            res.send(err);
         }
    },

    async loginUser(req, res) {

        try {
            
            const token = await loginUser(req.body);
            res.send(token);
        }
        catch (err) {
            res.send(err);
         }
    },

    async getUserProfile(req, res) {
        try {


            const user = await getUserProfile(req.user.Id);
            res.send(user);
        }
        catch (err) {
            res.send(err);
         }
    },

    async updateUserProfile(req, res) {

        try {
            
             const response = await updateUserProfile(req.user.Id , req.body);
            res.send(response);
        }
        catch (err) {
            res.send(err);
         }

    },

};

