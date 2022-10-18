require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
} = process.env;


const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Categories, OrderProduct, User, Image, Review } = sequelize.models;

// Aca vendrian las relaciones
//producto-categoria --->mucho a mucho 

Product.belongsToMany(Categories, { through: 'product-category' })
Categories.belongsToMany(Product, { through: 'product-category' })

//producto-OrderProduct --->mucho a mucho 

Product.belongsToMany(OrderProduct, { through: 'product-OrderProduct' })
OrderProduct.belongsToMany(Product, { through: 'product-OrderProduct' })

//producto-User ---> mucho a mucho 

Product.belongsToMany(User, { through: 'product-User' })
User.belongsToMany(Product, { through: 'product-User' })

//producto-Image --->mucho a mucho 

Product.belongsToMany(Image, { through: 'product-Image' })
Image.belongsToMany(Product, { through: 'product-Image' })

//producto-Review --->mucho a mucho 

Product.belongsToMany(Review, { through: 'product-Review' })
Review.belongsToMany(Product, { through: 'product-Review' })

//User-Review --->mucho a mucho 

User.belongsToMany(Review, { through: 'User-Review' })
Review.belongsToMany(User, { through: 'User-Review' })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
