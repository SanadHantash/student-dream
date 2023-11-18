const express = require("express");
const router = express.Router();

const donorcontroller = require("../Controller/donor_controller");
const { authenticateToken } = require('../middleware/authMiddleware');

router.post("/adddonation/:id",authenticateToken, donorcontroller.addDonation);
router.get("/getalldonation",authenticateToken, donorcontroller.getDonation);
router.get("/gethistory", authenticateToken, donorcontroller.getHistory);
router.post("/addhistory/:id", authenticateToken, donorcontroller.postHistory);
router.get("/countdonations", authenticateToken,donorcontroller.countDonations);
router.get("/frequencydonor", authenticateToken,donorcontroller.donorFrequency);
router.put("/deletedonation/:id",authenticateToken, donorcontroller.deletedonation);
//router.put("/updatedonation/:id", authenticateToken,donorcontroller.updatedonation);
router.put("/acceptdonation/:id", authenticateToken,donorcontroller.acceptedonation);
router.put("/rejectdonation/:id", authenticateToken,donorcontroller.rejectdonation);

module.exports = router;
