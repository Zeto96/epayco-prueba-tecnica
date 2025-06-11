const express = require("express");
const router = express.Router();
const customersController = require("../../controllers/customers/customers.controller");
const { validateCreateCustomer, validateResult } = require("../../middlewares/validator.middleware");

router.post(
    "/create_customer",
    validateCreateCustomer,
    validateResult,
    customersController.create_customer
);

module.exports = router;
