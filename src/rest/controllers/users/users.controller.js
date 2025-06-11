const create_customer = (req, res) => {

    const { names, last_names, email, document_id, phone } = req.body;

    console.log("🚀 ~ constcreate_user= ~ names:", names)
    console.log("🚀 ~ constcreate_user= ~ last_names:", last_names)
    console.log("🚀 ~ constcreate_user= ~ email:", email)
    console.log("🚀 ~ constcreate_user= ~ document_id:", document_id)
    console.log("🚀 ~ constcreate_user= ~ phone:", phone)
};

module.exports = {
    create_customer
};
