const bcrypt = require("bcrypt");
const User = require("../models/user");
const Designation = require("../models/designation");
const { generateWebToken } = require("../utils/helper");
const { registerSchema, loginSchema } = require("../utils/validation");

exports.register = async (req, res) => {
  try {
    const values = await registerSchema.validateAsync({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      phone: req.body.phone,
      designationId: req.body.designation,
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeat_password,
    });

    const check = await User.findOne({
      where: { email: values.email },
      attributes: ["email"],
    });

    if (check) {
      res.status(400).json({ status: false, msg: "Email already exist." });
    }

    User.create({
      roleId: 2,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      designationId: values.designationId,
      email: values.email,
      password: values.password,
      status: 1,
    })
      .then(async (result) => {
        const data = {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          role: (await result.getRole()).role,
        };
        res.json({
          status: true,
          msg: "Registration has been completed successfully.",
          data,
          accessToken: generateWebToken(data),
        });
      })
      .catch((err) => {
        res.status(400).json({ status: false, msg: err });
      });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details[0].message });
  }
};

exports.login = async (req, res) => {
  try {
    const values = await loginSchema.validateAsync({
      email: req.body.email,
      password: req.body.password,
    });

    const user = await User.findOne({
      where: { email: values.email, status: 1 },
    });
    if (user && bcrypt.compareSync(values.password, user.password)) {
      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: (await user.getRole()).role,
      };
      res.json({
        status: true,
        msg: "Login success.",
        data,
        accessToken: generateWebToken(data),
      });
    } else {
      res
        .status(400)
        .json({ status: false, msg: "Sorry! Incorrect email or password." });
    }
  } catch (err) {
    res.status(400).json({ status: false, msg: err.details });
  }
};

exports.designations = async (req, res) => {
  try {
    const designations = await Designation.findAll({
      where: { status: 1 },
      attributes: ["id", "designation"],
    });
    if (designations) {
      res.json({ status: true, data: designations });
    } else {
      res.json({ status: true, data: [] });
    }
  } catch (e) {
    res.status(400).json({ status: false, msg: e });
  }
};
