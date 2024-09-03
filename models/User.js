import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        index:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        default:null
    },
    otpGeneratedAt:{
        type:Date,
        default:null
    }

})

userSchema.pre('save',async function(next) {
    if(this.isNew || this.isModified('otp')){
        this.otp = await bcrypt.hash(this.otp,10)
    }
    return next()
})

userSchema.methods.isValidOTP = async function(plainOTP,user) {
    const isMatched = await bcrypt.compare(plainOTP,user.otp)
    const expirationTime = new Date(user.otpGeneratedAt).getMilliseconds() + 15*60*60*1000
    if(isMatched && (Date.now() > expirationTime)){
        return true
    }
    return false
}
const UserModel = mongoose.model('User',userSchema)

export default UserModel;