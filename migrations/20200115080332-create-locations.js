module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    location1: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    location2: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    location3: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    location4: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    location5: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Locations'),
};
