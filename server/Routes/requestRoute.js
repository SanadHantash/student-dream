const express = require('express');
const router = express.Router();
const requestController = require('../Controller/requestController')
const { authenticateToken } = require('../middleware/authMiddleware');


router.post("/newrequest", authenticateToken, requestController.newrequest);
router.get("/all",authenticateToken, requestController.allRequests);
router.get("/myrequests",authenticateToken, requestController.myRequests);
router.get("/pending",authenticateToken, requestController.pendingRequests);
router.get("/rejected",authenticateToken, requestController.rejectedRequests);
router.get("/accept",authenticateToken, requestController.acceptedRequests);
router.put("/request/update/:id",authenticateToken, requestController.updateRequest);
router.put("/request/delete/:id",authenticateToken, requestController.deleteRequest);
router.put("/request/accept/:id",authenticateToken, requestController.updateaccepted);
router.put("/request/reject/:id",authenticateToken, requestController.rejectedRequests);

module.exports = router;