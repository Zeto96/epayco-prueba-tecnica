const wallet_recharge = (req, res) => {
    const { document_id, phone, amount } = req.body;
    console.log("🚀 ~ constwallet_recharge= ~ document_id:", document_id)
    console.log("🚀 ~ constwallet_recharge= ~ amount:", amount)
    console.log("🚀 ~ constwallet_recharge= ~ phone:", phone)
};

const wallet_balance = (req, res) => {
    const { document_id, phone } = req.body;
    console.log("🚀 ~ constwallet_balance= ~ document_id:", document_id)
    console.log("🚀 ~ constwallet_balance= ~ phone:", phone)
};

module.exports = {
    wallet_recharge,
    wallet_balance
};