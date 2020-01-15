module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trails', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    trail_location: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    category_tag: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    admin_district: {
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
  down: (queryInterface) => queryInterface.dropTable('Trails'),
};
