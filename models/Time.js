const mongoose = require("mongoose");

// Define the schema
const TimeSchema = mongoose.model("time", new mongoose.Schema({
    meal: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
}));

// Get the cost and time of breakfast, lunch, dinner
module.exports.getTimes = async function () {
    const Times = await TimeSchema.find({})
        .select({ _id: 0 });
    console.log(Times);
    return Times;
}

// Set the cost and time of breakfast, lunch, dinner
module.exports.setTimes = async function (times) {
    if (!Array.isArray(times)) {
        throw new Error("Invalid times array");
    }

    for (let item of times) {
        if (!item.meal || item.cost === undefined || !item.time) {
            throw new Error("Invalid time entry");
        }

        await TimeSchema.updateOne(
            { meal: item.meal },
            { $set: { time: item.time, cost: item.cost } },
            { upsert: true }
        );
    }
}
