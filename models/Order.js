const mongoose = require("mongoose");

// Define the Order schema with validation and timestamps
const OrderSchema = mongoose.model("order", new mongoose.Schema({
    orderid: { type: String, required: true, unique: true },
    selected: { type: Object, required: true }
}, { timestamps: true }));

// Save an order in progress through RazorPay
module.exports.saveOrder = async function (orderid, selected) {
    try {
        await OrderSchema.create({ orderid, selected });
    } catch (error) {
        console.error("Error saving order:", error);
    }
};

// Get a saved order to update the user after successful payment
module.exports.getOrder = async function (orderid) {
    try {
        const orderObj = await OrderSchema.findOne({ orderid });
        return orderObj;
    } catch (error) {
        console.error("Error retrieving order:", error);
        return null;
    }
};
