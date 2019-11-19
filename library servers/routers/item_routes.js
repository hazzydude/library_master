var express = require('express');
const models = require('../models/index');
const router = express.Router();


//get all
router.get('/all', async (_req, res) => {
    const result = await models.Item.findAll();
    res.send(result);
});

//get by name like
router.get('/byname/:name', async (req, res) => {
    const [first = null] = await models.Item.findAll({ where: { name: req.params.name } });
    if(first) {
        res.send(first);
    } else {
        res.status(404).send({message: 'Item not found for name ' + req.params.name});
    }
});

//get by id
router.get('/:index', async (req, res) => {
    const [first = null] = await models.Item.findAll({ where: { id: req.params.index } });
    if(first) {
        res.send(first);
    } else {
        res.status(404).send({message: 'Item not found for index ' + req.params.index});
    }
});

//create from message body
router.post('', async (req, res) => {
    models.Item.create(req.body);
    res.send();
});

//delete by index
router.delete('/:index', (req, res) => {

   models.Item.destroy({ where: {  id: req.params.index} });

    res.send();
});

//update by id with fields in body
router.post('/:index', async (req,res) => {
    models.Item.update(req.body, {
        where: {  id: req.params.index} 
    });
    res.send();
});




module.exports = router;