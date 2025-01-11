const express = require('express');
const router = express.Router();

const Review = require('../models/review.js');

router.get('/', async (req, res) => {
    try {
        const response = await Review.find();
        console.log("Working Fine");
        if(response.length == 0) {
            res.status(200).json({response: "No reviews found"});
        }
        else res.status(200).json({response: response});
    }
    catch (err) {
        console.log(err);
        res.status(404).json({error:'Internal server error'});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {rating, title} = req.body;
        if(!rating || !title){
            return res.status(400).json({error: 'title and rating are required'});
        }
        const review = new Review({
            title,
            id: id,
            rating,
        });

        const response = await review.save();

        console.log("Working Fine");
        res.status(200).json({message:"Review saved successfully", response: response});
    } 
    catch (err) {
        console.log(err);
        if(err.name === "ValidationError"){
            return res.status(400).json({
                error: "Validation Error",
                message: err.message,
            });
        }
        res.status(400).json({error:'Internal server error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Review.findById(id);
        if(response) {
            console.log("Working Fine");
            res.status(200).json({response: response});
        }
        else {
            console.log(err);
            res.status(500).json({error: "Review not found"});
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({error:'Internal server error'});
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const upd_data = req.body;
        const response = await Review.findByIdAndUpdate(id, upd_data, {
            new: true,
            runValidators: true,
        });
        if(response) {
            console.log("Working Fine");
            res.status(200).json({response: response});
        }
        else {
            console.log(err);
            res.status(500).json({error: "Review not found"});
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({error:'Internal server error'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Review.findByIdAndDelete(id);
        if(response) {
            console.log("Working Fine");
            res.status(200).json({response: response});
        }
        else {
            console.log(err);
            res.status(500).json({error: "Review not found"});
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({error:'Internal server error'});
    }
});

module.exports = router;
