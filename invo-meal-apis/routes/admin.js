const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const adminController = require("../controller/admin");
const adminAuth = require("../middleware/admin");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.WEEKLY_MENU_SAVE_PATH);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${uuidv4()}.${ext}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/upload-weekly-menu", adminAuth, upload.single("menuImage"), adminController.uploadWeeklyMenu);
router.post("/all-weekly-menus", adminAuth, adminController.allWeeklyMenus);
router.post("/all-users", adminAuth, adminController.allUsers);
router.post("/all-invoices", adminAuth, adminController.allInvoices);
router.post("/verify-invoice", adminAuth, adminController.verifyInvoice);
router.post("/meal-users", adminAuth, adminController.mealUsers);

module.exports = router;
