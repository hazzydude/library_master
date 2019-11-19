const moment = require('moment');
moment().format();

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_item', {
        dateCheckedOut: {
            type: DataTypes.DATEONLY,
            get() {
                return moment.utc(this.getDataValue('dateCheckedOut')).format('YYYY-MM-DD');
            }
        },
        
        returnDate: {
            type: DataTypes.VIRTUAL,
            get() {
                return moment(this.getDataValue('dateCheckedOut')).add(14, 'days').format('YYYY-MM-DD');
            }
        }




    }, { timestamps: false });

}