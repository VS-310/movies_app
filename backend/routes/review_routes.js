const express = require('express');
const router = express.Router();

const Review = require('../models/review.js');

router.get('/', async (req, res) => {
    try {
        const response = await Review.find();
        if (response.length === 0) {
            res.status(200).json({ response: "No reviews found" });
        } else {
            res.status(200).json({ response: response });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:movieid', async (req, res) => {
    try {
        const movieid = req.params.movieid;
        const rating = req.body;
        if (!rating) {
            return res.status(400).json({ error: 'Rating is required' });
        }

        const review = new Review({
            title,
            movieid: movieid,
            rating,
        });

        const response = await review.save();

        res.status(200).json({ message: "Review saved successfully", response: response });
    } 
    catch (err) {
        console.log(err);
        if (err.name === "ValidationError") {
            return res.status(400).json({
                error: "Validation Error",
                message: err.message,
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:movieid', async (req, res) => {
    try {
        const movieid = req.params.movieid;
        const response = await Review.find({ movieid: movieid });
        if (response.length > 0) {
            res.status(200).json({ response: response });
        } else {
            res.status(404).json({ error: "No reviews found for this movie" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:movieid', async (req, res) => {
    try {
        const movieid = req.params.movieid;
        const upd_data = req.body;
        const response = await Review.findOneAndUpdate(
            { movieid: movieid },
            upd_data,
            {
                new: true,
                runValidators: true,
            }
        );

        if (response) {
            res.status(200).json({ response: response });
        } else {
            res.status(404).json({ error: "Review not found for this movie" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:movieid', async (req, res) => {
    try {
        const movieid = req.params.movieid;
        const response = await Review.findOneAndDelete({ movieid: movieid });

        if (response) {
            res.status(200).json({ response: response });
        } else {
            res.status(404).json({ error: "Review not found for this movie" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
