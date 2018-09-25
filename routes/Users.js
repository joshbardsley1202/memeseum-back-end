const knex = require('../database-connection') 
const router = module.exports = require('express').Router();

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)


function getAll(req, res, next) {
    
    knex('users')
        .select('*')
        .limit(limit)
        .offset(offset)
        .then(users => res.status(200).send({
            data: users
        }))
        .catch(next)
}

function getOne(req, res, next) {
    knex('users')
        .select('*')
        .limit(1)
        .where({
            id: req.params.id
        })
        .then(([user]) => {
            if (!user) return res.status(404).send({
                message: 'user not found.'
            })
            res.status(200).send({
                data: user
            })
        })
        .catch(next)
}

function create(req, res, next) {
    // TODO: Validate input data
    knex('users')
        .insert(req.body)
        .then(() => res.status(201).json({
            data: req.body
        }))
        .catch(next)
}

function update(req, res, next) {
    // TODO: Validate input data
    knex('users')
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
    knex('users').where({
            id: req.params.id
        })
        .delete()
        .then(count => count >= 1 ?
            res.status(204).json() :
            res.status(404).json({
                message: 'Nothing deleted!'
            }))
        .catch(next)
}