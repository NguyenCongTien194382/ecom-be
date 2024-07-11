import mongoose from "mongoose";
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)

const ProductsSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        name: {
            type: String,
            default: ''
        },
        slug: {
            type: String,
            slug: 'name'
        },
        category: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        urlImage: {
            type: Array,
            default: []
        },
        urlThumbnail: {
            type: String,
        },
        sizeInfo: [
            {
                size: {
                    type: String,
                    required: true
                },
                total: {
                    type: Number,
                    default: 0
                },
                priceListed: {
                    type: Number,
                    default: 0
                },
                priceSold: {
                    type: Number,
                    default: 0
                }
            }
        ],
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
    {
        collection: 'Products',
        versionKey: false,
        timestamp: true
    }
);

export default mongoose.model("Products", ProductsSchema);