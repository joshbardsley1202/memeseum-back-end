//Dependencies
const express = require('express');
const cors = require('cors')

//Dependency Injections
const router = express.Router().use(cors())

const queries = require('../queries/query_memes.js');

//Routers

//Get all userposts
router.get("/", (request, response, next) => {
    queries.list()
        .then(memes => {
            response.json({
                memes
            });
        })
        .catch(next);
});

//Get posts by ID
router.get("/:postOwner", (request, response, next) => {
    queries.read(request.params.postOwner)
        .then(posts => {
            posts
            ?
            response.json({
                posts
            })
            :
            response.status(404).json({
                message: 'Not found'
            })
        })
        .catch(next);
});

//Create a post
router.put("/:id", (request, response, next) => {
    console.log('id: ' + request.params.id, 'body:' + request.body.likedBy)
    queries.update(request.params.id, request.body)
        .then(post => {
            post
            ?
            response.json({post})
            :
            response.status(404).json({
                message: 'Not found'
            })
        })
        .catch(next);
});

router.post("/", (request, response, next) => {
    queries.create(request.body)
        .then(post => {
            response.status(201).json({
                post
            });
        })
        .catch(next);
});

//Update a post, location and caption


router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id)
        .then(() => {
            response.status(204).json({
                deleted: true
            });
        })
        .catch(next);
});

//Update any of the following on a post: Post caption, Post Location, etc etc

module.exports = router;