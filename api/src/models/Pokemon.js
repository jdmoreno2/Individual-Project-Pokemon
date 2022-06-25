const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      get(){
        const id = this.getDataValue('id');
        return '0' + id;
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    vida: {
      type: DataTypes.INTEGER
    },
    fuerza: {
      type: DataTypes.INTEGER
    },
    defensa: {
      type: DataTypes.INTEGER
    },
    velocidad: {
      type: DataTypes.INTEGER
    },
    altura: {
      type: DataTypes.INTEGER
    },
    peso: {
      type: DataTypes.INTEGER
    },
    imagen: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  });
};
