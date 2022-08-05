module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("roles", [
      {
        role: "admin",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "user",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
