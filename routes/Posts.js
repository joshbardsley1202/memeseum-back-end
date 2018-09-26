const router = module.exports = require('express').Router();
const knex = require('../database-connection') // TODO: Adjust path as needed!
// RESTful Knex Router Template:

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)


function getAll(req, res, next) {

    knex('post')
        .select('*')
        .then(posts => res.status(200).send({
            data: posts
        }))
        .catch(next)
}

function getOne(req, res, next) {
    knex('post')
        .select('*')
        .limit(1)
        .where({
            id: req.params.id
        })
        .then(([post]) => {
            if (!post) return res.status(404).send({
                message: 'Post not found.'
            })
            res.status(200).send({
                data: post
            })
        })
        .catch(next)
}

function create(req, res, next) {
    // TODO: Validate input data
    knex('post')
        .insert(req.body)
        .then(() => res.status(201).json({
            data: req.body
        }))
        .catch(next)
}

function update(req, res, next) {
    // TODO: Validate input data
    knex('post')
        .where({
            id: req.params.id
        })
        .update(req.body)
        .then(count => count >= 1 ?
            res.status(200).json({
                data: req.body
            }) :
            res.status(410).json())
        .catch(next)
}

function remove(req, res, next) {
    // TODO: Validate authentication
    knex('post').where({
            id: req.params.id
        })
        .delete()

        .then(count => 
            count
            ?
            res.status(204).json() 
            :
            res.status(404).json({
                message: 'Nothing deleted!'
            }))
        .catch(next)
}