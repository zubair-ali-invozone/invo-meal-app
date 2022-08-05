const { Op, Sequelize } = require("sequelize");
const Menu = require("../models/foodMenu");
const User = require("../models/user");
const Role = require("../models/role");
const Invoices = require("../models/invoice");
const Designation = require("../models/designation");
const Subscription = require("../models/subscription");
const { weeklyMenuSchema, verifyInvoiceSchema } = require("../utils/validation");
const CancelMeal = require("../models/cancelMeal");
const Plans = require("../models/plan");

exports.uploadWeeklyMenu = async (req, res) => {
  try {
    const fileName = req?.file?.filename ?? "";
    const values = await weeklyMenuSchema.validateAsync({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      menuImage: fileName,
    });
    Menu.create({
      user_id: 1,
      title: values.title,
      startDate: values.startDate,
      endDate: values.endDate,
      menuImage: fileName,
      status: 1,
    })
      .then((result) => {
        res.json({
          status: true,
          msg: "Weekly menu saved successfully.",
          data: {
            title: result.title,
            startDate: result.startDate,
            endDate: result.endDate,
            menuImage: result.menuImage,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({ status: false, error: err });
      });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details });
  }
};

exports.allUsers = async (req, res) => {
  const users = await User.findAll({
    raw: true,
    where: { roleId: 2 },
    attributes: [
      "id",
      "role.role",
      "firstName",
      "lastName",
      "phone",
      "designation.designation",
      "email",
      "subscription.plan.planTitle",
      "subscription.createdAt",
      "subscription.expDate",
      "status",
    ],
    include: [
      {
        model: Role,
        attributes: [],
      },
      {
        model: Designation,
        attributes: [],
      },
      {
        model: Subscription,
        attributes: [],
        include: [
          {
            model: Plans,
            attributes: []
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
  });
  if (users) {
    res.json({ status: true, data: users });
  } else {
    res.json({ status: false, data: null });
  }
};

exports.allInvoices = async (req, res) => {
  const invoices = await Invoices.findAll({
    raw: true,
    where: { isPaid: 1 },
    order: [["status", "ASC"]],
    attributes: [
      "id",
      "userId",
      "subscriptionId",
      "user.firstName",
      "user.lastName",
      "user.email",
      "user.role.role",
      "user.designation.designation",
      "amount",
      "proofImage",
      "status",
      "user.subscription.plan.planTitle",
      "user.subscription.plan.amount"
    ],
    include: [
      {
        model: User,
        include: [
          {
            model: Role,
            attributes: [],
          },
          {
            model: Designation,
            attributes: [],
          },
          {
            model: Subscription,
            attributes: [],
            include: [
              {
                model: Plans,
                attributes: [],
              }
            ]
          },
        ],
        attributes: [],
      },
    ],
  });
  if (invoices) {
    const invoicesData = invoices.map((item) => {
      return {
        ...item,
        proofImage: `${process.env.DOMAIN_PATH}/${process.env.PAYMENT_PROOF_SAVE_PATH}/${item.proofImage}`
      };
    });
    res.json({ status: true, data: invoicesData });
  } else {
    res.json({ status: false, data: [] });
  }
};

exports.verifyInvoice = async (req, res) => {
  try {
    const values = await verifyInvoiceSchema.validateAsync({
      invoiceId: req.body.invoiceId,
      statusCode: req.body.statusCode,
    });

    const invoice = await Invoices.findOne({
      raw: true,
      attributes: ["id", "plan.planDays", "subscriptionId"],
      where: { id: values.invoiceId },
      include: [
        {
          model: Plans,
          attributes: []
        }
      ],
    });
    if (!invoice) {
      res.status(400).json({ status: false, msg: "Invoice not found." });
      return false;
    }

    Invoices.update(
      { status: values.statusCode },
      { where: { id: values.invoiceId } }
    )
      .then(async () => {
        if (values.statusCode === 2) {
          const today = new Date();
          const expDate = new Date();
          expDate.setDate(today.getDate() + invoice.planDays);
          await Subscription.update(
            { expDate },
            { where: { id: invoice.subscriptionId } }
          );
          res.json({
            status: true,
            msg: "Invoice status saved successfully. User subscription activated.",
          });
        } else {
          res.json({ status: true, msg: "Invoice status saved successfully." });
        }
      })
      .catch((err) => {
        res.status(400).json({ statuss: false, msg: err });
      });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details });
  }
};

exports.mealUsers = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  Subscription.findAll({
    raw: true,
    where: { status: 1, expDate: { [Op.gte]: new Date() } },
    attributes: [
      "user.firstName",
      "user.lastName",
      "user.email",
      "plan.planTitle",
      "cancelMeal.id",
    ],
    include: [
      {
        required: false,
        model: User,
        attributes: [],
      },
      {
        required: false,
        model: Plans,
        attributes: [],
      },
      {
        required: false,
        model: CancelMeal,
        attributes: [],
        where: Sequelize.literal(
          `'${today}' BETWEEN ${"`cancelMeal`.`startDate`"} AND ${"`cancelMeal`.`endDate`"}`
        ),
      },
    ],
  })
    .then((result) => {
      const filterData = result.filter((item) => {
        return item.id === null;
      });
      if (filterData.length > 0) {
        const cancelList = filterData.map((item) => {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            planTitle: item.planTitle
          };
        });
        res.json({ status: true, data: cancelList });
      } else {
        res.json({ status: true, data: null });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: false, msg: err });
    });
};

exports.allWeeklyMenus = async (req, res) => {
  Menu.findAll({
    where: { status: 1 },
    attributes: ["id", "title", "startDate", "endDate", "menuImage", "status"],
    order: [["id", "DESC"]]
  })
    .then((result) => {
      const menus = result.map((item) => {
        return {
          ...item.dataValues,
          menuImage: `${process.env.DOMAIN_PATH}/${process.env.WEEKLY_MENU_SAVE_PATH}/${item.menuImage}`
        };
      });
      res.json({ status: true, data: menus });
    })
    .catch((err) => {
      res.status(400).json({ status: false, msg: err });
    });
};
