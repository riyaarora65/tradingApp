const fs = require("fs");

const path = require("path");

const Sequelize = require("sequelize");
const config = require('../config');
const DataTypes = require('sequelize/lib/data-types');

// DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
//   date = this._applyTimezone(date, options)
//   return date.format('YYYY-MM-DD HH:mm:ss.SSS')
// }
var sequelize = new Sequelize(config.database, config.username, config.password, config);

var db = {};
try{
    fs

  .readdirSync(__dirname)

  .filter(function (file) {

    return (file.indexOf(".") !== 0) && (file !== "index.js");

  })

  .forEach(function (file) {


    var model = require(path.join(__dirname, file))(sequelize, DataTypes);;

    db[model.name] = model;

  });


Object.keys(db).forEach(function (modelName) {

  if ("associate" in db[modelName]) {

    db[modelName].associate(db);

  }

});
sequelize.sync();
}catch(err){
    console.log(err);
}


db.sequelize = sequelize;

module.exports = db;