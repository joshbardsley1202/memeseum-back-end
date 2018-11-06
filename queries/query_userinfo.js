const database = require("../database-connection");
module.exports = {
    list() {
        //Get all user info.
        return database('users')
            .select()
    },
    read(displayName){
        //Get user data by displayName
        return database('users')
            .where('displayName', displayName)
            .first();

    },
    create(user){
        //Create a new user.
        return database('users')
            .insert(user, '*')
            .then(record => record[0]);

    },
    update(displayName, user){
        //Update a user by name
        return database('users')
            .update(user)
            .where('displayName', displayName)
            .returning('*')
            .then(record => record[0])

    },
    delete(displayName) {
        //Delete a user by displayName
        return database('users')
            .where('displayName', displayName)
            .del();
    }
};