var express = require('express');
const models = require('../models/index');
const router = express.Router();


//get all
router.get('/all', async (_req, res) => {
    const result = await models.User_Item.findAll();
    res.send(result);
});

//get by index
router.get('/:index', async (req, res) => {
    const result = await models.User_Item.findAll({ where: { userId: req.params.index } });
    res.send(result);
});

//get by index items with checked join
router.get('/everything/:index', async (req, res) => {
    const [result] = await models.User.findAll({
        where: { id: req.params.index },
        include: [{ model: models.Item }]
    });
    res.send(result);
});

//create new checkout
router.post('/', async (req, res) => {
    models.User_Item.create(req.body);
    res.send("itemAdded");
    
});

//delete new checkout
router.delete('/:itemID/:userID', async (req, res) => {
    models.User_Item.destroy({ 
        where: {
            userId: req.params.userID,
            itemId: req.params.itemID
        }
    });
    res.send("itemdeleted");
    
});

module.exports = router;