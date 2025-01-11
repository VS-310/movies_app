const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    movieid: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
});

module.exports = mongoose.model('Review', reviewSchema);
