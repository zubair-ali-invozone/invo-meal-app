module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("plans", [
      {
        planType: "weekly",
        planTitle: "Weekly",
        planDays: 7,
        amount: "1000",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        planType: "monthly",
        planTitle: "Monthly",
        planDays: 30,
        amount: "3000",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        planType: "bi_weekly",
        planTitle: "Bi-Weekly",
        planDays: 15,
        amount: "1500",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("plans", null, {});
  },
};
