
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item', {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        stockLevel: {
            type: DataTypes.INTEGER
        },
        imagelink: {
            type: DataTypes.STRING
        },
        fullImageLink: {
            type: DataTypes.VIRTUAL,
            get() {
                return 'http://localhost:8080' + this.getDataValue('imagelink');
            }
        }
    }, 
    { timestamps: false });

}