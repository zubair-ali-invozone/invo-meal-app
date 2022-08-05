const { Op } = require("sequelize");
const Plans = require("../models/plan");
const Subscription = require("../models/subscription");
const Invoices = require("../models/invoice");
const CancelMeal = require("../models/cancelMeal");
const Menu = require("../models/foodMenu");
const User = require("../models/user");
const { subscribeSchema, paymentProofSchema, cancelMealSchema } = require("../utils/validation");

exports.subscribe = async (req, res) => {
  try {
    const today = new Date();
    const userData = req.userAuth;
    const values = await subscribeSchema.validateAsync({
      planId: req.body.planId,
    });

    const plan = await Plans.findOne({ where: { id: values.planId } });
    if (!plan) {
      res.status(400).json({ status: false, msg: "Plan id is invalid." });
      return false;
    }

    const subscriptionCheck = await Subscription.findOne({
      where: { userId: userData.id, status: 1, expDate: { [Op.gte]: today } },
    });
    if (subscriptionCheck) {
      res.status(400).json({ status: false, msg: "You have already subscribed." });
      return false;
    }

    Subscription.create({
      userId: userData.id,
      planId: values.planId,
      expDate: null,
      status: 1,
    })
      .then((result) => {
        Invoices.create({
          userId: userData.id,
          planId: values.planId,
          subscriptionId: result.id,
          amount: plan.amount,
          isPaid: 0,
          status: 1,
        })
          .then(() => {
            res.json({
              status: true,
              msg: "You have subscribed successfully. Please pay the invoice",
            });
          })
          .catch((err) => {
            res.status(400).json({ status: false, msg: err });
          });
      })
      .catch((err) => {
        res.status(400).json({ status: false, msg: err });
      });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details });
  }
};

exports.invoices = async (req, res) => {
  try {
    const userData = req.userAuth;
    const invoices = await Invoices.findAll({
      raw: true,
      where: { userId: userData.id },
      attributes: [
        "id",
        "user.email",
        "user.firstName",
        "user.lastName",
        "plan.planTitle",
        "amount",
        "isPaid",
        "status",
        "proofImage",
      ],
      include: [
        { model: Plans, attributes: [] },
        { model: User, attributes: [] },
      ],
      order: [["isPaid", "ASC"]],
    });
    if (invoices) {
      const invoicesData = invoices.map((item) => {
        return {
          ...item,
          proofImage: `${process.env.DOMAIN_PATH}/${process.env.PAYMENT_PROOF_SAVE_PATH}/${item.proofImage}`
        };
      });
      res.json({
        status: true,
        data: invoicesData,
      });
    } else {
      res.json({
        status: true,
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({ status: false, msg: err });
  }
};

exports.uploadPaymentProof = async (req, res) => {
  try {
    const userData = req.userAuth;
    const fileName = req?.file?.filename ?? "";
    const values = await paymentProofSchema.validateAsync({
      invoiceId: req.body.invoiceId,
      proofImage: fileName,
    });

    const invoice = await Invoices.findOne({
      where: { userId: userData.id, id: values.invoiceId },
    });
    if (!invoice) {
      res.status(400).json({ status: false, msg: "Invoice not found." });
      return false;
    }

    Invoices.update(
      { proofImage: fileName, isPaid: 1, status: 1 },
      { where: { id: values.invoiceId } }
    )
      .then(() => {
        res.json({ status: true, msg: "Invoice image uploaded successfully." });
      })
      .catch((err) => {
        res.status(400).json({ status: false, msg: err });
      });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details });
  }
};

exports.cancelMeal = async (req, res) => {
  try {
    const userData = req.userAuth;
    const values = await cancelMealSchema.validateAsync({
      reason: req.body.reason,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    const subscription = await Subscription.findOne({
      where: {
        userId: userData.id,
        status: 1,
        expDate: { [Op.gte]: new Date() },
      }
    });
    if (!subscription) {
      res.status(400).json({
        status: false,
        msg: "Sorry! Subscription not found."
      });
      return false;
    }

    const cancelMeal = await CancelMeal.findOne({
      where: {
        userId: userData.id,
        startDate: values.startDate,
        endDate: values.endDate,
      },
      order: [["id", "DESC"]],
    });
    if (cancelMeal) {
      res.status(400).json({
        status: false,
        msg: "You have already cancel the meal.",
      });
      return false;
    }

    CancelMeal.create({
      userId: userData.id,
      subscriptionId: subscription.id,
      reason: values.reason,
      startDate: values.startDate,
      endDate: values.endDate,
      status: 1,
    })
      .then(() => {
        res.json({
          status: true,
          msg: "You have successfully cancelled the meal.",
        });
      })
      .catch((err) => {
        res.status(400).json({ status: false, msg: err });
      });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details || err });
  }
};

exports.weeklyMenu = async (req, res) => {
  try {
    const today = new Date();
    const weeklyMenu = await Menu.findOne({
      raw: true,
      where: { startDate: { [Op.lte]: today }, endDate: { [Op.gte]: today } },
      attributes: ["startDate", "endDate", "menuImage"],
    });
    if (weeklyMenu) {
      const data = {
        startDate: weeklyMenu.startDate,
        endDate: weeklyMenu.endDate,
        menuImage: `${process.env.DOMAIN_PATH}/${process.env.WEEKLY_MENU_SAVE_PATH}/${weeklyMenu.menuImage}`,
      };
      res.json({ status: true, data });
    } else {
      res.json({ status: true, data: null });
    }
  } catch (err) {
    res.status(400).json({ status: false, msg: err });
  }
};

exports.plans = async (req, res) => {
  try {
    const plans = await Plans.findAll({
      where: { status: 1 },
      attributes: ["id", "planType", "planTitle", "amount", "planDays"],
    });
    if (plans) {
      res.json({ status: true, data: plans });
    } else {
      res.json({ status: true, data: null });
    }
  } catch (err) {
    res.status(400).json({ status: false, msg: err });
  }
};

exports.checkSubscription = async (req, res) => {
  try {
    const userData = req.userAuth;
    const checkSubscription = await Subscription.findOne({
      raw: true,
      where: { userId: userData.id, status: 1 },
      attributes: ["expDate", "plan.planTitle", "plan.planDays", "plan.amount"],
      include: [
        {
          model: Plans,
          attributes: []
        }
      ]
    });
    if (checkSubscription) {
      res.json({ status: true, is_plan: true, data: checkSubscription });
    } else {
      res.json({ status: true, is_plan: false, data: null });
    }
  } catch (err) {
    res.status(400).json({ status: false, msg: err });
  }
};

exports.cancelMealList = async (req, res) => {
  try {
    const userData = req.userAuth;
    const cancelMealList = await CancelMeal.findAll({
      raw: true,
      where: { userId: userData.id, },
      attributes: ["id", "reason", "startDate", "endDate"],
    });
    if (cancelMealList) {
      res.json({ status: true, data: cancelMealList });
    } else {
      res.json({ status: true, data: null });
    }
  } catch (err) {
    res.status(400).json({ status: false, msg: err });
  }
};
