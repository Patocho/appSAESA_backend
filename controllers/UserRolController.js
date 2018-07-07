const UserRols = require('../models').UserRols;

//get all for a unique ID
const getRolesForUser = async function(id){
    let err,roles;
    [err, roles] = await to(UserRols.findAll({where:{UserId:id}}));
    return roles;
}
module.exports.getRolesForUser = getRolesForUser;