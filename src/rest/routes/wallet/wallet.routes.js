const express = require("express");
const router = express.Router();
const walletController = require("../../controllers/wallet/wallet.controller");
const  { 
    validateWalletRecharge, 
    validateResult, 
    validateWalletBalance,
    validateWalletPayment,
    validatePaymentConfirmation
} = require("../../middlewares/validator.middleware");

router.post(
    "/wallet_recharge",
    validateWalletRecharge,
    validateResult,
    walletController.wallet_recharge
);

router.post(
    "/wallet_balance",
    validateWalletBalance,
    validateResult,
    walletController.wallet_balance
);

router.post(
    "/wallet_payment",
    validateWalletPayment,
    validateResult,
    walletController.wallet_payment
);

router.post(
    "/confirm_payment",
    validatePaymentConfirmation,
    validateResult,
    walletController.confirm_payment
);

module.exports = router;
