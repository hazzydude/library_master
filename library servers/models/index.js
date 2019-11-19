const Sequelize = require('sequelize');


const sequelize = new Sequelize(
    'test', //database 
    'root', //user
    'password', // pass
    {
        host: 'localhost',
        dialect: 'mysql'
    });




const Item = sequelize.import(__dirname + '/item_model');
const User = sequelize.import(__dirname + '/user_model');
const User_Item = sequelize.import(__dirname + '/user_item_model');


// Associations
Item.belongsToMany(User, { through: 'user_item' });
User.belongsToMany(Item, { through: 'user_item' });





sequelize.sync({ force: true }).then(() => {
    User.create({ name: 'Ola', DoB: "1996-03-12" });
    User.create({ name: 'Tom', DoB: "1997-04-17" });
    User.create({ name: 'Andy', DoB: "2000-01-01" });

    Item.create({ name: 'World Map', type: 'Map', stockLevel: 1, imagelink: '/static/images/Worldmap.jpg' });
    Item.create({ name: 'Never Let Me Go', type: 'Book', author: 'Kazuo Ishiguro', stockLevel: 5, imagelink: '/static/images/NeverLetMeGo.jpg'});
    Item.create({ name: 'Winnie the Pooh', type: 'Book', author: 'A.A.Milne', stockLevel: 17, imagelink: '/static/images/WinnethePooh.jpg'});
    Item.create({ name: 'The Complete Tales of Winnie the Pooh', type: 'Book', author: 'A.A.Milne', stockLevel: 3, imagelink: '/static/images/theCompleteTalesofWinnethePooh.jpg'});
    Item.create({ name: 'Harry Potter', type: 'Book', author: 'J K Rowling', stockLevel: 9, imagelink: '/static/images/harryPotter.jpg' });
    Item.create({ name: 'Map of Europe', type: 'Map', stockLevel: 1, imagelink: '/static/images/MapofEurope.jpg' });
    Item.create({ name: 'Map of Europe Post Brexit', type: 'Map', stockLevel: 1, imagelink: '/static/images/EuropeWithoutUK.png' });
    
    User_Item.create({ userId: 1, itemId: 1, dateCheckedOut: "2019-11-10" });
    User_Item.create({ userId: 1, itemId: 3, dateCheckedOut: "2019-10-28" });
    User_Item.create({ userId: 2, itemId: 2, dateCheckedOut: "2019-11-13" });
});

module.exports = {
    Item,
    User,
    User_Item
};
