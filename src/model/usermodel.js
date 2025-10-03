import moongoose from 'mongoose';
const { Schema } = moongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [ true, 'Username is required' ],
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true });

const User = moongoose.models.users || moongoose.model('users', userSchema);
export default User;