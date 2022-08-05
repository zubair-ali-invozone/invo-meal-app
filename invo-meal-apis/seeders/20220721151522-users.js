module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("users", [
      {
        roleId: 1,
        firstName: "Admin",
        lastName: "Admin",
        phone: "0000",
        designationId: "1",
        email: "admin@admin.com",
        password: "$2b$10$o3atSeaoV6Hj6P3E12Ig8OVzW5iYjlCT.3.DxYHlVKQjYtVeNdmT6", // 00000
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
