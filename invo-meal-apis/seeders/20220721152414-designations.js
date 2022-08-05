module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("designations", [
      {
        designation: "Admin",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        designation: "Dev",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("designations", null, {});
  },
};
