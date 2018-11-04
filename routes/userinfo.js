//Dependencies:
const express = require('express');
const cors = require('cors')

//Dependency Injections
const router = express.Router().use(cors())

const queries = require('../queries/query_userinfo.js');

//Get all user info.
router.get("/", (request, response, next) => {
    queries.list()
        .then(users => {
            response.json({
                users
            });
        })
        .catch(next);
});

//Get user data by displayName
router.get("/:displayName", (request, response, next) => {
    queries.read(request.params.displayName)
        .then(user => {
            user
            ?
            response.json({
                user
            }) 
            :
            response.status(404).json({
                message: 'Not found'
            })
        })
        .catch(next);
});

router.put("/:displayName", (request, response, next) => {
    queries.update(request.params.displayName, request.body)
        .then(user => {
            user
            ?
            response.json({
                user
            }) 
            :
            response.status(404).json({
                message: 'Not found'
            })
        })
        .catch(next);
});

//Create a new user.
router.post("/", (request, response, next) => {
    queries.create(request.body)
        .then(user => {
            response.status(201).json({
                user
            });
        })
        .catch(next);
});

//Update a user by displayName.

//Delete a user by name
router.delete("/:displayName", (request, response, next) => {
    queries.delete(request.params.displayName)
        .then(() => {
            response.status(204).json({
                deleted: true
            });
        })
        .catch(next);
});

module.exports = router;