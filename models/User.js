import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true
        },
        authType: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local'
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            default: null
        },
        password: {
            type: String,
            default: null
        },
        authGoogleID: {
            type: String,
            default: null
        },
        authFacebookID: {
            type: String,
            default: null
        },
        role: {
            type: String,
            enum: ['member', 'admin'],
            default: 'member'
        },
        avatarUrl: {
            type: String,
            default: null
        },
        rank: {
            type: String,
            enum: ['Hạng Bạc', 'Hạng Vàng', 'Hạng Bạch Kim', 'Hạng Kim Cương'],
            default: 'Hạng Bạc'
        },
        address: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
    {
        collection: 'Users',
        versionKey: false,
        timestamp: true
    }
);

export default mongoose.model("Users", UsersSchema);