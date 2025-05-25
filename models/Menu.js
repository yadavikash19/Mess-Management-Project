const mongoose = require("mongoose");

// Schema definition
const menuSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        lowercase: true, // 🔁 Auto convert to lowercase
        unique: true      // 🔒 Prevent duplicates
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    }
});

const Menu = mongoose.model("menuitem", menuSchema);

// Get the weekly menu
module.exports.getMenu = async function () {
    const menuItems = await Menu.find({}).select({ _id: 0 });
    return menuItems;
}

// Set the weekly menu
module.exports.setMenus = async function (menus) {
    if (!Array.isArray(menus)) {
        throw new Error("Invalid menus array");
    }

    for (let item of menus) {
        if (!item.day || !item.breakfast || !item.lunch || !item.dinner) {
            throw new Error("Invalid menu item");
        }

        const day = item.day.toLowerCase(); // 🔁 Normalize day

        await Menu.updateOne(
            { day: day },
            {
                $set: {
                    day: day,  // 🔁 Save normalized day
                    breakfast: item.breakfast,
                    lunch: item.lunch,
                    dinner: item.dinner
                }
            },
            { upsert: true }
        );
    }
}
