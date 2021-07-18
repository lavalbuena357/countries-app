const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      isUrl: true,
      allowNull: false
    },
    continent: {
      type: DataTypes.ENUM('Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Polar', ''),
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER
    },
    population: {
      type: DataTypes.INTEGER
    }
  } , {
    timestamps: false
  });
};
