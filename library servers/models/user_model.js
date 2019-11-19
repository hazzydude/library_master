const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING
        }, 
       DoB: {
           type: DataTypes.DATEONLY,
            get() {
                return moment.utc(this.getDataValue('DoB')).format('YYYY-MM-DD');
            }
       }
    }, 
    { timestamps: false });

}