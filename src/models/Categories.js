const {DataTypes}=require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports=(sequelize)=>{
  // defino el modelo
  sequelize.define('categories',{
    // id:{
    //     type: DataTypes.UUID,
    //     allowNull:false,
    //     primaryKey:true,
    //     defaultValue:DataTypes.UUIDV4,
    // },
    name:{
       // type:DataTypes.ENUM('hombre','mujer','chicos','varios'),
       type:DataTypes.STRING,
        allowNull:false,
        
    }

  })
    
}