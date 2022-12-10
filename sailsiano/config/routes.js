/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    //User Routes
    'POST user/register': 'user.UserController.registerNewUser',
    'POST user/login': 'user.UserController.loginUser',
    'GET user/profile': 'user.UserController.getUserProfile',
    'PUT user/profile.update': 'user.UserController.updateUserProfile',

};
