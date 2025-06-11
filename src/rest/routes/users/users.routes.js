const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/users.controller");
const { validateCreateCustomer, validateResult } = require("../../middlewares/validator.middleware");

router.post(
    "/create_customer",
    validateCreateCustomer,
    validateResult,
    usersController.create_customer
);

module.exports = router;
