const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    phone: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

userSchema.pre("save",async function (){
    this.password = await bcrypt.hash(this.password,12);
});

module.exports = mongoose.model('User',userSchema)