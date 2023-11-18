const userController = require('../Controller/usercontroller');
const express = require('express');
const app = express();
const router = express.Router();



router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login', userController.login);



module.exports = router;








