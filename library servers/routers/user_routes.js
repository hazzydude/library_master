var express = require('express');
const models = require('../models/index');
const router = express.Router();

//get all
router.get('/all', async (_req, res) => {
    const result = await models.User.findAll();
    res.send(result);
});

//get by id
router.get('/:index', async (req, res) => {
    const [first = null] = await models.User.findAll({ where: { id: req.params.index } });
    if(first) {
        res.send(first);
    } else {
        res.status(404).send({message: 'User not found for index ' + req.params.index});
    }
});


//create from message body
router.post('', async (req, res) => {
    models.User.create(req.body);
    res.send();
});


//delete by index
router.delete('/:index', (req, res) => {

   models.User.destroy({ where: {  id: req.params.index} });

    res.send();
});


//update by id with fields in body
router.patch('/:index', async (req,res) => {
    models.User.update(req.body, {
        where: {  id: req.params.index} 
    });
});




module.exports = router;