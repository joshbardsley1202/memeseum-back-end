const database = require("../database-connection");
module.exports = {
    list() {
        //Get all userposts
        return database('memes')
            .select()
    },
    read(postOwner) {
        //Get post by postOwner
        return database('memes')
            .where('postOwner', postOwner)
            .then(records => records)
    },
    create(post) {
        //Create a post
        return database('memes')
            .insert(post, '*')
            .then(record => { record[0] });

    },
    update(id, post) {
        //Update a post, location and caption etc
        return database('memes')
            .update(post)
            .where(id, id)
            .returning('*')
            .then(record => {
                console.log(record[0])
                return record[0]
                
            })
           
    },
    delete(id) {
        //Delete a post
        return database('memes')
            .where('id', id)
            .del();

    }
};