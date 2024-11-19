const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    description: {
        type: String,
        default: '', // Optional field with default empty string
    },
    image: {
        type: String,
        set: (v) => (v === "" ? "https://via.placeholder.com/150" : v), // Placeholder if empty
    },
    // reviews: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "review", // Reference to the Review model
    //     },
    // ],
    price: {
        type: Number,
        min: 0, // Optional validation for price
    },
    location: {
        type: String,
        required: false, // Add required if necessary
    },
    country: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('listing', listingSchema);



