/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken');
const { getUserProfile } = require('../data-layer/repositories/user/UserRepository');
module.exports = async function(req, res, next) {

    

    const invalidToken = {
        status: 'InvalidToken',
        statusCode: 401
    }
    if (req.header('authorization')) {
      
    var token = req.header('authorization').split('Bearer ')[1];
        
        if (!token) { return res.send(invalidToken); }
        
    return await jwt.verify(token, sails.config.jwtSecret, async function(err, payload) {
    
      if (err) {
          return res.send(invalidToken);
      }
      
      if (!payload.user) {return res.send(invalidToken);}
      
        const user = await getUserProfile(payload.user);
        if (!user) { return res.send(invalidToken); }
        if (!user.Role.includes('admin')) {
           return res.forbidden();
         }
        req.user = {
            UserName: user.UserName,
            Email: user.Email,
            Age: user.Age,
            Id: user.Id
        };
        return next();
    });
  }
    return res.forbidden();
 
};