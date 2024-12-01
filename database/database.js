const { Sequelize } = require("sequelize");
const dotenv  = require('dotenv');

dotenv.config();

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASSWORD;
const dbhost = process.env.DB_HOST;

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
    host: dbhost,
    dialect: "mysql",
    logging: false
})

async function main(){
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos MySQL');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}
  
main();

module.exports = sequelize