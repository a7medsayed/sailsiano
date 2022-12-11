/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/
  
    // models: {
    //   connection: 'someMongodbServer'
    // }
    jwtSecret: 'mysuperdevsecret',
  jwtExpires: '180d',
    
  algoliaAppID: "Y7UZN26SEQ",
  algoliaAdminKey: "0fe3c4d1ae4d567bc131b04a779c4372"
};