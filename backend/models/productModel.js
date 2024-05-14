const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        content: {
            type: String,
            required: [true, "content is required"],
        },
        // features start
        feature1: {
            type: String,
            required: [true, "feature1 is required"],
        },
        feature2: {
            type: String,
            required: [false, "feature2 is required"],
        },
       
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        image: {
            url: String,
            public_id: String,
        },
        likes: [{ type: ObjectId, ref: "User" }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: {
                    type: ObjectId,
                    ref: "User",
                },
            },
        ],

        
    },
    { timestamps: true }

    
);



module.exports = mongoose.model('Product', productSchema);

