const express = require("express");
const router = express.Router();
const walletController = require("../../controllers/wallet/wallet.controller");
const  { validateWalletRecharge, validateResult, validateWalletBalance } = require("../../middlewares/validator.middleware");

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

module.exports = router;
