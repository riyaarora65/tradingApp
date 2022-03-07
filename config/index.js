module.exports = {
    "host": process.env.DBHOST,
    "port": 3306,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "dialect": "mysql",
    "database": process.env.DBNAME
}