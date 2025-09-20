import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import {
  GENDER_TYPES,
  SYS_ROLES,
  USER_AGENT,
} from "../../../utils/common/enum";
import { sendEmail } from "../../../utils";
// Define the User schema
export const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: function (){
        if(this.phoneNumber) {
return false;
        }
        return true;
      },
      trim: true,
    },
    password: {
      type: String,
      required: function (this: any) {
        if (this.userAgent === USER_AGENT.google) {
          return false;
        }
        return true;
      }, // Password is required if userAgent is not 'google'
    },
    credenialUpdatedAt: Date,
    phoneNumber:{
      type: String,
            required: function (){
        if(this.email) {
return false;
        }
        return true;
      },
    },
    role: {
      type: String,
      enum: SYS_ROLES,
      default: SYS_ROLES.user,
    },
    gender: {
      type: String,
      enum: GENDER_TYPES,
      default: GENDER_TYPES.male,
    },
    userAgent: {
      type: String,
      enum: USER_AGENT,
      default: USER_AGENT.local,
    },
    otp: { type: String },
    otpExpiryAt: { type: Date },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//virtual fieldS

UserSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (value: string) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName as string; //TYPE assertion
    this.lastName = lastName as string; //TYPE assertion
  });


UserSchema.pre("save",async function(next){
    //send email

  await  sendEmail({
      to:this.email,
      subject:" Confirm Your Account",
      html:`<h1>Your OTP :${this.otp} </h1>
      `
    })
next();
})
