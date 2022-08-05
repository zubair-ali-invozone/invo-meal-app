const express = require("express");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const userController = require("../controller/user");
const userAuth = require("../middleware/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.PAYMENT_PROOF_SAVE_PATH);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${uuidv4()}.${ext}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/subscribe", userAuth, userController.subscribe);
router.post("/invoices", userAuth, userController.invoices);
router.post("/upload-payment-proof", userAuth, upload.single("proofImage"), userController.uploadPaymentProof);
router.post("/cancel-meal", userAuth, userController.cancelMeal);
router.get("/weekly-menu", userAuth, userController.weeklyMenu);
router.get("/plans", userAuth, userController.plans);
router.get("/check-subscription", userAuth, userController.checkSubscription);
router.get("/cancel-meal-list", userAuth, userController.cancelMealList);

module.exports = router;
