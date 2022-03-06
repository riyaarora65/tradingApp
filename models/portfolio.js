module.exports = function(sequelize, DataTypes){
    return sequelize.define('Portfolio', {
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
        avgBuyPrice: {
            type: DataTypes.INTEGER,
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
        tableName: 'Portfolio',
        timestamps: false
      });
}