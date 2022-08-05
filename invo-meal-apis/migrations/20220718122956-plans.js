module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("plans", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      planType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      planTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      planDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable("plans");
  },
};
