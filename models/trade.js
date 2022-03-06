module.exports = function(sequelize, DataTypes){
    return sequelize.define('Trade', {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
          },
        tickerSymbol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        buyPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('BUY','SELL'),
            allowNull: false
        },
        UpdatedOn: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:new Date()
        },
        CreatedOn: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:new Date()
        }
    },{
        tableName: 'Trade',
        timestamps: false
      });
}